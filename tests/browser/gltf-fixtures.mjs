import { deflateSync } from 'node:zlib'

// Authored fixtures: one XY triangle, a one-second 0→2 X translation,
// and a 2×2 RGBA PNG (red/green, blue/white). No downloaded model/image.
const crc32 = (bytes) => {
  let crc = 0xffffffff
  for (const byte of bytes) {
    crc ^= byte
    for (let i = 0; i < 8; i++) crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0)
  }
  return (crc ^ 0xffffffff) >>> 0
}
const pngChunk = (type, data) => {
  const body = Buffer.concat([Buffer.from(type), data])
  const chunk = Buffer.alloc(body.length + 8)
  chunk.writeUInt32BE(data.length)
  body.copy(chunk, 4)
  chunk.writeUInt32BE(crc32(body), body.length + 4)
  return chunk
}
const ihdr = Buffer.alloc(13)
ihdr.writeUInt32BE(2, 0)
ihdr.writeUInt32BE(2, 4)
ihdr[8] = 8
ihdr[9] = 6
const png = Buffer.concat([
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
  pngChunk('IHDR', ihdr),
  pngChunk(
    'IDAT',
    deflateSync(
      Buffer.from([
        0, 255, 0, 0, 255, 0, 255, 0, 255, 0, 0, 0, 255, 255, 255, 255, 255,
        255,
      ]),
    ),
  ),
  pngChunk('IEND', Buffer.alloc(0)),
])

export function makeGlb(kind) {
  const json = {
    asset: { version: '2.0', generator: 'frontory-test-fixture' },
    scene: 0,
    scenes: [{ nodes: [] }],
  }
  const parts = []
  let byteLength = 0
  const append = (bytes) => {
    const padded = Buffer.alloc(Math.ceil(bytes.length / 4) * 4)
    bytes.copy(padded)
    const index =
      (json.bufferViews ??= []).push({
        buffer: 0,
        byteOffset: byteLength,
        byteLength: bytes.length,
      }) - 1
    parts.push(padded)
    byteLength += padded.length
    return index
  }
  const floats = (values, type, count, bounds = {}) => {
    const bytes = Buffer.alloc(values.length * 4)
    values.forEach((value, i) => bytes.writeFloatLE(value, i * 4))
    return (
      (json.accessors ??= []).push({
        bufferView: append(bytes),
        componentType: 5126,
        type,
        count,
        ...bounds,
      }) - 1
    )
  }
  if (kind !== 'empty') {
    const position = floats([-1, 0, 0, 1, 0, 0, 0, 1, 0], 'VEC3', 3, {
      min: [-1, 0, 0],
      max: [1, 1, 0],
    })
    const primitive = { attributes: { POSITION: position } }
    json.scenes[0].nodes.push(0)
    json.nodes = [{ mesh: 0, name: 'Triangle' }]
    json.meshes = [{ primitives: [primitive] }]
    if (kind === 'animated') {
      const input = floats([0, 1], 'SCALAR', 2, { min: [0], max: [1] })
      const output = floats([0, 0, 0, 2, 0, 0], 'VEC3', 2)
      json.animations = [
        {
          name: 'MoveX',
          samplers: [{ input, output, interpolation: 'LINEAR' }],
          channels: [{ sampler: 0, target: { node: 0, path: 'translation' } }],
        },
      ]
    }
    if (kind === 'textured') {
      primitive.attributes.TEXCOORD_0 = floats([0, 0, 1, 0, 0.5, 1], 'VEC2', 3)
      primitive.material = 0
      json.images = [{ bufferView: append(png), mimeType: 'image/png' }]
      json.textures = [{ source: 0 }]
      json.materials = [
        {
          pbrMetallicRoughness: {
            baseColorTexture: { index: 0 },
            metallicFactor: 0,
          },
        },
      ]
    }
  }
  if (parts.length) json.buffers = [{ byteLength }]
  const encoded = Buffer.from(JSON.stringify(json))
  const text = Buffer.alloc(Math.ceil(encoded.length / 4) * 4, 0x20)
  encoded.copy(text)
  const hasBin = parts.length > 0
  const glb = Buffer.alloc(20 + text.length + (hasBin ? 8 + byteLength : 0))
  glb.writeUInt32LE(0x46546c67, 0)
  glb.writeUInt32LE(2, 4)
  glb.writeUInt32LE(glb.length, 8)
  glb.writeUInt32LE(text.length, 12)
  glb.writeUInt32LE(0x4e4f534a, 16)
  text.copy(glb, 20)
  if (hasBin) {
    glb.writeUInt32LE(byteLength, 20 + text.length)
    glb.writeUInt32LE(0x004e4942, 24 + text.length)
    Buffer.concat(parts).copy(glb, 28 + text.length)
  }
  return glb
}

export const glbData = Object.fromEntries(
  ['static', 'animated', 'empty', 'textured'].map((kind) => [
    kind,
    makeGlb(kind).toString('base64'),
  ]),
)

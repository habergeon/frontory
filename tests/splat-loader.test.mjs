import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'
import * as THREE from 'three'

const source = readFileSync(new URL('../src/labs/19-gs-loading/example.js', import.meta.url), 'utf8')
const parserSource = source.slice(source.indexOf('function parseSplats('), source.indexOf('function addLoader('))
const context = { TextDecoder }
vm.runInNewContext(parserSource + '; this.parse = parseSplats', context)
const parse = (bytes, name) => context.parse(THREE, bytes, name)
function binary() {
  const buffer = new ArrayBuffer(32), view = new DataView(buffer)
  for (const offset of [12, 16, 20]) view.setFloat32(offset, 0.1, true)
  view.setUint8(24, 255); view.setUint8(27, 128)
  view.setUint8(28, 255)
  for (const offset of [29, 30, 31]) view.setUint8(offset, 128)
  return buffer
}
test('small splat parses position, anisotropic scale, color, opacity and normalized quaternion', () => {
  const data = parse(binary(), 'fixture.splat')
  assert.equal(data.length, 1)
  assert.equal(data[0].color[0], 1)
  assert.ok(Math.abs(data[0].opacity - 128 / 255) < 1e-6)
  assert.ok(Math.abs(data[0].quaternion.length() - 1) < 1e-6)
})
test('invalid length, count and non-finite Gaussian data are rejected', () => {
  assert.throws(() => parse(new ArrayBuffer(31), 'bad.splat'))
  assert.throws(() => parse(new ArrayBuffer(513 * 32), 'large.splat'))
  const buffer = binary(); new DataView(buffer).setFloat32(0, NaN, true)
  assert.throws(() => parse(buffer, 'nan.splat'))
})
test('ordinary PLY cannot be mistaken for a GS PLY', () => {
  const data = new TextEncoder().encode('ply\nformat ascii 1.0\nelement vertex 1\nproperty float x\nproperty float y\nproperty float z\nend_header\n0 0 0\n')
  assert.throws(() => parse(data.buffer, 'ordinary.ply'), /GS/)
})
test('ASCII GS PLY decodes log scales, opacity logits and SH DC', () => {
  const fields = ['x','y','z','scale_0','scale_1','scale_2','rot_0','rot_1','rot_2','rot_3','opacity','f_dc_0','f_dc_1','f_dc_2']
  const text = 'ply\nformat ascii 1.0\nelement vertex 1\n' + fields.map(key => 'property float ' + key).join('\n') + '\nend_header\n0 0 0 -2 -2 -2 1 0 0 0 0 0 0 0\n'
  const data = parse(new TextEncoder().encode(text).buffer, 'sample.ply')[0]
  assert.ok(Math.abs(data.scale.x - Math.exp(-2)) < 1e-6)
  assert.equal(data.opacity, 0.5)
  assert.equal(data.color[0], 0.5)
})

// 작은 실제 파일을 파싱하고 공분산을 CPU Canvas로 투영합니다. 정식 GPU GS 뷰어가 아닙니다.
export function mount({ locale = 'ko', THREE, OrbitControls, container }) {
  const messages =
    locale === 'en'
      ? {
          display001: 'Reset camera',
          display002:
            'This implementation: .splat / ASCII GS PLY, up to 512 splats. Binary PLY, SPZ, and higher-order SH are unsupported.',
          display003: 'Gaussian covariance projection scene',
          display004: 'Educational CPU Gaussian projection · ',
          display005: ' splats\nsorting ',
          display006: ' · DPR ',
          display007: ' · observed FPS ',
          display008: ' · draw ',
          display009:
            'ms\nThis is not the performance of an actual 3DGS GPU renderer.',
          display010: 'Invalid Gaussian value',
          display011: 'The rotation quaternion is 0',
          display012: '.splat length must be a multiple of 32 bytes',
          display013: 'The CPU teaching loader supports at most 512 splats',
          display014: 'Missing PLY header',
          display015:
            'The teaching loader supports only ASCII GS PLY. Binary PLY requires a dedicated renderer.',
          display016: 'The vertex count must be 1~512',
          display017: 'Vertex list properties are unsupported',
          display018:
            'This is an ordinary PLY without GS properties. Position alone cannot produce GS data.',
          display019: 'Insufficient PLY data rows',
          display020: 'PLY property count mismatch',
          display021: 'Choose a .splat or ASCII GS .ply file',
          display022: 'Choose a small GS file',
          display023: 'Locally generated example data · no server upload',
          display024: 'loading ',
          display025: 'Teaching files must be at most 1 MiB',
          display026: 'ready ',
          display027: ' · ',
          display028: ' bytes · ',
          display029: ' splats · SH DC only',
          display030: 'error: ',
        }
      : {
          display001: '카메라 reset',
          display002:
            '이 구현: .splat / ASCII GS PLY, 512개 이하. binary PLY·SPZ·고차 SH 미지원.',
          display003: 'Gaussian 공분산 투영 장면',
          display004: '교육용 CPU Gaussian 투영 · ',
          display005: ' splats\n정렬 ',
          display006: ' · DPR ',
          display007: ' · 관찰 FPS ',
          display008: ' · draw ',
          display009: 'ms\n실제 3DGS GPU 렌더러 성능이 아닙니다.',
          display010: '유효하지 않은 Gaussian 값',
          display011: '회전 quaternion이 0입니다',
          display012: '.splat 길이는 32 bytes의 배수여야 합니다',
          display013: 'CPU 학습용 로더는 최대 512 splats를 지원합니다',
          display014: 'PLY header 없음',
          display015:
            '학습용 로더는 ASCII GS PLY만 지원합니다. binary PLY는 전용 렌더러가 필요합니다.',
          display016: 'vertex 개수는 1~512여야 합니다',
          display017: 'vertex list 속성 미지원',
          display018:
            'GS 속성이 없는 일반 PLY입니다. position만으로 GS 데이터를 만들 수 없습니다.',
          display019: 'PLY 데이터 행 부족',
          display020: 'PLY 속성 개수 불일치',
          display021: '.splat 또는 ASCII GS .ply를 선택하세요',
          display022: '작은 GS 파일 선택',
          display023: '직접 생성한 예시 데이터 · 서버 업로드 없음',
          display024: 'loading ',
          display025: '학습용 파일은 1 MiB 이하',
          display026: 'ready ',
          display027: ' · ',
          display028: ' bytes · ',
          display029: ' splats · SH DC만 사용',
          display030: 'error: ',
        }
  const lab = splatLab(THREE, OrbitControls, container, messages)
  const releaseLoader = addLoader(THREE, lab, messages)
  lab.button(messages.display001, () => lab.controls.reset())
  const explain = document.createElement('p')
  explain.textContent = messages.display002
  lab.panel.append(explain)
  return () => {
    releaseLoader()
    lab.dispose()
  }
}

// 교육용 CPU 투영기: Σworld=R S² Rᵀ, Σscreen=J V Σworld Vᵀ Jᵀ.
// 실제 GPU tile rasterizer/고차 SH/LOD/GS picking은 구현하지 않습니다.
function splatLab(THREE, OrbitControls, container, messages, options = {}) {
  const canvas = document.createElement('canvas')
  canvas.setAttribute('aria-label', messages.display003)
  container.append(canvas)
  const ctx = canvas.getContext('2d'),
    camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
  camera.position.set(0, 0, 5)
  const controls = new OrbitControls(camera, canvas)
  controls.enableDamping = true
  controls.minDistance = 1.5
  controls.maxDistance = 12
  controls.saveState()
  const panel = document.createElement('div')
  panel.style.cssText =
    'position:absolute;top:8px;left:8px;right:8px;background:#ffffffdd;padding:8px;font:12px system-ui;max-height:45%;overflow:auto'
  const info = document.createElement('pre')
  info.style.whiteSpace = 'pre-wrap'
  panel.append(info)
  container.append(panel)
  let data = [],
    width = 1,
    height = 1,
    closed = false,
    frame = 0,
    last = 0,
    frames = 0,
    fps = 0,
    sort = true,
    dpr = 1,
    viewColor = false
  function generate(count = 80) {
    return Array.from({ length: count }, (_, i) => {
      const t = i * 2.399963,
        r = Math.sqrt(1 - Math.pow(1 - (2 * (i + 0.5)) / count, 2)),
        z = 1 - (2 * (i + 0.5)) / count
      return {
        center: new THREE.Vector3(Math.cos(t) * r, Math.sin(t) * r, z),
        scale: new THREE.Vector3(0.13, 0.06, 0.1),
        quaternion: new THREE.Quaternion().setFromAxisAngle(
          new THREE.Vector3(0, 0, 1),
          t,
        ),
        color: [0.2 + (0.7 * i) / count, 0.5, 1 - (0.6 * i) / count],
        opacity: 0.7,
      }
    })
  }
  function covariance(splat) {
    const rotation = new THREE.Matrix3().setFromMatrix4(
      new THREE.Matrix4().makeRotationFromQuaternion(splat.quaternion),
    )
    const scale = new THREE.Matrix3().set(
      splat.scale.x ** 2,
      0,
      0,
      0,
      splat.scale.y ** 2,
      0,
      0,
      0,
      splat.scale.z ** 2,
    )
    const view = new THREE.Matrix3().setFromMatrix4(camera.matrixWorldInverse)
    return view
      .clone()
      .multiply(rotation)
      .multiply(scale)
      .multiply(rotation.clone().transpose())
      .multiply(view.clone().transpose())
  }
  function draw(time) {
    if (closed) return
    const begin = performance.now()
    controls.update()
    camera.updateMatrixWorld(true)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.fillStyle = '#eaf0f5'
    ctx.fillRect(0, 0, width, height)
    const focal =
      height / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)))
    const projected = []
    for (const s of data) {
      const point = s.center.clone().applyMatrix4(camera.matrixWorldInverse),
        depth = -point.z
      if (depth <= camera.near || depth >= camera.far) continue
      const matrix = covariance(s).elements,
        jx = [focal / depth, 0, (focal * point.x) / (depth * depth)],
        jy = [0, -focal / depth, (-focal * point.y) / (depth * depth)]
      const project = (a, b) => {
        let sum = 0
        for (let r = 0; r < 3; r++)
          for (let c = 0; c < 3; c++) sum += a[r] * matrix[c * 3 + r] * b[c]
        return sum
      }
      const a = project(jx, jx) + 0.3,
        b = project(jx, jy),
        c = project(jy, jy) + 0.3
      const mid = (a + c) / 2,
        delta = Math.sqrt((a - c) ** 2 / 4 + b * b)
      projected.push({
        s,
        depth,
        x: width / 2 + (focal * point.x) / depth,
        y: height / 2 - (focal * point.y) / depth,
        rx: Math.sqrt(Math.max(0.1, mid + delta)),
        ry: Math.sqrt(Math.max(0.1, mid - delta)),
        angle: 0.5 * Math.atan2(2 * b, a - c),
      })
    }
    if (sort) projected.sort((a, b) => b.depth - a.depth)
    for (const p of projected) {
      if (
        p.x + 3 * p.rx < 0 ||
        p.x - 3 * p.rx > width ||
        p.y + 3 * p.rx < 0 ||
        p.y - 3 * p.rx > height
      )
        continue
      let color = p.s.color
      if (viewColor) {
        const direction = camera.position.clone().sub(p.s.center).normalize()
        color = [
          0.5 + 0.488603 * direction.x,
          0.5 + 0.488603 * direction.y,
          0.5 + 0.488603 * direction.z,
        ]
      }
      const rgb = color
        .map((v) => Math.round(Math.min(1, Math.max(0, v)) * 255))
        .join(',')
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.angle)
      ctx.scale(p.rx, p.ry)
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 3)
      for (let i = 0; i <= 12; i++) {
        const r = i / 4
        gradient.addColorStop(
          r / 3,
          'rgba(' + rgb + ',' + p.s.opacity * Math.exp(-0.5 * r * r) + ')',
        )
      }
      ctx.fillStyle = gradient
      ctx.fillRect(-3, -3, 6, 6)
      ctx.restore()
    }
    frames++
    if (time - last > 1000) {
      fps = (frames * 1000) / (time - last)
      last = time
      frames = 0
    }
    info.textContent =
      messages.display004 +
      data.length +
      messages.display005 +
      sort +
      messages.display006 +
      dpr +
      messages.display007 +
      fps.toFixed(1) +
      messages.display008 +
      (performance.now() - begin).toFixed(2) +
      messages.display009
    frame = requestAnimationFrame(draw)
  }
  const resize = () => {
    width = Math.max(1, container.clientWidth)
    height = Math.max(1, container.clientHeight)
    canvas.width = width * dpr
    canvas.height = height * dpr
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  }
  const observer = new ResizeObserver(resize)
  observer.observe(container)
  resize()
  data = generate()
  frame = requestAnimationFrame(draw)
  const button = (text, fn) => {
    const element = document.createElement('button')
    element.textContent = text
    element.onclick = fn
    panel.append(element)
    return element
  }
  return {
    camera,
    controls,
    panel,
    generate,
    button,
    get data() {
      return data
    },
    set data(value) {
      data = value
    },
    set sorted(value) {
      sort = value
    },
    set pixelRatio(value) {
      dpr = value
      resize()
    },
    set directionalColor(value) {
      viewColor = value
    },
    dispose() {
      closed = true
      cancelAnimationFrame(frame)
      observer.disconnect()
      controls.dispose()
      container.replaceChildren()
    },
  }
}

// 일반 .splat: float32 position(3), scale(3), uint8 RGBA(4), uint8 quaternion WXYZ(4), 32 bytes/행.
function parseSplats(THREE, buffer, name, messages) {
  const result = []
  function append(center, scale, quaternion, color, opacity, messages) {
    if (
      ![...center, ...scale, ...quaternion, ...color, opacity].every(
        Number.isFinite,
      ) ||
      scale.some((v) => v <= 0 || v > 100) ||
      center.some((v) => Math.abs(v) > 1e6)
    )
      throw new Error(messages.display010)
    const q = new THREE.Quaternion(
      quaternion[1],
      quaternion[2],
      quaternion[3],
      quaternion[0],
    )
    if (q.lengthSq() < 1e-8) throw new Error(messages.display011)
    q.normalize()
    result.push({
      center: new THREE.Vector3(...center),
      scale: new THREE.Vector3(...scale),
      quaternion: q,
      color,
      opacity: Math.max(0, Math.min(1, opacity)),
    })
  }
  if (name.toLowerCase().endsWith('.splat')) {
    if (!buffer.byteLength || buffer.byteLength % 32 !== 0)
      throw new Error(messages.display012)
    if (buffer.byteLength / 32 > 512) throw new Error(messages.display013)
    const view = new DataView(buffer)
    for (let o = 0; o < buffer.byteLength; o += 32)
      append(
        [0, 4, 8].map((i) => view.getFloat32(o + i, true)),
        [12, 16, 20].map((i) => view.getFloat32(o + i, true)),
        [28, 29, 30, 31].map((i) => (view.getUint8(o + i) - 128) / 128),
        [24, 25, 26].map((i) => view.getUint8(o + i) / 255),
        view.getUint8(o + 27) / 255,
        messages,
      )
  } else if (name.toLowerCase().endsWith('.ply')) {
    const text = new TextDecoder().decode(buffer),
      end = text.indexOf('end_header')
    if (end < 0 || !text.startsWith('ply')) throw new Error(messages.display014)
    const header = text.slice(0, end)
    if (!header.includes('format ascii 1.0'))
      throw new Error(messages.display015)
    const count = Number(header.match(/element vertex (\d+)/)?.[1])
    if (!count || count > 512) throw new Error(messages.display016)
    const props = []
    let inVertex = false
    for (const line of header.split(/\r?\n/)) {
      if (line.startsWith('element '))
        inVertex = line.startsWith('element vertex ')
      else if (inVertex && line.startsWith('property ')) {
        const parts = line.trim().split(/\s+/)
        if (parts[1] === 'list') throw new Error(messages.display017)
        props.push(parts[2])
      }
    }
    const required = [
      'x',
      'y',
      'z',
      'scale_0',
      'scale_1',
      'scale_2',
      'rot_0',
      'rot_1',
      'rot_2',
      'rot_3',
      'opacity',
      'f_dc_0',
      'f_dc_1',
      'f_dc_2',
    ]
    if (!required.every((key) => props.includes(key)))
      throw new Error(messages.display018)
    const rows = text
      .slice(end + 'end_header'.length)
      .trim()
      .split(/\r?\n/)
    if (rows.length < count) throw new Error(messages.display019)
    for (const line of rows.slice(0, count)) {
      const values = line.trim().split(/\s+/).map(Number)
      if (values.length !== props.length) throw new Error(messages.display020)
      const v = (key) => values[props.indexOf(key)]
      append(
        ['x', 'y', 'z'].map(v),
        [0, 1, 2].map((i) => Math.exp(v('scale_' + i))),
        [0, 1, 2, 3].map((i) => v('rot_' + i)),
        [0, 1, 2].map((i) => 0.5 + 0.2820947918 * v('f_dc_' + i)),
        1 / (1 + Math.exp(-v('opacity'))),
        messages,
      )
    }
  } else throw new Error(messages.display021)
  return result
}
function addLoader(THREE, lab, messages) {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.splat,.ply'
  input.setAttribute('aria-label', messages.display022)
  const status = document.createElement('p')
  status.textContent = messages.display023
  let request = 0,
    closed = false
  const read = async () => {
    const file = input.files?.[0]
    if (!file) return
    const current = ++request
    status.textContent = messages.display024 + file.name
    try {
      if (file.size > 1024 * 1024) throw new Error(messages.display025)
      const buffer = await file.arrayBuffer()
      if (closed || current !== request) return
      const data = parseSplats(THREE, buffer, file.name, messages)
      lab.data = data
      const center = data
        .reduce((sum, s) => sum.add(s.center), new THREE.Vector3())
        .divideScalar(data.length)
      lab.controls.target.copy(center)
      lab.camera.position.copy(center).add(new THREE.Vector3(0, 0, 5))
      lab.controls.update()
      lab.controls.saveState()
      status.textContent =
        messages.display026 +
        file.name +
        messages.display027 +
        file.size +
        messages.display028 +
        data.length +
        messages.display029
    } catch (error) {
      if (!closed && current === request)
        status.textContent = messages.display030 + error.message
    }
  }
  input.addEventListener('change', read)
  lab.panel.append(input, status)
  return () => {
    closed = true
    request++
    input.removeEventListener('change', read)
  }
}

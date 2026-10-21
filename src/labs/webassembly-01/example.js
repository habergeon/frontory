// WebAssembly.Memory의 실제 선형 메모리를 서로 다른 TypedArray로 관찰합니다.
// 이 예제는 모듈 컴파일을 수행하지 않으므로 기존 CSP를 완화하지 않습니다.
export function mount({ container }) {
  const memory = new WebAssembly.Memory({ initial: 1, maximum: 2 })
  const bytes = new Uint8Array(memory.buffer)
  const ints = new Uint32Array(memory.buffer)
  ints[0] = 0x12345678
  const output = document.createElement('pre')
  output.textContent = '1 page = ' + memory.buffer.byteLength + ' bytes\nUint32: 0x' + ints[0].toString(16) + '\nUint8: ' + Array.from(bytes.slice(0,4)).map(v => v.toString(16)).join(' ') + '\n같은 buffer를 다른 크기의 view로 읽었습니다. 값을 바꾸어 byte order를 관찰하세요.'
  container.append(output)
  return () => container.replaceChildren()
}

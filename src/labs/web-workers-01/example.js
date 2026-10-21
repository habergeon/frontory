// LIMIT을 바꾸고 계산 중에도 버튼에 포커스가 이동하는지 관찰하세요.
export function mount({ container }) {
  const LIMIT = 1000000
  const output = document.createElement('pre')
  const button = document.createElement('button'); button.textContent = 'Worker 합계 계산'
  container.append(button, output)
  const workerCode = `self.onmessage = event => { const start = performance.now(); let sum = 0; for (let i=0;i<=event.data;i++) sum += i; self.postMessage({sum, milliseconds: performance.now()-start}); }`
  const url = URL.createObjectURL(new Blob([workerCode], { type: 'text/javascript' }))
  const worker = new Worker(url)
  worker.onmessage = event => { output.textContent = JSON.stringify(event.data, null, 2) + '\n계산 시간만 표시하며 메시지 왕복 비용은 포함하지 않습니다.' }
  worker.onerror = event => { output.textContent = 'Worker 실행 실패: ' + event.message }
  const click = () => { output.textContent = '계산 요청 중'; worker.postMessage(LIMIT) }
  button.addEventListener('click', click); click()
  return () => { worker.terminate(); URL.revokeObjectURL(url); button.removeEventListener('click', click); container.replaceChildren() }
}

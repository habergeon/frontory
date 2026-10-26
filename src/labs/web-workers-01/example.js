// LIMIT을 바꾸고 계산 중에도 버튼에 포커스가 이동하는지 관찰하세요.
export function mount({ locale = 'ko', container }) {
  const messages =
    locale === 'en'
      ? {
          display001: 'Worker sum calculation',
          display002:
            '\nOnly computation time is shown; message round-trip cost is excluded.',
          display003: 'Worker execution failed: ',
          display004: 'Computation requested',
        }
      : {
          display001: 'Worker 합계 계산',
          display002:
            '\n계산 시간만 표시하며 메시지 왕복 비용은 포함하지 않습니다.',
          display003: 'Worker 실행 실패: ',
          display004: '계산 요청 중',
        }
  const LIMIT = 1000000
  const output = document.createElement('pre')
  const button = document.createElement('button')
  button.textContent = messages.display001
  container.append(button, output)
  const workerCode = `self.onmessage = event => { const start = performance.now(); let sum = 0; for (let i=0;i<=event.data;i++) sum += i; self.postMessage({sum, milliseconds: performance.now()-start}); }`
  const url = URL.createObjectURL(
    new Blob([workerCode], { type: 'text/javascript' }),
  )
  const worker = new Worker(url)
  worker.onmessage = (event) => {
    output.textContent =
      JSON.stringify(event.data, null, 2) + messages.display002
  }
  worker.onerror = (event) => {
    output.textContent = messages.display003 + event.message
  }
  const click = () => {
    output.textContent = messages.display004
    worker.postMessage(LIMIT)
  }
  button.addEventListener('click', click)
  click()
  return () => {
    worker.terminate()
    URL.revokeObjectURL(url)
    button.removeEventListener('click', click)
    container.replaceChildren()
  }
}

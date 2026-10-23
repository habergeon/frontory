// JSDoc types are checked in JavaScript too. In TS mode, try replacing them with type declarations.
/** @typedef {{ kind: 'ok', value: number } | { kind: 'error', message: string }} Result */
export function mount({ container ,locale='ko'}) {
const messages=locale==='en'?{"display001":"Narrowed number × 2 = ","display002":"Enter a finite number.","display003":"Value to check"}:{"display001":"좁힌 number × 2 = ","display002":"유한한 숫자를 입력하세요.","display003":"검사할 값"};
  /** @param {string} text @returns {Result} */
  const parse = text => Number.isFinite(Number(text)) && text.trim() !== ''
    ? { kind: 'ok', value: Number(text) } : { kind: 'error', message: messages.display002 }
  const input = document.createElement('input')
  input.setAttribute('aria-label', messages.display003)
  input.value = '42'
  const output = document.createElement('pre')
  const render = () => {
    const result = parse(input.value)
    output.textContent = result.kind === 'ok' ? messages.display001 + result.value * 2 : result.message
  }
  input.addEventListener('input', render)
  container.append(input, output)
  render()
  return () => { input.removeEventListener('input', render); container.replaceChildren() }
}

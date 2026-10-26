// Accessible Names and Descriptions: actual HTML/CSS experiment
export function mount({ container, locale = 'ko' }) {
  const messages =
    locale === 'en'
      ? {
          title: 'Accessible Names and Descriptions',
          note: 'Change aria-label to differ from the visible text, and inspect the actual computed name in the browser accessibility panel. Inside Shadow DOM, body/html/:root selectors become .doc. @media responds to the outer preview viewport. The width slider changes only the container width. Network access, form navigation, and iframes are restricted.',
          display003: 'Element to run in an external environment: ',
          display004: 'Inspect current DOM / styles',
          display005: 'Maximum 40 characters.',
          display006: 'HTML source',
          display007: 'CSS source',
          display008: 'Container width',
          display009: 'Delete note',
          display010: 'Note title',
          display011: 'Apply',
          display012: 'Save',
        }
      : {
          title: '접근성 이름과 설명',
          note: 'aria-label을 보이는 텍스트와 다르게 바꾸고 브라우저 접근성 패널에서 실제 계산된 이름을 검사하세요. Shadow DOM에서 body/html/:root를 .doc로 옮깁니다. @media는 바깥 미리보기 viewport에 반응합니다. 폭 슬라이더는 컨테이너 폭만 변경합니다. 네트워크·폼 이동·iframe은 제한됩니다.',
          display003: '외부 환경에서 실행할 요소: ',
          display004: '현재 DOM / 스타일 검사',
          display005: '최대 40자입니다.',
          display006: 'HTML 소스',
          display007: 'CSS 소스',
          display008: '컨테이너 폭',
          display009: '메모 삭제',
          display010: '기록 제목',
          display011: '적용',
          display012: '저장',
        }
  const HTML =
      '<button>' +
      messages.display012 +
      '</button><button aria-label="' +
      messages.display009 +
      '">×</button><label for="name">' +
      messages.display010 +
      '</label><input id="name" aria-describedby="hint"><p id="hint">' +
      messages.display005 +
      '</p>',
    CSS = ''
  const originalRootSize = document.documentElement.style.fontSize
  const controller = new AbortController(),
    signal = controller.signal
  const heading = document.createElement('h2')
  heading.textContent = messages.title
  const note = document.createElement('p')
  note.textContent = messages.note
  const html = document.createElement('textarea'),
    css = document.createElement('textarea')
  html.value = HTML
  css.value = CSS
  for (const field of [html, css]) {
    field.setAttribute(
      'aria-label',
      field === html ? messages.display006 : messages.display007,
    )
    field.rows = 6
    field.style.cssText = 'display:block;width:100%;font-family:monospace'
  }
  const apply = document.createElement('button')
  apply.textContent = messages.display011
  const inspect = document.createElement('button')
  inspect.textContent = messages.display004
  const width = document.createElement('input')
  width.type = 'range'
  width.min = '280'
  width.max = '1200'
  width.value = '700'
  width.setAttribute('aria-label', messages.display008)
  const host = document.createElement('section')
  host.style.cssText =
    'display:block;background:white;border:1px solid #9ab;max-width:100%;max-height:450px;overflow:auto'
  const shadow = host.attachShadow({ mode: 'open' })
  const output = document.createElement('pre')
  output.style.whiteSpace = 'pre-wrap'
  output.setAttribute('aria-live', 'polite')
  let sourceDocument
  const measure = () => {
    const root = shadow.querySelector('.doc')
    if (!root) return
    const nodes = [
      ...root.querySelectorAll('.card,.child,button,img,input,article,p'),
    ].slice(0, 18)
    output.textContent = JSON.stringify(
      {
        title: sourceDocument.title,
        lang: sourceDocument.documentElement.lang,
        containerWidth: host.clientWidth,
        viewportWidth: innerWidth,
        scrollWidth: root.scrollWidth,
        forms: [...root.querySelectorAll('form')].map((form) => ({
          valid: form.checkValidity(),
          entries: [...new FormData(form)],
        })),
        links: [...root.querySelectorAll('a')]
          .slice(0, 8)
          .map((a) => ({ text: a.textContent, href: a.getAttribute('href') })),
        nodes: nodes.map((node) => {
          const s = getComputedStyle(node)
          return {
            tag: node.tagName,
            width: Math.round(node.getBoundingClientRect().width),
            color: s.color,
            background: s.backgroundColor,
            display: s.display,
            boxSizing: s.boxSizing,
            grid: s.gridTemplateColumns,
            transform: s.transform,
            currentSrc:
              node instanceof HTMLImageElement ? node.currentSrc : undefined,
          }
        }),
        repairedBody: root.innerHTML.slice(0, 1800),
      },
      null,
      2,
    )
  }
  const render = () => {
    if (false) {
      const font = css.value.match(/font-size:[ ]*([0-9.]+px)/)
      if (font) document.documentElement.style.fontSize = font[1]
    }
    sourceDocument = new DOMParser().parseFromString(html.value, 'text/html')
    const style = document.createElement('style')
    style.textContent =
      '.doc{font-family:system-ui;color:#172c43;padding:16px}' +
      css.value.replace(/:root|\bbody\b|\bhtml\b/g, '.doc')
    const root = document.createElement('div')
    root.className = 'doc'
    root.lang = sourceDocument.documentElement.lang
    root.innerHTML = sourceDocument.body.innerHTML
    root.querySelectorAll('script,iframe').forEach((node) => {
      const text = document.createElement('pre')
      text.textContent = messages.display003 + node.outerHTML
      node.replaceWith(text)
    })
    shadow.replaceChildren(style, root)
    host.style.width = width.value + 'px'
    root.querySelectorAll('form').forEach((form) =>
      form.addEventListener(
        'submit',
        (event) => {
          event.preventDefault()
          const dialog = form.closest('dialog')
          if (form.getAttribute('method') === 'dialog') dialog?.close()
          measure()
        },
        { signal },
      ),
    )
    root.querySelectorAll('a[href^="#"]').forEach((a) =>
      a.addEventListener(
        'click',
        (event) => {
          event.preventDefault()
          const id = a.getAttribute('href').slice(1)
          const target = [...root.querySelectorAll('[id]')].find(
            (node) => node.id === id,
          )
          target?.scrollIntoView()
          if (target instanceof HTMLElement) target.focus()
        },
        { signal },
      ),
    )
    const opener = root.querySelector('[data-open-dialog]'),
      dialog = root.querySelector('dialog')
    opener?.addEventListener('click', () => dialog?.showModal(), { signal })
    const template = root.querySelector('template'),
      target = root.querySelector('[data-cards]')
    if (template && target) {
      for (let i = 0; i < 3; i++) {
        const fragment = /** @type {DocumentFragment} */ (
          template.content.cloneNode(true)
        )
        const input = fragment.querySelector('input'),
          label = fragment.querySelector('label')
        if (input) input.id = 'title-' + i
        if (label) label.htmlFor = 'title-' + i
        target.append(fragment)
      }
    }
    measure()
  }
  apply.addEventListener('click', render, { signal })
  inspect.addEventListener('click', measure, { signal })
  width.addEventListener(
    'input',
    () => {
      host.style.width = width.value + 'px'
      measure()
    },
    { signal },
  )
  container.append(
    heading,
    note,
    html,
    css,
    apply,
    inspect,
    width,
    host,
    output,
  )
  render()
  return () => {
    controller.abort()
    document.documentElement.style.fontSize = originalRootSize
    shadow.replaceChildren()
    container.replaceChildren()
  }
}

// 반응형 이미지 선택: 실제 HTML/CSS 실험
export function mount({ container, locale = 'ko' }) {
  const messages =
    locale === 'en'
      ? {
          title: 'Responsive Image Selection',
          note: '300/600/1200w SVG candidates are selected through actual srcset behavior. sizes, DPR, and the preview viewport affect selection. The data URLs are not for comparing network transfer sizes. Inside Shadow DOM, body/html/:root selectors become .doc. @media responds to the outer preview viewport. The width slider changes only the container width. Network access, form navigation, and iframes are restricted.',
          display003: 'Check currentSrc in the inspection results.',
          display004: 'Element to run in an external environment: ',
          display005: 'Inspect current DOM / styles',
          display006: 'Width and color of the selected candidate',
          display007: 'HTML source',
          display008: 'CSS source',
          display009: 'Container width',
          display010: 'Apply',
        }
      : {
          title: '반응형 이미지 선택',
          note: '300/600/1200w SVG 후보가 실제 srcset으로 선택됩니다. sizes와 DPR 및 미리보기 viewport가 선택에 영향을 줍니다. data URL은 네트워크 전송량 비교용이 아닙니다. Shadow DOM에서 body/html/:root를 .doc로 옮깁니다. @media는 바깥 미리보기 viewport에 반응합니다. 폭 슬라이더는 컨테이너 폭만 변경합니다. 네트워크·폼 이동·iframe은 제한됩니다.',
          display003: '검사에서 currentSrc를 확인하세요.',
          display004: '외부 환경에서 실행할 요소: ',
          display005: '현재 DOM / 스타일 검사',
          display006: '선택된 후보의 너비와 색',
          display007: 'HTML 소스',
          display008: 'CSS 소스',
          display009: '컨테이너 폭',
          display010: '적용',
        }
  const HTML =
      '<img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22600%22%20height%3D%22300%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22steelblue%22%2F%3E%3Ctext%20x%3D%2220%22%20y%3D%2260%22%20font-size%3D%2240%22%20fill%3D%22white%22%3E600w%3C%2Ftext%3E%3C%2Fsvg%3E" srcset="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22300%22%20height%3D%22150%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22coral%22%2F%3E%3Ctext%20x%3D%2220%22%20y%3D%2260%22%20font-size%3D%2240%22%20fill%3D%22white%22%3E300w%3C%2Ftext%3E%3C%2Fsvg%3E 300w, data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22600%22%20height%3D%22300%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22steelblue%22%2F%3E%3Ctext%20x%3D%2220%22%20y%3D%2260%22%20font-size%3D%2240%22%20fill%3D%22white%22%3E600w%3C%2Ftext%3E%3C%2Fsvg%3E 600w, data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221200%22%20height%3D%22600%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22seagreen%22%2F%3E%3Ctext%20x%3D%2220%22%20y%3D%2260%22%20font-size%3D%2240%22%20fill%3D%22white%22%3E1200w%3C%2Ftext%3E%3C%2Fsvg%3E 1200w" sizes="(max-width:600px) 100vw, 600px" width="600" height="300" alt="' +
      messages.display006 +
      '"><p>' +
      messages.display003 +
      '</p>',
    CSS = 'img{max-width:100%;height:auto}'
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
      field === html ? messages.display007 : messages.display008,
    )
    field.rows = 6
    field.style.cssText = 'display:block;width:100%;font-family:monospace'
  }
  const apply = document.createElement('button')
  apply.textContent = messages.display010
  const inspect = document.createElement('button')
  inspect.textContent = messages.display005
  const width = document.createElement('input')
  width.type = 'range'
  width.min = '280'
  width.max = '1200'
  width.value = '700'
  width.setAttribute('aria-label', messages.display009)
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
      text.textContent = messages.display004 + node.outerHTML
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

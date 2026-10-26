// template과 반복 콘텐츠: 실제 HTML/CSS 실험
export function mount({ container, locale = 'ko' }) {
  const messages =
    locale === 'en'
      ? {
          title: 'template and Repeated Content',
          note: 'Helper code clones the template 3 times and associates for/id with unique suffixes. Try changing the template content in the source. Inside Shadow DOM, body/html/:root selectors become .doc. @media responds to the outer preview viewport. The width slider changes only the container width. Network access, form navigation, and iframes are restricted.',
          display003: 'Element to run in an external environment: ',
          display004: 'Inspect current DOM / styles',
          display005: 'HTML source',
          display006: 'CSS source',
          display007: 'Container width',
          display008: 'Apply',
          display009: 'Title',
        }
      : {
          title: 'template과 반복 콘텐츠',
          note: '보조 코드가 template을 3회 복제하고 for/id를 고유 접미사로 연결합니다. 소스의 template 내용을 바꿔보세요. Shadow DOM에서 body/html/:root를 .doc로 옮깁니다. @media는 바깥 미리보기 viewport에 반응합니다. 폭 슬라이더는 컨테이너 폭만 변경합니다. 네트워크·폼 이동·iframe은 제한됩니다.',
          display003: '외부 환경에서 실행할 요소: ',
          display004: '현재 DOM / 스타일 검사',
          display005: 'HTML 소스',
          display006: 'CSS 소스',
          display007: '컨테이너 폭',
          display008: '적용',
          display009: '제목',
        }
  const HTML =
      '<body><template id="card"><article><label for="title">' +
      messages.display009 +
      '</label><input id="title" value="메모"></article></template><section data-cards></section></body>',
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
      field === html ? messages.display005 : messages.display006,
    )
    field.rows = 6
    field.style.cssText = 'display:block;width:100%;font-family:monospace'
  }
  const apply = document.createElement('button')
  apply.textContent = messages.display008
  const inspect = document.createElement('button')
  inspect.textContent = messages.display004
  const width = document.createElement('input')
  width.type = 'range'
  width.min = '280'
  width.max = '1200'
  width.value = '700'
  width.setAttribute('aria-label', messages.display007)
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

export function mount({ container, locale = 'ko' }) {
  const messages =
    locale === 'en'
      ? {
          display001:
            'At a container width of 560px or below, the layout becomes a single column. Use Tab to navigate the card buttons. The OS reduced-motion setting always takes priority.',
          display002:
            'DOM order and focus order remain the same at different widths.',
          display003: 'Also apply reduced motion',
          display004: ' OS reduced motion: ',
          display005: 'Width and motion preferences',
          display006: ' · actual width ',
          display007: 'Content width ',
          display008: ' selected',
          display009: 'Notes',
          display010: 'Read',
          display011: 'Experiment',
          display012: 'On',
          display013: 'Off',
        }
      : {
          display001:
            '컨테이너 폭 560px 이하에서 단일 열로 바뀝니다. Tab으로 카드 버튼을 이동하세요. OS 모션 감소 설정은 항상 우선합니다.',
          display002: 'DOM 순서와 포커스는 폭이 달라도 같습니다.',
          display003: '모션 감소를 추가 적용',
          display004: ' OS 모션 감소: ',
          display005: '폭과 모션 선호도',
          display006: ' · 실제 폭 ',
          display007: '콘텐츠 폭 ',
          display008: ' 선택',
          display009: '기록',
          display010: '읽기',
          display011: '실험',
          display012: '켜짐',
          display013: '꺼짐',
        }
  container.innerHTML = `<style>
    .responsive-demo{container-type:inline-size;max-width:100%;border:1px solid #64748b;padding:12px;box-sizing:border-box}
    .responsive-cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
    .responsive-cards article{padding:16px;background:#172554;color:#eff6ff;border-radius:8px;transition:transform 400ms}
    .responsive-cards article:focus-within{transform:translateY(-6px)}
    @container(max-width:560px){.responsive-cards{grid-template-columns:1fr}}
    @media(prefers-reduced-motion:reduce){.responsive-cards article{transition:none;transform:none!important}}
    .reduce .responsive-cards article{transition:none;transform:none}
    .responsive-cards button:focus-visible{outline:3px solid #facc15;outline-offset:4px}
    </style><h2>${messages.display005}</h2><label>${messages.display007}<input id="width" type="range" min="280" max="960" value="760"></label>
    <label><input id="reduce" type="checkbox">${messages.display003}</label><output></output>
    <p>${messages.display001}</p>
    <section class="responsive-demo"><div class="responsive-cards">${[messages.display010, messages.display011, messages.display009].map((title, i) => `<article><h3>${i + 1}. ${title}</h3><p>${messages.display002}</p><button>${title}${messages.display008}</button></article>`).join('')}</div></section>`
  const events = new AbortController(),
    panel = container.querySelector('section'),
    output = container.querySelector('output')
  const media = matchMedia('(prefers-reduced-motion: reduce)')
  function update() {
    panel.style.width = container.querySelector('#width').value + 'px'
    panel.classList.toggle('reduce', container.querySelector('#reduce').checked)
    output.textContent = `${messages.display004}${media.matches ? messages.display012 : messages.display013}${messages.display006}${Math.round(panel.getBoundingClientRect().width)}px`
  }
  container.addEventListener('input', update, { signal: events.signal })
  media.addEventListener('change', update, { signal: events.signal })
  const resize = new ResizeObserver(update)
  resize.observe(panel)
  update()
  return () => {
    events.abort()
    resize.disconnect()
    container.replaceChildren()
  }
}

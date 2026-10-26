export function mount({ container, locale = 'ko' }) {
  const messages =
    locale === 'en'
      ? {
          display001:
            'Compare two recordings in DevTools Performance with the same element count and speed. This example does not generate a performance score.',
          display002: 'Shared color and spacing tokens',
          display003: 'Tokens and Rendering Observations',
          display004: 'Transition ms ',
          display005: 'Element count ',
          display006: 'Toggle theme',
          display007: 'Run transition',
          display008: ' elements / ',
          display009: 'Method ',
        }
      : {
          display001:
            'DevTools Performance에서 같은 요소 수·속도로 두 기록을 비교하세요. 이 예제는 성능 점수를 생성하지 않습니다.',
          display002: '공유 색상·간격 토큰',
          display003: '토큰과 렌더링 관찰',
          display004: '전환 ms ',
          display005: '요소 수 ',
          display006: '테마 전환',
          display007: '전환 실행',
          display008: '개 / ',
          display009: '방식 ',
        }
  container.innerHTML = `<style>
    .token-lab{--ink:#f8fafc;--surface:#172554;--accent:#67e8f9;--gap:8px;--speed:900ms;color:var(--ink);background:var(--surface);padding:16px}
    .token-lab.light{--ink:#172554;--surface:#ecfeff;--accent:#0e7490;--gap:14px}
    .token-rows{display:grid;gap:var(--gap)}.token-row{height:10px;background:var(--accent);width:35%;transform-origin:left}
    .token-lab.width .token-row{transition:width var(--speed)}.token-lab.width.expanded .token-row{width:90%}
    .token-lab.transform .token-row{transition:transform var(--speed)}.token-lab.transform.expanded .token-row{transform:scaleX(2.57)}
    @media(prefers-reduced-motion:reduce){.token-row{transition:none!important}}
    </style><h2>${messages.display003}</h2><label>${messages.display009}<select id="mode"><option>width</option><option>transform</option></select></label>
    <label>${messages.display005}<input id="count" type="range" min="10" max="150" value="35"></label><label>${messages.display004}<input id="speed" type="number" min="100" max="3000" value="900"></label>
    <button id="theme">${messages.display006}</button><button id="run">${messages.display007}</button><p>${messages.display001}</p>
    <section class="token-lab width"><p>${messages.display002}</p><div class="token-rows"></div></section><output></output>`
  const panel = container.querySelector('section'),
    rows = container.querySelector('.token-rows'),
    events = new AbortController()
  function configure() {
    panel.classList.remove('width', 'transform', 'expanded')
    panel.classList.add(container.querySelector('#mode').value)
    const count = Number(container.querySelector('#count').value),
      speed = Math.max(
        100,
        Math.min(3000, Number(container.querySelector('#speed').value) || 900),
      )
    panel.style.setProperty('--speed', speed + 'ms')
    rows.replaceChildren()
    for (let i = 0; i < count; i++) {
      const row = document.createElement('div')
      row.className = 'token-row'
      rows.append(row)
    }
    container.querySelector('output').textContent =
      `${count}${messages.display008}${speed}ms / ${container.querySelector('#mode').value}`
  }
  container.addEventListener('input', configure, { signal: events.signal })
  container
    .querySelector('#theme')
    .addEventListener('click', () => panel.classList.toggle('light'), {
      signal: events.signal,
    })
  container
    .querySelector('#run')
    .addEventListener('click', () => panel.classList.toggle('expanded'), {
      signal: events.signal,
    })
  configure()
  return () => {
    events.abort()
    container.replaceChildren()
  }
}

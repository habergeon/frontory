export function mount({ container }) {
  container.innerHTML = `<style>
    .responsive-demo{container-type:inline-size;max-width:100%;border:1px solid #64748b;padding:12px;box-sizing:border-box}
    .responsive-cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
    .responsive-cards article{padding:16px;background:#172554;color:#eff6ff;border-radius:8px;transition:transform 400ms}
    .responsive-cards article:focus-within{transform:translateY(-6px)}
    @container(max-width:560px){.responsive-cards{grid-template-columns:1fr}}
    @media(prefers-reduced-motion:reduce){.responsive-cards article{transition:none;transform:none!important}}
    .reduce .responsive-cards article{transition:none;transform:none}
    .responsive-cards button:focus-visible{outline:3px solid #facc15;outline-offset:4px}
    </style><h2>폭과 모션 선호도</h2><label>콘텐츠 폭 <input id="width" type="range" min="280" max="960" value="760"></label>
    <label><input id="reduce" type="checkbox">모션 감소를 추가 적용</label><output></output>
    <p>컨테이너 폭 560px 아래에서 단일 열로 바뀝니다. Tab으로 카드 버튼을 이동하세요. OS 모션 감소 설정은 항상 우선합니다.</p>
    <section class="responsive-demo"><div class="responsive-cards">${['읽기','실험','기록'].map((title,i) => `<article><h3>${i+1}. ${title}</h3><p>DOM 순서와 포커스는 폭이 달라도 같습니다.</p><button>${title} 선택</button></article>`).join('')}</div></section>`
  const events = new AbortController(), panel = container.querySelector('section'), output = container.querySelector('output')
  const media = matchMedia('(prefers-reduced-motion: reduce)')
  function update() {
    panel.style.width = container.querySelector('#width').value + 'px'
    panel.classList.toggle('reduce', container.querySelector('#reduce').checked)
    output.textContent = ` OS 모션 감소: ${media.matches ? '켜짐' : '꺼짐'} · 실제 폭 ${Math.round(panel.getBoundingClientRect().width)}px`
  }
  container.addEventListener('input', update, { signal: events.signal }); media.addEventListener('change', update, { signal: events.signal })
  const resize = new ResizeObserver(update); resize.observe(panel); update()
  return () => { events.abort(); resize.disconnect(); container.replaceChildren() }
}

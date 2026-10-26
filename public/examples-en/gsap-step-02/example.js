// gsap-step-02: Starting and target values
export function mount({
  locale = 'ko',
  container,
  gsap,
  animate,
  React,
  createRoot,
  Motion,
  ScrollTrigger,
}) {
  const messages =
    locale === 'en'
      ? {
          markup:
            '<h3>Starting and target values</h3><p>from and to / initial rendering</p><button>Run experiment</button> <output aria-live="polite"></output><div class="stage" style="position:relative;min-height:180px;margin-top:16px;background:#edf3fa;padding:14px;overflow:hidden"></div>',
          result:
            'fromTo supplies both endpoints; initial styles stay unchanged until Run',
        }
      : {
          markup:
            '<h3>시작값과 목표값</h3><p>from과 to / 초기 적용</p><button>실험 실행</button> <output aria-live="polite"></output><div class="stage" style="position:relative;min-height:180px;margin-top:16px;background:#edf3fa;padding:14px;overflow:hidden"></div>',
          result:
            'fromTo는 시작값과 목표값을 모두 지정합니다. 실행 전에는 초기 스타일을 유지합니다.',
        }

  const root = document.createElement('section')
  root.style.cssText = 'padding:18px;font:14px system-ui;color:#172b46'
  container.append(root)
  root.innerHTML = messages.markup
  const button = root.querySelector('button'),
    out = root.querySelector('output'),
    stage = /** @type {HTMLDivElement} */ (root.querySelector('.stage'))
  let dead = false
  const stops = []
  const box = document.createElement('div')
  box.textContent = 'GSAP'
  box.style.cssText =
    'width:64px;height:48px;background:#76d3de;display:grid;place-items:center'
  stage.append(box)
  stops.push(() => gsap.killTweensOf(box))
  let reverse = false
  button.onclick = () => {
    gsap.killTweensOf(box)
    reverse = !reverse
    gsap.fromTo(
      box,
      { x: reverse ? 240 : 0, opacity: 0.2 },
      { x: reverse ? 0 : 240, opacity: 1, duration: 1, immediateRender: false },
    )
    out.textContent = messages.result
  }
  return () => {
    dead = true
    stops.reverse().forEach((fn) => fn())
    root.remove()
  }
}

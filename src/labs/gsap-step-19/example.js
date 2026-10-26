// gsap-step-19: 모션 감소 대체
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
          display001:
            '<h3>Reduced-Motion Alternatives</h3><p>User Preference / Immediate State</p><button>Run experiment</button> <output aria-live="polite"></output><div class="stage" style="position:relative;min-height:180px;margin-top:16px;background:#edf3fa;padding:14px;overflow:hidden"></div>',
          display002: 'GSAP',
          display003: 'Content arrives with ',
          display004: 'zero',
          display005: 'animated',
          display006: ' duration',
        }
      : {
          display001:
            '<h3>모션 감소 대체</h3><p>사용자 선호 / 즉시 상태</p><button>Run experiment</button> <output aria-live="polite"></output><div class="stage" style="position:relative;min-height:180px;margin-top:16px;background:#edf3fa;padding:14px;overflow:hidden"></div>',
          display002: 'GSAP',
          display003: 'Content arrives with ',
          display004: 'zero',
          display005: 'animated',
          display006: ' duration',
        }
  const root = document.createElement('section')
  root.style.cssText = 'padding:18px;font:14px system-ui;color:#172b46'
  container.append(root)
  root.innerHTML = messages.display001
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
  const mq = matchMedia('(prefers-reduced-motion: reduce)')
  button.onclick = () => {
    gsap.to(box, { x: 200, duration: mq.matches ? 0 : 1 })
    out.textContent =
      'Content arrives with ' + (mq.matches ? 'zero' : 'animated') + ' duration'
  }
  return () => {
    dead = true
    stops.reverse().forEach((fn) => fn())
    root.remove()
  }
}

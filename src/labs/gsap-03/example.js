// Inputs remain enabled. New transitions kill old tweens and target the latest state.
export function mount({ locale = 'ko', gsap, container }) {
  const messages =
    locale === 'en'
      ? {
          display001:
            '<p>Use buttons or Left/Right arrows. Try rapid repeated input.</p><button>Previous</button> <button>Next</button> <label>Duration <input type="range" min="0.1" max="1.2" step=".1" value=".4"></label><article style="margin:28px 12px;padding:28px;background:#edf2f7;border-radius:14px"><h2></h2><p></p></article><output role="status"></output>',
          display002: '. ',
          display003: 'reduced motion',
          display004: 'motion enabled',
          display005: 'Step ',
          display006: '/4 · ',
          display007: ' inputs · ',
          displayFix1001: 'Observe',
          displayFix1002: 'Describe what changes before adjusting a variable.',
          displayFix1003: 'Predict',
          displayFix1004:
            'Write one expected outcome and keep other conditions fixed.',
          displayFix1005: 'Experiment',
          displayFix1006: 'Change one variable and record the actual result.',
          displayFix1007: 'Explain',
          displayFix1008: 'Compare the result with the prediction.',
        }
      : {
          display001:
            '<p>Use buttons or Left/Right arrows. Try rapid repeated input.</p><button>Previous</button> <button>Next</button> <label>Duration <input type="range" min="0.1" max="1.2" step=".1" value=".4"></label><article style="margin:28px 12px;padding:28px;background:#edf2f7;border-radius:14px"><h2></h2><p></p></article><output role="status"></output>',
          display002: '. ',
          display003: 'reduced motion',
          display004: 'motion enabled',
          display005: 'Step ',
          display006: '/4 · ',
          display007: ' inputs · ',
          displayFix1001: 'Observe',
          displayFix1002: 'Describe what changes before adjusting a variable.',
          displayFix1003: 'Predict',
          displayFix1004:
            'Write one expected outcome and keep other conditions fixed.',
          displayFix1005: 'Experiment',
          displayFix1006: 'Change one variable and record the actual result.',
          displayFix1007: 'Explain',
          displayFix1008: 'Compare the result with the prediction.',
        }
  const root = document.createElement('div')
  root.innerHTML =
    '<p>Use buttons or Left/Right arrows. Try rapid repeated input.</p><button>Previous</button> <button>Next</button> <label>Duration <input type="range" min="0.1" max="1.2" step=".1" value=".4"></label><article style="margin:28px 12px;padding:28px;background:#edf2f7;border-radius:14px"><h2></h2><p></p></article><output role="status"></output>'
  container.append(root)
  const [previous, next] = root.querySelectorAll('button'),
    duration = root.querySelector('input'),
    card = root.querySelector('article'),
    heading = root.querySelector('h2'),
    body = card.querySelector('p'),
    status = root.querySelector('output'),
    preference = matchMedia('(prefers-reduced-motion: reduce)')
  const steps = [
    ['Observe', 'Describe what changes before adjusting a variable.'],
    ['Predict', 'Write one expected outcome and keep other conditions fixed.'],
    ['Experiment', 'Change one variable and record the actual result.'],
    ['Explain', 'Compare the result with the prediction.'],
  ]
  let index = 0,
    tween,
    inputs = 0
  const context = gsap.context(() => {}, root)
  const show = (direction) => {
    index = (index + direction + steps.length) % steps.length
    inputs++
    tween?.kill()
    heading.textContent = `${index + 1}. ${steps[index][0]}`
    body.textContent = steps[index][1]
    status.textContent = `Step ${index + 1}/4 · ${inputs} inputs · ${preference.matches ? 'reduced motion' : 'motion enabled'}`
    context.add(() => {
      gsap.set(card, {
        x: preference.matches ? 0 : direction * 30,
        opacity: preference.matches ? 1 : 0.5,
      })
      tween = gsap.to(card, {
        x: 0,
        opacity: 1,
        duration: preference.matches ? 0 : Number(duration.value),
        ease: 'power2.out',
        overwrite: true,
      })
    })
  }
  previous.onclick = () => show(-1)
  next.onclick = () => show(1)
  const key = (e) => {
    if (e.target === duration) return
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault()
      show(e.key === 'ArrowRight' ? 1 : -1)
    }
  }
  root.addEventListener('keydown', key)
  const reduce = () => show(0)
  preference.addEventListener('change', reduce)
  show(0)
  return () => {
    tween?.kill()
    context.revert()
    root.removeEventListener('keydown', key)
    preference.removeEventListener('change', reduce)
    root.remove()
  }
}

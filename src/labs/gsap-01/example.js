// timeline의 duration, ease와 순서를 바꾸어 보세요.
export function mount({ locale = 'ko', gsap, container }) {
  const messages = locale === 'en' ? {} : {}
  const box = document.createElement('div')
  box.style.cssText =
    'width:70px;height:70px;background:#3179bf;border-radius:12px;margin:60px 20px'
  container.append(box)
  const context = gsap.context(() => {
    gsap
      .timeline({ repeat: -1, yoyo: true })
      .to(box, { x: 140, duration: 1, ease: 'power2.inOut' })
      .to(box, { rotation: 180, backgroundColor: '#e97645', duration: 0.7 })
  }, container)
  return () => {
    context.revert()
    box.remove()
  }
}

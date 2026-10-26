// 원리 시각화: 학습된 3DGS 로더가 아니라 2D 타원 Gaussian의 밀도 단면입니다.
// SCALE_X, SCALE_Y, ANGLE, OPACITY를 바꾸어 이방성과 합성을 관찰하세요.
export function mount({ locale = 'ko', container }) {
  const messages =
    locale === 'en'
      ? {
          display001:
            'Principle experiment: exp(-0.5 × r²), not an actual 3DGS model',
        }
      : { display001: '原理 실험: exp(-0.5 × r²), 실제 3DGS 모델 아님' }
  const SCALE_X = 75,
    SCALE_Y = 25,
    ANGLE = 0.6,
    OPACITY = 0.8
  const canvas = document.createElement('canvas')
  container.append(canvas)
  const context = canvas.getContext('2d')
  const draw = () => {
    canvas.width = Math.max(1, container.clientWidth)
    canvas.height = Math.max(1, container.clientHeight)
    context.fillStyle = '#edf2f7'
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.save()
    context.translate(canvas.width / 2, canvas.height / 2)
    context.rotate(ANGLE)
    context.scale(SCALE_X, SCALE_Y)
    const gradient = context.createRadialGradient(0, 0, 0, 0, 0, 3)
    for (let i = 0; i <= 12; i++) {
      const r = i / 4
      gradient.addColorStop(
        r / 3,
        'rgba(49,121,191,' + OPACITY * Math.exp(-0.5 * r * r) + ')',
      )
    }
    context.fillStyle = gradient
    context.fillRect(-3, -3, 6, 6)
    context.restore()
    context.fillStyle = '#172c3f'
    context.font = '13px system-ui'
    context.fillText(messages.display001, 12, 25)
  }
  const observer = new ResizeObserver(draw)
  observer.observe(container)
  draw()
  return () => {
    observer.disconnect()
    canvas.remove()
  }
}

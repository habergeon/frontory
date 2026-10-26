export function mount({ locale = 'ko', Vue, container }) {
  const messages =
    locale === 'en'
      ? {
          display01: 'onMounted: created Canvas / RAF / observer',
          display02: 'onUnmounted: cleaned up RAF / observer',
          display03: 'A blue dot moving along an orbit',
          display04: 'Vue Canvas lifecycle',
          display05:
            'Compare React useEffect setup/cleanup with Vue onMounted/onUnmounted. Frame coordinates are local variables; only the speed setting is a ref.',
          display06: 'Hide',
          display07: 'Show',
          display08: 'Remount',
          display09: 'Speed ',
        }
      : {
          display01: 'onMounted: Canvas / RAF / observer 생성',
          display02: 'onUnmounted: RAF / observer 정리',
          display03: '궤도를 도는 파란 점',
          display04: 'Vue Canvas 수명주기',
          display05:
            'React useEffect의 생성/cleanup과 Vue onMounted/onUnmounted를 비교하세요. 프레임 좌표는 지역 변수, 속도 설정만 ref입니다.',
          display06: '숨기기',
          display07: '표시',
          display08: '재마운트',
          display09: '속도 ',
        }
  const { h, ref, onMounted, onUnmounted, createApp } = Vue
  const Scene = {
    props: ['speed'],
    emits: ['lifecycle'],
    setup(props, { emit }) {
      const canvas = ref(null)
      let frame = 0,
        observer,
        context,
        angle = 0,
        previous = 0
      onMounted(() => {
        context = canvas.value.getContext('2d')
        observer = new ResizeObserver(() => {
          canvas.value.width = canvas.value.clientWidth
          canvas.value.height = 220
        })
        observer.observe(canvas.value)
        function draw(time) {
          angle +=
            Math.min((time - (previous || time)) / 1000, 0.05) * props.speed
          previous = time
          const width = canvas.value.width
          context.clearRect(0, 0, width, 220)
          context.fillStyle = '#38bdf8'
          context.beginPath()
          context.arc(
            width / 2 + Math.cos(angle) * Math.min(width / 3, 90),
            110 + Math.sin(angle) * 60,
            18,
            0,
            Math.PI * 2,
          )
          context.fill()
          frame = requestAnimationFrame(draw) // angle is a local variable: it does not request a Vue render every frame.
        }
        frame = requestAnimationFrame(draw)
        emit('lifecycle', messages.display01)
      })
      onUnmounted(() => {
        cancelAnimationFrame(frame)
        observer?.disconnect()
        emit('lifecycle', messages.display02)
      })
      return () =>
        h('canvas', {
          ref: canvas,
          style: { width: '100%', height: '220px' },
          'aria-label': messages.display03,
        })
    },
  }
  const app = createApp({
    setup() {
      const visible = ref(true),
        generation = ref(0),
        speed = ref(1),
        logs = ref([])
      const report = (text) => {
        logs.value = [text, ...logs.value].slice(0, 8)
      }
      return () =>
        h('section', null, [
          h('h2', null, messages.display04),
          h('p', null, messages.display05),
          h(
            'button',
            {
              onClick: () => {
                visible.value = !visible.value
              },
            },
            visible.value ? messages.display06 : messages.display07,
          ),
          h(
            'button',
            {
              onClick: () => {
                generation.value++
                visible.value = true
              },
            },
            messages.display08,
          ),
          h('label', null, [
            messages.display09,
            h('input', {
              type: 'range',
              min: 0,
              max: 5,
              step: 0.1,
              value: speed.value,
              onInput: (e) => {
                speed.value = Number(e.target.value)
              },
            }),
          ]),
          visible.value &&
            h(Scene, {
              key: generation.value,
              speed: speed.value,
              onLifecycle: report,
            }),
          h('pre', null, logs.value.join('\n')),
        ])
    },
  })
  app.mount(container)
  return () => app.unmount()
}

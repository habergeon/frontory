import { useEffect, useRef, useState } from 'react'
import { createScene } from './createScene'
import type { SceneController } from './createScene'

export function SceneLab() {
  const containerRef = useRef<HTMLDivElement>(null)
  const controllerRef = useRef<SceneController | null>(null)
  const [paused, setPaused] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let controller: SceneController
    try {
      controller = createScene(container)
      controllerRef.current = controller
    } catch (cause) {
      console.error('첫 장면을 만들지 못했습니다.', cause)
      setError('WebGL 장면을 만들지 못했습니다. WebGL 2 지원 브라우저와 하드웨어 가속 설정을 확인하세요.')
      return
    }

    // StrictMode의 setup → cleanup → setup, 실습 전환, HMR에서 같은 정리가 실행됩니다.
    return () => {
      controller.dispose()
      controllerRef.current = null
    }
  }, [])

  useEffect(() => {
    controllerRef.current?.setPaused(paused)
  }, [paused])

  return (
    <section aria-labelledby="scene-title">
      <div className="lab-heading">
        <div>
          <h2 id="scene-title">01 · 첫 장면</h2>
          <p>회전하는 큐브로 카메라와 좌표계를 관찰합니다.</p>
        </div>
        <div className="controls">
          <button disabled={Boolean(error)} aria-pressed={paused} onClick={() => setPaused(!paused)}>
            {paused ? '회전 재개' : '회전 일시정지'}
          </button>
          <button disabled={Boolean(error)} onClick={() => controllerRef.current?.resetCamera()}>
            카메라 초기화
          </button>
        </div>
      </div>

      <div className="scene-container" ref={containerRef}>
        {error && <p className="scene-error" role="alert">{error}</p>}
      </div>
      <p className="scene-help">
        드래그: 시점 회전 · 휠: 확대/축소 · 오른쪽 드래그: 이동<br />
        터치: 한 손가락 회전, 두 손가락 확대/이동 · 축: X 빨강 / Y 초록 / Z 파랑
      </p>

      <section className="assignment" aria-labelledby="assignment-title">
        <h3 id="assignment-title">첫 과제 · 카메라 위치 바꾸기</h3>
        <p>
          <code>createScene.ts</code>의 <code>camera.position.set(3, 2, 5)</code>를 바꾸기 전에
          큐브의 어느 면이 보일지 예상해 보세요.
        </p>
        <p>
          <code>(0, 0, 5)</code>, <code>(5, 0, 0)</code>, <code>(3, 5, 3)</code>을 하나씩 비교하고
          실제 결과를 <code>docs/labs/graphics/webgl/01-scene/README.md</code>에 기록하세요.
        </p>
      </section>
    </section>
  )
}

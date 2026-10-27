# Three.js · 17 클립 애니메이션

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 애니메이션·인스턴싱·렌더 패스 · 편집 가능한 예제 · 저장 ID: `threejs-step-17`

## 목표와 학습 후 역량

- 클립 없는 모델에도 UI가 유지된다.
- 초 단위 시간과 재생 속도를 구별한다.

## 선수 지식

선수 단원: 01, 14, 16. 해당 개념을 이번 모델 실험에 연결합니다.

## 핵심 개념과 설명

### 클립 목록과 클립 없는 모델

clip이 없을 때 clips[0]을 무조건 사용하지 않습니다. 모델 교체 전 stopAllAction과 uncacheRoot를 호출하고 새 root로 mixer를 만듭니다. geometry와 material 정리는 mixer 캐시 정리와 별개입니다.

### 밀리초를 초로 바꾸기

mixer.update에 넘기는 delta 단위를 초로 바꾸면 재생이 화면 주사율과 덜 얽힙니다. timeScale은 초로 바꾼 delta에 적용되는 배율입니다. delta와 timeScale을 둘 다 곱해 이중으로 속도를 적용하지 않습니다.

## 실습 준비

사이트에서 독립 HTML을 편집·실행합니다. Three.js 0.186.1과 같은 버전의 addons를 제공하므로 별도 설치·서버가 필요 없습니다. 기존 JavaScript 초안은 보존됩니다.

모든 필수 과제를 사이트 안에서 단계별로 수행합니다. 아래 학습 단계의 시작 코드를 불러와 수정하고 실행한 뒤, 실제 결과와 이유를 사이트 필기에 남기세요.

## 실습 과제

1. 시작은 static을 읽어 clips가 비어 있습니다. 파싱 성공은 애니메이션 존재를 뜻하지 않습니다. output의 ready와 클립 없음 문구를 읽으세요. 재생 버튼은 비활성화되지만 내장 모델·파일 선택·오류 복구는 계속 사용할 수 있습니다. animated를 선택해 불러오거나 마지막 sample('static')을 sample('animated')로 바꾸세요.

GLTFLoader 결과의 animations 배열에서 이름과 duration을 읽습니다. mixer=new THREE.AnimationMixer(root)는 해당 모델을 대상으로 만들고 mixer.clipAction(clips[0])이 action을 돌려줍니다. action.play()가 평가를 예약합니다. animated의 SlideLeft는 duration=1초입니다. static→animated→static을 반복하며 이전 재생이 남지 않는지 확인하세요. 2. requestAnimationFrame 계열 timestamp는 ms이고 AnimationMixer.update(delta)는 초를 받습니다. 시작의 seconds=false는 (now-last)를 그대로 넣어 mixer 시간이 실제보다 1000배 빨라집니다. seconds를 true로 바꾸고 delta≈.016s 같은 실제 프레임 간격과 mixer 시간을 함께 읽으세요. 60Hz가 보장되지는 않으므로 delta를 .016으로 고정하지 않습니다.

재생·일시정지 뒤 다시 재생하면 last=0으로 새 기준을 잡아 대기 시간을 한 번에 더하지 않습니다. 약 1초 동안 mixer.time 증가량을 실제 경과와 비교하세요. Left의 clip은 X=-1.1→-.1로 움직이고 반복되므로 X만으로 전체 경과 시간을 추측하지 않습니다. 속도 1에서 비교한 뒤 2로 바꿔 같은 실제 시간에 mixer 증가량이 약 두 배인지 확인하세요. 3. 시작 코드의 action은 준비됐지만 playing=false라 시간이 흐르지 않습니다. 재생을 누르고 X와 mixer 시간을 읽으세요. 일시정지는 현재 포즈를 유지하며 action.paused=true로 둡니다. 다시 재생하면 그 위치부터 이어집니다. 정지·되감기는 action.stop(), reset()과 mixer.time=0으로 시작 포즈를 복구합니다.

속도에 2를 입력하고 속도 적용을 누르세요. mixer.timeScale이 2가 되어 같은 실제 시간에 clip을 두 배 빨리 평가합니다. 속도 0도 유효하며 UI는 유지됩니다. 정지 뒤 재생, 클립 없는 static 불러오기, 다시 animated 불러오기를 비교하세요. 정리 버튼을 누르면 loop 중지, stopAllAction(), uncacheRoot(root), 실제 자원 해제를 따로 수행합니다.

## 관찰할 변수

| 변수      | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설                             |
| --------- | --------- | --------- | ------------------------------------------------- |
| timeScale | 1         | 2         | 같은 실제 시간에 mixer 시간이 약 두 배 증가합니다 |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 클립 없는 모델에도 UI가 유지된다.
- [ ] 초 단위 시간과 재생 속도를 구별한다.

## 자가 점검

1. 정상 모델에 clip이 없으면 오류로 처리해야 하나요?
2. 60Hz에서만 맞는 고정 delta는 왜 문제가 되나요?
3. 일시정지와 stop은 포즈에 어떤 차이를 만드나요?

## 공식 참고

- [Three.js AnimationMixer](https://threejs.org/docs/pages/AnimationMixer.html)
- [Three.js GLTFLoader](https://threejs.org/docs/pages/GLTFLoader.html)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/threejs-step-17/example.html) · [실행 환경과 제한](../../../../../examples.md)

사이트 안에서 HTML 시작 예제를 편집·실행합니다. 단계별 안내와 API 참고를 읽고 실제 결과를 필기에 남기세요.

- [example.html](../../../../../../src/labs/threejs-step-17/example.html)

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 단계별 학습

01·14·16의 시간·모델·갱신 흐름을 클립 재생에 연결합니다. clip은 시간별 값의 데이터, action은 재생 상태, mixer는 한 모델의 여러 action을 평가하는 실행기입니다. 내장 animated는 Left를 1초 동안 옮기며 static에는 clip이 없습니다. 재생 여부·초 단위 시간·실제 X를 함께 기록하세요.

### 선수 단원

- `threejs-01`
- `threejs-02`
- `threejs-step-16`

### 클립 목록과 클립 없는 모델

시작은 static을 읽어 clips가 비어 있습니다. 파싱 성공은 애니메이션 존재를 뜻하지 않습니다. output의 ready와 클립 없음 문구를 읽으세요. 재생 버튼은 비활성화되지만 내장 모델·파일 선택·오류 복구는 계속 사용할 수 있습니다. animated를 선택해 불러오거나 마지막 sample('static')을 sample('animated')로 바꾸세요.

GLTFLoader 결과의 animations 배열에서 이름과 duration을 읽습니다. mixer=new THREE.AnimationMixer(root)는 해당 모델을 대상으로 만들고 mixer.clipAction(clips[0])이 action을 돌려줍니다. action.play()가 평가를 예약합니다. animated의 SlideLeft는 duration=1초입니다. static→animated→static을 반복하며 이전 재생이 남지 않는지 확인하세요.

**예상 결과**

static에서는 ready, clips=[]이고 재생은 꺼지지만 다른 UI는 작동합니다. animated는 SlideLeft:1s와 움직이는 Left를 보여 줍니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>클립 목록과 없는 모델</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage{width:480px;max-width:100%;height:280px} canvas{display:block;width:100%;height:100%;touch-action:none} .controls{display:flex;flex-wrap:wrap;align-items:center;gap:8px} input[type=number]{width:78px} input[type=file]{width:240px;max-width:100%} button{padding:6px} output{display:block;white-space:pre-wrap;overflow-wrap:anywhere} #error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>클립 목록과 없는 모델</h1>
    <p>
      직접 만든 두 패널 GLB입니다. static은 geometry와 material을 공유하며
      animated는 Left를 1초 동안 X=-1.1에서 -.1로 옮깁니다. textured는 2×2 PNG를
      포함합니다. 파일은 현재 실행에서만 사용하며 백업에 포함하지 않습니다. 다시
      실행·새로고침·백업 복원 뒤에는 파일을 다시 선택하세요. 외부 URI를 참조하는
      GLB, .gltf 다중 파일, Draco·Meshopt·KTX2 압축은 이 예제에서 지원하지
      않습니다. 실패하면 파일을 바꾸거나 내장 모델을 선택해 샘플 불러오기를
      누르세요.
    </p>
    <div class="controls">
      <label
        >내장 모델
        <select id="model">
          <option>static</option>
          <option>animated</option>
          <option>empty</option>
          <option>textured</option>
          <option>offset</option>
        </select></label
      ><button id="sample">샘플 불러오기</button
      ><button id="invalid">손상 GLB 시험</button
      ><label
        >GLB 파일 (최대 2 MiB)
        <input id="file" type="file" accept=".glb,model/gltf-binary" /></label
      ><label
        >클립
        <select id="clips"></select></label
      ><button id="play">재생</button><button id="pause">일시정지</button
      ><button id="stop">정지·되감기</button
      ><label
        >속도
        <input
          id="value"
          type="number"
          min="0"
          max="3"
          step="0.25"
          value="1" /></label
      ><button id="apply">속도 적용</button
      ><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="클립 목록과 없는 모델"></canvas></div>
    <output></output>
    <script type="module">
      import * as THREE from 'three';
      const stage = document.querySelector('#stage'),
        canvas = document.querySelector('canvas'),
        output = document.querySelector('output'),
        error = document.querySelector('#error');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 1000);
      camera.position.set(0, 0, 7);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);
      const events = new AbortController();
      let disposed = false,
        frames = 0;
      const ownedGeometry = new Set(),
        ownedMaterial = new Set(),
        ownedTextures = new Set(),
        ownedTargets = new Set();
      const on = (selector, type, fn) =>
        document
          .querySelector(selector)
          .addEventListener(type, fn, { signal: events.signal });
      import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
      const samples = {
        static:
          'Z2xURgIAAAAkAwAAwAIAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOlswLDFdfV0sImFjY2Vzc29ycyI6W3siYnVmZmVyVmlldyI6MCwiY29tcG9uZW50VHlwZSI6NTEyNiwidHlwZSI6IlZFQzMiLCJjb3VudCI6NiwibWluIjpbLTAuOCwtMC44LDBdLCJtYXgiOlswLjgsMC44LDBdfV0sImJ1ZmZlclZpZXdzIjpbeyJidWZmZXIiOjAsImJ5dGVPZmZzZXQiOjAsImJ5dGVMZW5ndGgiOjcyfV0sImV4dGVuc2lvbnNVc2VkIjpbIktIUl9tYXRlcmlhbHNfdW5saXQiXSwibWF0ZXJpYWxzIjpbeyJuYW1lIjoiU2hhcmVkQmx1ZSIsImRvdWJsZVNpZGVkIjp0cnVlLCJwYnJNZXRhbGxpY1JvdWdobmVzcyI6eyJiYXNlQ29sb3JGYWN0b3IiOlswLjAzLDAuMiwwLjgsMV0sIm1ldGFsbGljRmFjdG9yIjowfSwiZXh0ZW5zaW9ucyI6eyJLSFJfbWF0ZXJpYWxzX3VubGl0Ijp7fX19XSwibWVzaGVzIjpbeyJwcmltaXRpdmVzIjpbeyJhdHRyaWJ1dGVzIjp7IlBPU0lUSU9OIjowfSwibWF0ZXJpYWwiOjB9XX1dLCJub2RlcyI6W3sibWVzaCI6MCwibmFtZSI6IkxlZnQiLCJ0cmFuc2xhdGlvbiI6Wy0xLjEsMCwwXX0seyJtZXNoIjowLCJuYW1lIjoiUmlnaHQiLCJ0cmFuc2xhdGlvbiI6WzEuMSwwLDBdfV0sImJ1ZmZlcnMiOlt7ImJ5dGVMZW5ndGgiOjcyfV19IEgAAABCSU4AzcxMv83MTL8AAAAAzcxMP83MTL8AAAAAzcxMv83MTD8AAAAAzcxMv83MTD8AAAAAzcxMP83MTL8AAAAAzcxMP83MTD8AAAAA',
        animated:
          'Z2xURgIAAADUBAAAUAQAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOlswLDFdfV0sImFjY2Vzc29ycyI6W3siYnVmZmVyVmlldyI6MCwiY29tcG9uZW50VHlwZSI6NTEyNiwidHlwZSI6IlZFQzMiLCJjb3VudCI6NiwibWluIjpbLTAuOCwtMC44LDBdLCJtYXgiOlswLjgsMC44LDBdfSx7ImJ1ZmZlclZpZXciOjEsImNvbXBvbmVudFR5cGUiOjUxMjYsInR5cGUiOiJTQ0FMQVIiLCJjb3VudCI6MiwibWluIjpbMF0sIm1heCI6WzFdfSx7ImJ1ZmZlclZpZXciOjIsImNvbXBvbmVudFR5cGUiOjUxMjYsInR5cGUiOiJWRUMzIiwiY291bnQiOjJ9XSwiYnVmZmVyVmlld3MiOlt7ImJ1ZmZlciI6MCwiYnl0ZU9mZnNldCI6MCwiYnl0ZUxlbmd0aCI6NzJ9LHsiYnVmZmVyIjowLCJieXRlT2Zmc2V0Ijo3MiwiYnl0ZUxlbmd0aCI6OH0seyJidWZmZXIiOjAsImJ5dGVPZmZzZXQiOjgwLCJieXRlTGVuZ3RoIjoyNH1dLCJleHRlbnNpb25zVXNlZCI6WyJLSFJfbWF0ZXJpYWxzX3VubGl0Il0sIm1hdGVyaWFscyI6W3sibmFtZSI6IlNoYXJlZEJsdWUiLCJkb3VibGVTaWRlZCI6dHJ1ZSwicGJyTWV0YWxsaWNSb3VnaG5lc3MiOnsiYmFzZUNvbG9yRmFjdG9yIjpbMC4wMywwLjIsMC44LDFdLCJtZXRhbGxpY0ZhY3RvciI6MH0sImV4dGVuc2lvbnMiOnsiS0hSX21hdGVyaWFsc191bmxpdCI6e319fV0sIm1lc2hlcyI6W3sicHJpbWl0aXZlcyI6W3siYXR0cmlidXRlcyI6eyJQT1NJVElPTiI6MH0sIm1hdGVyaWFsIjowfV19XSwibm9kZXMiOlt7Im1lc2giOjAsIm5hbWUiOiJMZWZ0IiwidHJhbnNsYXRpb24iOlstMS4xLDAsMF19LHsibWVzaCI6MCwibmFtZSI6IlJpZ2h0IiwidHJhbnNsYXRpb24iOlsxLjEsMCwwXX1dLCJhbmltYXRpb25zIjpbeyJuYW1lIjoiU2xpZGVMZWZ0Iiwic2FtcGxlcnMiOlt7ImlucHV0IjoxLCJvdXRwdXQiOjIsImludGVycG9sYXRpb24iOiJMSU5FQVIifV0sImNoYW5uZWxzIjpbeyJzYW1wbGVyIjowLCJ0YXJnZXQiOnsibm9kZSI6MCwicGF0aCI6InRyYW5zbGF0aW9uIn19XX1dLCJidWZmZXJzIjpbeyJieXRlTGVuZ3RoIjoxMDR9XX1oAAAAQklOAM3MTL/NzEy/AAAAAM3MTD/NzEy/AAAAAM3MTL/NzEw/AAAAAM3MTL/NzEw/AAAAAM3MTD/NzEy/AAAAAM3MTD/NzEw/AAAAAAAAAAAAAIA/zcyMvwAAAAAAAAAAzczMvQAAAAAAAAAA',
        empty:
          'Z2xURgIAAAB4AAAAZAAAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOltdfV19',
        textured:
          'Z2xURgIAAACUBAAAtAMAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOlswLDFdfV0sImFjY2Vzc29ycyI6W3siYnVmZmVyVmlldyI6MCwiY29tcG9uZW50VHlwZSI6NTEyNiwidHlwZSI6IlZFQzMiLCJjb3VudCI6NiwibWluIjpbLTAuOCwtMC44LDBdLCJtYXgiOlswLjgsMC44LDBdfSx7ImJ1ZmZlclZpZXciOjEsImNvbXBvbmVudFR5cGUiOjUxMjYsInR5cGUiOiJWRUMyIiwiY291bnQiOjZ9XSwiYnVmZmVyVmlld3MiOlt7ImJ1ZmZlciI6MCwiYnl0ZU9mZnNldCI6MCwiYnl0ZUxlbmd0aCI6NzJ9LHsiYnVmZmVyIjowLCJieXRlT2Zmc2V0Ijo3MiwiYnl0ZUxlbmd0aCI6NDh9LHsiYnVmZmVyIjowLCJieXRlT2Zmc2V0IjoxMjAsImJ5dGVMZW5ndGgiOjc2fV0sImV4dGVuc2lvbnNVc2VkIjpbIktIUl9tYXRlcmlhbHNfdW5saXQiXSwibWF0ZXJpYWxzIjpbeyJuYW1lIjoiU2hhcmVkQmx1ZSIsImRvdWJsZVNpZGVkIjp0cnVlLCJwYnJNZXRhbGxpY1JvdWdobmVzcyI6eyJiYXNlQ29sb3JUZXh0dXJlIjp7ImluZGV4IjowfSwibWV0YWxsaWNGYWN0b3IiOjB9LCJleHRlbnNpb25zIjp7IktIUl9tYXRlcmlhbHNfdW5saXQiOnt9fX1dLCJtZXNoZXMiOlt7InByaW1pdGl2ZXMiOlt7ImF0dHJpYnV0ZXMiOnsiUE9TSVRJT04iOjAsIlRFWENPT1JEXzAiOjF9LCJtYXRlcmlhbCI6MH1dfV0sIm5vZGVzIjpbeyJtZXNoIjowLCJuYW1lIjoiTGVmdCIsInRyYW5zbGF0aW9uIjpbLTEuMSwwLDBdfSx7Im1lc2giOjAsIm5hbWUiOiJSaWdodCIsInRyYW5zbGF0aW9uIjpbMS4xLDAsMF19XSwiaW1hZ2VzIjpbeyJidWZmZXJWaWV3IjoyLCJtaW1lVHlwZSI6ImltYWdlL3BuZyJ9XSwidGV4dHVyZXMiOlt7InNvdXJjZSI6MH1dLCJidWZmZXJzIjpbeyJieXRlTGVuZ3RoIjoxOTZ9XX0gICDEAAAAQklOAM3MTL/NzEy/AAAAAM3MTD/NzEy/AAAAAM3MTL/NzEw/AAAAAM3MTL/NzEw/AAAAAM3MTD/NzEy/AAAAAM3MTD/NzEw/AAAAAAAAAAAAAAAAAACAPwAAAAAAAAAAAACAPwAAAAAAAIA/AACAPwAAAAAAAIA/AACAP4lQTkcNChoKAAAADUlIRFIAAAACAAAAAggGAAAAcrYNJAAAABNJREFUeJxj+M/A8B8MGRj+gwEAScgJ9xRjMp0AAAAASUVORK5CYII=',
        offset:
          'Z2xURgIAAABIAwAA5AIAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOlswLDFdfV0sImFjY2Vzc29ycyI6W3siYnVmZmVyVmlldyI6MCwiY29tcG9uZW50VHlwZSI6NTEyNiwidHlwZSI6IlZFQzMiLCJjb3VudCI6NiwibWluIjpbLTAuOCwtMC44LDBdLCJtYXgiOlswLjgsMC44LDBdfV0sImJ1ZmZlclZpZXdzIjpbeyJidWZmZXIiOjAsImJ5dGVPZmZzZXQiOjAsImJ5dGVMZW5ndGgiOjcyfV0sImV4dGVuc2lvbnNVc2VkIjpbIktIUl9tYXRlcmlhbHNfdW5saXQiXSwibWF0ZXJpYWxzIjpbeyJuYW1lIjoiU2hhcmVkQmx1ZSIsImRvdWJsZVNpZGVkIjp0cnVlLCJwYnJNZXRhbGxpY1JvdWdobmVzcyI6eyJiYXNlQ29sb3JGYWN0b3IiOlswLjAzLDAuMiwwLjgsMV0sIm1ldGFsbGljRmFjdG9yIjowfSwiZXh0ZW5zaW9ucyI6eyJLSFJfbWF0ZXJpYWxzX3VubGl0Ijp7fX19XSwibWVzaGVzIjpbeyJwcmltaXRpdmVzIjpbeyJhdHRyaWJ1dGVzIjp7IlBPU0lUSU9OIjowfSwibWF0ZXJpYWwiOjB9XX1dLCJub2RlcyI6W3sibWVzaCI6MCwibmFtZSI6IkxlZnQiLCJ0cmFuc2xhdGlvbiI6WzMxLjIsLTE1LDNdLCJzY2FsZSI6WzgsOCw4XX0seyJtZXNoIjowLCJuYW1lIjoiUmlnaHQiLCJ0cmFuc2xhdGlvbiI6WzQ4LjgsLTE1LDNdLCJzY2FsZSI6WzgsOCw4XX1dLCJidWZmZXJzIjpbeyJieXRlTGVuZ3RoIjo3Mn1dfUgAAABCSU4AzcxMv83MTL8AAAAAzcxMP83MTL8AAAAAzcxMv83MTD8AAAAAzcxMv83MTD8AAAAAzcxMP83MTL8AAAAAzcxMP83MTD8AAAAA',
      };
      const loader = new GLTFLoader();
      let root = null,
        meshes = [],
        status = 'loading',
        request = 0,
        sharedAtLoad = false;
      const restoreSelection = () => {};

      let mixer = null,
        clips = [],
        action = null,
        playing = false,
        last = 0,
        delta = 0,
        speed = Number(document.querySelector('#value').value);
      const seconds = true;
      function clearMixer() {
        playing = false;
        if (mixer && root) {
          mixer.stopAllAction();
          mixer.uncacheRoot(root);
        }
        mixer = null;
        action = null;
        clips = [];
      }
      function setupAnimation(gltf) {
        clips = gltf.animations;
        document
          .querySelector('#clips')
          .replaceChildren(...clips.map((c, i) => new Option(c.name, String(i))));
        mixer = new THREE.AnimationMixer(root);
        if (clips.length) {
          action = mixer.clipAction(clips[0]);
          action.play();
          playing = true;
          mixer.timeScale = speed;
        } else {
          document.querySelector('#clips').append(new Option('클립 없음', ''));
          error.textContent =
            '클립 없음: 모델과 파일 선택은 계속 사용할 수 있습니다.';
        }
        for (const id of ['play', 'pause', 'stop'])
          document.querySelector('#' + id).disabled = !clips.length;
      }
      on('#play', 'click', () => {
        if (!action) return;
        action.play();
        action.paused = false;
        playing = true;
        last = 0;
      });
      on('#pause', 'click', () => {
        playing = false;
        if (action) action.paused = true;
        draw();
      });
      on('#stop', 'click', () => {
        playing = false;
        if (action) {
          action.stop();
          action.reset();
        }
        if (mixer) {
          mixer.time = 0;
          mixer.update(0);
        }
        draw();
      });
      on('#clips', 'change', (e) => {
        if (!mixer || !clips.length) return;
        mixer.stopAllAction();
        action = mixer.clipAction(clips[Number(e.target.value)]);
        action.reset().play();
        playing = true;
        last = 0;
      });
      on('#apply', 'click', () => {
        const input = document.querySelector('#value');
        if (!input.value || !input.checkValidity()) return;
        speed = Number(input.value);
        if (mixer) mixer.timeScale = speed;
        draw();
      });
      function animate(now) {
        if (disposed) return;
        delta = last ? (now - last) / (seconds ? 1000 : 1) : 0;
        last = now;
        if (playing && mixer) {
          mixer.update(delta);
          draw();
        }
      }
      renderer.setAnimationLoop(animate);

      function resources(object) {
        const geometry = new Set(),
          material = new Set(),
          texture = new Set();
        object.traverse((o) => {
          if (o.geometry) geometry.add(o.geometry);
          for (const m of Array.isArray(o.material)
            ? o.material
            : o.material
              ? [o.material]
              : []) {
            material.add(m);
            for (const value of Object.values(m))
              if (value?.isTexture) texture.add(value);
          }
        });
        return { geometry, material, texture };
      }
      function release(object) {
        const r = resources(object);
        for (const g of r.geometry) {
          ownedGeometry.delete(g);
          g.dispose();
        }
        for (const m of r.material) {
          ownedMaterial.delete(m);
          m.dispose();
        }
        for (const tex of r.texture) {
          ownedTextures.delete(tex);
          tex.dispose();
          tex.image?.close?.();
        }
      }
      function validateGlb(buffer) {
        if (buffer.byteLength > 2 * 1024 * 1024) throw Error('GLB exceeds 2 MiB');
        const view = new DataView(buffer);
        if (
          view.getUint32(0, true) !== 0x46546c67 ||
          view.getUint32(4, true) !== 2 ||
          view.getUint32(8, true) !== buffer.byteLength ||
          view.getUint32(16, true) !== 0x4e4f534a
        )
          throw Error('Invalid GLB');
        const json = JSON.parse(
          new TextDecoder().decode(
            new Uint8Array(buffer, 20, view.getUint32(12, true)),
          ),
        );
        if (
          [...(json.buffers ?? []), ...(json.images ?? [])].some(
            (x) => x.uri && !x.uri.startsWith('data:'),
          )
        )
          throw Error('External URI unsupported');
        if ((json.extensionsUsed ?? []).some((x) => /draco|meshopt|basisu/i.test(x)))
          throw Error('Compression unsupported');
      }
      async function loadModel(readBuffer) {
        const token = ++request;
        status = 'loading';
        error.textContent = '';
        draw();
        try {
          const buffer = await readBuffer();
          validateGlb(buffer);
          const gltf = await loader.parseAsync(buffer, '');
          if (disposed || token !== request) {
            release(gltf.scene);
            return;
          }
          restoreSelection();
          clearMixer();
          if (root) {
            scene.remove(root);
            release(root);
          }
          root = gltf.scene;
          scene.add(root);
          meshes = [];
          root.traverse((o) => {
            if (o.isMesh) meshes.push(o);
          });
          const r = resources(root);
          r.geometry.forEach((x) => ownedGeometry.add(x));
          r.material.forEach((x) => ownedMaterial.add(x));
          r.texture.forEach((x) => ownedTextures.add(x));
          sharedAtLoad =
            meshes.length > 1 && meshes[0].material === meshes[1].material;
          status = 'ready';

          setupAnimation(gltf);
          draw();
        } catch (cause) {
          if (disposed || token !== request) return;
          status = 'error';
          error.textContent =
            'GLB를 읽지 못했습니다. 외부 URI·압축 없는 2 MiB 이하 GLB를 선택하거나 내장 샘플을 불러오세요. 상세: ' +
            cause.message;
          draw();
        }
      }
      function sample(kind) {
        if (kind in samples) document.querySelector('#model').value = kind;
        return loadModel(() =>
          kind === 'invalid'
            ? new TextEncoder().encode('invalid-glb').buffer
            : Uint8Array.from(atob(samples[kind]), (c) => c.charCodeAt(0)).buffer,
        );
      }
      on('#sample', 'click', () => {
        document.querySelector('#file').value = '';
        sample(document.querySelector('#model').value);
      });
      on('#invalid', 'click', () => sample('invalid'));
      on('#file', 'change', (e) => {
        const file = e.target.files[0];
        if (file) loadModel(() => file.arrayBuffer());
      });
      sample('static');
      function report() {
        output.textContent =
          '상태: ' +
          status +
          ' / meshes: ' +
          meshes.length +
          ' / shared at load: ' +
          sharedAtLoad +
          ' / frames: ' +
          frames +
          ' / clips: ' +
          clips.map((c) => c.name + ':' + c.duration + 's') +
          ' / playing: ' +
          playing +
          ' / delta: ' +
          delta.toFixed(4) +
          's / mixer: ' +
          (mixer?.time ?? 0).toFixed(3) +
          's / speed: ' +
          speed +
          ' / X: ' +
          (meshes[0]?.position.x ?? 0).toFixed(3);
      }
      function draw() {
        if (disposed || !stage.clientWidth || !stage.clientHeight) return;
        renderer.render(scene, camera);
        frames++;
        report();
      }
      function resizeScene() {
        const w = stage.clientWidth,
          h = stage.clientHeight;
        if (!w || !h || disposed) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        draw();
      }
      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
      function cleanup() {
        if (disposed) return;
        disposed = true;
        observer.disconnect();
        events.abort();
        renderer.setAnimationLoop(null);
        request++;
        restoreSelection();
        clearMixer();
        for (const texture of ownedTextures) {
          texture.dispose();
          texture.image?.close?.();
        }
        for (const g of ownedGeometry) g.dispose();
        for (const m of ownedMaterial) m.dispose();
        renderer.dispose();
        scene.clear();
        output.textContent = '정리 완료';
      }
      on('#cleanup', 'click', cleanup);
      window.addEventListener('pagehide', cleanup, {
        once: true,
        signal: events.signal,
      });
    </script>
  </body>
</html>
```

<details>
<summary>힌트</summary>

- status와 clips.length는 서로 다른 정보입니다.
- animated를 내장 모델에서 선택하세요.
- sample('animated')로 시작해 SlideLeft의 duration을 읽으세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

clip이 없을 때 clips[0]을 무조건 사용하지 않습니다. 모델 교체 전 stopAllAction과 uncacheRoot를 호출하고 새 root로 mixer를 만듭니다. geometry와 material 정리는 mixer 캐시 정리와 별개입니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>클립 목록과 없는 모델</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage{width:480px;max-width:100%;height:280px} canvas{display:block;width:100%;height:100%;touch-action:none} .controls{display:flex;flex-wrap:wrap;align-items:center;gap:8px} input[type=number]{width:78px} input[type=file]{width:240px;max-width:100%} button{padding:6px} output{display:block;white-space:pre-wrap;overflow-wrap:anywhere} #error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>클립 목록과 없는 모델</h1>
    <p>
      직접 만든 두 패널 GLB입니다. static은 geometry와 material을 공유하며
      animated는 Left를 1초 동안 X=-1.1에서 -.1로 옮깁니다. textured는 2×2 PNG를
      포함합니다. 파일은 현재 실행에서만 사용하며 백업에 포함하지 않습니다. 다시
      실행·새로고침·백업 복원 뒤에는 파일을 다시 선택하세요. 외부 URI를 참조하는
      GLB, .gltf 다중 파일, Draco·Meshopt·KTX2 압축은 이 예제에서 지원하지
      않습니다. 실패하면 파일을 바꾸거나 내장 모델을 선택해 샘플 불러오기를
      누르세요.
    </p>
    <div class="controls">
      <label
        >내장 모델
        <select id="model">
          <option>static</option>
          <option>animated</option>
          <option>empty</option>
          <option>textured</option>
          <option>offset</option>
        </select></label
      ><button id="sample">샘플 불러오기</button
      ><button id="invalid">손상 GLB 시험</button
      ><label
        >GLB 파일 (최대 2 MiB)
        <input id="file" type="file" accept=".glb,model/gltf-binary" /></label
      ><label
        >클립
        <select id="clips"></select></label
      ><button id="play">재생</button><button id="pause">일시정지</button
      ><button id="stop">정지·되감기</button
      ><label
        >속도
        <input
          id="value"
          type="number"
          min="0"
          max="3"
          step="0.25"
          value="1" /></label
      ><button id="apply">속도 적용</button
      ><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="클립 목록과 없는 모델"></canvas></div>
    <output></output>
    <script type="module">
      import * as THREE from 'three';
      const stage = document.querySelector('#stage'),
        canvas = document.querySelector('canvas'),
        output = document.querySelector('output'),
        error = document.querySelector('#error');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 1000);
      camera.position.set(0, 0, 7);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);
      const events = new AbortController();
      let disposed = false,
        frames = 0;
      const ownedGeometry = new Set(),
        ownedMaterial = new Set(),
        ownedTextures = new Set(),
        ownedTargets = new Set();
      const on = (selector, type, fn) =>
        document
          .querySelector(selector)
          .addEventListener(type, fn, { signal: events.signal });
      import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
      const samples = {
        static:
          'Z2xURgIAAAAkAwAAwAIAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOlswLDFdfV0sImFjY2Vzc29ycyI6W3siYnVmZmVyVmlldyI6MCwiY29tcG9uZW50VHlwZSI6NTEyNiwidHlwZSI6IlZFQzMiLCJjb3VudCI6NiwibWluIjpbLTAuOCwtMC44LDBdLCJtYXgiOlswLjgsMC44LDBdfV0sImJ1ZmZlclZpZXdzIjpbeyJidWZmZXIiOjAsImJ5dGVPZmZzZXQiOjAsImJ5dGVMZW5ndGgiOjcyfV0sImV4dGVuc2lvbnNVc2VkIjpbIktIUl9tYXRlcmlhbHNfdW5saXQiXSwibWF0ZXJpYWxzIjpbeyJuYW1lIjoiU2hhcmVkQmx1ZSIsImRvdWJsZVNpZGVkIjp0cnVlLCJwYnJNZXRhbGxpY1JvdWdobmVzcyI6eyJiYXNlQ29sb3JGYWN0b3IiOlswLjAzLDAuMiwwLjgsMV0sIm1ldGFsbGljRmFjdG9yIjowfSwiZXh0ZW5zaW9ucyI6eyJLSFJfbWF0ZXJpYWxzX3VubGl0Ijp7fX19XSwibWVzaGVzIjpbeyJwcmltaXRpdmVzIjpbeyJhdHRyaWJ1dGVzIjp7IlBPU0lUSU9OIjowfSwibWF0ZXJpYWwiOjB9XX1dLCJub2RlcyI6W3sibWVzaCI6MCwibmFtZSI6IkxlZnQiLCJ0cmFuc2xhdGlvbiI6Wy0xLjEsMCwwXX0seyJtZXNoIjowLCJuYW1lIjoiUmlnaHQiLCJ0cmFuc2xhdGlvbiI6WzEuMSwwLDBdfV0sImJ1ZmZlcnMiOlt7ImJ5dGVMZW5ndGgiOjcyfV19IEgAAABCSU4AzcxMv83MTL8AAAAAzcxMP83MTL8AAAAAzcxMv83MTD8AAAAAzcxMv83MTD8AAAAAzcxMP83MTL8AAAAAzcxMP83MTD8AAAAA',
        animated:
          'Z2xURgIAAADUBAAAUAQAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOlswLDFdfV0sImFjY2Vzc29ycyI6W3siYnVmZmVyVmlldyI6MCwiY29tcG9uZW50VHlwZSI6NTEyNiwidHlwZSI6IlZFQzMiLCJjb3VudCI6NiwibWluIjpbLTAuOCwtMC44LDBdLCJtYXgiOlswLjgsMC44LDBdfSx7ImJ1ZmZlclZpZXciOjEsImNvbXBvbmVudFR5cGUiOjUxMjYsInR5cGUiOiJTQ0FMQVIiLCJjb3VudCI6MiwibWluIjpbMF0sIm1heCI6WzFdfSx7ImJ1ZmZlclZpZXciOjIsImNvbXBvbmVudFR5cGUiOjUxMjYsInR5cGUiOiJWRUMzIiwiY291bnQiOjJ9XSwiYnVmZmVyVmlld3MiOlt7ImJ1ZmZlciI6MCwiYnl0ZU9mZnNldCI6MCwiYnl0ZUxlbmd0aCI6NzJ9LHsiYnVmZmVyIjowLCJieXRlT2Zmc2V0Ijo3MiwiYnl0ZUxlbmd0aCI6OH0seyJidWZmZXIiOjAsImJ5dGVPZmZzZXQiOjgwLCJieXRlTGVuZ3RoIjoyNH1dLCJleHRlbnNpb25zVXNlZCI6WyJLSFJfbWF0ZXJpYWxzX3VubGl0Il0sIm1hdGVyaWFscyI6W3sibmFtZSI6IlNoYXJlZEJsdWUiLCJkb3VibGVTaWRlZCI6dHJ1ZSwicGJyTWV0YWxsaWNSb3VnaG5lc3MiOnsiYmFzZUNvbG9yRmFjdG9yIjpbMC4wMywwLjIsMC44LDFdLCJtZXRhbGxpY0ZhY3RvciI6MH0sImV4dGVuc2lvbnMiOnsiS0hSX21hdGVyaWFsc191bmxpdCI6e319fV0sIm1lc2hlcyI6W3sicHJpbWl0aXZlcyI6W3siYXR0cmlidXRlcyI6eyJQT1NJVElPTiI6MH0sIm1hdGVyaWFsIjowfV19XSwibm9kZXMiOlt7Im1lc2giOjAsIm5hbWUiOiJMZWZ0IiwidHJhbnNsYXRpb24iOlstMS4xLDAsMF19LHsibWVzaCI6MCwibmFtZSI6IlJpZ2h0IiwidHJhbnNsYXRpb24iOlsxLjEsMCwwXX1dLCJhbmltYXRpb25zIjpbeyJuYW1lIjoiU2xpZGVMZWZ0Iiwic2FtcGxlcnMiOlt7ImlucHV0IjoxLCJvdXRwdXQiOjIsImludGVycG9sYXRpb24iOiJMSU5FQVIifV0sImNoYW5uZWxzIjpbeyJzYW1wbGVyIjowLCJ0YXJnZXQiOnsibm9kZSI6MCwicGF0aCI6InRyYW5zbGF0aW9uIn19XX1dLCJidWZmZXJzIjpbeyJieXRlTGVuZ3RoIjoxMDR9XX1oAAAAQklOAM3MTL/NzEy/AAAAAM3MTD/NzEy/AAAAAM3MTL/NzEw/AAAAAM3MTL/NzEw/AAAAAM3MTD/NzEy/AAAAAM3MTD/NzEw/AAAAAAAAAAAAAIA/zcyMvwAAAAAAAAAAzczMvQAAAAAAAAAA',
        empty:
          'Z2xURgIAAAB4AAAAZAAAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOltdfV19',
        textured:
          'Z2xURgIAAACUBAAAtAMAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOlswLDFdfV0sImFjY2Vzc29ycyI6W3siYnVmZmVyVmlldyI6MCwiY29tcG9uZW50VHlwZSI6NTEyNiwidHlwZSI6IlZFQzMiLCJjb3VudCI6NiwibWluIjpbLTAuOCwtMC44LDBdLCJtYXgiOlswLjgsMC44LDBdfSx7ImJ1ZmZlclZpZXciOjEsImNvbXBvbmVudFR5cGUiOjUxMjYsInR5cGUiOiJWRUMyIiwiY291bnQiOjZ9XSwiYnVmZmVyVmlld3MiOlt7ImJ1ZmZlciI6MCwiYnl0ZU9mZnNldCI6MCwiYnl0ZUxlbmd0aCI6NzJ9LHsiYnVmZmVyIjowLCJieXRlT2Zmc2V0Ijo3MiwiYnl0ZUxlbmd0aCI6NDh9LHsiYnVmZmVyIjowLCJieXRlT2Zmc2V0IjoxMjAsImJ5dGVMZW5ndGgiOjc2fV0sImV4dGVuc2lvbnNVc2VkIjpbIktIUl9tYXRlcmlhbHNfdW5saXQiXSwibWF0ZXJpYWxzIjpbeyJuYW1lIjoiU2hhcmVkQmx1ZSIsImRvdWJsZVNpZGVkIjp0cnVlLCJwYnJNZXRhbGxpY1JvdWdobmVzcyI6eyJiYXNlQ29sb3JUZXh0dXJlIjp7ImluZGV4IjowfSwibWV0YWxsaWNGYWN0b3IiOjB9LCJleHRlbnNpb25zIjp7IktIUl9tYXRlcmlhbHNfdW5saXQiOnt9fX1dLCJtZXNoZXMiOlt7InByaW1pdGl2ZXMiOlt7ImF0dHJpYnV0ZXMiOnsiUE9TSVRJT04iOjAsIlRFWENPT1JEXzAiOjF9LCJtYXRlcmlhbCI6MH1dfV0sIm5vZGVzIjpbeyJtZXNoIjowLCJuYW1lIjoiTGVmdCIsInRyYW5zbGF0aW9uIjpbLTEuMSwwLDBdfSx7Im1lc2giOjAsIm5hbWUiOiJSaWdodCIsInRyYW5zbGF0aW9uIjpbMS4xLDAsMF19XSwiaW1hZ2VzIjpbeyJidWZmZXJWaWV3IjoyLCJtaW1lVHlwZSI6ImltYWdlL3BuZyJ9XSwidGV4dHVyZXMiOlt7InNvdXJjZSI6MH1dLCJidWZmZXJzIjpbeyJieXRlTGVuZ3RoIjoxOTZ9XX0gICDEAAAAQklOAM3MTL/NzEy/AAAAAM3MTD/NzEy/AAAAAM3MTL/NzEw/AAAAAM3MTL/NzEw/AAAAAM3MTD/NzEy/AAAAAM3MTD/NzEw/AAAAAAAAAAAAAAAAAACAPwAAAAAAAAAAAACAPwAAAAAAAIA/AACAPwAAAAAAAIA/AACAP4lQTkcNChoKAAAADUlIRFIAAAACAAAAAggGAAAAcrYNJAAAABNJREFUeJxj+M/A8B8MGRj+gwEAScgJ9xRjMp0AAAAASUVORK5CYII=',
        offset:
          'Z2xURgIAAABIAwAA5AIAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOlswLDFdfV0sImFjY2Vzc29ycyI6W3siYnVmZmVyVmlldyI6MCwiY29tcG9uZW50VHlwZSI6NTEyNiwidHlwZSI6IlZFQzMiLCJjb3VudCI6NiwibWluIjpbLTAuOCwtMC44LDBdLCJtYXgiOlswLjgsMC44LDBdfV0sImJ1ZmZlclZpZXdzIjpbeyJidWZmZXIiOjAsImJ5dGVPZmZzZXQiOjAsImJ5dGVMZW5ndGgiOjcyfV0sImV4dGVuc2lvbnNVc2VkIjpbIktIUl9tYXRlcmlhbHNfdW5saXQiXSwibWF0ZXJpYWxzIjpbeyJuYW1lIjoiU2hhcmVkQmx1ZSIsImRvdWJsZVNpZGVkIjp0cnVlLCJwYnJNZXRhbGxpY1JvdWdobmVzcyI6eyJiYXNlQ29sb3JGYWN0b3IiOlswLjAzLDAuMiwwLjgsMV0sIm1ldGFsbGljRmFjdG9yIjowfSwiZXh0ZW5zaW9ucyI6eyJLSFJfbWF0ZXJpYWxzX3VubGl0Ijp7fX19XSwibWVzaGVzIjpbeyJwcmltaXRpdmVzIjpbeyJhdHRyaWJ1dGVzIjp7IlBPU0lUSU9OIjowfSwibWF0ZXJpYWwiOjB9XX1dLCJub2RlcyI6W3sibWVzaCI6MCwibmFtZSI6IkxlZnQiLCJ0cmFuc2xhdGlvbiI6WzMxLjIsLTE1LDNdLCJzY2FsZSI6WzgsOCw4XX0seyJtZXNoIjowLCJuYW1lIjoiUmlnaHQiLCJ0cmFuc2xhdGlvbiI6WzQ4LjgsLTE1LDNdLCJzY2FsZSI6WzgsOCw4XX1dLCJidWZmZXJzIjpbeyJieXRlTGVuZ3RoIjo3Mn1dfUgAAABCSU4AzcxMv83MTL8AAAAAzcxMP83MTL8AAAAAzcxMv83MTD8AAAAAzcxMv83MTD8AAAAAzcxMP83MTL8AAAAAzcxMP83MTD8AAAAA',
      };
      const loader = new GLTFLoader();
      let root = null,
        meshes = [],
        status = 'loading',
        request = 0,
        sharedAtLoad = false;
      const restoreSelection = () => {};

      let mixer = null,
        clips = [],
        action = null,
        playing = false,
        last = 0,
        delta = 0,
        speed = Number(document.querySelector('#value').value);
      const seconds = true;
      function clearMixer() {
        playing = false;
        if (mixer && root) {
          mixer.stopAllAction();
          mixer.uncacheRoot(root);
        }
        mixer = null;
        action = null;
        clips = [];
      }
      function setupAnimation(gltf) {
        clips = gltf.animations;
        document
          .querySelector('#clips')
          .replaceChildren(...clips.map((c, i) => new Option(c.name, String(i))));
        mixer = new THREE.AnimationMixer(root);
        if (clips.length) {
          action = mixer.clipAction(clips[0]);
          action.play();
          playing = true;
          mixer.timeScale = speed;
        } else {
          document.querySelector('#clips').append(new Option('클립 없음', ''));
          error.textContent =
            '클립 없음: 모델과 파일 선택은 계속 사용할 수 있습니다.';
        }
        for (const id of ['play', 'pause', 'stop'])
          document.querySelector('#' + id).disabled = !clips.length;
      }
      on('#play', 'click', () => {
        if (!action) return;
        action.play();
        action.paused = false;
        playing = true;
        last = 0;
      });
      on('#pause', 'click', () => {
        playing = false;
        if (action) action.paused = true;
        draw();
      });
      on('#stop', 'click', () => {
        playing = false;
        if (action) {
          action.stop();
          action.reset();
        }
        if (mixer) {
          mixer.time = 0;
          mixer.update(0);
        }
        draw();
      });
      on('#clips', 'change', (e) => {
        if (!mixer || !clips.length) return;
        mixer.stopAllAction();
        action = mixer.clipAction(clips[Number(e.target.value)]);
        action.reset().play();
        playing = true;
        last = 0;
      });
      on('#apply', 'click', () => {
        const input = document.querySelector('#value');
        if (!input.value || !input.checkValidity()) return;
        speed = Number(input.value);
        if (mixer) mixer.timeScale = speed;
        draw();
      });
      function animate(now) {
        if (disposed) return;
        delta = last ? (now - last) / (seconds ? 1000 : 1) : 0;
        last = now;
        if (playing && mixer) {
          mixer.update(delta);
          draw();
        }
      }
      renderer.setAnimationLoop(animate);

      function resources(object) {
        const geometry = new Set(),
          material = new Set(),
          texture = new Set();
        object.traverse((o) => {
          if (o.geometry) geometry.add(o.geometry);
          for (const m of Array.isArray(o.material)
            ? o.material
            : o.material
              ? [o.material]
              : []) {
            material.add(m);
            for (const value of Object.values(m))
              if (value?.isTexture) texture.add(value);
          }
        });
        return { geometry, material, texture };
      }
      function release(object) {
        const r = resources(object);
        for (const g of r.geometry) {
          ownedGeometry.delete(g);
          g.dispose();
        }
        for (const m of r.material) {
          ownedMaterial.delete(m);
          m.dispose();
        }
        for (const tex of r.texture) {
          ownedTextures.delete(tex);
          tex.dispose();
          tex.image?.close?.();
        }
      }
      function validateGlb(buffer) {
        if (buffer.byteLength > 2 * 1024 * 1024) throw Error('GLB exceeds 2 MiB');
        const view = new DataView(buffer);
        if (
          view.getUint32(0, true) !== 0x46546c67 ||
          view.getUint32(4, true) !== 2 ||
          view.getUint32(8, true) !== buffer.byteLength ||
          view.getUint32(16, true) !== 0x4e4f534a
        )
          throw Error('Invalid GLB');
        const json = JSON.parse(
          new TextDecoder().decode(
            new Uint8Array(buffer, 20, view.getUint32(12, true)),
          ),
        );
        if (
          [...(json.buffers ?? []), ...(json.images ?? [])].some(
            (x) => x.uri && !x.uri.startsWith('data:'),
          )
        )
          throw Error('External URI unsupported');
        if ((json.extensionsUsed ?? []).some((x) => /draco|meshopt|basisu/i.test(x)))
          throw Error('Compression unsupported');
      }
      async function loadModel(readBuffer) {
        const token = ++request;
        status = 'loading';
        error.textContent = '';
        draw();
        try {
          const buffer = await readBuffer();
          validateGlb(buffer);
          const gltf = await loader.parseAsync(buffer, '');
          if (disposed || token !== request) {
            release(gltf.scene);
            return;
          }
          restoreSelection();
          clearMixer();
          if (root) {
            scene.remove(root);
            release(root);
          }
          root = gltf.scene;
          scene.add(root);
          meshes = [];
          root.traverse((o) => {
            if (o.isMesh) meshes.push(o);
          });
          const r = resources(root);
          r.geometry.forEach((x) => ownedGeometry.add(x));
          r.material.forEach((x) => ownedMaterial.add(x));
          r.texture.forEach((x) => ownedTextures.add(x));
          sharedAtLoad =
            meshes.length > 1 && meshes[0].material === meshes[1].material;
          status = 'ready';

          setupAnimation(gltf);
          draw();
        } catch (cause) {
          if (disposed || token !== request) return;
          status = 'error';
          error.textContent =
            'GLB를 읽지 못했습니다. 외부 URI·압축 없는 2 MiB 이하 GLB를 선택하거나 내장 샘플을 불러오세요. 상세: ' +
            cause.message;
          draw();
        }
      }
      function sample(kind) {
        if (kind in samples) document.querySelector('#model').value = kind;
        return loadModel(() =>
          kind === 'invalid'
            ? new TextEncoder().encode('invalid-glb').buffer
            : Uint8Array.from(atob(samples[kind]), (c) => c.charCodeAt(0)).buffer,
        );
      }
      on('#sample', 'click', () => {
        document.querySelector('#file').value = '';
        sample(document.querySelector('#model').value);
      });
      on('#invalid', 'click', () => sample('invalid'));
      on('#file', 'change', (e) => {
        const file = e.target.files[0];
        if (file) loadModel(() => file.arrayBuffer());
      });
      sample('animated');
      function report() {
        output.textContent =
          '상태: ' +
          status +
          ' / meshes: ' +
          meshes.length +
          ' / shared at load: ' +
          sharedAtLoad +
          ' / frames: ' +
          frames +
          ' / clips: ' +
          clips.map((c) => c.name + ':' + c.duration + 's') +
          ' / playing: ' +
          playing +
          ' / delta: ' +
          delta.toFixed(4) +
          's / mixer: ' +
          (mixer?.time ?? 0).toFixed(3) +
          's / speed: ' +
          speed +
          ' / X: ' +
          (meshes[0]?.position.x ?? 0).toFixed(3);
      }
      function draw() {
        if (disposed || !stage.clientWidth || !stage.clientHeight) return;
        renderer.render(scene, camera);
        frames++;
        report();
      }
      function resizeScene() {
        const w = stage.clientWidth,
          h = stage.clientHeight;
        if (!w || !h || disposed) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        draw();
      }
      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
      function cleanup() {
        if (disposed) return;
        disposed = true;
        observer.disconnect();
        events.abort();
        renderer.setAnimationLoop(null);
        request++;
        restoreSelection();
        clearMixer();
        for (const texture of ownedTextures) {
          texture.dispose();
          texture.image?.close?.();
        }
        for (const g of ownedGeometry) g.dispose();
        for (const m of ownedMaterial) m.dispose();
        renderer.dispose();
        scene.clear();
        output.textContent = '정리 완료';
      }
      on('#cleanup', 'click', cleanup);
      window.addEventListener('pagehide', cleanup, {
        once: true,
        signal: events.signal,
      });
    </script>
  </body>
</html>
```

</details>

- 정상 모델에 clip이 없으면 오류로 처리해야 하나요?
- 모델을 바꿀 때 이전 mixer의 root를 왜 해제하나요?

### 밀리초를 초로 바꾸기

requestAnimationFrame 계열 timestamp는 ms이고 AnimationMixer.update(delta)는 초를 받습니다. 시작의 seconds=false는 (now-last)를 그대로 넣어 mixer 시간이 실제보다 1000배 빨라집니다. seconds를 true로 바꾸고 delta≈.016s 같은 실제 프레임 간격과 mixer 시간을 함께 읽으세요. 60Hz가 보장되지는 않으므로 delta를 .016으로 고정하지 않습니다.

재생·일시정지 뒤 다시 재생하면 last=0으로 새 기준을 잡아 대기 시간을 한 번에 더하지 않습니다. 약 1초 동안 mixer.time 증가량을 실제 경과와 비교하세요. Left의 clip은 X=-1.1→-.1로 움직이고 반복되므로 X만으로 전체 경과 시간을 추측하지 않습니다. 속도 1에서 비교한 뒤 2로 바꿔 같은 실제 시간에 mixer 증가량이 약 두 배인지 확인하세요.

**예상 결과**

false에서 mixer 시간이 실제보다 약 1000배 빠릅니다. true·speed=1에서는 약 1초 대기에 mixer도 약 1초 증가합니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>초 단위 mixer 시간</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage{width:480px;max-width:100%;height:280px} canvas{display:block;width:100%;height:100%;touch-action:none} .controls{display:flex;flex-wrap:wrap;align-items:center;gap:8px} input[type=number]{width:78px} input[type=file]{width:240px;max-width:100%} button{padding:6px} output{display:block;white-space:pre-wrap;overflow-wrap:anywhere} #error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>초 단위 mixer 시간</h1>
    <p>
      직접 만든 두 패널 GLB입니다. static은 geometry와 material을 공유하며
      animated는 Left를 1초 동안 X=-1.1에서 -.1로 옮깁니다. textured는 2×2 PNG를
      포함합니다. 파일은 현재 실행에서만 사용하며 백업에 포함하지 않습니다. 다시
      실행·새로고침·백업 복원 뒤에는 파일을 다시 선택하세요. 외부 URI를 참조하는
      GLB, .gltf 다중 파일, Draco·Meshopt·KTX2 압축은 이 예제에서 지원하지
      않습니다. 실패하면 파일을 바꾸거나 내장 모델을 선택해 샘플 불러오기를
      누르세요.
    </p>
    <div class="controls">
      <label
        >내장 모델
        <select id="model">
          <option>static</option>
          <option>animated</option>
          <option>empty</option>
          <option>textured</option>
          <option>offset</option>
        </select></label
      ><button id="sample">샘플 불러오기</button
      ><button id="invalid">손상 GLB 시험</button
      ><label
        >GLB 파일 (최대 2 MiB)
        <input id="file" type="file" accept=".glb,model/gltf-binary" /></label
      ><label
        >클립
        <select id="clips"></select></label
      ><button id="play">재생</button><button id="pause">일시정지</button
      ><button id="stop">정지·되감기</button
      ><label
        >속도
        <input
          id="value"
          type="number"
          min="0"
          max="3"
          step="0.25"
          value="1" /></label
      ><button id="apply">속도 적용</button
      ><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="초 단위 mixer 시간"></canvas></div>
    <output></output>
    <script type="module">
      import * as THREE from 'three';
      const stage = document.querySelector('#stage'),
        canvas = document.querySelector('canvas'),
        output = document.querySelector('output'),
        error = document.querySelector('#error');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 1000);
      camera.position.set(0, 0, 7);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);
      const events = new AbortController();
      let disposed = false,
        frames = 0;
      const ownedGeometry = new Set(),
        ownedMaterial = new Set(),
        ownedTextures = new Set(),
        ownedTargets = new Set();
      const on = (selector, type, fn) =>
        document
          .querySelector(selector)
          .addEventListener(type, fn, { signal: events.signal });
      import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
      const samples = {
        static:
          'Z2xURgIAAAAkAwAAwAIAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOlswLDFdfV0sImFjY2Vzc29ycyI6W3siYnVmZmVyVmlldyI6MCwiY29tcG9uZW50VHlwZSI6NTEyNiwidHlwZSI6IlZFQzMiLCJjb3VudCI6NiwibWluIjpbLTAuOCwtMC44LDBdLCJtYXgiOlswLjgsMC44LDBdfV0sImJ1ZmZlclZpZXdzIjpbeyJidWZmZXIiOjAsImJ5dGVPZmZzZXQiOjAsImJ5dGVMZW5ndGgiOjcyfV0sImV4dGVuc2lvbnNVc2VkIjpbIktIUl9tYXRlcmlhbHNfdW5saXQiXSwibWF0ZXJpYWxzIjpbeyJuYW1lIjoiU2hhcmVkQmx1ZSIsImRvdWJsZVNpZGVkIjp0cnVlLCJwYnJNZXRhbGxpY1JvdWdobmVzcyI6eyJiYXNlQ29sb3JGYWN0b3IiOlswLjAzLDAuMiwwLjgsMV0sIm1ldGFsbGljRmFjdG9yIjowfSwiZXh0ZW5zaW9ucyI6eyJLSFJfbWF0ZXJpYWxzX3VubGl0Ijp7fX19XSwibWVzaGVzIjpbeyJwcmltaXRpdmVzIjpbeyJhdHRyaWJ1dGVzIjp7IlBPU0lUSU9OIjowfSwibWF0ZXJpYWwiOjB9XX1dLCJub2RlcyI6W3sibWVzaCI6MCwibmFtZSI6IkxlZnQiLCJ0cmFuc2xhdGlvbiI6Wy0xLjEsMCwwXX0seyJtZXNoIjowLCJuYW1lIjoiUmlnaHQiLCJ0cmFuc2xhdGlvbiI6WzEuMSwwLDBdfV0sImJ1ZmZlcnMiOlt7ImJ5dGVMZW5ndGgiOjcyfV19IEgAAABCSU4AzcxMv83MTL8AAAAAzcxMP83MTL8AAAAAzcxMv83MTD8AAAAAzcxMv83MTD8AAAAAzcxMP83MTL8AAAAAzcxMP83MTD8AAAAA',
        animated:
          'Z2xURgIAAADUBAAAUAQAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOlswLDFdfV0sImFjY2Vzc29ycyI6W3siYnVmZmVyVmlldyI6MCwiY29tcG9uZW50VHlwZSI6NTEyNiwidHlwZSI6IlZFQzMiLCJjb3VudCI6NiwibWluIjpbLTAuOCwtMC44LDBdLCJtYXgiOlswLjgsMC44LDBdfSx7ImJ1ZmZlclZpZXciOjEsImNvbXBvbmVudFR5cGUiOjUxMjYsInR5cGUiOiJTQ0FMQVIiLCJjb3VudCI6MiwibWluIjpbMF0sIm1heCI6WzFdfSx7ImJ1ZmZlclZpZXciOjIsImNvbXBvbmVudFR5cGUiOjUxMjYsInR5cGUiOiJWRUMzIiwiY291bnQiOjJ9XSwiYnVmZmVyVmlld3MiOlt7ImJ1ZmZlciI6MCwiYnl0ZU9mZnNldCI6MCwiYnl0ZUxlbmd0aCI6NzJ9LHsiYnVmZmVyIjowLCJieXRlT2Zmc2V0Ijo3MiwiYnl0ZUxlbmd0aCI6OH0seyJidWZmZXIiOjAsImJ5dGVPZmZzZXQiOjgwLCJieXRlTGVuZ3RoIjoyNH1dLCJleHRlbnNpb25zVXNlZCI6WyJLSFJfbWF0ZXJpYWxzX3VubGl0Il0sIm1hdGVyaWFscyI6W3sibmFtZSI6IlNoYXJlZEJsdWUiLCJkb3VibGVTaWRlZCI6dHJ1ZSwicGJyTWV0YWxsaWNSb3VnaG5lc3MiOnsiYmFzZUNvbG9yRmFjdG9yIjpbMC4wMywwLjIsMC44LDFdLCJtZXRhbGxpY0ZhY3RvciI6MH0sImV4dGVuc2lvbnMiOnsiS0hSX21hdGVyaWFsc191bmxpdCI6e319fV0sIm1lc2hlcyI6W3sicHJpbWl0aXZlcyI6W3siYXR0cmlidXRlcyI6eyJQT1NJVElPTiI6MH0sIm1hdGVyaWFsIjowfV19XSwibm9kZXMiOlt7Im1lc2giOjAsIm5hbWUiOiJMZWZ0IiwidHJhbnNsYXRpb24iOlstMS4xLDAsMF19LHsibWVzaCI6MCwibmFtZSI6IlJpZ2h0IiwidHJhbnNsYXRpb24iOlsxLjEsMCwwXX1dLCJhbmltYXRpb25zIjpbeyJuYW1lIjoiU2xpZGVMZWZ0Iiwic2FtcGxlcnMiOlt7ImlucHV0IjoxLCJvdXRwdXQiOjIsImludGVycG9sYXRpb24iOiJMSU5FQVIifV0sImNoYW5uZWxzIjpbeyJzYW1wbGVyIjowLCJ0YXJnZXQiOnsibm9kZSI6MCwicGF0aCI6InRyYW5zbGF0aW9uIn19XX1dLCJidWZmZXJzIjpbeyJieXRlTGVuZ3RoIjoxMDR9XX1oAAAAQklOAM3MTL/NzEy/AAAAAM3MTD/NzEy/AAAAAM3MTL/NzEw/AAAAAM3MTL/NzEw/AAAAAM3MTD/NzEy/AAAAAM3MTD/NzEw/AAAAAAAAAAAAAIA/zcyMvwAAAAAAAAAAzczMvQAAAAAAAAAA',
        empty:
          'Z2xURgIAAAB4AAAAZAAAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOltdfV19',
        textured:
          'Z2xURgIAAACUBAAAtAMAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOlswLDFdfV0sImFjY2Vzc29ycyI6W3siYnVmZmVyVmlldyI6MCwiY29tcG9uZW50VHlwZSI6NTEyNiwidHlwZSI6IlZFQzMiLCJjb3VudCI6NiwibWluIjpbLTAuOCwtMC44LDBdLCJtYXgiOlswLjgsMC44LDBdfSx7ImJ1ZmZlclZpZXciOjEsImNvbXBvbmVudFR5cGUiOjUxMjYsInR5cGUiOiJWRUMyIiwiY291bnQiOjZ9XSwiYnVmZmVyVmlld3MiOlt7ImJ1ZmZlciI6MCwiYnl0ZU9mZnNldCI6MCwiYnl0ZUxlbmd0aCI6NzJ9LHsiYnVmZmVyIjowLCJieXRlT2Zmc2V0Ijo3MiwiYnl0ZUxlbmd0aCI6NDh9LHsiYnVmZmVyIjowLCJieXRlT2Zmc2V0IjoxMjAsImJ5dGVMZW5ndGgiOjc2fV0sImV4dGVuc2lvbnNVc2VkIjpbIktIUl9tYXRlcmlhbHNfdW5saXQiXSwibWF0ZXJpYWxzIjpbeyJuYW1lIjoiU2hhcmVkQmx1ZSIsImRvdWJsZVNpZGVkIjp0cnVlLCJwYnJNZXRhbGxpY1JvdWdobmVzcyI6eyJiYXNlQ29sb3JUZXh0dXJlIjp7ImluZGV4IjowfSwibWV0YWxsaWNGYWN0b3IiOjB9LCJleHRlbnNpb25zIjp7IktIUl9tYXRlcmlhbHNfdW5saXQiOnt9fX1dLCJtZXNoZXMiOlt7InByaW1pdGl2ZXMiOlt7ImF0dHJpYnV0ZXMiOnsiUE9TSVRJT04iOjAsIlRFWENPT1JEXzAiOjF9LCJtYXRlcmlhbCI6MH1dfV0sIm5vZGVzIjpbeyJtZXNoIjowLCJuYW1lIjoiTGVmdCIsInRyYW5zbGF0aW9uIjpbLTEuMSwwLDBdfSx7Im1lc2giOjAsIm5hbWUiOiJSaWdodCIsInRyYW5zbGF0aW9uIjpbMS4xLDAsMF19XSwiaW1hZ2VzIjpbeyJidWZmZXJWaWV3IjoyLCJtaW1lVHlwZSI6ImltYWdlL3BuZyJ9XSwidGV4dHVyZXMiOlt7InNvdXJjZSI6MH1dLCJidWZmZXJzIjpbeyJieXRlTGVuZ3RoIjoxOTZ9XX0gICDEAAAAQklOAM3MTL/NzEy/AAAAAM3MTD/NzEy/AAAAAM3MTL/NzEw/AAAAAM3MTL/NzEw/AAAAAM3MTD/NzEy/AAAAAM3MTD/NzEw/AAAAAAAAAAAAAAAAAACAPwAAAAAAAAAAAACAPwAAAAAAAIA/AACAPwAAAAAAAIA/AACAP4lQTkcNChoKAAAADUlIRFIAAAACAAAAAggGAAAAcrYNJAAAABNJREFUeJxj+M/A8B8MGRj+gwEAScgJ9xRjMp0AAAAASUVORK5CYII=',
        offset:
          'Z2xURgIAAABIAwAA5AIAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOlswLDFdfV0sImFjY2Vzc29ycyI6W3siYnVmZmVyVmlldyI6MCwiY29tcG9uZW50VHlwZSI6NTEyNiwidHlwZSI6IlZFQzMiLCJjb3VudCI6NiwibWluIjpbLTAuOCwtMC44LDBdLCJtYXgiOlswLjgsMC44LDBdfV0sImJ1ZmZlclZpZXdzIjpbeyJidWZmZXIiOjAsImJ5dGVPZmZzZXQiOjAsImJ5dGVMZW5ndGgiOjcyfV0sImV4dGVuc2lvbnNVc2VkIjpbIktIUl9tYXRlcmlhbHNfdW5saXQiXSwibWF0ZXJpYWxzIjpbeyJuYW1lIjoiU2hhcmVkQmx1ZSIsImRvdWJsZVNpZGVkIjp0cnVlLCJwYnJNZXRhbGxpY1JvdWdobmVzcyI6eyJiYXNlQ29sb3JGYWN0b3IiOlswLjAzLDAuMiwwLjgsMV0sIm1ldGFsbGljRmFjdG9yIjowfSwiZXh0ZW5zaW9ucyI6eyJLSFJfbWF0ZXJpYWxzX3VubGl0Ijp7fX19XSwibWVzaGVzIjpbeyJwcmltaXRpdmVzIjpbeyJhdHRyaWJ1dGVzIjp7IlBPU0lUSU9OIjowfSwibWF0ZXJpYWwiOjB9XX1dLCJub2RlcyI6W3sibWVzaCI6MCwibmFtZSI6IkxlZnQiLCJ0cmFuc2xhdGlvbiI6WzMxLjIsLTE1LDNdLCJzY2FsZSI6WzgsOCw4XX0seyJtZXNoIjowLCJuYW1lIjoiUmlnaHQiLCJ0cmFuc2xhdGlvbiI6WzQ4LjgsLTE1LDNdLCJzY2FsZSI6WzgsOCw4XX1dLCJidWZmZXJzIjpbeyJieXRlTGVuZ3RoIjo3Mn1dfUgAAABCSU4AzcxMv83MTL8AAAAAzcxMP83MTL8AAAAAzcxMv83MTD8AAAAAzcxMv83MTD8AAAAAzcxMP83MTL8AAAAAzcxMP83MTD8AAAAA',
      };
      const loader = new GLTFLoader();
      let root = null,
        meshes = [],
        status = 'loading',
        request = 0,
        sharedAtLoad = false;
      const restoreSelection = () => {};

      let mixer = null,
        clips = [],
        action = null,
        playing = false,
        last = 0,
        delta = 0,
        speed = Number(document.querySelector('#value').value);
      const seconds = false;
      function clearMixer() {
        playing = false;
        if (mixer && root) {
          mixer.stopAllAction();
          mixer.uncacheRoot(root);
        }
        mixer = null;
        action = null;
        clips = [];
      }
      function setupAnimation(gltf) {
        clips = gltf.animations;
        document
          .querySelector('#clips')
          .replaceChildren(...clips.map((c, i) => new Option(c.name, String(i))));
        mixer = new THREE.AnimationMixer(root);
        if (clips.length) {
          action = mixer.clipAction(clips[0]);
          action.play();
          playing = true;
          mixer.timeScale = speed;
        } else {
          document.querySelector('#clips').append(new Option('클립 없음', ''));
          error.textContent =
            '클립 없음: 모델과 파일 선택은 계속 사용할 수 있습니다.';
        }
        for (const id of ['play', 'pause', 'stop'])
          document.querySelector('#' + id).disabled = !clips.length;
      }
      on('#play', 'click', () => {
        if (!action) return;
        action.play();
        action.paused = false;
        playing = true;
        last = 0;
      });
      on('#pause', 'click', () => {
        playing = false;
        if (action) action.paused = true;
        draw();
      });
      on('#stop', 'click', () => {
        playing = false;
        if (action) {
          action.stop();
          action.reset();
        }
        if (mixer) {
          mixer.time = 0;
          mixer.update(0);
        }
        draw();
      });
      on('#clips', 'change', (e) => {
        if (!mixer || !clips.length) return;
        mixer.stopAllAction();
        action = mixer.clipAction(clips[Number(e.target.value)]);
        action.reset().play();
        playing = true;
        last = 0;
      });
      on('#apply', 'click', () => {
        const input = document.querySelector('#value');
        if (!input.value || !input.checkValidity()) return;
        speed = Number(input.value);
        if (mixer) mixer.timeScale = speed;
        draw();
      });
      function animate(now) {
        if (disposed) return;
        delta = last ? (now - last) / (seconds ? 1000 : 1) : 0;
        last = now;
        if (playing && mixer) {
          mixer.update(delta);
          draw();
        }
      }
      renderer.setAnimationLoop(animate);

      function resources(object) {
        const geometry = new Set(),
          material = new Set(),
          texture = new Set();
        object.traverse((o) => {
          if (o.geometry) geometry.add(o.geometry);
          for (const m of Array.isArray(o.material)
            ? o.material
            : o.material
              ? [o.material]
              : []) {
            material.add(m);
            for (const value of Object.values(m))
              if (value?.isTexture) texture.add(value);
          }
        });
        return { geometry, material, texture };
      }
      function release(object) {
        const r = resources(object);
        for (const g of r.geometry) {
          ownedGeometry.delete(g);
          g.dispose();
        }
        for (const m of r.material) {
          ownedMaterial.delete(m);
          m.dispose();
        }
        for (const tex of r.texture) {
          ownedTextures.delete(tex);
          tex.dispose();
          tex.image?.close?.();
        }
      }
      function validateGlb(buffer) {
        if (buffer.byteLength > 2 * 1024 * 1024) throw Error('GLB exceeds 2 MiB');
        const view = new DataView(buffer);
        if (
          view.getUint32(0, true) !== 0x46546c67 ||
          view.getUint32(4, true) !== 2 ||
          view.getUint32(8, true) !== buffer.byteLength ||
          view.getUint32(16, true) !== 0x4e4f534a
        )
          throw Error('Invalid GLB');
        const json = JSON.parse(
          new TextDecoder().decode(
            new Uint8Array(buffer, 20, view.getUint32(12, true)),
          ),
        );
        if (
          [...(json.buffers ?? []), ...(json.images ?? [])].some(
            (x) => x.uri && !x.uri.startsWith('data:'),
          )
        )
          throw Error('External URI unsupported');
        if ((json.extensionsUsed ?? []).some((x) => /draco|meshopt|basisu/i.test(x)))
          throw Error('Compression unsupported');
      }
      async function loadModel(readBuffer) {
        const token = ++request;
        status = 'loading';
        error.textContent = '';
        draw();
        try {
          const buffer = await readBuffer();
          validateGlb(buffer);
          const gltf = await loader.parseAsync(buffer, '');
          if (disposed || token !== request) {
            release(gltf.scene);
            return;
          }
          restoreSelection();
          clearMixer();
          if (root) {
            scene.remove(root);
            release(root);
          }
          root = gltf.scene;
          scene.add(root);
          meshes = [];
          root.traverse((o) => {
            if (o.isMesh) meshes.push(o);
          });
          const r = resources(root);
          r.geometry.forEach((x) => ownedGeometry.add(x));
          r.material.forEach((x) => ownedMaterial.add(x));
          r.texture.forEach((x) => ownedTextures.add(x));
          sharedAtLoad =
            meshes.length > 1 && meshes[0].material === meshes[1].material;
          status = 'ready';

          setupAnimation(gltf);
          draw();
        } catch (cause) {
          if (disposed || token !== request) return;
          status = 'error';
          error.textContent =
            'GLB를 읽지 못했습니다. 외부 URI·압축 없는 2 MiB 이하 GLB를 선택하거나 내장 샘플을 불러오세요. 상세: ' +
            cause.message;
          draw();
        }
      }
      function sample(kind) {
        if (kind in samples) document.querySelector('#model').value = kind;
        return loadModel(() =>
          kind === 'invalid'
            ? new TextEncoder().encode('invalid-glb').buffer
            : Uint8Array.from(atob(samples[kind]), (c) => c.charCodeAt(0)).buffer,
        );
      }
      on('#sample', 'click', () => {
        document.querySelector('#file').value = '';
        sample(document.querySelector('#model').value);
      });
      on('#invalid', 'click', () => sample('invalid'));
      on('#file', 'change', (e) => {
        const file = e.target.files[0];
        if (file) loadModel(() => file.arrayBuffer());
      });
      sample('animated');
      function report() {
        output.textContent =
          '상태: ' +
          status +
          ' / meshes: ' +
          meshes.length +
          ' / shared at load: ' +
          sharedAtLoad +
          ' / frames: ' +
          frames +
          ' / clips: ' +
          clips.map((c) => c.name + ':' + c.duration + 's') +
          ' / playing: ' +
          playing +
          ' / delta: ' +
          delta.toFixed(4) +
          's / mixer: ' +
          (mixer?.time ?? 0).toFixed(3) +
          's / speed: ' +
          speed +
          ' / X: ' +
          (meshes[0]?.position.x ?? 0).toFixed(3);
      }
      function draw() {
        if (disposed || !stage.clientWidth || !stage.clientHeight) return;
        renderer.render(scene, camera);
        frames++;
        report();
      }
      function resizeScene() {
        const w = stage.clientWidth,
          h = stage.clientHeight;
        if (!w || !h || disposed) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        draw();
      }
      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
      function cleanup() {
        if (disposed) return;
        disposed = true;
        observer.disconnect();
        events.abort();
        renderer.setAnimationLoop(null);
        request++;
        restoreSelection();
        clearMixer();
        for (const texture of ownedTextures) {
          texture.dispose();
          texture.image?.close?.();
        }
        for (const g of ownedGeometry) g.dispose();
        for (const m of ownedMaterial) m.dispose();
        renderer.dispose();
        scene.clear();
        output.textContent = '정리 완료';
      }
      on('#cleanup', 'click', cleanup);
      window.addEventListener('pagehide', cleanup, {
        once: true,
        signal: events.signal,
      });
    </script>
  </body>
</html>
```

<details>
<summary>힌트</summary>

- timestamp 자체와 이전 프레임과의 차이를 구별하세요.
- (now-last)/1000이 초입니다.
- seconds=true로 바꾸고 speed=1에서 시간을 재세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

mixer.update에 넘기는 delta 단위를 초로 바꾸면 재생이 화면 주사율과 덜 얽힙니다. timeScale은 초로 바꾼 delta에 적용되는 배율입니다. delta와 timeScale을 둘 다 곱해 이중으로 속도를 적용하지 않습니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>초 단위 mixer 시간</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage{width:480px;max-width:100%;height:280px} canvas{display:block;width:100%;height:100%;touch-action:none} .controls{display:flex;flex-wrap:wrap;align-items:center;gap:8px} input[type=number]{width:78px} input[type=file]{width:240px;max-width:100%} button{padding:6px} output{display:block;white-space:pre-wrap;overflow-wrap:anywhere} #error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>초 단위 mixer 시간</h1>
    <p>
      직접 만든 두 패널 GLB입니다. static은 geometry와 material을 공유하며
      animated는 Left를 1초 동안 X=-1.1에서 -.1로 옮깁니다. textured는 2×2 PNG를
      포함합니다. 파일은 현재 실행에서만 사용하며 백업에 포함하지 않습니다. 다시
      실행·새로고침·백업 복원 뒤에는 파일을 다시 선택하세요. 외부 URI를 참조하는
      GLB, .gltf 다중 파일, Draco·Meshopt·KTX2 압축은 이 예제에서 지원하지
      않습니다. 실패하면 파일을 바꾸거나 내장 모델을 선택해 샘플 불러오기를
      누르세요.
    </p>
    <div class="controls">
      <label
        >내장 모델
        <select id="model">
          <option>static</option>
          <option>animated</option>
          <option>empty</option>
          <option>textured</option>
          <option>offset</option>
        </select></label
      ><button id="sample">샘플 불러오기</button
      ><button id="invalid">손상 GLB 시험</button
      ><label
        >GLB 파일 (최대 2 MiB)
        <input id="file" type="file" accept=".glb,model/gltf-binary" /></label
      ><label
        >클립
        <select id="clips"></select></label
      ><button id="play">재생</button><button id="pause">일시정지</button
      ><button id="stop">정지·되감기</button
      ><label
        >속도
        <input
          id="value"
          type="number"
          min="0"
          max="3"
          step="0.25"
          value="1" /></label
      ><button id="apply">속도 적용</button
      ><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="초 단위 mixer 시간"></canvas></div>
    <output></output>
    <script type="module">
      import * as THREE from 'three';
      const stage = document.querySelector('#stage'),
        canvas = document.querySelector('canvas'),
        output = document.querySelector('output'),
        error = document.querySelector('#error');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 1000);
      camera.position.set(0, 0, 7);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);
      const events = new AbortController();
      let disposed = false,
        frames = 0;
      const ownedGeometry = new Set(),
        ownedMaterial = new Set(),
        ownedTextures = new Set(),
        ownedTargets = new Set();
      const on = (selector, type, fn) =>
        document
          .querySelector(selector)
          .addEventListener(type, fn, { signal: events.signal });
      import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
      const samples = {
        static:
          'Z2xURgIAAAAkAwAAwAIAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOlswLDFdfV0sImFjY2Vzc29ycyI6W3siYnVmZmVyVmlldyI6MCwiY29tcG9uZW50VHlwZSI6NTEyNiwidHlwZSI6IlZFQzMiLCJjb3VudCI6NiwibWluIjpbLTAuOCwtMC44LDBdLCJtYXgiOlswLjgsMC44LDBdfV0sImJ1ZmZlclZpZXdzIjpbeyJidWZmZXIiOjAsImJ5dGVPZmZzZXQiOjAsImJ5dGVMZW5ndGgiOjcyfV0sImV4dGVuc2lvbnNVc2VkIjpbIktIUl9tYXRlcmlhbHNfdW5saXQiXSwibWF0ZXJpYWxzIjpbeyJuYW1lIjoiU2hhcmVkQmx1ZSIsImRvdWJsZVNpZGVkIjp0cnVlLCJwYnJNZXRhbGxpY1JvdWdobmVzcyI6eyJiYXNlQ29sb3JGYWN0b3IiOlswLjAzLDAuMiwwLjgsMV0sIm1ldGFsbGljRmFjdG9yIjowfSwiZXh0ZW5zaW9ucyI6eyJLSFJfbWF0ZXJpYWxzX3VubGl0Ijp7fX19XSwibWVzaGVzIjpbeyJwcmltaXRpdmVzIjpbeyJhdHRyaWJ1dGVzIjp7IlBPU0lUSU9OIjowfSwibWF0ZXJpYWwiOjB9XX1dLCJub2RlcyI6W3sibWVzaCI6MCwibmFtZSI6IkxlZnQiLCJ0cmFuc2xhdGlvbiI6Wy0xLjEsMCwwXX0seyJtZXNoIjowLCJuYW1lIjoiUmlnaHQiLCJ0cmFuc2xhdGlvbiI6WzEuMSwwLDBdfV0sImJ1ZmZlcnMiOlt7ImJ5dGVMZW5ndGgiOjcyfV19IEgAAABCSU4AzcxMv83MTL8AAAAAzcxMP83MTL8AAAAAzcxMv83MTD8AAAAAzcxMv83MTD8AAAAAzcxMP83MTL8AAAAAzcxMP83MTD8AAAAA',
        animated:
          'Z2xURgIAAADUBAAAUAQAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOlswLDFdfV0sImFjY2Vzc29ycyI6W3siYnVmZmVyVmlldyI6MCwiY29tcG9uZW50VHlwZSI6NTEyNiwidHlwZSI6IlZFQzMiLCJjb3VudCI6NiwibWluIjpbLTAuOCwtMC44LDBdLCJtYXgiOlswLjgsMC44LDBdfSx7ImJ1ZmZlclZpZXciOjEsImNvbXBvbmVudFR5cGUiOjUxMjYsInR5cGUiOiJTQ0FMQVIiLCJjb3VudCI6MiwibWluIjpbMF0sIm1heCI6WzFdfSx7ImJ1ZmZlclZpZXciOjIsImNvbXBvbmVudFR5cGUiOjUxMjYsInR5cGUiOiJWRUMzIiwiY291bnQiOjJ9XSwiYnVmZmVyVmlld3MiOlt7ImJ1ZmZlciI6MCwiYnl0ZU9mZnNldCI6MCwiYnl0ZUxlbmd0aCI6NzJ9LHsiYnVmZmVyIjowLCJieXRlT2Zmc2V0Ijo3MiwiYnl0ZUxlbmd0aCI6OH0seyJidWZmZXIiOjAsImJ5dGVPZmZzZXQiOjgwLCJieXRlTGVuZ3RoIjoyNH1dLCJleHRlbnNpb25zVXNlZCI6WyJLSFJfbWF0ZXJpYWxzX3VubGl0Il0sIm1hdGVyaWFscyI6W3sibmFtZSI6IlNoYXJlZEJsdWUiLCJkb3VibGVTaWRlZCI6dHJ1ZSwicGJyTWV0YWxsaWNSb3VnaG5lc3MiOnsiYmFzZUNvbG9yRmFjdG9yIjpbMC4wMywwLjIsMC44LDFdLCJtZXRhbGxpY0ZhY3RvciI6MH0sImV4dGVuc2lvbnMiOnsiS0hSX21hdGVyaWFsc191bmxpdCI6e319fV0sIm1lc2hlcyI6W3sicHJpbWl0aXZlcyI6W3siYXR0cmlidXRlcyI6eyJQT1NJVElPTiI6MH0sIm1hdGVyaWFsIjowfV19XSwibm9kZXMiOlt7Im1lc2giOjAsIm5hbWUiOiJMZWZ0IiwidHJhbnNsYXRpb24iOlstMS4xLDAsMF19LHsibWVzaCI6MCwibmFtZSI6IlJpZ2h0IiwidHJhbnNsYXRpb24iOlsxLjEsMCwwXX1dLCJhbmltYXRpb25zIjpbeyJuYW1lIjoiU2xpZGVMZWZ0Iiwic2FtcGxlcnMiOlt7ImlucHV0IjoxLCJvdXRwdXQiOjIsImludGVycG9sYXRpb24iOiJMSU5FQVIifV0sImNoYW5uZWxzIjpbeyJzYW1wbGVyIjowLCJ0YXJnZXQiOnsibm9kZSI6MCwicGF0aCI6InRyYW5zbGF0aW9uIn19XX1dLCJidWZmZXJzIjpbeyJieXRlTGVuZ3RoIjoxMDR9XX1oAAAAQklOAM3MTL/NzEy/AAAAAM3MTD/NzEy/AAAAAM3MTL/NzEw/AAAAAM3MTL/NzEw/AAAAAM3MTD/NzEy/AAAAAM3MTD/NzEw/AAAAAAAAAAAAAIA/zcyMvwAAAAAAAAAAzczMvQAAAAAAAAAA',
        empty:
          'Z2xURgIAAAB4AAAAZAAAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOltdfV19',
        textured:
          'Z2xURgIAAACUBAAAtAMAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOlswLDFdfV0sImFjY2Vzc29ycyI6W3siYnVmZmVyVmlldyI6MCwiY29tcG9uZW50VHlwZSI6NTEyNiwidHlwZSI6IlZFQzMiLCJjb3VudCI6NiwibWluIjpbLTAuOCwtMC44LDBdLCJtYXgiOlswLjgsMC44LDBdfSx7ImJ1ZmZlclZpZXciOjEsImNvbXBvbmVudFR5cGUiOjUxMjYsInR5cGUiOiJWRUMyIiwiY291bnQiOjZ9XSwiYnVmZmVyVmlld3MiOlt7ImJ1ZmZlciI6MCwiYnl0ZU9mZnNldCI6MCwiYnl0ZUxlbmd0aCI6NzJ9LHsiYnVmZmVyIjowLCJieXRlT2Zmc2V0Ijo3MiwiYnl0ZUxlbmd0aCI6NDh9LHsiYnVmZmVyIjowLCJieXRlT2Zmc2V0IjoxMjAsImJ5dGVMZW5ndGgiOjc2fV0sImV4dGVuc2lvbnNVc2VkIjpbIktIUl9tYXRlcmlhbHNfdW5saXQiXSwibWF0ZXJpYWxzIjpbeyJuYW1lIjoiU2hhcmVkQmx1ZSIsImRvdWJsZVNpZGVkIjp0cnVlLCJwYnJNZXRhbGxpY1JvdWdobmVzcyI6eyJiYXNlQ29sb3JUZXh0dXJlIjp7ImluZGV4IjowfSwibWV0YWxsaWNGYWN0b3IiOjB9LCJleHRlbnNpb25zIjp7IktIUl9tYXRlcmlhbHNfdW5saXQiOnt9fX1dLCJtZXNoZXMiOlt7InByaW1pdGl2ZXMiOlt7ImF0dHJpYnV0ZXMiOnsiUE9TSVRJT04iOjAsIlRFWENPT1JEXzAiOjF9LCJtYXRlcmlhbCI6MH1dfV0sIm5vZGVzIjpbeyJtZXNoIjowLCJuYW1lIjoiTGVmdCIsInRyYW5zbGF0aW9uIjpbLTEuMSwwLDBdfSx7Im1lc2giOjAsIm5hbWUiOiJSaWdodCIsInRyYW5zbGF0aW9uIjpbMS4xLDAsMF19XSwiaW1hZ2VzIjpbeyJidWZmZXJWaWV3IjoyLCJtaW1lVHlwZSI6ImltYWdlL3BuZyJ9XSwidGV4dHVyZXMiOlt7InNvdXJjZSI6MH1dLCJidWZmZXJzIjpbeyJieXRlTGVuZ3RoIjoxOTZ9XX0gICDEAAAAQklOAM3MTL/NzEy/AAAAAM3MTD/NzEy/AAAAAM3MTL/NzEw/AAAAAM3MTL/NzEw/AAAAAM3MTD/NzEy/AAAAAM3MTD/NzEw/AAAAAAAAAAAAAAAAAACAPwAAAAAAAAAAAACAPwAAAAAAAIA/AACAPwAAAAAAAIA/AACAP4lQTkcNChoKAAAADUlIRFIAAAACAAAAAggGAAAAcrYNJAAAABNJREFUeJxj+M/A8B8MGRj+gwEAScgJ9xRjMp0AAAAASUVORK5CYII=',
        offset:
          'Z2xURgIAAABIAwAA5AIAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOlswLDFdfV0sImFjY2Vzc29ycyI6W3siYnVmZmVyVmlldyI6MCwiY29tcG9uZW50VHlwZSI6NTEyNiwidHlwZSI6IlZFQzMiLCJjb3VudCI6NiwibWluIjpbLTAuOCwtMC44LDBdLCJtYXgiOlswLjgsMC44LDBdfV0sImJ1ZmZlclZpZXdzIjpbeyJidWZmZXIiOjAsImJ5dGVPZmZzZXQiOjAsImJ5dGVMZW5ndGgiOjcyfV0sImV4dGVuc2lvbnNVc2VkIjpbIktIUl9tYXRlcmlhbHNfdW5saXQiXSwibWF0ZXJpYWxzIjpbeyJuYW1lIjoiU2hhcmVkQmx1ZSIsImRvdWJsZVNpZGVkIjp0cnVlLCJwYnJNZXRhbGxpY1JvdWdobmVzcyI6eyJiYXNlQ29sb3JGYWN0b3IiOlswLjAzLDAuMiwwLjgsMV0sIm1ldGFsbGljRmFjdG9yIjowfSwiZXh0ZW5zaW9ucyI6eyJLSFJfbWF0ZXJpYWxzX3VubGl0Ijp7fX19XSwibWVzaGVzIjpbeyJwcmltaXRpdmVzIjpbeyJhdHRyaWJ1dGVzIjp7IlBPU0lUSU9OIjowfSwibWF0ZXJpYWwiOjB9XX1dLCJub2RlcyI6W3sibWVzaCI6MCwibmFtZSI6IkxlZnQiLCJ0cmFuc2xhdGlvbiI6WzMxLjIsLTE1LDNdLCJzY2FsZSI6WzgsOCw4XX0seyJtZXNoIjowLCJuYW1lIjoiUmlnaHQiLCJ0cmFuc2xhdGlvbiI6WzQ4LjgsLTE1LDNdLCJzY2FsZSI6WzgsOCw4XX1dLCJidWZmZXJzIjpbeyJieXRlTGVuZ3RoIjo3Mn1dfUgAAABCSU4AzcxMv83MTL8AAAAAzcxMP83MTL8AAAAAzcxMv83MTD8AAAAAzcxMv83MTD8AAAAAzcxMP83MTL8AAAAAzcxMP83MTD8AAAAA',
      };
      const loader = new GLTFLoader();
      let root = null,
        meshes = [],
        status = 'loading',
        request = 0,
        sharedAtLoad = false;
      const restoreSelection = () => {};

      let mixer = null,
        clips = [],
        action = null,
        playing = false,
        last = 0,
        delta = 0,
        speed = Number(document.querySelector('#value').value);
      const seconds = true;
      function clearMixer() {
        playing = false;
        if (mixer && root) {
          mixer.stopAllAction();
          mixer.uncacheRoot(root);
        }
        mixer = null;
        action = null;
        clips = [];
      }
      function setupAnimation(gltf) {
        clips = gltf.animations;
        document
          .querySelector('#clips')
          .replaceChildren(...clips.map((c, i) => new Option(c.name, String(i))));
        mixer = new THREE.AnimationMixer(root);
        if (clips.length) {
          action = mixer.clipAction(clips[0]);
          action.play();
          playing = true;
          mixer.timeScale = speed;
        } else {
          document.querySelector('#clips').append(new Option('클립 없음', ''));
          error.textContent =
            '클립 없음: 모델과 파일 선택은 계속 사용할 수 있습니다.';
        }
        for (const id of ['play', 'pause', 'stop'])
          document.querySelector('#' + id).disabled = !clips.length;
      }
      on('#play', 'click', () => {
        if (!action) return;
        action.play();
        action.paused = false;
        playing = true;
        last = 0;
      });
      on('#pause', 'click', () => {
        playing = false;
        if (action) action.paused = true;
        draw();
      });
      on('#stop', 'click', () => {
        playing = false;
        if (action) {
          action.stop();
          action.reset();
        }
        if (mixer) {
          mixer.time = 0;
          mixer.update(0);
        }
        draw();
      });
      on('#clips', 'change', (e) => {
        if (!mixer || !clips.length) return;
        mixer.stopAllAction();
        action = mixer.clipAction(clips[Number(e.target.value)]);
        action.reset().play();
        playing = true;
        last = 0;
      });
      on('#apply', 'click', () => {
        const input = document.querySelector('#value');
        if (!input.value || !input.checkValidity()) return;
        speed = Number(input.value);
        if (mixer) mixer.timeScale = speed;
        draw();
      });
      function animate(now) {
        if (disposed) return;
        delta = last ? (now - last) / (seconds ? 1000 : 1) : 0;
        last = now;
        if (playing && mixer) {
          mixer.update(delta);
          draw();
        }
      }
      renderer.setAnimationLoop(animate);

      function resources(object) {
        const geometry = new Set(),
          material = new Set(),
          texture = new Set();
        object.traverse((o) => {
          if (o.geometry) geometry.add(o.geometry);
          for (const m of Array.isArray(o.material)
            ? o.material
            : o.material
              ? [o.material]
              : []) {
            material.add(m);
            for (const value of Object.values(m))
              if (value?.isTexture) texture.add(value);
          }
        });
        return { geometry, material, texture };
      }
      function release(object) {
        const r = resources(object);
        for (const g of r.geometry) {
          ownedGeometry.delete(g);
          g.dispose();
        }
        for (const m of r.material) {
          ownedMaterial.delete(m);
          m.dispose();
        }
        for (const tex of r.texture) {
          ownedTextures.delete(tex);
          tex.dispose();
          tex.image?.close?.();
        }
      }
      function validateGlb(buffer) {
        if (buffer.byteLength > 2 * 1024 * 1024) throw Error('GLB exceeds 2 MiB');
        const view = new DataView(buffer);
        if (
          view.getUint32(0, true) !== 0x46546c67 ||
          view.getUint32(4, true) !== 2 ||
          view.getUint32(8, true) !== buffer.byteLength ||
          view.getUint32(16, true) !== 0x4e4f534a
        )
          throw Error('Invalid GLB');
        const json = JSON.parse(
          new TextDecoder().decode(
            new Uint8Array(buffer, 20, view.getUint32(12, true)),
          ),
        );
        if (
          [...(json.buffers ?? []), ...(json.images ?? [])].some(
            (x) => x.uri && !x.uri.startsWith('data:'),
          )
        )
          throw Error('External URI unsupported');
        if ((json.extensionsUsed ?? []).some((x) => /draco|meshopt|basisu/i.test(x)))
          throw Error('Compression unsupported');
      }
      async function loadModel(readBuffer) {
        const token = ++request;
        status = 'loading';
        error.textContent = '';
        draw();
        try {
          const buffer = await readBuffer();
          validateGlb(buffer);
          const gltf = await loader.parseAsync(buffer, '');
          if (disposed || token !== request) {
            release(gltf.scene);
            return;
          }
          restoreSelection();
          clearMixer();
          if (root) {
            scene.remove(root);
            release(root);
          }
          root = gltf.scene;
          scene.add(root);
          meshes = [];
          root.traverse((o) => {
            if (o.isMesh) meshes.push(o);
          });
          const r = resources(root);
          r.geometry.forEach((x) => ownedGeometry.add(x));
          r.material.forEach((x) => ownedMaterial.add(x));
          r.texture.forEach((x) => ownedTextures.add(x));
          sharedAtLoad =
            meshes.length > 1 && meshes[0].material === meshes[1].material;
          status = 'ready';

          setupAnimation(gltf);
          draw();
        } catch (cause) {
          if (disposed || token !== request) return;
          status = 'error';
          error.textContent =
            'GLB를 읽지 못했습니다. 외부 URI·압축 없는 2 MiB 이하 GLB를 선택하거나 내장 샘플을 불러오세요. 상세: ' +
            cause.message;
          draw();
        }
      }
      function sample(kind) {
        if (kind in samples) document.querySelector('#model').value = kind;
        return loadModel(() =>
          kind === 'invalid'
            ? new TextEncoder().encode('invalid-glb').buffer
            : Uint8Array.from(atob(samples[kind]), (c) => c.charCodeAt(0)).buffer,
        );
      }
      on('#sample', 'click', () => {
        document.querySelector('#file').value = '';
        sample(document.querySelector('#model').value);
      });
      on('#invalid', 'click', () => sample('invalid'));
      on('#file', 'change', (e) => {
        const file = e.target.files[0];
        if (file) loadModel(() => file.arrayBuffer());
      });
      sample('animated');
      function report() {
        output.textContent =
          '상태: ' +
          status +
          ' / meshes: ' +
          meshes.length +
          ' / shared at load: ' +
          sharedAtLoad +
          ' / frames: ' +
          frames +
          ' / clips: ' +
          clips.map((c) => c.name + ':' + c.duration + 's') +
          ' / playing: ' +
          playing +
          ' / delta: ' +
          delta.toFixed(4) +
          's / mixer: ' +
          (mixer?.time ?? 0).toFixed(3) +
          's / speed: ' +
          speed +
          ' / X: ' +
          (meshes[0]?.position.x ?? 0).toFixed(3);
      }
      function draw() {
        if (disposed || !stage.clientWidth || !stage.clientHeight) return;
        renderer.render(scene, camera);
        frames++;
        report();
      }
      function resizeScene() {
        const w = stage.clientWidth,
          h = stage.clientHeight;
        if (!w || !h || disposed) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        draw();
      }
      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
      function cleanup() {
        if (disposed) return;
        disposed = true;
        observer.disconnect();
        events.abort();
        renderer.setAnimationLoop(null);
        request++;
        restoreSelection();
        clearMixer();
        for (const texture of ownedTextures) {
          texture.dispose();
          texture.image?.close?.();
        }
        for (const g of ownedGeometry) g.dispose();
        for (const m of ownedMaterial) m.dispose();
        renderer.dispose();
        scene.clear();
        output.textContent = '정리 완료';
      }
      on('#cleanup', 'click', cleanup);
      window.addEventListener('pagehide', cleanup, {
        once: true,
        signal: events.signal,
      });
    </script>
  </body>
</html>
```

</details>

- 60Hz에서만 맞는 고정 delta는 왜 문제가 되나요?
- loop하는 X와 mixer.time은 왜 다른가요?

### action 재생·일시정지·정지·속도

시작 코드의 action은 준비됐지만 playing=false라 시간이 흐르지 않습니다. 재생을 누르고 X와 mixer 시간을 읽으세요. 일시정지는 현재 포즈를 유지하며 action.paused=true로 둡니다. 다시 재생하면 그 위치부터 이어집니다. 정지·되감기는 action.stop(), reset()과 mixer.time=0으로 시작 포즈를 복구합니다.

속도에 2를 입력하고 속도 적용을 누르세요. mixer.timeScale이 2가 되어 같은 실제 시간에 clip을 두 배 빨리 평가합니다. 속도 0도 유효하며 UI는 유지됩니다. 정지 뒤 재생, 클립 없는 static 불러오기, 다시 animated 불러오기를 비교하세요. 정리 버튼을 누르면 loop 중지, stopAllAction(), uncacheRoot(root), 실제 자원 해제를 따로 수행합니다.

**예상 결과**

일시정지 중 X와 mixer.time이 같고 재생하면 이어집니다. 정지 뒤 time=0, Left X=-1.1입니다. speed=2가 speed=1보다 두 배 빠릅니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>재생·정지·속도</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage{width:480px;max-width:100%;height:280px} canvas{display:block;width:100%;height:100%;touch-action:none} .controls{display:flex;flex-wrap:wrap;align-items:center;gap:8px} input[type=number]{width:78px} input[type=file]{width:240px;max-width:100%} button{padding:6px} output{display:block;white-space:pre-wrap;overflow-wrap:anywhere} #error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>재생·정지·속도</h1>
    <p>
      직접 만든 두 패널 GLB입니다. static은 geometry와 material을 공유하며
      animated는 Left를 1초 동안 X=-1.1에서 -.1로 옮깁니다. textured는 2×2 PNG를
      포함합니다. 파일은 현재 실행에서만 사용하며 백업에 포함하지 않습니다. 다시
      실행·새로고침·백업 복원 뒤에는 파일을 다시 선택하세요. 외부 URI를 참조하는
      GLB, .gltf 다중 파일, Draco·Meshopt·KTX2 압축은 이 예제에서 지원하지
      않습니다. 실패하면 파일을 바꾸거나 내장 모델을 선택해 샘플 불러오기를
      누르세요.
    </p>
    <div class="controls">
      <label
        >내장 모델
        <select id="model">
          <option>static</option>
          <option>animated</option>
          <option>empty</option>
          <option>textured</option>
          <option>offset</option>
        </select></label
      ><button id="sample">샘플 불러오기</button
      ><button id="invalid">손상 GLB 시험</button
      ><label
        >GLB 파일 (최대 2 MiB)
        <input id="file" type="file" accept=".glb,model/gltf-binary" /></label
      ><label
        >클립
        <select id="clips"></select></label
      ><button id="play">재생</button><button id="pause">일시정지</button
      ><button id="stop">정지·되감기</button
      ><label
        >속도
        <input
          id="value"
          type="number"
          min="0"
          max="3"
          step="0.25"
          value="1" /></label
      ><button id="apply">속도 적용</button
      ><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="재생·정지·속도"></canvas></div>
    <output></output>
    <script type="module">
      import * as THREE from 'three';
      const stage = document.querySelector('#stage'),
        canvas = document.querySelector('canvas'),
        output = document.querySelector('output'),
        error = document.querySelector('#error');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 1000);
      camera.position.set(0, 0, 7);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);
      const events = new AbortController();
      let disposed = false,
        frames = 0;
      const ownedGeometry = new Set(),
        ownedMaterial = new Set(),
        ownedTextures = new Set(),
        ownedTargets = new Set();
      const on = (selector, type, fn) =>
        document
          .querySelector(selector)
          .addEventListener(type, fn, { signal: events.signal });
      import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
      const samples = {
        static:
          'Z2xURgIAAAAkAwAAwAIAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOlswLDFdfV0sImFjY2Vzc29ycyI6W3siYnVmZmVyVmlldyI6MCwiY29tcG9uZW50VHlwZSI6NTEyNiwidHlwZSI6IlZFQzMiLCJjb3VudCI6NiwibWluIjpbLTAuOCwtMC44LDBdLCJtYXgiOlswLjgsMC44LDBdfV0sImJ1ZmZlclZpZXdzIjpbeyJidWZmZXIiOjAsImJ5dGVPZmZzZXQiOjAsImJ5dGVMZW5ndGgiOjcyfV0sImV4dGVuc2lvbnNVc2VkIjpbIktIUl9tYXRlcmlhbHNfdW5saXQiXSwibWF0ZXJpYWxzIjpbeyJuYW1lIjoiU2hhcmVkQmx1ZSIsImRvdWJsZVNpZGVkIjp0cnVlLCJwYnJNZXRhbGxpY1JvdWdobmVzcyI6eyJiYXNlQ29sb3JGYWN0b3IiOlswLjAzLDAuMiwwLjgsMV0sIm1ldGFsbGljRmFjdG9yIjowfSwiZXh0ZW5zaW9ucyI6eyJLSFJfbWF0ZXJpYWxzX3VubGl0Ijp7fX19XSwibWVzaGVzIjpbeyJwcmltaXRpdmVzIjpbeyJhdHRyaWJ1dGVzIjp7IlBPU0lUSU9OIjowfSwibWF0ZXJpYWwiOjB9XX1dLCJub2RlcyI6W3sibWVzaCI6MCwibmFtZSI6IkxlZnQiLCJ0cmFuc2xhdGlvbiI6Wy0xLjEsMCwwXX0seyJtZXNoIjowLCJuYW1lIjoiUmlnaHQiLCJ0cmFuc2xhdGlvbiI6WzEuMSwwLDBdfV0sImJ1ZmZlcnMiOlt7ImJ5dGVMZW5ndGgiOjcyfV19IEgAAABCSU4AzcxMv83MTL8AAAAAzcxMP83MTL8AAAAAzcxMv83MTD8AAAAAzcxMv83MTD8AAAAAzcxMP83MTL8AAAAAzcxMP83MTD8AAAAA',
        animated:
          'Z2xURgIAAADUBAAAUAQAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOlswLDFdfV0sImFjY2Vzc29ycyI6W3siYnVmZmVyVmlldyI6MCwiY29tcG9uZW50VHlwZSI6NTEyNiwidHlwZSI6IlZFQzMiLCJjb3VudCI6NiwibWluIjpbLTAuOCwtMC44LDBdLCJtYXgiOlswLjgsMC44LDBdfSx7ImJ1ZmZlclZpZXciOjEsImNvbXBvbmVudFR5cGUiOjUxMjYsInR5cGUiOiJTQ0FMQVIiLCJjb3VudCI6MiwibWluIjpbMF0sIm1heCI6WzFdfSx7ImJ1ZmZlclZpZXciOjIsImNvbXBvbmVudFR5cGUiOjUxMjYsInR5cGUiOiJWRUMzIiwiY291bnQiOjJ9XSwiYnVmZmVyVmlld3MiOlt7ImJ1ZmZlciI6MCwiYnl0ZU9mZnNldCI6MCwiYnl0ZUxlbmd0aCI6NzJ9LHsiYnVmZmVyIjowLCJieXRlT2Zmc2V0Ijo3MiwiYnl0ZUxlbmd0aCI6OH0seyJidWZmZXIiOjAsImJ5dGVPZmZzZXQiOjgwLCJieXRlTGVuZ3RoIjoyNH1dLCJleHRlbnNpb25zVXNlZCI6WyJLSFJfbWF0ZXJpYWxzX3VubGl0Il0sIm1hdGVyaWFscyI6W3sibmFtZSI6IlNoYXJlZEJsdWUiLCJkb3VibGVTaWRlZCI6dHJ1ZSwicGJyTWV0YWxsaWNSb3VnaG5lc3MiOnsiYmFzZUNvbG9yRmFjdG9yIjpbMC4wMywwLjIsMC44LDFdLCJtZXRhbGxpY0ZhY3RvciI6MH0sImV4dGVuc2lvbnMiOnsiS0hSX21hdGVyaWFsc191bmxpdCI6e319fV0sIm1lc2hlcyI6W3sicHJpbWl0aXZlcyI6W3siYXR0cmlidXRlcyI6eyJQT1NJVElPTiI6MH0sIm1hdGVyaWFsIjowfV19XSwibm9kZXMiOlt7Im1lc2giOjAsIm5hbWUiOiJMZWZ0IiwidHJhbnNsYXRpb24iOlstMS4xLDAsMF19LHsibWVzaCI6MCwibmFtZSI6IlJpZ2h0IiwidHJhbnNsYXRpb24iOlsxLjEsMCwwXX1dLCJhbmltYXRpb25zIjpbeyJuYW1lIjoiU2xpZGVMZWZ0Iiwic2FtcGxlcnMiOlt7ImlucHV0IjoxLCJvdXRwdXQiOjIsImludGVycG9sYXRpb24iOiJMSU5FQVIifV0sImNoYW5uZWxzIjpbeyJzYW1wbGVyIjowLCJ0YXJnZXQiOnsibm9kZSI6MCwicGF0aCI6InRyYW5zbGF0aW9uIn19XX1dLCJidWZmZXJzIjpbeyJieXRlTGVuZ3RoIjoxMDR9XX1oAAAAQklOAM3MTL/NzEy/AAAAAM3MTD/NzEy/AAAAAM3MTL/NzEw/AAAAAM3MTL/NzEw/AAAAAM3MTD/NzEy/AAAAAM3MTD/NzEw/AAAAAAAAAAAAAIA/zcyMvwAAAAAAAAAAzczMvQAAAAAAAAAA',
        empty:
          'Z2xURgIAAAB4AAAAZAAAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOltdfV19',
        textured:
          'Z2xURgIAAACUBAAAtAMAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOlswLDFdfV0sImFjY2Vzc29ycyI6W3siYnVmZmVyVmlldyI6MCwiY29tcG9uZW50VHlwZSI6NTEyNiwidHlwZSI6IlZFQzMiLCJjb3VudCI6NiwibWluIjpbLTAuOCwtMC44LDBdLCJtYXgiOlswLjgsMC44LDBdfSx7ImJ1ZmZlclZpZXciOjEsImNvbXBvbmVudFR5cGUiOjUxMjYsInR5cGUiOiJWRUMyIiwiY291bnQiOjZ9XSwiYnVmZmVyVmlld3MiOlt7ImJ1ZmZlciI6MCwiYnl0ZU9mZnNldCI6MCwiYnl0ZUxlbmd0aCI6NzJ9LHsiYnVmZmVyIjowLCJieXRlT2Zmc2V0Ijo3MiwiYnl0ZUxlbmd0aCI6NDh9LHsiYnVmZmVyIjowLCJieXRlT2Zmc2V0IjoxMjAsImJ5dGVMZW5ndGgiOjc2fV0sImV4dGVuc2lvbnNVc2VkIjpbIktIUl9tYXRlcmlhbHNfdW5saXQiXSwibWF0ZXJpYWxzIjpbeyJuYW1lIjoiU2hhcmVkQmx1ZSIsImRvdWJsZVNpZGVkIjp0cnVlLCJwYnJNZXRhbGxpY1JvdWdobmVzcyI6eyJiYXNlQ29sb3JUZXh0dXJlIjp7ImluZGV4IjowfSwibWV0YWxsaWNGYWN0b3IiOjB9LCJleHRlbnNpb25zIjp7IktIUl9tYXRlcmlhbHNfdW5saXQiOnt9fX1dLCJtZXNoZXMiOlt7InByaW1pdGl2ZXMiOlt7ImF0dHJpYnV0ZXMiOnsiUE9TSVRJT04iOjAsIlRFWENPT1JEXzAiOjF9LCJtYXRlcmlhbCI6MH1dfV0sIm5vZGVzIjpbeyJtZXNoIjowLCJuYW1lIjoiTGVmdCIsInRyYW5zbGF0aW9uIjpbLTEuMSwwLDBdfSx7Im1lc2giOjAsIm5hbWUiOiJSaWdodCIsInRyYW5zbGF0aW9uIjpbMS4xLDAsMF19XSwiaW1hZ2VzIjpbeyJidWZmZXJWaWV3IjoyLCJtaW1lVHlwZSI6ImltYWdlL3BuZyJ9XSwidGV4dHVyZXMiOlt7InNvdXJjZSI6MH1dLCJidWZmZXJzIjpbeyJieXRlTGVuZ3RoIjoxOTZ9XX0gICDEAAAAQklOAM3MTL/NzEy/AAAAAM3MTD/NzEy/AAAAAM3MTL/NzEw/AAAAAM3MTL/NzEw/AAAAAM3MTD/NzEy/AAAAAM3MTD/NzEw/AAAAAAAAAAAAAAAAAACAPwAAAAAAAAAAAACAPwAAAAAAAIA/AACAPwAAAAAAAIA/AACAP4lQTkcNChoKAAAADUlIRFIAAAACAAAAAggGAAAAcrYNJAAAABNJREFUeJxj+M/A8B8MGRj+gwEAScgJ9xRjMp0AAAAASUVORK5CYII=',
        offset:
          'Z2xURgIAAABIAwAA5AIAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOlswLDFdfV0sImFjY2Vzc29ycyI6W3siYnVmZmVyVmlldyI6MCwiY29tcG9uZW50VHlwZSI6NTEyNiwidHlwZSI6IlZFQzMiLCJjb3VudCI6NiwibWluIjpbLTAuOCwtMC44LDBdLCJtYXgiOlswLjgsMC44LDBdfV0sImJ1ZmZlclZpZXdzIjpbeyJidWZmZXIiOjAsImJ5dGVPZmZzZXQiOjAsImJ5dGVMZW5ndGgiOjcyfV0sImV4dGVuc2lvbnNVc2VkIjpbIktIUl9tYXRlcmlhbHNfdW5saXQiXSwibWF0ZXJpYWxzIjpbeyJuYW1lIjoiU2hhcmVkQmx1ZSIsImRvdWJsZVNpZGVkIjp0cnVlLCJwYnJNZXRhbGxpY1JvdWdobmVzcyI6eyJiYXNlQ29sb3JGYWN0b3IiOlswLjAzLDAuMiwwLjgsMV0sIm1ldGFsbGljRmFjdG9yIjowfSwiZXh0ZW5zaW9ucyI6eyJLSFJfbWF0ZXJpYWxzX3VubGl0Ijp7fX19XSwibWVzaGVzIjpbeyJwcmltaXRpdmVzIjpbeyJhdHRyaWJ1dGVzIjp7IlBPU0lUSU9OIjowfSwibWF0ZXJpYWwiOjB9XX1dLCJub2RlcyI6W3sibWVzaCI6MCwibmFtZSI6IkxlZnQiLCJ0cmFuc2xhdGlvbiI6WzMxLjIsLTE1LDNdLCJzY2FsZSI6WzgsOCw4XX0seyJtZXNoIjowLCJuYW1lIjoiUmlnaHQiLCJ0cmFuc2xhdGlvbiI6WzQ4LjgsLTE1LDNdLCJzY2FsZSI6WzgsOCw4XX1dLCJidWZmZXJzIjpbeyJieXRlTGVuZ3RoIjo3Mn1dfUgAAABCSU4AzcxMv83MTL8AAAAAzcxMP83MTL8AAAAAzcxMv83MTD8AAAAAzcxMv83MTD8AAAAAzcxMP83MTL8AAAAAzcxMP83MTD8AAAAA',
      };
      const loader = new GLTFLoader();
      let root = null,
        meshes = [],
        status = 'loading',
        request = 0,
        sharedAtLoad = false;
      const restoreSelection = () => {};

      let mixer = null,
        clips = [],
        action = null,
        playing = false,
        last = 0,
        delta = 0,
        speed = Number(document.querySelector('#value').value);
      const seconds = true;
      function clearMixer() {
        playing = false;
        if (mixer && root) {
          mixer.stopAllAction();
          mixer.uncacheRoot(root);
        }
        mixer = null;
        action = null;
        clips = [];
      }
      function setupAnimation(gltf) {
        clips = gltf.animations;
        document
          .querySelector('#clips')
          .replaceChildren(...clips.map((c, i) => new Option(c.name, String(i))));
        mixer = new THREE.AnimationMixer(root);
        if (clips.length) {
          action = mixer.clipAction(clips[0]);
          action.play();
          playing = false;
          mixer.timeScale = speed;
        } else {
          document.querySelector('#clips').append(new Option('클립 없음', ''));
          error.textContent =
            '클립 없음: 모델과 파일 선택은 계속 사용할 수 있습니다.';
        }
        for (const id of ['play', 'pause', 'stop'])
          document.querySelector('#' + id).disabled = !clips.length;
      }
      on('#play', 'click', () => {
        if (!action) return;
        action.play();
        action.paused = false;
        playing = true;
        last = 0;
      });
      on('#pause', 'click', () => {
        playing = false;
        if (action) action.paused = true;
        draw();
      });
      on('#stop', 'click', () => {
        playing = false;
        if (action) {
          action.stop();
          action.reset();
        }
        if (mixer) {
          mixer.time = 0;
          mixer.update(0);
        }
        draw();
      });
      on('#clips', 'change', (e) => {
        if (!mixer || !clips.length) return;
        mixer.stopAllAction();
        action = mixer.clipAction(clips[Number(e.target.value)]);
        action.reset().play();
        playing = true;
        last = 0;
      });
      on('#apply', 'click', () => {
        const input = document.querySelector('#value');
        if (!input.value || !input.checkValidity()) return;
        speed = Number(input.value);
        if (mixer) mixer.timeScale = speed;
        draw();
      });
      function animate(now) {
        if (disposed) return;
        delta = last ? (now - last) / (seconds ? 1000 : 1) : 0;
        last = now;
        if (playing && mixer) {
          mixer.update(delta);
          draw();
        }
      }
      renderer.setAnimationLoop(animate);

      function resources(object) {
        const geometry = new Set(),
          material = new Set(),
          texture = new Set();
        object.traverse((o) => {
          if (o.geometry) geometry.add(o.geometry);
          for (const m of Array.isArray(o.material)
            ? o.material
            : o.material
              ? [o.material]
              : []) {
            material.add(m);
            for (const value of Object.values(m))
              if (value?.isTexture) texture.add(value);
          }
        });
        return { geometry, material, texture };
      }
      function release(object) {
        const r = resources(object);
        for (const g of r.geometry) {
          ownedGeometry.delete(g);
          g.dispose();
        }
        for (const m of r.material) {
          ownedMaterial.delete(m);
          m.dispose();
        }
        for (const tex of r.texture) {
          ownedTextures.delete(tex);
          tex.dispose();
          tex.image?.close?.();
        }
      }
      function validateGlb(buffer) {
        if (buffer.byteLength > 2 * 1024 * 1024) throw Error('GLB exceeds 2 MiB');
        const view = new DataView(buffer);
        if (
          view.getUint32(0, true) !== 0x46546c67 ||
          view.getUint32(4, true) !== 2 ||
          view.getUint32(8, true) !== buffer.byteLength ||
          view.getUint32(16, true) !== 0x4e4f534a
        )
          throw Error('Invalid GLB');
        const json = JSON.parse(
          new TextDecoder().decode(
            new Uint8Array(buffer, 20, view.getUint32(12, true)),
          ),
        );
        if (
          [...(json.buffers ?? []), ...(json.images ?? [])].some(
            (x) => x.uri && !x.uri.startsWith('data:'),
          )
        )
          throw Error('External URI unsupported');
        if ((json.extensionsUsed ?? []).some((x) => /draco|meshopt|basisu/i.test(x)))
          throw Error('Compression unsupported');
      }
      async function loadModel(readBuffer) {
        const token = ++request;
        status = 'loading';
        error.textContent = '';
        draw();
        try {
          const buffer = await readBuffer();
          validateGlb(buffer);
          const gltf = await loader.parseAsync(buffer, '');
          if (disposed || token !== request) {
            release(gltf.scene);
            return;
          }
          restoreSelection();
          clearMixer();
          if (root) {
            scene.remove(root);
            release(root);
          }
          root = gltf.scene;
          scene.add(root);
          meshes = [];
          root.traverse((o) => {
            if (o.isMesh) meshes.push(o);
          });
          const r = resources(root);
          r.geometry.forEach((x) => ownedGeometry.add(x));
          r.material.forEach((x) => ownedMaterial.add(x));
          r.texture.forEach((x) => ownedTextures.add(x));
          sharedAtLoad =
            meshes.length > 1 && meshes[0].material === meshes[1].material;
          status = 'ready';

          setupAnimation(gltf);
          draw();
        } catch (cause) {
          if (disposed || token !== request) return;
          status = 'error';
          error.textContent =
            'GLB를 읽지 못했습니다. 외부 URI·압축 없는 2 MiB 이하 GLB를 선택하거나 내장 샘플을 불러오세요. 상세: ' +
            cause.message;
          draw();
        }
      }
      function sample(kind) {
        if (kind in samples) document.querySelector('#model').value = kind;
        return loadModel(() =>
          kind === 'invalid'
            ? new TextEncoder().encode('invalid-glb').buffer
            : Uint8Array.from(atob(samples[kind]), (c) => c.charCodeAt(0)).buffer,
        );
      }
      on('#sample', 'click', () => {
        document.querySelector('#file').value = '';
        sample(document.querySelector('#model').value);
      });
      on('#invalid', 'click', () => sample('invalid'));
      on('#file', 'change', (e) => {
        const file = e.target.files[0];
        if (file) loadModel(() => file.arrayBuffer());
      });
      sample('animated');
      function report() {
        output.textContent =
          '상태: ' +
          status +
          ' / meshes: ' +
          meshes.length +
          ' / shared at load: ' +
          sharedAtLoad +
          ' / frames: ' +
          frames +
          ' / clips: ' +
          clips.map((c) => c.name + ':' + c.duration + 's') +
          ' / playing: ' +
          playing +
          ' / delta: ' +
          delta.toFixed(4) +
          's / mixer: ' +
          (mixer?.time ?? 0).toFixed(3) +
          's / speed: ' +
          speed +
          ' / X: ' +
          (meshes[0]?.position.x ?? 0).toFixed(3);
      }
      function draw() {
        if (disposed || !stage.clientWidth || !stage.clientHeight) return;
        renderer.render(scene, camera);
        frames++;
        report();
      }
      function resizeScene() {
        const w = stage.clientWidth,
          h = stage.clientHeight;
        if (!w || !h || disposed) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        draw();
      }
      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
      function cleanup() {
        if (disposed) return;
        disposed = true;
        observer.disconnect();
        events.abort();
        renderer.setAnimationLoop(null);
        request++;
        restoreSelection();
        clearMixer();
        for (const texture of ownedTextures) {
          texture.dispose();
          texture.image?.close?.();
        }
        for (const g of ownedGeometry) g.dispose();
        for (const m of ownedMaterial) m.dispose();
        renderer.dispose();
        scene.clear();
        output.textContent = '정리 완료';
      }
      on('#cleanup', 'click', cleanup);
      window.addEventListener('pagehide', cleanup, {
        once: true,
        signal: events.signal,
      });
    </script>
  </body>
</html>
```

<details>
<summary>힌트</summary>

- playing과 action.paused를 같이 읽으세요.
- 속도는 숫자 입력 뒤 적용해야 반영됩니다.
- 재생→일시정지→재생→정지와 speed 1/2를 비교하세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

정지는 재생 예약을 해제하고 원래 프로퍼티 값을 복구합니다. 일시정지는 예약을 남긴 채 해당 action 시간을 유지합니다. 모델 교체 때는 이전 action을 새 root에 재사용하지 않습니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>재생·정지·속도</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage{width:480px;max-width:100%;height:280px} canvas{display:block;width:100%;height:100%;touch-action:none} .controls{display:flex;flex-wrap:wrap;align-items:center;gap:8px} input[type=number]{width:78px} input[type=file]{width:240px;max-width:100%} button{padding:6px} output{display:block;white-space:pre-wrap;overflow-wrap:anywhere} #error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>재생·정지·속도</h1>
    <p>
      직접 만든 두 패널 GLB입니다. static은 geometry와 material을 공유하며
      animated는 Left를 1초 동안 X=-1.1에서 -.1로 옮깁니다. textured는 2×2 PNG를
      포함합니다. 파일은 현재 실행에서만 사용하며 백업에 포함하지 않습니다. 다시
      실행·새로고침·백업 복원 뒤에는 파일을 다시 선택하세요. 외부 URI를 참조하는
      GLB, .gltf 다중 파일, Draco·Meshopt·KTX2 압축은 이 예제에서 지원하지
      않습니다. 실패하면 파일을 바꾸거나 내장 모델을 선택해 샘플 불러오기를
      누르세요.
    </p>
    <div class="controls">
      <label
        >내장 모델
        <select id="model">
          <option>static</option>
          <option>animated</option>
          <option>empty</option>
          <option>textured</option>
          <option>offset</option>
        </select></label
      ><button id="sample">샘플 불러오기</button
      ><button id="invalid">손상 GLB 시험</button
      ><label
        >GLB 파일 (최대 2 MiB)
        <input id="file" type="file" accept=".glb,model/gltf-binary" /></label
      ><label
        >클립
        <select id="clips"></select></label
      ><button id="play">재생</button><button id="pause">일시정지</button
      ><button id="stop">정지·되감기</button
      ><label
        >속도
        <input
          id="value"
          type="number"
          min="0"
          max="3"
          step="0.25"
          value="2" /></label
      ><button id="apply">속도 적용</button
      ><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="재생·정지·속도"></canvas></div>
    <output></output>
    <script type="module">
      import * as THREE from 'three';
      const stage = document.querySelector('#stage'),
        canvas = document.querySelector('canvas'),
        output = document.querySelector('output'),
        error = document.querySelector('#error');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 1000);
      camera.position.set(0, 0, 7);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(1);
      const events = new AbortController();
      let disposed = false,
        frames = 0;
      const ownedGeometry = new Set(),
        ownedMaterial = new Set(),
        ownedTextures = new Set(),
        ownedTargets = new Set();
      const on = (selector, type, fn) =>
        document
          .querySelector(selector)
          .addEventListener(type, fn, { signal: events.signal });
      import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
      const samples = {
        static:
          'Z2xURgIAAAAkAwAAwAIAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOlswLDFdfV0sImFjY2Vzc29ycyI6W3siYnVmZmVyVmlldyI6MCwiY29tcG9uZW50VHlwZSI6NTEyNiwidHlwZSI6IlZFQzMiLCJjb3VudCI6NiwibWluIjpbLTAuOCwtMC44LDBdLCJtYXgiOlswLjgsMC44LDBdfV0sImJ1ZmZlclZpZXdzIjpbeyJidWZmZXIiOjAsImJ5dGVPZmZzZXQiOjAsImJ5dGVMZW5ndGgiOjcyfV0sImV4dGVuc2lvbnNVc2VkIjpbIktIUl9tYXRlcmlhbHNfdW5saXQiXSwibWF0ZXJpYWxzIjpbeyJuYW1lIjoiU2hhcmVkQmx1ZSIsImRvdWJsZVNpZGVkIjp0cnVlLCJwYnJNZXRhbGxpY1JvdWdobmVzcyI6eyJiYXNlQ29sb3JGYWN0b3IiOlswLjAzLDAuMiwwLjgsMV0sIm1ldGFsbGljRmFjdG9yIjowfSwiZXh0ZW5zaW9ucyI6eyJLSFJfbWF0ZXJpYWxzX3VubGl0Ijp7fX19XSwibWVzaGVzIjpbeyJwcmltaXRpdmVzIjpbeyJhdHRyaWJ1dGVzIjp7IlBPU0lUSU9OIjowfSwibWF0ZXJpYWwiOjB9XX1dLCJub2RlcyI6W3sibWVzaCI6MCwibmFtZSI6IkxlZnQiLCJ0cmFuc2xhdGlvbiI6Wy0xLjEsMCwwXX0seyJtZXNoIjowLCJuYW1lIjoiUmlnaHQiLCJ0cmFuc2xhdGlvbiI6WzEuMSwwLDBdfV0sImJ1ZmZlcnMiOlt7ImJ5dGVMZW5ndGgiOjcyfV19IEgAAABCSU4AzcxMv83MTL8AAAAAzcxMP83MTL8AAAAAzcxMv83MTD8AAAAAzcxMv83MTD8AAAAAzcxMP83MTL8AAAAAzcxMP83MTD8AAAAA',
        animated:
          'Z2xURgIAAADUBAAAUAQAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOlswLDFdfV0sImFjY2Vzc29ycyI6W3siYnVmZmVyVmlldyI6MCwiY29tcG9uZW50VHlwZSI6NTEyNiwidHlwZSI6IlZFQzMiLCJjb3VudCI6NiwibWluIjpbLTAuOCwtMC44LDBdLCJtYXgiOlswLjgsMC44LDBdfSx7ImJ1ZmZlclZpZXciOjEsImNvbXBvbmVudFR5cGUiOjUxMjYsInR5cGUiOiJTQ0FMQVIiLCJjb3VudCI6MiwibWluIjpbMF0sIm1heCI6WzFdfSx7ImJ1ZmZlclZpZXciOjIsImNvbXBvbmVudFR5cGUiOjUxMjYsInR5cGUiOiJWRUMzIiwiY291bnQiOjJ9XSwiYnVmZmVyVmlld3MiOlt7ImJ1ZmZlciI6MCwiYnl0ZU9mZnNldCI6MCwiYnl0ZUxlbmd0aCI6NzJ9LHsiYnVmZmVyIjowLCJieXRlT2Zmc2V0Ijo3MiwiYnl0ZUxlbmd0aCI6OH0seyJidWZmZXIiOjAsImJ5dGVPZmZzZXQiOjgwLCJieXRlTGVuZ3RoIjoyNH1dLCJleHRlbnNpb25zVXNlZCI6WyJLSFJfbWF0ZXJpYWxzX3VubGl0Il0sIm1hdGVyaWFscyI6W3sibmFtZSI6IlNoYXJlZEJsdWUiLCJkb3VibGVTaWRlZCI6dHJ1ZSwicGJyTWV0YWxsaWNSb3VnaG5lc3MiOnsiYmFzZUNvbG9yRmFjdG9yIjpbMC4wMywwLjIsMC44LDFdLCJtZXRhbGxpY0ZhY3RvciI6MH0sImV4dGVuc2lvbnMiOnsiS0hSX21hdGVyaWFsc191bmxpdCI6e319fV0sIm1lc2hlcyI6W3sicHJpbWl0aXZlcyI6W3siYXR0cmlidXRlcyI6eyJQT1NJVElPTiI6MH0sIm1hdGVyaWFsIjowfV19XSwibm9kZXMiOlt7Im1lc2giOjAsIm5hbWUiOiJMZWZ0IiwidHJhbnNsYXRpb24iOlstMS4xLDAsMF19LHsibWVzaCI6MCwibmFtZSI6IlJpZ2h0IiwidHJhbnNsYXRpb24iOlsxLjEsMCwwXX1dLCJhbmltYXRpb25zIjpbeyJuYW1lIjoiU2xpZGVMZWZ0Iiwic2FtcGxlcnMiOlt7ImlucHV0IjoxLCJvdXRwdXQiOjIsImludGVycG9sYXRpb24iOiJMSU5FQVIifV0sImNoYW5uZWxzIjpbeyJzYW1wbGVyIjowLCJ0YXJnZXQiOnsibm9kZSI6MCwicGF0aCI6InRyYW5zbGF0aW9uIn19XX1dLCJidWZmZXJzIjpbeyJieXRlTGVuZ3RoIjoxMDR9XX1oAAAAQklOAM3MTL/NzEy/AAAAAM3MTD/NzEy/AAAAAM3MTL/NzEw/AAAAAM3MTL/NzEw/AAAAAM3MTD/NzEy/AAAAAM3MTD/NzEw/AAAAAAAAAAAAAIA/zcyMvwAAAAAAAAAAzczMvQAAAAAAAAAA',
        empty:
          'Z2xURgIAAAB4AAAAZAAAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOltdfV19',
        textured:
          'Z2xURgIAAACUBAAAtAMAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOlswLDFdfV0sImFjY2Vzc29ycyI6W3siYnVmZmVyVmlldyI6MCwiY29tcG9uZW50VHlwZSI6NTEyNiwidHlwZSI6IlZFQzMiLCJjb3VudCI6NiwibWluIjpbLTAuOCwtMC44LDBdLCJtYXgiOlswLjgsMC44LDBdfSx7ImJ1ZmZlclZpZXciOjEsImNvbXBvbmVudFR5cGUiOjUxMjYsInR5cGUiOiJWRUMyIiwiY291bnQiOjZ9XSwiYnVmZmVyVmlld3MiOlt7ImJ1ZmZlciI6MCwiYnl0ZU9mZnNldCI6MCwiYnl0ZUxlbmd0aCI6NzJ9LHsiYnVmZmVyIjowLCJieXRlT2Zmc2V0Ijo3MiwiYnl0ZUxlbmd0aCI6NDh9LHsiYnVmZmVyIjowLCJieXRlT2Zmc2V0IjoxMjAsImJ5dGVMZW5ndGgiOjc2fV0sImV4dGVuc2lvbnNVc2VkIjpbIktIUl9tYXRlcmlhbHNfdW5saXQiXSwibWF0ZXJpYWxzIjpbeyJuYW1lIjoiU2hhcmVkQmx1ZSIsImRvdWJsZVNpZGVkIjp0cnVlLCJwYnJNZXRhbGxpY1JvdWdobmVzcyI6eyJiYXNlQ29sb3JUZXh0dXJlIjp7ImluZGV4IjowfSwibWV0YWxsaWNGYWN0b3IiOjB9LCJleHRlbnNpb25zIjp7IktIUl9tYXRlcmlhbHNfdW5saXQiOnt9fX1dLCJtZXNoZXMiOlt7InByaW1pdGl2ZXMiOlt7ImF0dHJpYnV0ZXMiOnsiUE9TSVRJT04iOjAsIlRFWENPT1JEXzAiOjF9LCJtYXRlcmlhbCI6MH1dfV0sIm5vZGVzIjpbeyJtZXNoIjowLCJuYW1lIjoiTGVmdCIsInRyYW5zbGF0aW9uIjpbLTEuMSwwLDBdfSx7Im1lc2giOjAsIm5hbWUiOiJSaWdodCIsInRyYW5zbGF0aW9uIjpbMS4xLDAsMF19XSwiaW1hZ2VzIjpbeyJidWZmZXJWaWV3IjoyLCJtaW1lVHlwZSI6ImltYWdlL3BuZyJ9XSwidGV4dHVyZXMiOlt7InNvdXJjZSI6MH1dLCJidWZmZXJzIjpbeyJieXRlTGVuZ3RoIjoxOTZ9XX0gICDEAAAAQklOAM3MTL/NzEy/AAAAAM3MTD/NzEy/AAAAAM3MTL/NzEw/AAAAAM3MTL/NzEw/AAAAAM3MTD/NzEy/AAAAAM3MTD/NzEw/AAAAAAAAAAAAAAAAAACAPwAAAAAAAAAAAACAPwAAAAAAAIA/AACAPwAAAAAAAIA/AACAP4lQTkcNChoKAAAADUlIRFIAAAACAAAAAggGAAAAcrYNJAAAABNJREFUeJxj+M/A8B8MGRj+gwEAScgJ9xRjMp0AAAAASUVORK5CYII=',
        offset:
          'Z2xURgIAAABIAwAA5AIAAEpTT057ImFzc2V0Ijp7InZlcnNpb24iOiIyLjAiLCJnZW5lcmF0b3IiOiJGcm9udG9yeSBhdXRob3JlZCBwYW5lbHMifSwic2NlbmUiOjAsInNjZW5lcyI6W3sibm9kZXMiOlswLDFdfV0sImFjY2Vzc29ycyI6W3siYnVmZmVyVmlldyI6MCwiY29tcG9uZW50VHlwZSI6NTEyNiwidHlwZSI6IlZFQzMiLCJjb3VudCI6NiwibWluIjpbLTAuOCwtMC44LDBdLCJtYXgiOlswLjgsMC44LDBdfV0sImJ1ZmZlclZpZXdzIjpbeyJidWZmZXIiOjAsImJ5dGVPZmZzZXQiOjAsImJ5dGVMZW5ndGgiOjcyfV0sImV4dGVuc2lvbnNVc2VkIjpbIktIUl9tYXRlcmlhbHNfdW5saXQiXSwibWF0ZXJpYWxzIjpbeyJuYW1lIjoiU2hhcmVkQmx1ZSIsImRvdWJsZVNpZGVkIjp0cnVlLCJwYnJNZXRhbGxpY1JvdWdobmVzcyI6eyJiYXNlQ29sb3JGYWN0b3IiOlswLjAzLDAuMiwwLjgsMV0sIm1ldGFsbGljRmFjdG9yIjowfSwiZXh0ZW5zaW9ucyI6eyJLSFJfbWF0ZXJpYWxzX3VubGl0Ijp7fX19XSwibWVzaGVzIjpbeyJwcmltaXRpdmVzIjpbeyJhdHRyaWJ1dGVzIjp7IlBPU0lUSU9OIjowfSwibWF0ZXJpYWwiOjB9XX1dLCJub2RlcyI6W3sibWVzaCI6MCwibmFtZSI6IkxlZnQiLCJ0cmFuc2xhdGlvbiI6WzMxLjIsLTE1LDNdLCJzY2FsZSI6WzgsOCw4XX0seyJtZXNoIjowLCJuYW1lIjoiUmlnaHQiLCJ0cmFuc2xhdGlvbiI6WzQ4LjgsLTE1LDNdLCJzY2FsZSI6WzgsOCw4XX1dLCJidWZmZXJzIjpbeyJieXRlTGVuZ3RoIjo3Mn1dfUgAAABCSU4AzcxMv83MTL8AAAAAzcxMP83MTL8AAAAAzcxMv83MTD8AAAAAzcxMv83MTD8AAAAAzcxMP83MTL8AAAAAzcxMP83MTD8AAAAA',
      };
      const loader = new GLTFLoader();
      let root = null,
        meshes = [],
        status = 'loading',
        request = 0,
        sharedAtLoad = false;
      const restoreSelection = () => {};

      let mixer = null,
        clips = [],
        action = null,
        playing = false,
        last = 0,
        delta = 0,
        speed = Number(document.querySelector('#value').value);
      const seconds = true;
      function clearMixer() {
        playing = false;
        if (mixer && root) {
          mixer.stopAllAction();
          mixer.uncacheRoot(root);
        }
        mixer = null;
        action = null;
        clips = [];
      }
      function setupAnimation(gltf) {
        clips = gltf.animations;
        document
          .querySelector('#clips')
          .replaceChildren(...clips.map((c, i) => new Option(c.name, String(i))));
        mixer = new THREE.AnimationMixer(root);
        if (clips.length) {
          action = mixer.clipAction(clips[0]);
          action.play();
          playing = true;
          mixer.timeScale = speed;
        } else {
          document.querySelector('#clips').append(new Option('클립 없음', ''));
          error.textContent =
            '클립 없음: 모델과 파일 선택은 계속 사용할 수 있습니다.';
        }
        for (const id of ['play', 'pause', 'stop'])
          document.querySelector('#' + id).disabled = !clips.length;
      }
      on('#play', 'click', () => {
        if (!action) return;
        action.play();
        action.paused = false;
        playing = true;
        last = 0;
      });
      on('#pause', 'click', () => {
        playing = false;
        if (action) action.paused = true;
        draw();
      });
      on('#stop', 'click', () => {
        playing = false;
        if (action) {
          action.stop();
          action.reset();
        }
        if (mixer) {
          mixer.time = 0;
          mixer.update(0);
        }
        draw();
      });
      on('#clips', 'change', (e) => {
        if (!mixer || !clips.length) return;
        mixer.stopAllAction();
        action = mixer.clipAction(clips[Number(e.target.value)]);
        action.reset().play();
        playing = true;
        last = 0;
      });
      on('#apply', 'click', () => {
        const input = document.querySelector('#value');
        if (!input.value || !input.checkValidity()) return;
        speed = Number(input.value);
        if (mixer) mixer.timeScale = speed;
        draw();
      });
      function animate(now) {
        if (disposed) return;
        delta = last ? (now - last) / (seconds ? 1000 : 1) : 0;
        last = now;
        if (playing && mixer) {
          mixer.update(delta);
          draw();
        }
      }
      renderer.setAnimationLoop(animate);

      function resources(object) {
        const geometry = new Set(),
          material = new Set(),
          texture = new Set();
        object.traverse((o) => {
          if (o.geometry) geometry.add(o.geometry);
          for (const m of Array.isArray(o.material)
            ? o.material
            : o.material
              ? [o.material]
              : []) {
            material.add(m);
            for (const value of Object.values(m))
              if (value?.isTexture) texture.add(value);
          }
        });
        return { geometry, material, texture };
      }
      function release(object) {
        const r = resources(object);
        for (const g of r.geometry) {
          ownedGeometry.delete(g);
          g.dispose();
        }
        for (const m of r.material) {
          ownedMaterial.delete(m);
          m.dispose();
        }
        for (const tex of r.texture) {
          ownedTextures.delete(tex);
          tex.dispose();
          tex.image?.close?.();
        }
      }
      function validateGlb(buffer) {
        if (buffer.byteLength > 2 * 1024 * 1024) throw Error('GLB exceeds 2 MiB');
        const view = new DataView(buffer);
        if (
          view.getUint32(0, true) !== 0x46546c67 ||
          view.getUint32(4, true) !== 2 ||
          view.getUint32(8, true) !== buffer.byteLength ||
          view.getUint32(16, true) !== 0x4e4f534a
        )
          throw Error('Invalid GLB');
        const json = JSON.parse(
          new TextDecoder().decode(
            new Uint8Array(buffer, 20, view.getUint32(12, true)),
          ),
        );
        if (
          [...(json.buffers ?? []), ...(json.images ?? [])].some(
            (x) => x.uri && !x.uri.startsWith('data:'),
          )
        )
          throw Error('External URI unsupported');
        if ((json.extensionsUsed ?? []).some((x) => /draco|meshopt|basisu/i.test(x)))
          throw Error('Compression unsupported');
      }
      async function loadModel(readBuffer) {
        const token = ++request;
        status = 'loading';
        error.textContent = '';
        draw();
        try {
          const buffer = await readBuffer();
          validateGlb(buffer);
          const gltf = await loader.parseAsync(buffer, '');
          if (disposed || token !== request) {
            release(gltf.scene);
            return;
          }
          restoreSelection();
          clearMixer();
          if (root) {
            scene.remove(root);
            release(root);
          }
          root = gltf.scene;
          scene.add(root);
          meshes = [];
          root.traverse((o) => {
            if (o.isMesh) meshes.push(o);
          });
          const r = resources(root);
          r.geometry.forEach((x) => ownedGeometry.add(x));
          r.material.forEach((x) => ownedMaterial.add(x));
          r.texture.forEach((x) => ownedTextures.add(x));
          sharedAtLoad =
            meshes.length > 1 && meshes[0].material === meshes[1].material;
          status = 'ready';

          setupAnimation(gltf);
          draw();
        } catch (cause) {
          if (disposed || token !== request) return;
          status = 'error';
          error.textContent =
            'GLB를 읽지 못했습니다. 외부 URI·압축 없는 2 MiB 이하 GLB를 선택하거나 내장 샘플을 불러오세요. 상세: ' +
            cause.message;
          draw();
        }
      }
      function sample(kind) {
        if (kind in samples) document.querySelector('#model').value = kind;
        return loadModel(() =>
          kind === 'invalid'
            ? new TextEncoder().encode('invalid-glb').buffer
            : Uint8Array.from(atob(samples[kind]), (c) => c.charCodeAt(0)).buffer,
        );
      }
      on('#sample', 'click', () => {
        document.querySelector('#file').value = '';
        sample(document.querySelector('#model').value);
      });
      on('#invalid', 'click', () => sample('invalid'));
      on('#file', 'change', (e) => {
        const file = e.target.files[0];
        if (file) loadModel(() => file.arrayBuffer());
      });
      sample('animated');
      function report() {
        output.textContent =
          '상태: ' +
          status +
          ' / meshes: ' +
          meshes.length +
          ' / shared at load: ' +
          sharedAtLoad +
          ' / frames: ' +
          frames +
          ' / clips: ' +
          clips.map((c) => c.name + ':' + c.duration + 's') +
          ' / playing: ' +
          playing +
          ' / delta: ' +
          delta.toFixed(4) +
          's / mixer: ' +
          (mixer?.time ?? 0).toFixed(3) +
          's / speed: ' +
          speed +
          ' / X: ' +
          (meshes[0]?.position.x ?? 0).toFixed(3);
      }
      function draw() {
        if (disposed || !stage.clientWidth || !stage.clientHeight) return;
        renderer.render(scene, camera);
        frames++;
        report();
      }
      function resizeScene() {
        const w = stage.clientWidth,
          h = stage.clientHeight;
        if (!w || !h || disposed) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        draw();
      }
      const observer = new ResizeObserver(resizeScene);
      observer.observe(stage);
      resizeScene();
      function cleanup() {
        if (disposed) return;
        disposed = true;
        observer.disconnect();
        events.abort();
        renderer.setAnimationLoop(null);
        request++;
        restoreSelection();
        clearMixer();
        for (const texture of ownedTextures) {
          texture.dispose();
          texture.image?.close?.();
        }
        for (const g of ownedGeometry) g.dispose();
        for (const m of ownedMaterial) m.dispose();
        renderer.dispose();
        scene.clear();
        output.textContent = '정리 완료';
      }
      on('#cleanup', 'click', cleanup);
      window.addEventListener('pagehide', cleanup, {
        once: true,
        signal: events.signal,
      });
    </script>
  </body>
</html>
```

</details>

- 일시정지와 stop은 포즈에 어떤 차이를 만드나요?
- mixer를 해제하면 geometry도 자동 해제되나요?

### API · AnimationMixer.update

한 root의 action을 지난 초만큼 평가합니다.

- `deltaTime: number` — 초 단위이며 ms가 아님

같은 mixer를 반환하며 time과 대상 프로퍼티를 갱신합니다.

- timeScale은 배율입니다. 모델 교체 전에 stopAllAction과 uncacheRoot를 호출하세요.

```js
mixer.update((now-last)/1000);
```

[AnimationMixer.update](https://threejs.org/docs/pages/AnimationMixer.html) · three@0.186.1 · 2026-10-27

### API · AnimationAction.play / stop

action의 재생 예약과 해제를 조작합니다.

같은 action을 반환합니다. paused는 시간을 멈추는 boolean입니다.

- stop과 pause는 포즈 복구 동작이 다릅니다. clip이 없을 때 UI를 비활성화하세요.

```js
action.play();action.paused=true;action.stop();
```

[AnimationAction.play / stop](https://threejs.org/docs/pages/AnimationAction.html) · three@0.186.1 · 2026-10-27

## 다음 학습

[이전: 궤도 제어와 요구 렌더링](../16/README.md) · [다음: 투명도와 깊이](../18/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문

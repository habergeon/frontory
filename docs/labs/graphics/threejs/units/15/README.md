# Three.js · 15 모델 크기와 카메라 맞춤

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 애니메이션·인스턴싱·렌더 패스 · 편집 가능한 예제 · 저장 ID: `threejs-step-15`

## 목표와 학습 후 역량

- 원점에서 먼 모델도 화면 중심에 맞춘다.
- 빈 모델에서 카메라를 유지하고 작은 모델과 빈 경계를 구별한다.

## 선수 지식

선수 단원: 03, 14. 해당 개념을 이번 모델 실험에 연결합니다.

## 핵심 개념과 설명

### world 중심과 크기

모델을 원점으로 옮기는 대신 controls.target과 camera 위치에 world 중심을 반영합니다. 카메라를 중심에서 +Z만큼 떨어뜨리므로 이 정적 장면에서는 모델 전체가 정면을 향합니다. 실제 모델 좌표는 그대로입니다.

### FOV와 aspect로 카메라 맞춤

FOV가 degree인 반면 Math.sin은 radian을 받습니다. aspect를 무시한 세로 FOV만으로 맞추면 세로로 긴 화면에서 좌우가 잘릴 수 있습니다. 구 기반 맞춤은 도형별 최적 확대를 보장하지 않지만 이 경계를 모든 방향으로 담습니다.

## 실습 준비

사이트에서 독립 HTML을 편집·실행합니다. Three.js 0.186.1과 같은 버전의 addons를 제공하므로 별도 설치·서버가 필요 없습니다. 기존 JavaScript 초안은 보존됩니다.

모든 필수 과제를 사이트 안에서 단계별로 수행합니다. 아래 학습 단계의 시작 코드를 불러와 수정하고 실행한 뒤, 실제 결과와 이유를 사이트 필기에 남기세요.

## 실습 과제

1. offset은 두 패널을 8배 키우고 중심을 (40,-15,3)에 둔 GLB입니다. root.updateWorldMatrix(true,true) 뒤 box.setFromObject(root)가 자식과 부모 변환을 포함한 world 경계를 구합니다. getCenter(center)와 getSize(size)는 전달한 Vector3를 갱신하며 모델 위치를 바꾸지 않습니다.

시작 코드의 useCenter=false는 원점을 보므로 모델이 화면 밖에 있습니다. useCenter를 true로 바꾸세요. output의 center≈(40,-15,3), size≈(30.4,12.8,0)를 읽고 camera.x/y가 중심과 같은지 확인합니다. static과 offset을 번갈아 불러와 world 크기가 8배인지 비교하세요. 축에 나란한 Box3는 회전된 표면에 여유 공간을 포함할 수 있습니다. 2. 같은 offset 모델을 사용합니다. 시작의 useFov=false는 거리 7을 고정하므로 큰 모델이 잘립니다. useFov=true로 바꾸고 여유 배율을 1.25로 입력한 뒤 카메라 맞춤을 누르세요. 반지름 r=size.length()/2인 경계 구를 만들고 세로 FOV를 radian으로 바꿉니다. 가로 FOV는 2*atan(tan(vFov/2)*aspect)이며 둘 중 작은 각도로 d=r/sin(fov/2)*margin을 구합니다. 구 전체를 넣는 보수적인 거리입니다.

ResizeObserver는 양수 CSS 크기에서 aspect와 투영 행렬을 갱신한 뒤 다시 맞춥니다. 모바일에서 가로 FOV가 작아지면 거리가 늘어나는지 읽으세요. near=max(d-2r,.00001), far=d+4r로 모델 앞뒤에 여유를 둡니다. 확대해서 화면을 채우는 일과 near/far 잘림 방지는 서로 다른 조건입니다. 3. empty는 유효한 GLB이지만 그릴 Mesh가 없습니다. box.isEmpty()가 true면 로딩 실패와 구별해 빈 모델 문구를 읽습니다. 시작의 guardEmpty=false는 빈 경계에서도 맞춤을 계속해 카메라를 원점 근처의 아주 작은 거리로 옮깁니다. guardEmpty=true로 바꿔 빈 경계에서 return하도록 하세요.

empty 뒤 static을 불러오고 다시 empty를 불러오세요. empty를 읽은 뒤에도 마지막 정상 카메라가 유지되는지 비교합니다. 파일 입력으로 작은 GLB를 읽거나 코드의 root.scale.setScalar(.001)을 fitModel의 root.updateWorldMatrix 앞에 잠시 넣어 작은 모델도 시험하세요. radius를 최소 .001로 두어 크기 0인 점 경계가 0 거리·0 near를 만들지 않게 합니다. 빈 모델과 아주 작은 모델은 같은 상태가 아닙니다.

## 관찰할 변수

| 변수       | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설                         |
| ---------- | --------- | --------- | --------------------------------------------- |
| 모델 scale | 1         | 8         | 프레이밍 후 화면 점유율이 비슷하게 유지됩니다 |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 원점에서 먼 모델도 화면 중심에 맞춘다.
- [ ] 빈 모델에서 카메라를 유지하고 작은 모델과 빈 경계를 구별한다.

## 자가 점검

1. 원점에서 먼 모델을 볼 때 lookAt(0,0,0)이 왜 실패하나요?
2. aspect가 작아지면 왜 거리가 늘어나나요?
3. 크기 0인 경계와 빈 경계는 같은가요?

## 공식 참고

- [Three.js GLTFLoader](https://threejs.org/docs/pages/GLTFLoader.html)
- [Three.js OrbitControls](https://threejs.org/docs/pages/OrbitControls.html)
- [Three.js Box3](https://threejs.org/docs/pages/Box3.html)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/threejs-step-15/example.html) · [실행 환경과 제한](../../../../../examples.md)

사이트 안에서 HTML 시작 예제를 편집·실행합니다. 단계별 안내와 API 참고를 읽고 실제 결과를 필기에 남기세요.

- [example.html](../../../../../../src/labs/threejs-step-15/example.html)

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 단계별 학습

03의 원근 카메라와 14의 GLB 로딩을 이어서 모델을 화면에 맞춥니다. 원점에서 먼 모델을 원점으로 옮기지 않고 world 경계의 중심을 봅니다. Box3는 축에 나란한 경계이며 실제 표면과는 다릅니다. 중심·크기·카메라 거리·잘림 범위를 따로 읽고 각 단계의 예상·실제 결과를 필기에 기록하세요.

### 선수 단원

- `threejs-step-03`
- `threejs-02`

### world 중심과 크기

offset은 두 패널을 8배 키우고 중심을 (40,-15,3)에 둔 GLB입니다. root.updateWorldMatrix(true,true) 뒤 box.setFromObject(root)가 자식과 부모 변환을 포함한 world 경계를 구합니다. getCenter(center)와 getSize(size)는 전달한 Vector3를 갱신하며 모델 위치를 바꾸지 않습니다.

시작 코드의 useCenter=false는 원점을 보므로 모델이 화면 밖에 있습니다. useCenter를 true로 바꾸세요. output의 center≈(40,-15,3), size≈(30.4,12.8,0)를 읽고 camera.x/y가 중심과 같은지 확인합니다. static과 offset을 번갈아 불러와 world 크기가 8배인지 비교하세요. 축에 나란한 Box3는 회전된 표면에 여유 공간을 포함할 수 있습니다.

**예상 결과**

false에서 빈 배경이 보이고 true에서는 먼 모델이 중앙에 나타납니다. static 크기는 약 (3.8,1.6,0), offset은 약 (30.4,12.8,0)입니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>모델 중심과 크기</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage{width:480px;max-width:100%;height:280px} canvas{display:block;width:100%;height:100%;touch-action:none} .controls{display:flex;flex-wrap:wrap;align-items:center;gap:8px} input[type=number]{width:78px} input[type=file]{width:240px;max-width:100%} button{padding:6px} output{display:block;white-space:pre-wrap;overflow-wrap:anywhere} #error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>모델 중심과 크기</h1>
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
        >여유 배율
        <input
          id="value"
          type="number"
          min="1"
          max="2"
          step="0.05"
          value="1" /></label
      ><button id="apply">카메라 맞춤</button
      ><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="모델 중심과 크기"></canvas></div>
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

      import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
      const controls = new OrbitControls(camera, canvas);
      controls.enableDamping = false;
      controls.dampingFactor = 0.15;
      const box = new THREE.Box3(),
        center = new THREE.Vector3(),
        size = new THREE.Vector3();
      let empty = false;
      const useCenter = false,
        useFov = true,
        guardEmpty = true;
      function fitModel() {
        if (!root) return;
        root.updateWorldMatrix(true, true);
        box.setFromObject(root);
        empty = box.isEmpty();
        if (empty) {
          error.textContent =
            '빈 모델: 그릴 표면이 없습니다. 다른 내장 모델을 선택하세요.';
          if (guardEmpty) return;
        }
        box.getCenter(center);
        box.getSize(size);
        const focus = useCenter ? center : new THREE.Vector3();
        const radius = Math.max(size.length() / 2, 0.001),
          vFov = THREE.MathUtils.degToRad(camera.fov),
          hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect),
          margin = Number(document.querySelector('#value').value);
        const distance = useFov
          ? (radius / Math.sin(Math.min(vFov, hFov) / 2)) * margin
          : 7;
        controls.target.copy(focus);
        camera.position.copy(focus).add(new THREE.Vector3(0, 0, distance));
        camera.near = Math.max(distance - radius * 2, 0.00001);
        camera.far = distance + radius * 4;
        camera.updateProjectionMatrix();
        controls.update();
      }

      controls.addEventListener('change', draw);
      on('#apply', 'click', () => {
        const input = document.querySelector('#value');
        if (!input.value || !input.checkValidity()) return;
        error.textContent = '';
        fitModel();
        draw();
      });
      const clearMixer = () => {};
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

          fitModel();

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
      sample('offset');
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
          ' / empty: ' +
          empty +
          ' / center: ' +
          center.toArray().map((x) => x.toFixed(2)) +
          ' / size: ' +
          size.toArray().map((x) => x.toFixed(2)) +
          ' / camera: ' +
          camera.position.toArray().map((x) => x.toFixed(2));
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
        fitModel();
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
        controls.dispose();
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

- 모델의 local position과 world center를 구별하세요.
- getSize는 max-min입니다. 원점까지의 거리가 아닙니다.
- useCenter=true 뒤 center와 camera.x/y를 비교하세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

모델을 원점으로 옮기는 대신 controls.target과 camera 위치에 world 중심을 반영합니다. 카메라를 중심에서 +Z만큼 떨어뜨리므로 이 정적 장면에서는 모델 전체가 정면을 향합니다. 실제 모델 좌표는 그대로입니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>모델 중심과 크기</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage{width:480px;max-width:100%;height:280px} canvas{display:block;width:100%;height:100%;touch-action:none} .controls{display:flex;flex-wrap:wrap;align-items:center;gap:8px} input[type=number]{width:78px} input[type=file]{width:240px;max-width:100%} button{padding:6px} output{display:block;white-space:pre-wrap;overflow-wrap:anywhere} #error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>모델 중심과 크기</h1>
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
        >여유 배율
        <input
          id="value"
          type="number"
          min="1"
          max="2"
          step="0.05"
          value="1.25" /></label
      ><button id="apply">카메라 맞춤</button
      ><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="모델 중심과 크기"></canvas></div>
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

      import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
      const controls = new OrbitControls(camera, canvas);
      controls.enableDamping = false;
      controls.dampingFactor = 0.15;
      const box = new THREE.Box3(),
        center = new THREE.Vector3(),
        size = new THREE.Vector3();
      let empty = false;
      const useCenter = true,
        useFov = true,
        guardEmpty = true;
      function fitModel() {
        if (!root) return;
        root.updateWorldMatrix(true, true);
        box.setFromObject(root);
        empty = box.isEmpty();
        if (empty) {
          error.textContent =
            '빈 모델: 그릴 표면이 없습니다. 다른 내장 모델을 선택하세요.';
          if (guardEmpty) return;
        }
        box.getCenter(center);
        box.getSize(size);
        const focus = useCenter ? center : new THREE.Vector3();
        const radius = Math.max(size.length() / 2, 0.001),
          vFov = THREE.MathUtils.degToRad(camera.fov),
          hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect),
          margin = Number(document.querySelector('#value').value);
        const distance = useFov
          ? (radius / Math.sin(Math.min(vFov, hFov) / 2)) * margin
          : 7;
        controls.target.copy(focus);
        camera.position.copy(focus).add(new THREE.Vector3(0, 0, distance));
        camera.near = Math.max(distance - radius * 2, 0.00001);
        camera.far = distance + radius * 4;
        camera.updateProjectionMatrix();
        controls.update();
      }

      controls.addEventListener('change', draw);
      on('#apply', 'click', () => {
        const input = document.querySelector('#value');
        if (!input.value || !input.checkValidity()) return;
        error.textContent = '';
        fitModel();
        draw();
      });
      const clearMixer = () => {};
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

          fitModel();

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
      sample('offset');
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
          ' / empty: ' +
          empty +
          ' / center: ' +
          center.toArray().map((x) => x.toFixed(2)) +
          ' / size: ' +
          size.toArray().map((x) => x.toFixed(2)) +
          ' / camera: ' +
          camera.position.toArray().map((x) => x.toFixed(2));
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
        fitModel();
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
        controls.dispose();
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

- 원점에서 먼 모델을 볼 때 lookAt(0,0,0)이 왜 실패하나요?
- Box3를 구하면 모델이 이동하나요?

### FOV와 aspect로 카메라 맞춤

같은 offset 모델을 사용합니다. 시작의 useFov=false는 거리 7을 고정하므로 큰 모델이 잘립니다. useFov=true로 바꾸고 여유 배율을 1.25로 입력한 뒤 카메라 맞춤을 누르세요. 반지름 r=size.length()/2인 경계 구를 만들고 세로 FOV를 radian으로 바꿉니다. 가로 FOV는 2*atan(tan(vFov/2)*aspect)이며 둘 중 작은 각도로 d=r/sin(fov/2)*margin을 구합니다. 구 전체를 넣는 보수적인 거리입니다.

ResizeObserver는 양수 CSS 크기에서 aspect와 투영 행렬을 갱신한 뒤 다시 맞춥니다. 모바일에서 가로 FOV가 작아지면 거리가 늘어나는지 읽으세요. near=max(d-2r,.00001), far=d+4r로 모델 앞뒤에 여유를 둡니다. 확대해서 화면을 채우는 일과 near/far 잘림 방지는 서로 다른 조건입니다.

**예상 결과**

거리 7에서는 패널 일부만 보입니다. useFov=true와 1.25에서 전체가 보이고, 좁은 화면에서는 카메라 거리가 커집니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>FOV로 화면 맞추기</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage{width:480px;max-width:100%;height:280px} canvas{display:block;width:100%;height:100%;touch-action:none} .controls{display:flex;flex-wrap:wrap;align-items:center;gap:8px} input[type=number]{width:78px} input[type=file]{width:240px;max-width:100%} button{padding:6px} output{display:block;white-space:pre-wrap;overflow-wrap:anywhere} #error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>FOV로 화면 맞추기</h1>
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
        >여유 배율
        <input
          id="value"
          type="number"
          min="1"
          max="2"
          step="0.05"
          value="1" /></label
      ><button id="apply">카메라 맞춤</button
      ><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="FOV로 화면 맞추기"></canvas></div>
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

      import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
      const controls = new OrbitControls(camera, canvas);
      controls.enableDamping = false;
      controls.dampingFactor = 0.15;
      const box = new THREE.Box3(),
        center = new THREE.Vector3(),
        size = new THREE.Vector3();
      let empty = false;
      const useCenter = true,
        useFov = false,
        guardEmpty = true;
      function fitModel() {
        if (!root) return;
        root.updateWorldMatrix(true, true);
        box.setFromObject(root);
        empty = box.isEmpty();
        if (empty) {
          error.textContent =
            '빈 모델: 그릴 표면이 없습니다. 다른 내장 모델을 선택하세요.';
          if (guardEmpty) return;
        }
        box.getCenter(center);
        box.getSize(size);
        const focus = useCenter ? center : new THREE.Vector3();
        const radius = Math.max(size.length() / 2, 0.001),
          vFov = THREE.MathUtils.degToRad(camera.fov),
          hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect),
          margin = Number(document.querySelector('#value').value);
        const distance = useFov
          ? (radius / Math.sin(Math.min(vFov, hFov) / 2)) * margin
          : 7;
        controls.target.copy(focus);
        camera.position.copy(focus).add(new THREE.Vector3(0, 0, distance));
        camera.near = Math.max(distance - radius * 2, 0.00001);
        camera.far = distance + radius * 4;
        camera.updateProjectionMatrix();
        controls.update();
      }

      controls.addEventListener('change', draw);
      on('#apply', 'click', () => {
        const input = document.querySelector('#value');
        if (!input.value || !input.checkValidity()) return;
        error.textContent = '';
        fitModel();
        draw();
      });
      const clearMixer = () => {};
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

          fitModel();

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
      sample('offset');
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
          ' / empty: ' +
          empty +
          ' / center: ' +
          center.toArray().map((x) => x.toFixed(2)) +
          ' / size: ' +
          size.toArray().map((x) => x.toFixed(2)) +
          ' / camera: ' +
          camera.position.toArray().map((x) => x.toFixed(2));
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
        fitModel();
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
        controls.dispose();
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

- d를 모델 크기와 같은 값으로 고정하지 마세요.
- vFov와 hFov 중 작은 값을 쓰는지 보세요.
- useFov=true, 여유 배율 1.25로 입력하고 두 폭을 비교하세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

FOV가 degree인 반면 Math.sin은 radian을 받습니다. aspect를 무시한 세로 FOV만으로 맞추면 세로로 긴 화면에서 좌우가 잘릴 수 있습니다. 구 기반 맞춤은 도형별 최적 확대를 보장하지 않지만 이 경계를 모든 방향으로 담습니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>FOV로 화면 맞추기</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage{width:480px;max-width:100%;height:280px} canvas{display:block;width:100%;height:100%;touch-action:none} .controls{display:flex;flex-wrap:wrap;align-items:center;gap:8px} input[type=number]{width:78px} input[type=file]{width:240px;max-width:100%} button{padding:6px} output{display:block;white-space:pre-wrap;overflow-wrap:anywhere} #error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>FOV로 화면 맞추기</h1>
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
        >여유 배율
        <input
          id="value"
          type="number"
          min="1"
          max="2"
          step="0.05"
          value="1.25" /></label
      ><button id="apply">카메라 맞춤</button
      ><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="FOV로 화면 맞추기"></canvas></div>
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

      import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
      const controls = new OrbitControls(camera, canvas);
      controls.enableDamping = false;
      controls.dampingFactor = 0.15;
      const box = new THREE.Box3(),
        center = new THREE.Vector3(),
        size = new THREE.Vector3();
      let empty = false;
      const useCenter = true,
        useFov = true,
        guardEmpty = true;
      function fitModel() {
        if (!root) return;
        root.updateWorldMatrix(true, true);
        box.setFromObject(root);
        empty = box.isEmpty();
        if (empty) {
          error.textContent =
            '빈 모델: 그릴 표면이 없습니다. 다른 내장 모델을 선택하세요.';
          if (guardEmpty) return;
        }
        box.getCenter(center);
        box.getSize(size);
        const focus = useCenter ? center : new THREE.Vector3();
        const radius = Math.max(size.length() / 2, 0.001),
          vFov = THREE.MathUtils.degToRad(camera.fov),
          hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect),
          margin = Number(document.querySelector('#value').value);
        const distance = useFov
          ? (radius / Math.sin(Math.min(vFov, hFov) / 2)) * margin
          : 7;
        controls.target.copy(focus);
        camera.position.copy(focus).add(new THREE.Vector3(0, 0, distance));
        camera.near = Math.max(distance - radius * 2, 0.00001);
        camera.far = distance + radius * 4;
        camera.updateProjectionMatrix();
        controls.update();
      }

      controls.addEventListener('change', draw);
      on('#apply', 'click', () => {
        const input = document.querySelector('#value');
        if (!input.value || !input.checkValidity()) return;
        error.textContent = '';
        fitModel();
        draw();
      });
      const clearMixer = () => {};
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

          fitModel();

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
      sample('offset');
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
          ' / empty: ' +
          empty +
          ' / center: ' +
          center.toArray().map((x) => x.toFixed(2)) +
          ' / size: ' +
          size.toArray().map((x) => x.toFixed(2)) +
          ' / camera: ' +
          camera.position.toArray().map((x) => x.toFixed(2));
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
        fitModel();
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
        controls.dispose();
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

- aspect가 작아지면 왜 거리가 늘어나나요?
- near/far를 정하는 일은 FOV 맞춤과 어떻게 다른가요?

### 빈 경계와 복구

empty는 유효한 GLB이지만 그릴 Mesh가 없습니다. box.isEmpty()가 true면 로딩 실패와 구별해 빈 모델 문구를 읽습니다. 시작의 guardEmpty=false는 빈 경계에서도 맞춤을 계속해 카메라를 원점 근처의 아주 작은 거리로 옮깁니다. guardEmpty=true로 바꿔 빈 경계에서 return하도록 하세요.

empty 뒤 static을 불러오고 다시 empty를 불러오세요. empty를 읽은 뒤에도 마지막 정상 카메라가 유지되는지 비교합니다. 파일 입력으로 작은 GLB를 읽거나 코드의 root.scale.setScalar(.001)을 fitModel의 root.updateWorldMatrix 앞에 잠시 넣어 작은 모델도 시험하세요. radius를 최소 .001로 두어 크기 0인 점 경계가 0 거리·0 near를 만들지 않게 합니다. 빈 모델과 아주 작은 모델은 같은 상태가 아닙니다.

**예상 결과**

정상 파싱 ready와 empty=true가 함께 나타납니다. guardEmpty=true에서는 empty 전후 카메라가 같고 static으로 다시 복구됩니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>빈 모델과 작은 모델</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage{width:480px;max-width:100%;height:280px} canvas{display:block;width:100%;height:100%;touch-action:none} .controls{display:flex;flex-wrap:wrap;align-items:center;gap:8px} input[type=number]{width:78px} input[type=file]{width:240px;max-width:100%} button{padding:6px} output{display:block;white-space:pre-wrap;overflow-wrap:anywhere} #error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>빈 모델과 작은 모델</h1>
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
        >여유 배율
        <input
          id="value"
          type="number"
          min="1"
          max="2"
          step="0.05"
          value="1" /></label
      ><button id="apply">카메라 맞춤</button
      ><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="빈 모델과 작은 모델"></canvas></div>
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

      import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
      const controls = new OrbitControls(camera, canvas);
      controls.enableDamping = false;
      controls.dampingFactor = 0.15;
      const box = new THREE.Box3(),
        center = new THREE.Vector3(),
        size = new THREE.Vector3();
      let empty = false;
      const useCenter = true,
        useFov = true,
        guardEmpty = false;
      function fitModel() {
        if (!root) return;
        root.updateWorldMatrix(true, true);
        box.setFromObject(root);
        empty = box.isEmpty();
        if (empty) {
          error.textContent =
            '빈 모델: 그릴 표면이 없습니다. 다른 내장 모델을 선택하세요.';
          if (guardEmpty) return;
        }
        box.getCenter(center);
        box.getSize(size);
        const focus = useCenter ? center : new THREE.Vector3();
        const radius = Math.max(size.length() / 2, 0.001),
          vFov = THREE.MathUtils.degToRad(camera.fov),
          hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect),
          margin = Number(document.querySelector('#value').value);
        const distance = useFov
          ? (radius / Math.sin(Math.min(vFov, hFov) / 2)) * margin
          : 7;
        controls.target.copy(focus);
        camera.position.copy(focus).add(new THREE.Vector3(0, 0, distance));
        camera.near = Math.max(distance - radius * 2, 0.00001);
        camera.far = distance + radius * 4;
        camera.updateProjectionMatrix();
        controls.update();
      }

      controls.addEventListener('change', draw);
      on('#apply', 'click', () => {
        const input = document.querySelector('#value');
        if (!input.value || !input.checkValidity()) return;
        error.textContent = '';
        fitModel();
        draw();
      });
      const clearMixer = () => {};
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

          fitModel();

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
      sample('empty');
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
          ' / empty: ' +
          empty +
          ' / center: ' +
          center.toArray().map((x) => x.toFixed(2)) +
          ' / size: ' +
          size.toArray().map((x) => x.toFixed(2)) +
          ' / camera: ' +
          camera.position.toArray().map((x) => x.toFixed(2));
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
        fitModel();
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
        controls.dispose();
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

- empty와 손상 GLB의 status를 비교하세요.
- 빈 경계에서 크기 계산 전에 return하는지 보세요.
- guardEmpty=true 뒤 static→empty의 camera 좌표를 기록하세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

isEmpty는 min이 max를 넘는 빈 경계를 검사합니다. getSize가 0이라고 모두 빈 것은 아닙니다. 오류·빈 모델 뒤에도 파일 선택과 샘플 불러오기는 살아 있으며 정상 샘플로 복구할 수 있습니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>빈 모델과 작은 모델</title>
    <style>
      body { margin:0; padding:12px; font:14px/1.5 system-ui,sans-serif; color:#172554; background:white; } h1{font-size:22px} #stage{width:480px;max-width:100%;height:280px} canvas{display:block;width:100%;height:100%;touch-action:none} .controls{display:flex;flex-wrap:wrap;align-items:center;gap:8px} input[type=number]{width:78px} input[type=file]{width:240px;max-width:100%} button{padding:6px} output{display:block;white-space:pre-wrap;overflow-wrap:anywhere} #error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>빈 모델과 작은 모델</h1>
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
        >여유 배율
        <input
          id="value"
          type="number"
          min="1"
          max="2"
          step="0.05"
          value="1.25" /></label
      ><button id="apply">카메라 맞춤</button
      ><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="빈 모델과 작은 모델"></canvas></div>
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

      import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
      const controls = new OrbitControls(camera, canvas);
      controls.enableDamping = false;
      controls.dampingFactor = 0.15;
      const box = new THREE.Box3(),
        center = new THREE.Vector3(),
        size = new THREE.Vector3();
      let empty = false;
      const useCenter = true,
        useFov = true,
        guardEmpty = true;
      function fitModel() {
        if (!root) return;
        root.updateWorldMatrix(true, true);
        box.setFromObject(root);
        empty = box.isEmpty();
        if (empty) {
          error.textContent =
            '빈 모델: 그릴 표면이 없습니다. 다른 내장 모델을 선택하세요.';
          if (guardEmpty) return;
        }
        box.getCenter(center);
        box.getSize(size);
        const focus = useCenter ? center : new THREE.Vector3();
        const radius = Math.max(size.length() / 2, 0.001),
          vFov = THREE.MathUtils.degToRad(camera.fov),
          hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect),
          margin = Number(document.querySelector('#value').value);
        const distance = useFov
          ? (radius / Math.sin(Math.min(vFov, hFov) / 2)) * margin
          : 7;
        controls.target.copy(focus);
        camera.position.copy(focus).add(new THREE.Vector3(0, 0, distance));
        camera.near = Math.max(distance - radius * 2, 0.00001);
        camera.far = distance + radius * 4;
        camera.updateProjectionMatrix();
        controls.update();
      }

      controls.addEventListener('change', draw);
      on('#apply', 'click', () => {
        const input = document.querySelector('#value');
        if (!input.value || !input.checkValidity()) return;
        error.textContent = '';
        fitModel();
        draw();
      });
      const clearMixer = () => {};
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

          fitModel();

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
      sample('empty');
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
          ' / empty: ' +
          empty +
          ' / center: ' +
          center.toArray().map((x) => x.toFixed(2)) +
          ' / size: ' +
          size.toArray().map((x) => x.toFixed(2)) +
          ' / camera: ' +
          camera.position.toArray().map((x) => x.toFixed(2));
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
        fitModel();
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
        controls.dispose();
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

- 크기 0인 경계와 빈 경계는 같은가요?
- 빈 모델에서 카메라를 유지하면 복구에 어떤 도움이 되나요?

### API · Box3.setFromObject / isEmpty

자식 변환을 포함한 world 축 정렬 경계를 읽습니다.

- `object: Object3D` — 경계를 구할 root

setFromObject는 같은 Box3, isEmpty는 boolean을 반환합니다.

- getCenter/getSize는 전달 Vector3를 갱신합니다. 빈 경계에서는 맞춤을 중단하세요.

```js
root.updateWorldMatrix(true,true); box.setFromObject(root); if(!box.isEmpty()){box.getCenter(center);box.getSize(size);}
```

[Box3.setFromObject / isEmpty](https://threejs.org/docs/pages/Box3.html) · three@0.186.1 · 2026-10-27

### API · PerspectiveCamera.fov / aspect

두 방향 FOV와 경계 구로 보수적인 맞춤 거리를 계산합니다.

- `fov: number` — 세로 degree, 예제 45
- `aspect: number` — CSS width/height

프로퍼티이며 updateProjectionMatrix로 투영에 반영합니다.

- Math.sin/atan은 radian입니다. near/far와 world 중심도 별도로 갱신하세요.

```js
const v=THREE.MathUtils.degToRad(camera.fov),h=2*Math.atan(Math.tan(v/2)*camera.aspect);const d=radius/Math.sin(Math.min(v,h)/2)*margin;
```

[PerspectiveCamera.fov / aspect](https://threejs.org/docs/pages/PerspectiveCamera.html) · three@0.186.1 · 2026-10-27

## 다음 학습

[이전: 재질·로딩·선택](../../02-experiments/README.md) · [다음: 궤도 제어와 요구 렌더링](../16/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문

# Three.js · 01 장면 그래프와 카메라

[시리즈 목차](../README.md) · [전체 기술 지도](../../../README.md)

단계: 장면 좌표·카메라·기하 · 편집 가능한 예제 · 저장 ID: `threejs-01`

## 목표와 학습 후 역량

- canvas에 첫 물체를 그리고 색·위치·카메라 거리 효과를 비교한다.
- 시간에 따른 회전과 부모 회전 전후 local/world 위치를 수치와 말로 설명한다.

## 선수 지식

HTML·CSS·JavaScript 기초로 시작합니다. 좌표·축·각도는 이 단원에서 설명하며 WebGL 수료와 행렬 계산은 필요 없습니다.

## 핵심 개념과 설명

### 첫 장면과 물체

canvas는 HTML 출력 요소입니다. Scene에 geometry와 material을 묶은 Mesh를 연결하고 Camera를 통해 render합니다.

### 시간과 부모 기준 위치

지난 초에 각속도를 곱해 회전 각도를 구합니다. child.position은 부모 기준이고 getWorldPosition은 부모 변환을 반영한 world 위치를 읽습니다.

## 실습 준비

사이트 안에서 독립 HTML 예제를 편집·실행합니다. Three.js 0.186.1은 사이트가 공급하므로 별도 설치·서버·외부 이미지가 필요 없습니다. 기존에 저장한 JavaScript 코드는 유지되며 시작 예제 불러오기는 교체 확인 후 적용됩니다.

연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.

## 실습 과제

1. 아래 학습 단계의 canvas 시작 예제를 불러와 배경색을 바꾸세요. 사이트 안의 HTML을 편집하고 실행합니다.
2. cube의 색·위치·camera.z를 하나씩 바꿔 비교한 뒤 animation에서 speed=0.5와 1을 비교하세요.
3. local/world 단계에서 부모 원점과 child=(2,0,0)을 유지하고 부모 Y 회전 0과 Math.PI / 2의 실제 좌표를 읽으세요. 조건·예상·실제 화면과 수치·이유를 사이트 필기에 남기세요.

## 관찰할 변수

| 변수      | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설                            |
| --------- | --------- | --------- | ------------------------------------------------ |
| 부모 회전 | 0         | PI/2      | 자식 local 좌표는 같아도 world 좌표는 회전합니다 |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 첫 물체의 생성·Scene 연결·render 역할과 camera.position/lookAt 차이를 설명한다.
- [ ] 초 단위 회전값과 local=(2,0,0), world=(2,0,0)→(0,0,-2)를 확인하고 이유를 설명한다.

## 자가 점검

1. 부모만 이동했는데 자식 position이 그대로인 이유는 무엇인가요?
2. lookAt과 position은 어떻게 다른가요?

## 공식 참고

- [Three.js Fundamentals](https://threejs.org/manual/pages/fundamentals.html)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../src/labs/threejs-01/example.js) · [실행 환경과 제한](../../../../examples.md)

사이트 안에서 HTML 시작 예제를 편집·실행합니다. 단계별 안내와 API 참고를 읽고 실제 결과를 필기에 남기세요.

- [example.html](../../../../../src/labs/threejs-01/example.html)

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 단계별 학습

HTML·CSS·JavaScript 기초를 배웠다면 시작할 수 있습니다. canvas에 첫 물체를 그린 뒤 시간에 따른 회전과 local/world 위치를 설명해 봅니다. 좌표·축·각도는 이 단원에서 다루므로 WebGL 수료나 행렬 계산은 필요 없습니다. 각 시작 예제는 독립 HTML입니다. 한 값을 바꾸기 전 예상하고, 실행 뒤 실제 수치와 이유를 사이트 필기에 남기세요. 단계나 해설을 읽어도 코드는 바뀌지 않으며 예제 불러오기는 별도 동작입니다.

### 선수 단원

- `html-step-02`
- `html-step-23`
- `javascript-step-18`
- `javascript-step-05`
- `javascript-step-11`
- `javascript-step-02`
- `javascript-step-12`

### canvas에 장면 그리기

시작 예제는 canvas와 output이 있는 HTML 문서입니다. inline style은 canvas의 표시 크기를 정하고 script type="module" 안의 JavaScript는 그림을 그립니다. import * as THREE from 'three'는 Three.js의 공개 이름을 THREE 아래에서 쓰게 합니다. 사이트가 모듈을 공급하므로 npm 설치나 외부 서버는 필요 없습니다.

document.querySelector('canvas')는 문서에서 canvas 요소를 찾는 호출입니다. output도 같은 방식으로 찾으며 output.textContent에 문자열을 대입하면 화면에 문자로 표시됩니다.

canvas는 그림을 받는 HTML 요소입니다. Scene은 3D 객체를 묶고 Camera는 보는 위치와 방향을 정합니다. WebGLRenderer는 renderer.render(scene, camera)를 호출할 때 두 객체를 이용해 canvas에 그립니다. Scene과 Camera는 HTML 요소가 아닙니다. new는 새 객체를 만드는 문법이고 renderer.render(...)는 만든 객체의 메서드를 호출하는 문법입니다.

canvas, scene, camera, renderer를 차례로 찾으세요. renderer 생성자의 canvas가 HTML에서 찾은 canvas와 같은지 확인합니다. camera는 (0, 0, 5)에 있고 원점을 봅니다. 아직 물체가 없으므로 배경만 보이는 것이 정상입니다. scene.background = new THREE.Color('#edf2f7')에서 색만 '#172554'로 바꾸고 실행하세요. 실행 전 어느 영역이 바뀔지 필기에 적습니다.

draw는 canvas.clientWidth와 clientHeight를 CSS px로 읽습니다. 너비나 높이가 0이면 return으로 그리기를 미룹니다. 미리보기를 다시 열면 ResizeObserver가 크기 변화를 알려 draw를 호출합니다. observe(canvas)는 관찰을 시작합니다. 양수 크기에서 setSize(w, h, false)가 그림 크기를 맞추고, camera.aspect = w / h와 updateProjectionMatrix()가 카메라 비율을 적용합니다. false는 canvas의 CSS 크기를 다시 쓰지 않습니다. 이 보조 코드는 모든 단계에 들어 있으며 이번 실험에서는 그대로 둡니다. 세부 크기·버퍼·DPR 실험은 다음 단원에서 다룹니다.

output의 +는 문자열과 숫자를 이어 표시합니다. canvas와 output 선택자는 각각 문서에 있는 단일 요소를 찾습니다. client 크기는 padding을 포함하고 border와 scrollbar를 제외한 정수이며 이 canvas는 padding과 border가 0입니다. resize 관찰과 애니메이션은 실행 문서가 유지되는 동안 이어지며 다시 실행하면 사이트가 iframe을 교체합니다.

**예상 결과**

빈 장면의 배경이 #edf2f7에서 #172554로 바뀝니다. output에서 실제 표시 너비와 높이를 읽을 수 있습니다. 아직 cube가 없어도 오류가 아닙니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>canvas에 장면 그리기</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; color: #172554; background: #fff; }
      canvas { display: block; width: 100%; height: 240px; padding: 0; border: 0; }
      output { display: block; margin-top: 8px; white-space: pre-wrap; overflow-wrap: anywhere; }
      label { display: block; margin-bottom: 8px; }
      input { max-width: 100%; }
    </style>
  </head>
  <body>
    <canvas aria-label="canvas에 장면 그리기"></canvas>
    <output>미리보기 크기를 기다리는 중</output>
    <script type="module">
      import * as THREE from 'three';
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50);
      camera.position.set(0, 0, 5);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

      // 읽기 화면에서 숨겨져 있으면 크기가 생길 때까지 기다립니다.
      function draw() {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        output.textContent = '표시 크기: ' + w + ' × ' + h + ' CSS px';
        renderer.render(scene, camera);
      }
      const observer = new ResizeObserver(draw);
      observer.observe(canvas);
      draw();
    </script>
  </body>
</html>
```

<details>
<summary>힌트</summary>

- HTML에서 찾은 canvas와 WebGLRenderer({ canvas })의 canvas가 같은 요소인지 확인하세요.
- scene.background를 바꾼 뒤 renderer.render(scene, camera)를 호출하는지 확인하세요.
- scene.background에 new THREE.Color('#172554')를 대입하고 render를 다시 실행하세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

scene.background는 장면의 배경이고 body의 background CSS와는 별개입니다. 색값만 바꾸고 render하지 않으면 이미 그린 화면은 그대로일 수 있습니다. 배경도 보이지 않으면 output과 오류 표시를 읽고 script 실행, canvas 연결, render 순서로 확인합니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>canvas에 장면 그리기</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; color: #172554; background: #fff; }
      canvas { display: block; width: 100%; height: 240px; padding: 0; border: 0; }
      output { display: block; margin-top: 8px; white-space: pre-wrap; overflow-wrap: anywhere; }
      label { display: block; margin-bottom: 8px; }
      input { max-width: 100%; }
    </style>
  </head>
  <body>
    <canvas aria-label="canvas에 장면 그리기"></canvas>
    <output>미리보기 크기를 기다리는 중</output>
    <script type="module">
      import * as THREE from 'three';
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#172554');
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50);
      camera.position.set(0, 0, 5);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

      // 읽기 화면에서 숨겨져 있으면 크기가 생길 때까지 기다립니다.
      function draw() {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        output.textContent = '표시 크기: ' + w + ' × ' + h + ' CSS px';
        renderer.render(scene, camera);
      }
      const observer = new ResizeObserver(draw);
      observer.observe(canvas);
      draw();
    </script>
  </body>
</html>
```

</details>

- canvas, Scene, Camera, WebGLRenderer는 각각 무엇을 하나요?
- scene.background와 body의 background CSS는 같은 값인가요?

### 첫 정육면체와 카메라

이 독립 시작 예제는 정육면체를 포함합니다. geometry = new THREE.BoxGeometry(1, 1, 1)는 모양, material = new THREE.MeshBasicMaterial({ color: '#2563eb' })는 표면 표현, cube = new THREE.Mesh(geometry, material)는 둘을 묶은 장면 객체입니다. 이 재질은 조명 없이 보이므로 light는 추가하지 않습니다.

material 생성자의 color만 바꾸고 실행합니다. 그다음 색을 유지한 채 cube.position.x를 0에서 1로 바꿉니다. position은 부모 기준 위치입니다. 처음 부모는 Scene입니다. 이 camera에서 +X는 화면 오른쪽, +Y는 위쪽이지만 화면 방향은 camera 방향에 따라 달라집니다. scene.add(cube)를 잠시 주석 처리해 실행한 뒤 복원하세요. 생성과 장면 연결은 서로 다른 일입니다.

cube.position.x를 0으로 복원하고 camera.position.set(0, 0, 5)의 마지막 인자를 7로 바꿔 camera.position.z를 5에서 7로 바꿉니다. 더 멀어진 camera에서 cube가 어떻게 보일지 예상하세요. 이제 camera.position.set(0, 0, 5)를 camera.position.set(2, 0, 5)로 바꾸고 camera.lookAt(0, 0, 0)는 유지합니다. position은 위치, lookAt은 world 좌표의 목표를 보는 방향을 정합니다. camera는 기본적으로 local -Z를 봅니다. lookAt은 camera를 목표점으로 옮기지 않습니다.

완성 예제는 마지막 비교 상태인 주황색 물체와 camera=(2, 0, 5)를 담습니다. 중간 실험인 x=1, z=7, add 제거는 시작 코드에서 하나씩 비교하고 매번 복원하세요.

**예상 결과**

color는 표면색을, cube.position.x는 위치를 바꿉니다. add를 제거하면 cube가 사라집니다. camera.z=7에서 더 작게 보입니다. lookAt 후에도 camera.position은 (2, 0, 5)입니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>첫 정육면체와 카메라</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; color: #172554; background: #fff; }
      canvas { display: block; width: 100%; height: 240px; padding: 0; border: 0; }
      output { display: block; margin-top: 8px; white-space: pre-wrap; overflow-wrap: anywhere; }
      label { display: block; margin-bottom: 8px; }
      input { max-width: 100%; }
    </style>
  </head>
  <body>
    <canvas aria-label="첫 정육면체와 카메라"></canvas>
    <output>미리보기 크기를 기다리는 중</output>
    <script type="module">
      import * as THREE from 'three';
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50);
      camera.position.set(0, 0, 5);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.x = 0;
      scene.add(cube);

      // 읽기 화면에서 숨겨져 있으면 크기가 생길 때까지 기다립니다.
      function draw() {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        output.textContent = '물체 위치: (' + cube.position.x + ', ' + cube.position.y + ', ' + cube.position.z + ')\n카메라 위치: (' + camera.position.x + ', ' + camera.position.y + ', ' + camera.position.z + ')';
        renderer.render(scene, camera);
      }
      const observer = new ResizeObserver(draw);
      observer.observe(canvas);
      draw();
    </script>
  </body>
</html>
```

<details>
<summary>힌트</summary>

- Mesh 생성과 scene.add(cube)를 따로 찾으세요. 생성만으로 Scene에 연결되지는 않습니다.
- cube를 원점으로 복원하고 camera.z가 5 또는 7인지 확인하세요.
- camera.position.set(2, 0, 5); camera.lookAt(0, 0, 0); renderer.render(scene, camera);로 위치·방향·그리기를 확인하세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

geometry와 material로 Mesh를 만들고 Scene에 연결한 뒤 물체를 볼 수 있는 Camera로 render해야 합니다. z가 5에서 7로 커지면 원근 카메라에서 cube는 작게 보이지만 geometry 폭은 1 그대로입니다. near=.1, far=50은 그릴 깊이 범위입니다. 지금은 유지하고 03에서 잘림을 실험합니다. camera를 cube 내부에 놓고 빈 화면을 조명 부족으로 오해하지 마세요.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>첫 정육면체와 카메라</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; color: #172554; background: #fff; }
      canvas { display: block; width: 100%; height: 240px; padding: 0; border: 0; }
      output { display: block; margin-top: 8px; white-space: pre-wrap; overflow-wrap: anywhere; }
      label { display: block; margin-bottom: 8px; }
      input { max-width: 100%; }
    </style>
  </head>
  <body>
    <canvas aria-label="첫 정육면체와 카메라"></canvas>
    <output>미리보기 크기를 기다리는 중</output>
    <script type="module">
      import * as THREE from 'three';
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50);
      camera.position.set(2, 0, 5);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: '#f97316' });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.x = 0;
      scene.add(cube);

      // 읽기 화면에서 숨겨져 있으면 크기가 생길 때까지 기다립니다.
      function draw() {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        output.textContent = '물체 위치: (' + cube.position.x + ', ' + cube.position.y + ', ' + cube.position.z + ')\n카메라 위치: (' + camera.position.x + ', ' + camera.position.y + ', ' + camera.position.z + ')';
        renderer.render(scene, camera);
      }
      const observer = new ResizeObserver(draw);
      observer.observe(canvas);
      draw();
    </script>
  </body>
</html>
```

</details>

- Mesh를 만들었는데 add하지 않으면 왜 보이지 않나요?
- position과 lookAt은 각각 무엇을 바꾸나요?
- camera가 멀어지면 geometry 폭도 바뀌나요?

### 시간을 회전 각도로 바꾸기

시작 예제는 cube와 camera를 포함하고 speed=0이라 정지해 있습니다. renderFrame(timeMs)를 renderer.setAnimationLoop에 전달하면 renderer가 프레임마다 이 함수를 호출합니다. 이렇게 나중에 호출하도록 전달한 함수를 callback이라고 합니다.

timeMs는 millisecond 단위 timestamp입니다. 첫 값을 start에 저장하고 seconds = (timeMs - start) / 1000으로 지난 초를 계산합니다. cube.rotation.y = seconds * speed에서 speed 단위는 rad/s입니다. rotation은 radian을 씁니다. Math.PI는 180°, Math.PI / 2는 90°, 2 * Math.PI는 한 바퀴입니다. camera.fov는 degree라는 차이도 기억하세요.

speed를 .5로 바꿔 다시 실행하고 output의 seconds가 약 2일 때 angle을 읽습니다. speed=1로 재실행해 같은 2초 부근을 비교합니다. 정확히 2초인 프레임이 없을 수 있으므로 실제 시간과 각도를 함께 기록하세요. 프레임마다 고정 각도를 더하면 초당 회전량이 화면 주사율에 따라 달라질 수 있습니다. 이 예제는 시간으로 각도를 계산합니다.

renderFrame은 draw()를 호출합니다. draw 안의 renderer.render(scene, camera)가 갱신된 회전을 그립니다. draw는 반복 호출되므로 매번 같은 객체를 사용합니다.

**예상 결과**

speed=0이면 정지합니다. 약 2초에 speed=.5는 angle≈1rad, speed=1은 angle≈2rad입니다. output과 화면이 함께 바뀝니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>시간을 회전 각도로 바꾸기</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; color: #172554; background: #fff; }
      canvas { display: block; width: 100%; height: 240px; padding: 0; border: 0; }
      output { display: block; margin-top: 8px; white-space: pre-wrap; overflow-wrap: anywhere; }
      label { display: block; margin-bottom: 8px; }
      input { max-width: 100%; }
    </style>
  </head>
  <body>
    <canvas aria-label="시간을 회전 각도로 바꾸기"></canvas>
    <output>미리보기 크기를 기다리는 중</output>
    <script type="module">
      import * as THREE from 'three';
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50);
      camera.position.set(0, 0, 5);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.x = 0;
      scene.add(cube);
      const speed = 0; // rad/s: 0 → 0.5 → 1로 바꿔 보세요.
      let start;
      let seconds = 0;

      // 읽기 화면에서 숨겨져 있으면 크기가 생길 때까지 기다립니다.
      function draw() {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        output.textContent = '시간: ' + seconds.toFixed(3) + ' s; 각도: ' + cube.rotation.y.toFixed(3) + ' rad; speed: ' + speed + ' rad/s';
        renderer.render(scene, camera);
      }
      const observer = new ResizeObserver(draw);
      observer.observe(canvas);
      draw();
      function renderFrame(timeMs) {
        if (start === undefined) start = timeMs;
        seconds = (timeMs - start) / 1000;
        cube.rotation.y = seconds * speed;
        draw();
      }
      renderer.setAnimationLoop(renderFrame);
    </script>
  </body>
</html>
```

<details>
<summary>힌트</summary>

- seconds와 angle이 함께 변하는지 확인하세요. 숫자만 변하면 render 위치를 봅니다.
- timeMs를 1000으로 나눴는지, speed가 rad/s인지 확인하세요.
- renderFrame에서 cube.rotation.y = seconds * speed 다음 renderer.render(scene, camera)를 호출하세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

.5rad/s로 2초면 1rad, 1rad/s로 2초면 2rad입니다. 2000ms를 초로 바꾸지 않으면 각도가 1000배 커집니다. 회전값 변경 뒤 renderer.render(scene, camera)도 renderFrame 안에서 호출해야 화면이 바뀝니다. 같은 cube의 값을 바꾸며 매번 새 cube를 만들지 않습니다. renderer.setAnimationLoop(null)은 반복 호출을 중지합니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>시간을 회전 각도로 바꾸기</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; color: #172554; background: #fff; }
      canvas { display: block; width: 100%; height: 240px; padding: 0; border: 0; }
      output { display: block; margin-top: 8px; white-space: pre-wrap; overflow-wrap: anywhere; }
      label { display: block; margin-bottom: 8px; }
      input { max-width: 100%; }
    </style>
  </head>
  <body>
    <canvas aria-label="시간을 회전 각도로 바꾸기"></canvas>
    <output>미리보기 크기를 기다리는 중</output>
    <script type="module">
      import * as THREE from 'three';
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50);
      camera.position.set(0, 0, 5);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.x = 0;
      scene.add(cube);
      const speed = 0.5; // rad/s: 0 → 0.5 → 1로 바꿔 보세요.
      let start;
      let seconds = 0;

      // 읽기 화면에서 숨겨져 있으면 크기가 생길 때까지 기다립니다.
      function draw() {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        output.textContent = '시간: ' + seconds.toFixed(3) + ' s; 각도: ' + cube.rotation.y.toFixed(3) + ' rad; speed: ' + speed + ' rad/s';
        renderer.render(scene, camera);
      }
      const observer = new ResizeObserver(draw);
      observer.observe(canvas);
      draw();
      function renderFrame(timeMs) {
        if (start === undefined) start = timeMs;
        seconds = (timeMs - start) / 1000;
        cube.rotation.y = seconds * speed;
        draw();
      }
      renderer.setAnimationLoop(renderFrame);
    </script>
  </body>
</html>
```

</details>

- 고정 각도를 매 프레임 더하는 것과 seconds*speed는 어떻게 다른가요?
- 왜 timeMs를 1000으로 나누나요?
- 숫자는 변하는데 화면이 정지했다면 무엇을 확인하나요?

### 부모와 자식의 위치 비교

이 독립 시작 예제는 애니메이션 없이 정지해 있습니다. parent = new THREE.Group()는 자체 도형이 없는 부모 노드입니다. parent.position=(0, 0, 0), child.position=(2, 0, 0)이고 parent.add(child), scene.add(parent)로 연결합니다. camera는 XZ 이동을 보기 위해 (5, 4, 7)에서 원점을 봅니다.

트리는 Scene → parent Group → child Mesh입니다. child.position은 parent 기준 local 위치이고 world 위치는 부모 변환을 거친 장면 전체 기준 위치입니다. angleInput의 값은 문자열이므로 Number(angleInput.value)로 바꿔 parent.rotation.y에 씁니다. 이 예제의 선택값은 radian 0과 Math.PI / 2입니다.

world = new THREE.Vector3()는 결과를 담는 객체입니다. child.getWorldPosition(world)는 world에 결과를 쓰고 child.position은 그대로 둡니다. 회전 0에서 local과 world를 예상한 뒤 실행하세요. 둘 다 (2, 0, 0)입니다. 부모 Y 회전을 Math.PI / 2로 바꾼 뒤 다시 비교합니다. local=(2, 0, 0), world=(0, 0, -2)가 예상값입니다. 오른손 엄지를 +Y로 향하면 손가락이 감기는 방향이 양의 회전입니다. XZ 도식에서 +X가 -Z로 돌아갑니다.

HTML의 range input은 0과 1.5707963267948966 두 값으로 움직이며 두 번째 값은 Math.PI / 2입니다. addEventListener('input', draw)는 값을 바꿀 때 draw를 다시 호출합니다. toFixed(2)는 숫자를 소수 두 자리 문자열로 표시합니다. coordinates 함수는 x/y/z를 묶어 표시할 뿐 위치를 바꾸지 않습니다.

**예상 결과**

parent는 원점에 고정됩니다. parent.rotation.y=0일 때 world=(2, 0, 0), Math.PI / 2일 때 world≈(0, 0, -2)입니다. child local=(2, 0, 0)은 두 조건에서 같습니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>부모와 자식의 위치 비교</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; color: #172554; background: #fff; }
      canvas { display: block; width: 100%; height: 240px; padding: 0; border: 0; }
      output { display: block; margin-top: 8px; white-space: pre-wrap; overflow-wrap: anywhere; }
      label { display: block; margin-bottom: 8px; }
      input { max-width: 100%; }
    </style>
  </head>
  <body>
    <p>Scene → parent Group → child Mesh</p>
    <p>+Y는 위, +X에서 -Z로 90° 회전합니다. 부모는 원점에 고정됩니다.</p>
    <label for="angle"
      >부모 Y 회전 (radian)
      <input
        id="angle"
        type="range"
        min="0"
        max="1.5707963267948966"
        step="1.5707963267948966"
        value="0"
      />
    </label>
    <canvas aria-label="부모와 자식의 위치 비교"></canvas>
    <output>미리보기 크기를 기다리는 중</output>
    <script type="module">
      import * as THREE from 'three';
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50);
      camera.position.set(5, 4, 7);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const child = new THREE.Mesh(geometry, material);
      child.position.x = 2;
      const parent = new THREE.Group();
      parent.add(child);
      scene.add(parent);
      const angleInput = document.querySelector('#angle');
      const world = new THREE.Vector3();
      const coordinates = value => '(' + value.x.toFixed(2) + ', ' + value.y.toFixed(2) + ', ' + value.z.toFixed(2) + ')';

      // 읽기 화면에서 숨겨져 있으면 크기가 생길 때까지 기다립니다.
      function draw() {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        parent.rotation.y = Number(angleInput.value);
        child.getWorldPosition(world);
        output.textContent = '부모 Y 회전: ' + parent.rotation.y.toFixed(6) + ' rad\nlocal: ' + coordinates(child.position) + '\nworld: ' + coordinates(world);
        renderer.render(scene, camera);
      }
      const observer = new ResizeObserver(draw);
      observer.observe(canvas);
      draw();
      angleInput.addEventListener('input', draw);
    </script>
  </body>
</html>
```

<details>
<summary>힌트</summary>

- child.position과 world를 같은 output에서 읽고 부모 기준인 값을 구별하세요.
- child의 마지막 연결이 parent.add(child)인지 확인하세요. scene.add(child)는 부모를 바꿉니다.
- const world = new THREE.Vector3(); child.getWorldPosition(world);로 읽으세요. parent.rotation.y만 Math.PI / 2로 바꾸면 local=(2, 0, 0), world=(0, 0, -2)입니다.

</details>

<details>
<summary>완성 코드와 해설</summary>

부모의 회전은 자식 위치를 표현하는 기준 축을 돌립니다. 자식은 여전히 부모의 +X로 2 떨어져 있습니다. getWorldPosition은 현재 부모 변환을 반영하므로 직접 행렬을 곱할 필요가 없습니다. 1e-16 같은 값은 0 근처의 부동소수 오차입니다. output만 소수 2자리로 표시하고 실제 position은 반올림하지 않습니다.

한 객체의 부모는 하나입니다. parent.add(child) 다음 scene.add(child)를 쓰면 child가 parent에서 빠져나옵니다. 완료할 때 두 회전 조건의 예측·실제 좌표·이유를 사이트 필기에 남기세요.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>부모와 자식의 위치 비교</title>
    <style>
      body { margin: 0; padding: 12px; font: 14px/1.5 system-ui, sans-serif; color: #172554; background: #fff; }
      canvas { display: block; width: 100%; height: 240px; padding: 0; border: 0; }
      output { display: block; margin-top: 8px; white-space: pre-wrap; overflow-wrap: anywhere; }
      label { display: block; margin-bottom: 8px; }
      input { max-width: 100%; }
    </style>
  </head>
  <body>
    <p>Scene → parent Group → child Mesh</p>
    <p>+Y는 위, +X에서 -Z로 90° 회전합니다. 부모는 원점에 고정됩니다.</p>
    <label for="angle"
      >부모 Y 회전 (radian)
      <input
        id="angle"
        type="range"
        min="0"
        max="1.5707963267948966"
        step="1.5707963267948966"
        value="1.5707963267948966"
      />
    </label>
    <canvas aria-label="부모와 자식의 위치 비교"></canvas>
    <output>미리보기 크기를 기다리는 중</output>
    <script type="module">
      import * as THREE from 'three';
      const canvas = document.querySelector('canvas');
      const output = document.querySelector('output');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#edf2f7');
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50);
      camera.position.set(5, 4, 7);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
      const child = new THREE.Mesh(geometry, material);
      child.position.x = 2;
      const parent = new THREE.Group();
      parent.add(child);
      scene.add(parent);
      const angleInput = document.querySelector('#angle');
      const world = new THREE.Vector3();
      const coordinates = value => '(' + value.x.toFixed(2) + ', ' + value.y.toFixed(2) + ', ' + value.z.toFixed(2) + ')';

      // 읽기 화면에서 숨겨져 있으면 크기가 생길 때까지 기다립니다.
      function draw() {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        parent.rotation.y = Number(angleInput.value);
        child.getWorldPosition(world);
        output.textContent = '부모 Y 회전: ' + parent.rotation.y.toFixed(6) + ' rad\nlocal: ' + coordinates(child.position) + '\nworld: ' + coordinates(world);
        renderer.render(scene, camera);
      }
      const observer = new ResizeObserver(draw);
      observer.observe(canvas);
      draw();
      angleInput.addEventListener('input', draw);
    </script>
  </body>
</html>
```

</details>

- 부모만 회전했는데 child.position은 왜 그대로인가요?
- getWorldPosition(world)는 child.position을 바꾸나요?
- scene.add(child)를 마지막에 호출하면 무엇이 달라지나요?

### API · THREE.Scene

장면의 루트를 만드는 생성자입니다. Scene은 Object3D를 상속하며 add로 자식을 연결합니다. background는 배경 설정 멤버이고 기본값은 null입니다.

새 Scene을 반환합니다. 생성만으로 canvas에 그리지 않습니다.

- Scene은 HTML 요소가 아닙니다.

```js
const scene = new THREE.Scene();
scene.add(cube);
```

[THREE.Scene](https://threejs.org/docs/pages/Scene.html) · three@0.186.1 · 2026-10-26

### API · THREE.Color

색 객체를 만드는 생성자입니다. 이 과정은 CSS hex 문자열만 사용합니다.

- `value: string` — CSS hex 색 문자열입니다. 예: '#edf2f7'.

새 Color를 반환합니다.

- 색 공간·선형 RGB 계산은 후속 주제입니다.

```js
scene.background = new THREE.Color('#edf2f7');
```

[THREE.Color](https://threejs.org/docs/pages/Color.html) · three@0.186.1 · 2026-10-26

### API · THREE.WebGLRenderer / renderer.domElement

canvas에 WebGL2 장면을 그리는 renderer 생성자입니다. domElement는 실제 출력 canvas를 가리키는 멤버입니다.

- `canvas: HTMLCanvasElement` — HTML에서 찾은 canvas입니다. 생략하면 renderer가 새 canvas를 만듭니다.
- `antialias: boolean` — 생성 시 가장자리 안티앨리어싱을 요청합니다. (false)

renderer를 반환합니다. domElement는 메서드가 아닌 canvas 참조입니다.

- WebGL2 지원이 필요합니다. 기존 canvas를 쓰려면 생성자에 전달하세요.

```js
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
const actualCanvas = renderer.domElement;
```

[THREE.WebGLRenderer / renderer.domElement](https://threejs.org/docs/pages/WebGLRenderer.html) · three@0.186.1 · 2026-10-26

### API · renderer.setSize

renderer의 논리 크기와 viewport를 맞추는 인스턴스 메서드입니다. DPR을 반영해 canvas buffer 크기도 바꿉니다.

- `width: number` — 논리 너비, CSS px입니다.
- `height: number` — 논리 높이, CSS px입니다.
- `updateStyle: boolean` — true면 canvas inline CSS 너비·높이도 바꿉니다. (true)

반환값 없음. buffer는 floor(width*DPR) × floor(height*DPR)입니다.

- CSS가 표시 크기를 관리할 때 false를 사용합니다. 이미 DPR을 곱한 수치를 다시 넣지 마세요.

```js
renderer.setSize(w, h, false);
```

[renderer.setSize](https://threejs.org/docs/pages/WebGLRenderer.html) · three@0.186.1 · 2026-10-26

### API · renderer.render

장면과 카메라로 현재 canvas에 그리는 인스턴스 메서드입니다.

- `scene: Scene` — 그릴 장면입니다.
- `camera: Camera` — 관찰 위치·방향·투영을 정하는 카메라입니다.

반환값 없음. 현재 이미지가 갱신됩니다.

- 객체 속성 변경만으로 이 메서드가 자동 호출되지는 않습니다.

```js
renderer.render(scene, camera);
```

[renderer.render](https://threejs.org/docs/pages/WebGLRenderer.html) · three@0.186.1 · 2026-10-26

### API · THREE.PerspectiveCamera

먼 물체를 작게 표현하는 원근 카메라 생성자입니다. 인자는 순서가 있습니다.

- `fov: number` — 세로 시야각, degree입니다. (50)
- `aspect: number` — 표시 너비/높이 비율입니다. (1)
- `near: number` — 카메라 앞의 근거리 평면 깊이입니다. (0.1)
- `far: number` — 원거리 평면 깊이입니다. (2000)

새 PerspectiveCamera를 반환합니다.

- near>0, far>near로 설정합니다. fov는 rotation의 radian과 단위가 다릅니다.
- fov/aspect/near/far/zoom 변경 후 updateProjectionMatrix를 호출합니다.

```js
const camera = new THREE.PerspectiveCamera(50, w / h, .1, 50);
```

[THREE.PerspectiveCamera](https://threejs.org/docs/pages/PerspectiveCamera.html) · three@0.186.1 · 2026-10-26

### API · THREE.BoxGeometry

원점 중심의 직육면체 모양을 만드는 생성자입니다. 각 변은 local X/Y/Z와 평행합니다.

- `width: number` — local X 방향 길이입니다. (1)
- `height: number` — local Y 방향 길이입니다. (1)
- `depth: number` — local Z 방향 길이입니다. (1)

새 BoxGeometry를 반환합니다.

- segment 인자는 이 과정에서 생략하며 각 기본값은 1입니다. parameters.width를 바꿔도 정점이 다시 만들어지지 않습니다.

```js
const geometry = new THREE.BoxGeometry(1, 1, 1);
```

[THREE.BoxGeometry](https://threejs.org/docs/pages/BoxGeometry.html) · three@0.186.1 · 2026-10-26

### API · THREE.MeshBasicMaterial

조명 영향을 받지 않는 표면 표현을 만드는 생성자입니다.

- `color: Color | string | number` — 예제는 CSS hex 문자열을 사용합니다. (0xffffff)
- `wireframe: boolean` — true면 삼각형 모서리로 표현합니다. (false)

새 material을 반환합니다.

- 이 재질이 보이지 않는다고 light를 추가하는 것으로 해결하려 하지 마세요. Scene 연결·camera·render를 먼저 확인합니다.

```js
const material = new THREE.MeshBasicMaterial({ color: '#2563eb' });
```

[THREE.MeshBasicMaterial](https://threejs.org/docs/pages/MeshBasicMaterial.html) · three@0.186.1 · 2026-10-26

### API · THREE.Mesh

geometry와 material을 묶는 장면 객체 생성자입니다.

- `geometry: BufferGeometry` — 모양 객체입니다.
- `material: Material` — 표면 표현 객체입니다.

새 Mesh를 반환합니다. Scene에 자동으로 추가하지 않습니다.

- 이 과정은 생략 기본값에 의존하지 않고 두 인자를 전달합니다.

```js
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
```

[THREE.Mesh](https://threejs.org/docs/pages/Mesh.html) · three@0.186.1 · 2026-10-26

### API · object.position / Vector3.set

position은 부모 기준 위치를 담은 Vector3 멤버입니다. position.set은 세 성분을 한 번에 바꾸는 Vector3 메서드입니다.

- `x: number` — 부모 X축 기준 위치입니다.
- `y: number` — 부모 Y축 기준 위치입니다.
- `z: number` — 부모 Z축 기준 위치입니다.

position 초기값은 (0, 0, 0)입니다. set은 원본을 바꾸고 같은 Vector3를 반환합니다.

- position을 배열로 교체하지 말고 x/y/z 또는 set으로 바꾸세요.

```js
cube.position.set(1, 0, 0);
cube.position.x = 2;
```

[object.position / Vector3.set](https://threejs.org/docs/pages/Object3D.html) · three@0.186.1 · 2026-10-26

### API · camera.lookAt

world 좌표 목표를 향해 camera 방향을 바꾸는 메서드입니다.

- `x: number` — 목표 world X입니다. Vector3 하나를 전달하는 형태도 있습니다.
- `y: number` — 목표 world Y입니다.
- `z: number` — 목표 world Z입니다.

반환값 없음. camera 회전이 바뀌고 position은 바뀌지 않습니다.

- 비균일 scale 부모는 지원하지 않습니다. Controls 사용 시 매 프레임 lookAt과 controls.update가 서로 방향을 덮지 않게 합니다.

```js
camera.position.set(2, 0, 5);
camera.lookAt(0, 0, 0);
```

[camera.lookAt](https://threejs.org/docs/pages/Object3D.html) · three@0.186.1 · 2026-10-26

### API · object.add

다른 Object3D를 자식으로 연결하는 메서드입니다.

- `children: Object3D[]` — 연결할 자식들입니다. 여러 인자를 전달할 수 있습니다.

부모 자신을 반환합니다. 자식은 기존 부모에서 분리됩니다.

- 한 객체의 부모는 하나입니다. local transform은 유지하지만 world 위치 보존을 보장하지 않습니다.

```js
parent.add(child);
scene.add(parent);
```

[object.add](https://threejs.org/docs/pages/Object3D.html) · three@0.186.1 · 2026-10-26

### API · object.rotation.x/y/z

Object3D의 local 회전을 담은 Euler 멤버입니다. x/y/z는 radian 각도입니다.

초기 각도는 (0, 0, 0), 기본 order는 XYZ입니다. 성분 대입은 해당 객체를 바꿉니다.

- Math.PI / 2는 90°입니다. camera.fov의 degree와 혼동하지 마세요.
- 자식 rotation.y는 world Y축 회전과 항상 같지 않습니다.

```js
cube.rotation.y = Math.PI / 2;
```

[object.rotation.x/y/z](https://threejs.org/docs/pages/Object3D.html) · three@0.186.1 · 2026-10-26

### API · renderer.setAnimationLoop

프레임마다 실행할 callback을 등록하거나 중지하는 메서드입니다.

- `callback: function | null` — 비-XR 예제의 첫 인자는 timestamp timeMs입니다. null은 중지합니다.

반환값 없음. 등록한 callback이 반복 실행됩니다.

- timestamp는 ms이며 초는 (timeMs-start)/1000입니다.
- callback 안에서 객체 값을 바꾼 뒤 render도 호출해야 합니다.

```js
let start;
renderer.setAnimationLoop(timeMs => {
  if (start === undefined) start = timeMs;
  const seconds = (timeMs - start) / 1000;
  cube.rotation.y = seconds * speed;
  renderer.render(scene, camera);
});
```

[renderer.setAnimationLoop](https://threejs.org/docs/pages/WebGLRenderer.html) · three@0.186.1 · 2026-10-26

### API · THREE.Group

자식들의 변환을 묶는 Object3D 계열 생성자입니다. 자체 도형은 없습니다.

새 Group을 반환합니다. position/rotation/add는 Object3D 계약을 따릅니다.

- Group을 추가했다고 눈에 보이는 geometry가 생기지는 않습니다.

```js
const parent = new THREE.Group();
parent.add(child);
scene.add(parent);
```

[THREE.Group](https://threejs.org/docs/pages/Group.html) · three@0.186.1 · 2026-10-26

### API · THREE.Vector3

세 성분 x/y/z를 보관하는 객체 생성자입니다. 위치 결과를 저장할 때 사용합니다.

- `x: number` — X 성분입니다. (0)
- `y: number` — Y 성분입니다. (0)
- `z: number` — Z 성분입니다. (0)

새 Vector3를 반환합니다.

- Vector3라는 타입만으로 local/world가 정해지지 않습니다. 값의 의미는 작성한 코드가 정합니다.

```js
const world = new THREE.Vector3();
```

[THREE.Vector3](https://threejs.org/docs/pages/Vector3.html) · three@0.186.1 · 2026-10-26

### API · object.getWorldPosition

현재 부모 변환을 반영한 world 위치를 읽는 메서드입니다.

- `target: Vector3` — 결과를 써 넣을 객체이며 생략할 수 없습니다.

target을 변경하고 같은 target을 반환합니다. object.position은 바꾸지 않습니다.

- 0.186.1에서는 필요한 부모 world 행렬을 메서드 안에서 갱신합니다. 직접 행렬 곱셈은 필요 없습니다.

```js
const world = new THREE.Vector3();
child.getWorldPosition(world);
```

[object.getWorldPosition](https://threejs.org/docs/pages/Object3D.html) · three@0.186.1 · 2026-10-26

### API · camera.updateProjectionMatrix

fov/aspect/near/far/zoom 변경을 투영 행렬에 반영하는 메서드입니다. 직교 카메라도 같은 이름의 메서드를 제공합니다.

반환값 없음. 다음 render가 새 투영을 사용합니다.

- 속성 대입만으로 자동 호출되지 않습니다.
- camera position 이동은 투영값 변경과 구별합니다.

```js
camera.aspect = w / h;
camera.updateProjectionMatrix();
```

[camera.updateProjectionMatrix](https://threejs.org/docs/pages/PerspectiveCamera.html) · three@0.186.1 · 2026-10-26

### API · canvas.width/height / stage.clientWidth/clientHeight

표시 크기와 buffer 크기를 읽는 DOM 멤버입니다. clientWidth/clientHeight는 CSS px이고 canvas.width/height는 buffer px입니다. clientWidth/clientHeight는 canvas에도 같은 Element 계약으로 적용됩니다.

크기 숫자를 반환하는 속성 읽기입니다. client 크기는 정수이며 padding 포함, border 제외입니다. 해당 방향 scrollbar도 제외합니다.

- Three.js API가 아닌 Web API입니다. packageVersion은 강의의 Three.js 기준 버전입니다.
- 예제 stage는 padding/border가 없습니다. renderer를 쓸 때 buffer를 canvas 속성으로 직접 변경하며 섞지 마세요.
- 표시 크기 출처: https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth 및 https://developer.mozilla.org/en-US/docs/Web/API/Element/clientHeight

```js
const w = stage.clientWidth;
const h = stage.clientHeight;
output.textContent = `${w} × ${h}; ${canvas.width} × ${canvas.height}`;
```

[canvas.width/height / stage.clientWidth/clientHeight](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/width) · three@0.186.1 · 2026-10-26

### API · ResizeObserver / observe / disconnect

요소 크기 변화를 callback으로 알리는 Web API입니다. window 크기가 그대로여도 stage 변화에 반응합니다.

- `callback: function` — 크기가 변할 때 실행할 함수입니다. 예제는 resizeScene을 전달합니다.
- `target: Element` — observe(target)로 관찰할 stage 요소입니다.

생성자는 observer를 반환합니다. observe와 disconnect는 반환값이 없습니다. disconnect는 관찰을 중지합니다.

- Three.js API가 아닙니다. packageVersion은 강의의 Three.js 기준 버전입니다.
- w 또는 h가 0이면 나누기 전에 return합니다. observer는 render를 대신하지 않습니다.

```js
const observer = new ResizeObserver(resizeScene);
observer.observe(stage);
resizeScene();
// When observation ends: observer.disconnect();
```

[ResizeObserver / observe / disconnect](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) · three@0.186.1 · 2026-10-26

## 다음 학습

[다음: 렌더러와 화면 크기](../units/02/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문

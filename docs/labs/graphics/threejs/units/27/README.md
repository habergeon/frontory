# Three.js · 27 장면 검사기 통합

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 자원 수명·접근성·측정 · 편집 가능한 예제 · 저장 ID: `threejs-step-27`

## 목표와 학습 후 역량

- animated는 Left·Right 2개와 SlideLeft 클립 1개를 가집니다.
- target이 선택 객체의 중심으로 바뀌고 그 객체가 화면 중심에 옵니다.

## 선수 지식

선수 단원: 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26. 이번 실험에서 이어갑니다.

## 핵심 개념과 설명

### 검사기에 모델 불러오기

샘플을 static에서 animated로 바꾸고 불러오세요. 모델 교체 성공 뒤에만 장면·목록·mixer가 함께 바뀝니다. 파일은 실행 중에만 사용합니다.

### 선택과 카메라 연결

객체 목록에서 Right를 선택하고 선택 맞춤을 누르세요. 시작은 맞춤이 꺼져 있으므로 맞춤 허용을 켜고 적용합니다. Box3 중심·크기로 카메라 위치와 시선을 함께 갱신합니다.

## 실습 준비

사이트에서 독립 HTML을 편집·실행합니다. Three.js 0.186.1을 사용하며 별도 설치·서버가 필요 없습니다. 기존 JavaScript 초안은 보존됩니다.

모든 필수 과제를 사이트 안에서 단계별로 수행합니다. 아래 학습 단계의 시작 코드를 불러와 수정하고 실행한 뒤, 실제 결과와 이유를 사이트 필기에 남기세요.

## 실습 과제

1. 샘플을 static에서 animated로 바꾸고 불러오세요. 모델 교체 성공 뒤에만 장면·목록·mixer가 함께 바뀝니다. 파일은 실행 중에만 사용합니다.
2. 객체 목록에서 Right를 선택하고 선택 맞춤을 누르세요. 시작은 맞춤이 꺼져 있으므로 맞춤 허용을 켜고 적용합니다. Box3 중심·크기로 카메라 위치와 시선을 함께 갱신합니다.
3. animated를 불러온 뒤 재생을 누르세요. 시작의 속도 0을 1로 바꾸고 적용합니다. Left의 X가 시간에 따라 달라집니다. pause 뒤 정지 위치를 보고 stop으로 되감으세요.
4. 미니맵을 켜고 적용하세요. 같은 장면을 별도 카메라로 target에 그린 뒤 오른쪽 아래에 표시합니다. 선택·애니메이션을 바꾸며 두 화면이 함께 갱신되는지 보세요.
5. 손상 GLB, slow A then fast B, 샘플 복구를 차례로 실행하세요. 로딩 실패·stale에도 객체 목록·선택·카메라·재생·미니맵 컨트롤이 남습니다. 복구 후 키보드로 Right 선택·맞춤·재생을 다시 실행하세요.

## 관찰할 변수

| 변수                   | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설                                      |
| ---------------------- | --------- | --------- | ---------------------------------------------------------- |
| 검사기에 모델 불러오기 | starter   | solution  | animated는 Left·Right 2개와 SlideLeft 클립 1개를 가집니다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] animated는 Left·Right 2개와 SlideLeft 클립 1개를 가집니다.
- [ ] target이 선택 객체의 중심으로 바뀌고 그 객체가 화면 중심에 옵니다.

## 자가 점검

1. 실패할 수 있는 작업 전에 무엇을 보존해야 하나요?
2. 선택한 객체와 카메라 target은 어떻게 연결되나요?
3. 모델 교체 전에 mixer 캐시를 왜 해제하나요?
4. 미니맵이 멈췄을 때 어떤 갱신을 점검하나요?
5. 오류 뒤에도 함께 작동해야 하는 기능은 무엇인가요?

## 공식 참고

- [Three.js GLTFLoader](https://threejs.org/docs/pages/GLTFLoader.html)
- [Three.js Cleanup](https://threejs.org/manual/pages/cleanup.html)
- [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/threejs-step-27/example.html) · [실행 환경과 제한](../../../../../examples.md)

HTML 시작 코드에서 과제를 수행하고 실제 관찰값과 조건을 기존 필기에 남기세요.

- [example.html](../../../../../../src/labs/threejs-step-27/example.html)

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 단계별 학습

샘플을 static에서 animated로 바꾸고 불러오세요. 모델 교체 성공 뒤에만 장면·목록·mixer가 함께 바뀝니다. 파일은 실행 중에만 사용합니다.

### 선수 단원

- `threejs-02`
- `threejs-step-15`
- `threejs-step-16`
- `threejs-step-17`
- `threejs-step-18`
- `threejs-step-19`
- `threejs-step-20`
- `threejs-step-21`
- `threejs-step-22`
- `threejs-step-23`
- `threejs-step-24`
- `threejs-step-25`
- `threejs-step-26`

### 검사기에 모델 불러오기

샘플을 static에서 animated로 바꾸고 불러오세요. 모델 교체 성공 뒤에만 장면·목록·mixer가 함께 바뀝니다. 파일은 실행 중에만 사용합니다.

**예상 결과**

animated는 Left·Right 2개와 SlideLeft 클립 1개를 가집니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>검사기에 모델 불러오기</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>검사기에 모델 불러오기</h1>
    <p>
      샘플을 static에서 animated로 바꾸고 불러오세요. 모델 교체 성공 뒤에만
      장면·목록·mixer가 함께 바뀝니다. 파일은 실행 중에만 사용합니다.
    </p>
    <p>
      자체 제작한 두 패널 GLB입니다. 선택 파일은 실행 중에만 사용하며 백업에
      넣지 않습니다. 다시 실행한 뒤 재선택하세요. 2 MiB 이하 self-contained
      비압축 GLB와 내장 PNG/JPEG만 받습니다. 외부 URI·다중 파일
      glTF·Draco·Meshopt·KTX2는 지원하지 않습니다.
    </p>
    <div class="controls">
      <label
        >내장 모델<select id="model">
          <option selected>static</option>
          <option>animated</option>
          <option>textured</option>
          <option>empty</option>
        </select></label
      ><button id="sample">샘플 불러오기</button
      ><button id="race">slow A then fast B</button
      ><button id="invalid">손상 GLB</button
      ><button id="recover">샘플 복구</button
      ><label
        >GLB 파일<input
          id="file"
          type="file"
          accept=".glb,model/gltf-binary" /></label
      ><label><input id="guard" type="checkbox" checked />generation 보호</label
      ><label><input id="stale" type="checkbox" checked />stale 정리</label
      ><label><input id="framing" type="checkbox" checked />맞춤 허용</label
      ><label><input id="minimap" type="checkbox" checked />미니맵</label
      ><label>객체 목록<select id="objects"></select></label
      ><button id="frame">선택 맞춤</button
      ><button id="right">카메라 오른쪽</button><button id="zoom">확대</button
      ><button id="play">재생</button><button id="pause">일시정지</button
      ><button id="stop">정지·되감기</button
      ><label
        >속도<input
          id="speed"
          type="number"
          value="1"
          min="0"
          max="3"
          step="0.25" /></label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="검사기에 모델 불러오기"></canvas></div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
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

      const loader=new GLTFLoader();const counts={createdGeometry:0,createdMaterial:0,createdTexture:0,geometry:0,material:0,texture:0,bitmap:0,mixer:0,timer:0,stale:0};const books=new Set();let root=null,meshes=[],generation=0,current='',status='loading',selected=0,mixer=null,action=null,playing=false,last=0,completions=[],stats={};const timers=new Map(),retained=new Set();const targetPoint=new THREE.Vector3();
      function book(gltf){const geometry=new Set(),material=new Set(),texture=new Set(),images=new Set();for(const scene of gltf.scenes)scene.traverse(o=>{if(o.geometry)geometry.add(o.geometry);for(const m of Array.isArray(o.material)?o.material:o.material?[o.material]:[]){material.add(m);for(const value of Object.values(m))if(value?.isTexture){texture.add(value);if(value.image?.close)images.add(value.image);}}});const b={geometry,material,texture,images,gltf};for(const [name,set]of Object.entries({geometry,material,texture})){counts['created'+name[0].toUpperCase()+name.slice(1)]+=set.size;for(const r of set)r.addEventListener('dispose',()=>counts[name]++);}books.add(b);return b;}
      function release(b){if(!books.delete(b))return;for(const set of [b.geometry,b.material,b.texture])for(const r of set)r.dispose();for(const image of b.images){image.close();counts.bitmap++;}retained.delete(b);}
      let activeBook=null;function clearMixer(){if(mixer&&root){mixer.stopAllAction();mixer.uncacheRoot(root);counts.mixer++;}mixer=null;action=null;playing=false;}
      function wait(ms){if(!ms)return Promise.resolve();return new Promise(resolve=>{const id=setTimeout(()=>{timers.delete(id);counts.timer++;resolve();},ms);timers.set(id,resolve);});}
      async function loadModel(readBuffer,name,delay=0){const token=++generation;status='loading';document.querySelector('#error').textContent='';draw();let b;try{const buffer=await readBuffer();validateGlb(buffer);const gltf=await loader.parseAsync(buffer,'');b=book(gltf);await wait(delay);completions.push(name);if(disposed||document.querySelector('#guard').checked&&token!==generation){counts.stale++;if(disposed||document.querySelector('#stale').checked)release(b);else retained.add(b);return;}clearMixer();if(root)scene.remove(root);if(activeBook)release(activeBook);activeBook=b;root=gltf.scene;scene.add(root);meshes=[];root.traverse(o=>{if(o.isMesh)meshes.push(o);});selected=0;document.querySelector('#objects').replaceChildren(...meshes.map((o,i)=>new Option(o.name||'Mesh '+i,String(i))));if(gltf.animations.length){mixer=new THREE.AnimationMixer(root);action=mixer.clipAction(gltf.animations[0]);action.play();mixer.timeScale=Number(document.querySelector('#speed').value);playing=true;}current=name;status='ready';draw();}catch(cause){if(b)release(b);if(disposed||token!==generation)return;status='error';document.querySelector('#error').textContent="GLB를 읽지 못했습니다. 샘플 복구 또는 다른 파일을 선택하세요. 상세: "+cause.message;draw();}}
      const bytes=kind=>Uint8Array.from(atob(samples[kind]),c=>c.charCodeAt(0)).buffer;
      on('#sample','click',()=>{document.querySelector('#file').value='';const kind=document.querySelector('#model').value;void loadModel(()=>bytes(kind),kind);});on('#race','click',()=>{void loadModel(()=>bytes('textured'),'A',300);void loadModel(()=>bytes('animated'),'B',20);});on('#invalid','click',()=>void loadModel(()=>new TextEncoder().encode('invalid').buffer,'invalid'));on('#recover','click',()=>void loadModel(()=>bytes('animated'),'recovered'));on('#file','change',()=>{const file=document.querySelector('#file').files[0];if(file)void loadModel(()=>file.arrayBuffer(),file.name);});
      on('#objects','change',()=>{selected=document.querySelector('#objects').selectedIndex;draw();});on('#frame','click',()=>{if(document.querySelector('#framing').checked&&meshes[selected]){const box=new THREE.Box3().setFromObject(meshes[selected]);if(!box.isEmpty()){box.getCenter(targetPoint);const size=box.getSize(new THREE.Vector3()).length();camera.position.copy(targetPoint).add(new THREE.Vector3(0,size*.3,size*1.8));}}draw();});on('#right','click',()=>{camera.position.x++;draw();});on('#zoom','click',()=>{camera.position.z--;draw();});on('#play','click',()=>{if(action){action.paused=false;action.play();playing=true;}draw();});on('#pause','click',()=>{playing=false;if(action)action.paused=true;draw();});on('#stop','click',()=>{playing=false;if(action)action.stop();draw();});on('#apply','click',()=>{const input=document.querySelector('#speed');if(!input.value||!input.checkValidity())return;if(mixer)mixer.timeScale=Number(input.value);for(const b of [...retained])if(document.querySelector('#stale').checked)release(b);draw();});
      const miniCamera=new THREE.PerspectiveCamera(45,1,.01,100);miniCamera.position.set(0,4,7);miniCamera.lookAt(0,0,0);const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);const overlayScene=new THREE.Scene(),overlayCamera=new THREE.OrthographicCamera(-1,1,1,-1,0,2);overlayCamera.position.z=1;const plane=new THREE.PlaneGeometry(2,2),planeMaterial=new THREE.MeshBasicMaterial({map:target.texture,depthTest:false,depthWrite:false});ownedGeometry.add(plane);ownedMaterial.add(planeMaterial);overlayScene.add(new THREE.Mesh(plane,planeMaterial));
      function renderMap(){const saved={target:renderer.getRenderTarget(),face:renderer.getActiveCubeFace(),mip:renderer.getActiveMipmapLevel(),viewport:renderer.getViewport(new THREE.Vector4()),scissor:renderer.getScissor(new THREE.Vector4()),test:renderer.getScissorTest()};try{renderer.setRenderTarget(target);renderer.setViewport(0,0,128,128);renderer.setScissorTest(false);renderer.render(scene,miniCamera);}finally{renderer.setRenderTarget(saved.target,saved.face,saved.mip);renderer.setViewport(saved.viewport);renderer.setScissor(saved.scissor);renderer.setScissorTest(saved.test);}}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.info.autoReset=false;renderer.info.reset();camera.lookAt(targetPoint);if(document.querySelector('#minimap').checked)renderMap();renderer.setRenderTarget(null);renderer.setViewport(0,0,canvas.width,canvas.height);renderer.render(scene,camera);if(document.querySelector('#minimap').checked){const saved=renderer.getViewport(new THREE.Vector4()),scissor=renderer.getScissor(new THREE.Vector4()),test=renderer.getScissorTest();try{const size=Math.min(100,canvas.width*.3);renderer.setViewport(canvas.width-size-4,4,size,size);renderer.setScissor(canvas.width-size-4,4,size,size);renderer.setScissorTest(true);renderer.autoClear=false;renderer.render(overlayScene,overlayCamera);}finally{renderer.autoClear=true;renderer.setViewport(saved);renderer.setScissor(scissor);renderer.setScissorTest(test);}}stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};frames++;output.textContent=JSON.stringify({status,current,generation,completions,selected,name:meshes[selected]?.name,clips:activeBook?.gltf.animations.length??0,playing,time:mixer?.time??0,x:meshes[0]?.position.x,camera:camera.position.toArray(),target:targetPoint.toArray(),stats,...counts});}
      renderer.setAnimationLoop(now=>{const dt=last?(now-last)/1000:0;last=now;if(playing&&mixer){mixer.update(dt);draw();}});function releaseAll(){generation++;for(const [id,resolve]of timers){clearTimeout(id);counts.timer++;resolve();}timers.clear();clearMixer();if(root)scene.remove(root);for(const b of [...books])release(b);root=null;meshes=[];}void loadModel(()=>bytes(document.querySelector('#model').value),document.querySelector('#model').value);
      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="정리 완료"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

<details>
<summary>힌트</summary>

- 먼저 파싱을 끝내고 소유 장면을 교체하세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

animated는 Left·Right 2개와 SlideLeft 클립 1개를 가집니다. 먼저 파싱을 끝내고 소유 장면을 교체하세요.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>검사기에 모델 불러오기</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>검사기에 모델 불러오기</h1>
    <p>
      샘플을 static에서 animated로 바꾸고 불러오세요. 모델 교체 성공 뒤에만
      장면·목록·mixer가 함께 바뀝니다. 파일은 실행 중에만 사용합니다.
    </p>
    <p>
      자체 제작한 두 패널 GLB입니다. 선택 파일은 실행 중에만 사용하며 백업에
      넣지 않습니다. 다시 실행한 뒤 재선택하세요. 2 MiB 이하 self-contained
      비압축 GLB와 내장 PNG/JPEG만 받습니다. 외부 URI·다중 파일
      glTF·Draco·Meshopt·KTX2는 지원하지 않습니다.
    </p>
    <div class="controls">
      <label
        >내장 모델<select id="model">
          <option>static</option>
          <option selected>animated</option>
          <option>textured</option>
          <option>empty</option>
        </select></label
      ><button id="sample">샘플 불러오기</button
      ><button id="race">slow A then fast B</button
      ><button id="invalid">손상 GLB</button
      ><button id="recover">샘플 복구</button
      ><label
        >GLB 파일<input
          id="file"
          type="file"
          accept=".glb,model/gltf-binary" /></label
      ><label><input id="guard" type="checkbox" checked />generation 보호</label
      ><label><input id="stale" type="checkbox" checked />stale 정리</label
      ><label><input id="framing" type="checkbox" checked />맞춤 허용</label
      ><label><input id="minimap" type="checkbox" checked />미니맵</label
      ><label>객체 목록<select id="objects"></select></label
      ><button id="frame">선택 맞춤</button
      ><button id="right">카메라 오른쪽</button><button id="zoom">확대</button
      ><button id="play">재생</button><button id="pause">일시정지</button
      ><button id="stop">정지·되감기</button
      ><label
        >속도<input
          id="speed"
          type="number"
          value="1"
          min="0"
          max="3"
          step="0.25" /></label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="검사기에 모델 불러오기"></canvas></div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
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

      const loader=new GLTFLoader();const counts={createdGeometry:0,createdMaterial:0,createdTexture:0,geometry:0,material:0,texture:0,bitmap:0,mixer:0,timer:0,stale:0};const books=new Set();let root=null,meshes=[],generation=0,current='',status='loading',selected=0,mixer=null,action=null,playing=false,last=0,completions=[],stats={};const timers=new Map(),retained=new Set();const targetPoint=new THREE.Vector3();
      function book(gltf){const geometry=new Set(),material=new Set(),texture=new Set(),images=new Set();for(const scene of gltf.scenes)scene.traverse(o=>{if(o.geometry)geometry.add(o.geometry);for(const m of Array.isArray(o.material)?o.material:o.material?[o.material]:[]){material.add(m);for(const value of Object.values(m))if(value?.isTexture){texture.add(value);if(value.image?.close)images.add(value.image);}}});const b={geometry,material,texture,images,gltf};for(const [name,set]of Object.entries({geometry,material,texture})){counts['created'+name[0].toUpperCase()+name.slice(1)]+=set.size;for(const r of set)r.addEventListener('dispose',()=>counts[name]++);}books.add(b);return b;}
      function release(b){if(!books.delete(b))return;for(const set of [b.geometry,b.material,b.texture])for(const r of set)r.dispose();for(const image of b.images){image.close();counts.bitmap++;}retained.delete(b);}
      let activeBook=null;function clearMixer(){if(mixer&&root){mixer.stopAllAction();mixer.uncacheRoot(root);counts.mixer++;}mixer=null;action=null;playing=false;}
      function wait(ms){if(!ms)return Promise.resolve();return new Promise(resolve=>{const id=setTimeout(()=>{timers.delete(id);counts.timer++;resolve();},ms);timers.set(id,resolve);});}
      async function loadModel(readBuffer,name,delay=0){const token=++generation;status='loading';document.querySelector('#error').textContent='';draw();let b;try{const buffer=await readBuffer();validateGlb(buffer);const gltf=await loader.parseAsync(buffer,'');b=book(gltf);await wait(delay);completions.push(name);if(disposed||document.querySelector('#guard').checked&&token!==generation){counts.stale++;if(disposed||document.querySelector('#stale').checked)release(b);else retained.add(b);return;}clearMixer();if(root)scene.remove(root);if(activeBook)release(activeBook);activeBook=b;root=gltf.scene;scene.add(root);meshes=[];root.traverse(o=>{if(o.isMesh)meshes.push(o);});selected=0;document.querySelector('#objects').replaceChildren(...meshes.map((o,i)=>new Option(o.name||'Mesh '+i,String(i))));if(gltf.animations.length){mixer=new THREE.AnimationMixer(root);action=mixer.clipAction(gltf.animations[0]);action.play();mixer.timeScale=Number(document.querySelector('#speed').value);playing=true;}current=name;status='ready';draw();}catch(cause){if(b)release(b);if(disposed||token!==generation)return;status='error';document.querySelector('#error').textContent="GLB를 읽지 못했습니다. 샘플 복구 또는 다른 파일을 선택하세요. 상세: "+cause.message;draw();}}
      const bytes=kind=>Uint8Array.from(atob(samples[kind]),c=>c.charCodeAt(0)).buffer;
      on('#sample','click',()=>{document.querySelector('#file').value='';const kind=document.querySelector('#model').value;void loadModel(()=>bytes(kind),kind);});on('#race','click',()=>{void loadModel(()=>bytes('textured'),'A',300);void loadModel(()=>bytes('animated'),'B',20);});on('#invalid','click',()=>void loadModel(()=>new TextEncoder().encode('invalid').buffer,'invalid'));on('#recover','click',()=>void loadModel(()=>bytes('animated'),'recovered'));on('#file','change',()=>{const file=document.querySelector('#file').files[0];if(file)void loadModel(()=>file.arrayBuffer(),file.name);});
      on('#objects','change',()=>{selected=document.querySelector('#objects').selectedIndex;draw();});on('#frame','click',()=>{if(document.querySelector('#framing').checked&&meshes[selected]){const box=new THREE.Box3().setFromObject(meshes[selected]);if(!box.isEmpty()){box.getCenter(targetPoint);const size=box.getSize(new THREE.Vector3()).length();camera.position.copy(targetPoint).add(new THREE.Vector3(0,size*.3,size*1.8));}}draw();});on('#right','click',()=>{camera.position.x++;draw();});on('#zoom','click',()=>{camera.position.z--;draw();});on('#play','click',()=>{if(action){action.paused=false;action.play();playing=true;}draw();});on('#pause','click',()=>{playing=false;if(action)action.paused=true;draw();});on('#stop','click',()=>{playing=false;if(action)action.stop();draw();});on('#apply','click',()=>{const input=document.querySelector('#speed');if(!input.value||!input.checkValidity())return;if(mixer)mixer.timeScale=Number(input.value);for(const b of [...retained])if(document.querySelector('#stale').checked)release(b);draw();});
      const miniCamera=new THREE.PerspectiveCamera(45,1,.01,100);miniCamera.position.set(0,4,7);miniCamera.lookAt(0,0,0);const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);const overlayScene=new THREE.Scene(),overlayCamera=new THREE.OrthographicCamera(-1,1,1,-1,0,2);overlayCamera.position.z=1;const plane=new THREE.PlaneGeometry(2,2),planeMaterial=new THREE.MeshBasicMaterial({map:target.texture,depthTest:false,depthWrite:false});ownedGeometry.add(plane);ownedMaterial.add(planeMaterial);overlayScene.add(new THREE.Mesh(plane,planeMaterial));
      function renderMap(){const saved={target:renderer.getRenderTarget(),face:renderer.getActiveCubeFace(),mip:renderer.getActiveMipmapLevel(),viewport:renderer.getViewport(new THREE.Vector4()),scissor:renderer.getScissor(new THREE.Vector4()),test:renderer.getScissorTest()};try{renderer.setRenderTarget(target);renderer.setViewport(0,0,128,128);renderer.setScissorTest(false);renderer.render(scene,miniCamera);}finally{renderer.setRenderTarget(saved.target,saved.face,saved.mip);renderer.setViewport(saved.viewport);renderer.setScissor(saved.scissor);renderer.setScissorTest(saved.test);}}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.info.autoReset=false;renderer.info.reset();camera.lookAt(targetPoint);if(document.querySelector('#minimap').checked)renderMap();renderer.setRenderTarget(null);renderer.setViewport(0,0,canvas.width,canvas.height);renderer.render(scene,camera);if(document.querySelector('#minimap').checked){const saved=renderer.getViewport(new THREE.Vector4()),scissor=renderer.getScissor(new THREE.Vector4()),test=renderer.getScissorTest();try{const size=Math.min(100,canvas.width*.3);renderer.setViewport(canvas.width-size-4,4,size,size);renderer.setScissor(canvas.width-size-4,4,size,size);renderer.setScissorTest(true);renderer.autoClear=false;renderer.render(overlayScene,overlayCamera);}finally{renderer.autoClear=true;renderer.setViewport(saved);renderer.setScissor(scissor);renderer.setScissorTest(test);}}stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};frames++;output.textContent=JSON.stringify({status,current,generation,completions,selected,name:meshes[selected]?.name,clips:activeBook?.gltf.animations.length??0,playing,time:mixer?.time??0,x:meshes[0]?.position.x,camera:camera.position.toArray(),target:targetPoint.toArray(),stats,...counts});}
      renderer.setAnimationLoop(now=>{const dt=last?(now-last)/1000:0;last=now;if(playing&&mixer){mixer.update(dt);draw();}});function releaseAll(){generation++;for(const [id,resolve]of timers){clearTimeout(id);counts.timer++;resolve();}timers.clear();clearMixer();if(root)scene.remove(root);for(const b of [...books])release(b);root=null;meshes=[];}void loadModel(()=>bytes(document.querySelector('#model').value),document.querySelector('#model').value);
      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="정리 완료"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

</details>

- 실패할 수 있는 작업 전에 무엇을 보존해야 하나요?

### 선택과 카메라 연결

객체 목록에서 Right를 선택하고 선택 맞춤을 누르세요. 시작은 맞춤이 꺼져 있으므로 맞춤 허용을 켜고 적용합니다. Box3 중심·크기로 카메라 위치와 시선을 함께 갱신합니다.

**예상 결과**

target이 선택 객체의 중심으로 바뀌고 그 객체가 화면 중심에 옵니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>선택과 카메라 연결</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>선택과 카메라 연결</h1>
    <p>
      객체 목록에서 Right를 선택하고 선택 맞춤을 누르세요. 시작은 맞춤이 꺼져
      있으므로 맞춤 허용을 켜고 적용합니다. Box3 중심·크기로 카메라 위치와
      시선을 함께 갱신합니다.
    </p>
    <p>
      자체 제작한 두 패널 GLB입니다. 선택 파일은 실행 중에만 사용하며 백업에
      넣지 않습니다. 다시 실행한 뒤 재선택하세요. 2 MiB 이하 self-contained
      비압축 GLB와 내장 PNG/JPEG만 받습니다. 외부 URI·다중 파일
      glTF·Draco·Meshopt·KTX2는 지원하지 않습니다.
    </p>
    <div class="controls">
      <label
        >내장 모델<select id="model">
          <option>static</option>
          <option selected>animated</option>
          <option>textured</option>
          <option>empty</option>
        </select></label
      ><button id="sample">샘플 불러오기</button
      ><button id="race">slow A then fast B</button
      ><button id="invalid">손상 GLB</button
      ><button id="recover">샘플 복구</button
      ><label
        >GLB 파일<input
          id="file"
          type="file"
          accept=".glb,model/gltf-binary" /></label
      ><label><input id="guard" type="checkbox" checked />generation 보호</label
      ><label><input id="stale" type="checkbox" checked />stale 정리</label
      ><label><input id="framing" type="checkbox" />맞춤 허용</label
      ><label><input id="minimap" type="checkbox" checked />미니맵</label
      ><label>객체 목록<select id="objects"></select></label
      ><button id="frame">선택 맞춤</button
      ><button id="right">카메라 오른쪽</button><button id="zoom">확대</button
      ><button id="play">재생</button><button id="pause">일시정지</button
      ><button id="stop">정지·되감기</button
      ><label
        >속도<input
          id="speed"
          type="number"
          value="1"
          min="0"
          max="3"
          step="0.25" /></label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="선택과 카메라 연결"></canvas></div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
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

      const loader=new GLTFLoader();const counts={createdGeometry:0,createdMaterial:0,createdTexture:0,geometry:0,material:0,texture:0,bitmap:0,mixer:0,timer:0,stale:0};const books=new Set();let root=null,meshes=[],generation=0,current='',status='loading',selected=0,mixer=null,action=null,playing=false,last=0,completions=[],stats={};const timers=new Map(),retained=new Set();const targetPoint=new THREE.Vector3();
      function book(gltf){const geometry=new Set(),material=new Set(),texture=new Set(),images=new Set();for(const scene of gltf.scenes)scene.traverse(o=>{if(o.geometry)geometry.add(o.geometry);for(const m of Array.isArray(o.material)?o.material:o.material?[o.material]:[]){material.add(m);for(const value of Object.values(m))if(value?.isTexture){texture.add(value);if(value.image?.close)images.add(value.image);}}});const b={geometry,material,texture,images,gltf};for(const [name,set]of Object.entries({geometry,material,texture})){counts['created'+name[0].toUpperCase()+name.slice(1)]+=set.size;for(const r of set)r.addEventListener('dispose',()=>counts[name]++);}books.add(b);return b;}
      function release(b){if(!books.delete(b))return;for(const set of [b.geometry,b.material,b.texture])for(const r of set)r.dispose();for(const image of b.images){image.close();counts.bitmap++;}retained.delete(b);}
      let activeBook=null;function clearMixer(){if(mixer&&root){mixer.stopAllAction();mixer.uncacheRoot(root);counts.mixer++;}mixer=null;action=null;playing=false;}
      function wait(ms){if(!ms)return Promise.resolve();return new Promise(resolve=>{const id=setTimeout(()=>{timers.delete(id);counts.timer++;resolve();},ms);timers.set(id,resolve);});}
      async function loadModel(readBuffer,name,delay=0){const token=++generation;status='loading';document.querySelector('#error').textContent='';draw();let b;try{const buffer=await readBuffer();validateGlb(buffer);const gltf=await loader.parseAsync(buffer,'');b=book(gltf);await wait(delay);completions.push(name);if(disposed||document.querySelector('#guard').checked&&token!==generation){counts.stale++;if(disposed||document.querySelector('#stale').checked)release(b);else retained.add(b);return;}clearMixer();if(root)scene.remove(root);if(activeBook)release(activeBook);activeBook=b;root=gltf.scene;scene.add(root);meshes=[];root.traverse(o=>{if(o.isMesh)meshes.push(o);});selected=0;document.querySelector('#objects').replaceChildren(...meshes.map((o,i)=>new Option(o.name||'Mesh '+i,String(i))));if(gltf.animations.length){mixer=new THREE.AnimationMixer(root);action=mixer.clipAction(gltf.animations[0]);action.play();mixer.timeScale=Number(document.querySelector('#speed').value);playing=true;}current=name;status='ready';draw();}catch(cause){if(b)release(b);if(disposed||token!==generation)return;status='error';document.querySelector('#error').textContent="GLB를 읽지 못했습니다. 샘플 복구 또는 다른 파일을 선택하세요. 상세: "+cause.message;draw();}}
      const bytes=kind=>Uint8Array.from(atob(samples[kind]),c=>c.charCodeAt(0)).buffer;
      on('#sample','click',()=>{document.querySelector('#file').value='';const kind=document.querySelector('#model').value;void loadModel(()=>bytes(kind),kind);});on('#race','click',()=>{void loadModel(()=>bytes('textured'),'A',300);void loadModel(()=>bytes('animated'),'B',20);});on('#invalid','click',()=>void loadModel(()=>new TextEncoder().encode('invalid').buffer,'invalid'));on('#recover','click',()=>void loadModel(()=>bytes('animated'),'recovered'));on('#file','change',()=>{const file=document.querySelector('#file').files[0];if(file)void loadModel(()=>file.arrayBuffer(),file.name);});
      on('#objects','change',()=>{selected=document.querySelector('#objects').selectedIndex;draw();});on('#frame','click',()=>{if(document.querySelector('#framing').checked&&meshes[selected]){const box=new THREE.Box3().setFromObject(meshes[selected]);if(!box.isEmpty()){box.getCenter(targetPoint);const size=box.getSize(new THREE.Vector3()).length();camera.position.copy(targetPoint).add(new THREE.Vector3(0,size*.3,size*1.8));}}draw();});on('#right','click',()=>{camera.position.x++;draw();});on('#zoom','click',()=>{camera.position.z--;draw();});on('#play','click',()=>{if(action){action.paused=false;action.play();playing=true;}draw();});on('#pause','click',()=>{playing=false;if(action)action.paused=true;draw();});on('#stop','click',()=>{playing=false;if(action)action.stop();draw();});on('#apply','click',()=>{const input=document.querySelector('#speed');if(!input.value||!input.checkValidity())return;if(mixer)mixer.timeScale=Number(input.value);for(const b of [...retained])if(document.querySelector('#stale').checked)release(b);draw();});
      const miniCamera=new THREE.PerspectiveCamera(45,1,.01,100);miniCamera.position.set(0,4,7);miniCamera.lookAt(0,0,0);const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);const overlayScene=new THREE.Scene(),overlayCamera=new THREE.OrthographicCamera(-1,1,1,-1,0,2);overlayCamera.position.z=1;const plane=new THREE.PlaneGeometry(2,2),planeMaterial=new THREE.MeshBasicMaterial({map:target.texture,depthTest:false,depthWrite:false});ownedGeometry.add(plane);ownedMaterial.add(planeMaterial);overlayScene.add(new THREE.Mesh(plane,planeMaterial));
      function renderMap(){const saved={target:renderer.getRenderTarget(),face:renderer.getActiveCubeFace(),mip:renderer.getActiveMipmapLevel(),viewport:renderer.getViewport(new THREE.Vector4()),scissor:renderer.getScissor(new THREE.Vector4()),test:renderer.getScissorTest()};try{renderer.setRenderTarget(target);renderer.setViewport(0,0,128,128);renderer.setScissorTest(false);renderer.render(scene,miniCamera);}finally{renderer.setRenderTarget(saved.target,saved.face,saved.mip);renderer.setViewport(saved.viewport);renderer.setScissor(saved.scissor);renderer.setScissorTest(saved.test);}}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.info.autoReset=false;renderer.info.reset();camera.lookAt(targetPoint);if(document.querySelector('#minimap').checked)renderMap();renderer.setRenderTarget(null);renderer.setViewport(0,0,canvas.width,canvas.height);renderer.render(scene,camera);if(document.querySelector('#minimap').checked){const saved=renderer.getViewport(new THREE.Vector4()),scissor=renderer.getScissor(new THREE.Vector4()),test=renderer.getScissorTest();try{const size=Math.min(100,canvas.width*.3);renderer.setViewport(canvas.width-size-4,4,size,size);renderer.setScissor(canvas.width-size-4,4,size,size);renderer.setScissorTest(true);renderer.autoClear=false;renderer.render(overlayScene,overlayCamera);}finally{renderer.autoClear=true;renderer.setViewport(saved);renderer.setScissor(scissor);renderer.setScissorTest(test);}}stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};frames++;output.textContent=JSON.stringify({status,current,generation,completions,selected,name:meshes[selected]?.name,clips:activeBook?.gltf.animations.length??0,playing,time:mixer?.time??0,x:meshes[0]?.position.x,camera:camera.position.toArray(),target:targetPoint.toArray(),stats,...counts});}
      renderer.setAnimationLoop(now=>{const dt=last?(now-last)/1000:0;last=now;if(playing&&mixer){mixer.update(dt);draw();}});function releaseAll(){generation++;for(const [id,resolve]of timers){clearTimeout(id);counts.timer++;resolve();}timers.clear();clearMixer();if(root)scene.remove(root);for(const b of [...books])release(b);root=null;meshes=[];}void loadModel(()=>bytes(document.querySelector('#model').value),document.querySelector('#model').value);
      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="정리 완료"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

<details>
<summary>힌트</summary>

- position만 바꾸면 시선이 이전 원점을 향할 수 있습니다.

</details>

<details>
<summary>완성 코드와 해설</summary>

target이 선택 객체의 중심으로 바뀌고 그 객체가 화면 중심에 옵니다. position만 바꾸면 시선이 이전 원점을 향할 수 있습니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>선택과 카메라 연결</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>선택과 카메라 연결</h1>
    <p>
      객체 목록에서 Right를 선택하고 선택 맞춤을 누르세요. 시작은 맞춤이 꺼져
      있으므로 맞춤 허용을 켜고 적용합니다. Box3 중심·크기로 카메라 위치와
      시선을 함께 갱신합니다.
    </p>
    <p>
      자체 제작한 두 패널 GLB입니다. 선택 파일은 실행 중에만 사용하며 백업에
      넣지 않습니다. 다시 실행한 뒤 재선택하세요. 2 MiB 이하 self-contained
      비압축 GLB와 내장 PNG/JPEG만 받습니다. 외부 URI·다중 파일
      glTF·Draco·Meshopt·KTX2는 지원하지 않습니다.
    </p>
    <div class="controls">
      <label
        >내장 모델<select id="model">
          <option>static</option>
          <option selected>animated</option>
          <option>textured</option>
          <option>empty</option>
        </select></label
      ><button id="sample">샘플 불러오기</button
      ><button id="race">slow A then fast B</button
      ><button id="invalid">손상 GLB</button
      ><button id="recover">샘플 복구</button
      ><label
        >GLB 파일<input
          id="file"
          type="file"
          accept=".glb,model/gltf-binary" /></label
      ><label><input id="guard" type="checkbox" checked />generation 보호</label
      ><label><input id="stale" type="checkbox" checked />stale 정리</label
      ><label><input id="framing" type="checkbox" checked />맞춤 허용</label
      ><label><input id="minimap" type="checkbox" checked />미니맵</label
      ><label>객체 목록<select id="objects"></select></label
      ><button id="frame">선택 맞춤</button
      ><button id="right">카메라 오른쪽</button><button id="zoom">확대</button
      ><button id="play">재생</button><button id="pause">일시정지</button
      ><button id="stop">정지·되감기</button
      ><label
        >속도<input
          id="speed"
          type="number"
          value="1"
          min="0"
          max="3"
          step="0.25" /></label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="선택과 카메라 연결"></canvas></div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
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

      const loader=new GLTFLoader();const counts={createdGeometry:0,createdMaterial:0,createdTexture:0,geometry:0,material:0,texture:0,bitmap:0,mixer:0,timer:0,stale:0};const books=new Set();let root=null,meshes=[],generation=0,current='',status='loading',selected=0,mixer=null,action=null,playing=false,last=0,completions=[],stats={};const timers=new Map(),retained=new Set();const targetPoint=new THREE.Vector3();
      function book(gltf){const geometry=new Set(),material=new Set(),texture=new Set(),images=new Set();for(const scene of gltf.scenes)scene.traverse(o=>{if(o.geometry)geometry.add(o.geometry);for(const m of Array.isArray(o.material)?o.material:o.material?[o.material]:[]){material.add(m);for(const value of Object.values(m))if(value?.isTexture){texture.add(value);if(value.image?.close)images.add(value.image);}}});const b={geometry,material,texture,images,gltf};for(const [name,set]of Object.entries({geometry,material,texture})){counts['created'+name[0].toUpperCase()+name.slice(1)]+=set.size;for(const r of set)r.addEventListener('dispose',()=>counts[name]++);}books.add(b);return b;}
      function release(b){if(!books.delete(b))return;for(const set of [b.geometry,b.material,b.texture])for(const r of set)r.dispose();for(const image of b.images){image.close();counts.bitmap++;}retained.delete(b);}
      let activeBook=null;function clearMixer(){if(mixer&&root){mixer.stopAllAction();mixer.uncacheRoot(root);counts.mixer++;}mixer=null;action=null;playing=false;}
      function wait(ms){if(!ms)return Promise.resolve();return new Promise(resolve=>{const id=setTimeout(()=>{timers.delete(id);counts.timer++;resolve();},ms);timers.set(id,resolve);});}
      async function loadModel(readBuffer,name,delay=0){const token=++generation;status='loading';document.querySelector('#error').textContent='';draw();let b;try{const buffer=await readBuffer();validateGlb(buffer);const gltf=await loader.parseAsync(buffer,'');b=book(gltf);await wait(delay);completions.push(name);if(disposed||document.querySelector('#guard').checked&&token!==generation){counts.stale++;if(disposed||document.querySelector('#stale').checked)release(b);else retained.add(b);return;}clearMixer();if(root)scene.remove(root);if(activeBook)release(activeBook);activeBook=b;root=gltf.scene;scene.add(root);meshes=[];root.traverse(o=>{if(o.isMesh)meshes.push(o);});selected=0;document.querySelector('#objects').replaceChildren(...meshes.map((o,i)=>new Option(o.name||'Mesh '+i,String(i))));if(gltf.animations.length){mixer=new THREE.AnimationMixer(root);action=mixer.clipAction(gltf.animations[0]);action.play();mixer.timeScale=Number(document.querySelector('#speed').value);playing=true;}current=name;status='ready';draw();}catch(cause){if(b)release(b);if(disposed||token!==generation)return;status='error';document.querySelector('#error').textContent="GLB를 읽지 못했습니다. 샘플 복구 또는 다른 파일을 선택하세요. 상세: "+cause.message;draw();}}
      const bytes=kind=>Uint8Array.from(atob(samples[kind]),c=>c.charCodeAt(0)).buffer;
      on('#sample','click',()=>{document.querySelector('#file').value='';const kind=document.querySelector('#model').value;void loadModel(()=>bytes(kind),kind);});on('#race','click',()=>{void loadModel(()=>bytes('textured'),'A',300);void loadModel(()=>bytes('animated'),'B',20);});on('#invalid','click',()=>void loadModel(()=>new TextEncoder().encode('invalid').buffer,'invalid'));on('#recover','click',()=>void loadModel(()=>bytes('animated'),'recovered'));on('#file','change',()=>{const file=document.querySelector('#file').files[0];if(file)void loadModel(()=>file.arrayBuffer(),file.name);});
      on('#objects','change',()=>{selected=document.querySelector('#objects').selectedIndex;draw();});on('#frame','click',()=>{if(document.querySelector('#framing').checked&&meshes[selected]){const box=new THREE.Box3().setFromObject(meshes[selected]);if(!box.isEmpty()){box.getCenter(targetPoint);const size=box.getSize(new THREE.Vector3()).length();camera.position.copy(targetPoint).add(new THREE.Vector3(0,size*.3,size*1.8));}}draw();});on('#right','click',()=>{camera.position.x++;draw();});on('#zoom','click',()=>{camera.position.z--;draw();});on('#play','click',()=>{if(action){action.paused=false;action.play();playing=true;}draw();});on('#pause','click',()=>{playing=false;if(action)action.paused=true;draw();});on('#stop','click',()=>{playing=false;if(action)action.stop();draw();});on('#apply','click',()=>{const input=document.querySelector('#speed');if(!input.value||!input.checkValidity())return;if(mixer)mixer.timeScale=Number(input.value);for(const b of [...retained])if(document.querySelector('#stale').checked)release(b);draw();});
      const miniCamera=new THREE.PerspectiveCamera(45,1,.01,100);miniCamera.position.set(0,4,7);miniCamera.lookAt(0,0,0);const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);const overlayScene=new THREE.Scene(),overlayCamera=new THREE.OrthographicCamera(-1,1,1,-1,0,2);overlayCamera.position.z=1;const plane=new THREE.PlaneGeometry(2,2),planeMaterial=new THREE.MeshBasicMaterial({map:target.texture,depthTest:false,depthWrite:false});ownedGeometry.add(plane);ownedMaterial.add(planeMaterial);overlayScene.add(new THREE.Mesh(plane,planeMaterial));
      function renderMap(){const saved={target:renderer.getRenderTarget(),face:renderer.getActiveCubeFace(),mip:renderer.getActiveMipmapLevel(),viewport:renderer.getViewport(new THREE.Vector4()),scissor:renderer.getScissor(new THREE.Vector4()),test:renderer.getScissorTest()};try{renderer.setRenderTarget(target);renderer.setViewport(0,0,128,128);renderer.setScissorTest(false);renderer.render(scene,miniCamera);}finally{renderer.setRenderTarget(saved.target,saved.face,saved.mip);renderer.setViewport(saved.viewport);renderer.setScissor(saved.scissor);renderer.setScissorTest(saved.test);}}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.info.autoReset=false;renderer.info.reset();camera.lookAt(targetPoint);if(document.querySelector('#minimap').checked)renderMap();renderer.setRenderTarget(null);renderer.setViewport(0,0,canvas.width,canvas.height);renderer.render(scene,camera);if(document.querySelector('#minimap').checked){const saved=renderer.getViewport(new THREE.Vector4()),scissor=renderer.getScissor(new THREE.Vector4()),test=renderer.getScissorTest();try{const size=Math.min(100,canvas.width*.3);renderer.setViewport(canvas.width-size-4,4,size,size);renderer.setScissor(canvas.width-size-4,4,size,size);renderer.setScissorTest(true);renderer.autoClear=false;renderer.render(overlayScene,overlayCamera);}finally{renderer.autoClear=true;renderer.setViewport(saved);renderer.setScissor(scissor);renderer.setScissorTest(test);}}stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};frames++;output.textContent=JSON.stringify({status,current,generation,completions,selected,name:meshes[selected]?.name,clips:activeBook?.gltf.animations.length??0,playing,time:mixer?.time??0,x:meshes[0]?.position.x,camera:camera.position.toArray(),target:targetPoint.toArray(),stats,...counts});}
      renderer.setAnimationLoop(now=>{const dt=last?(now-last)/1000:0;last=now;if(playing&&mixer){mixer.update(dt);draw();}});function releaseAll(){generation++;for(const [id,resolve]of timers){clearTimeout(id);counts.timer++;resolve();}timers.clear();clearMixer();if(root)scene.remove(root);for(const b of [...books])release(b);root=null;meshes=[];}void loadModel(()=>bytes(document.querySelector('#model').value),document.querySelector('#model').value);
      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="정리 완료"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

</details>

- 선택한 객체와 카메라 target은 어떻게 연결되나요?

### 로딩된 클립 제어

animated를 불러온 뒤 재생을 누르세요. 시작의 속도 0을 1로 바꾸고 적용합니다. Left의 X가 시간에 따라 달라집니다. pause 뒤 정지 위치를 보고 stop으로 되감으세요.

**예상 결과**

speed=1에서 Left가 움직이고 pause는 현재 시간, stop은 초기 위치를 유지합니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>로딩된 클립 제어</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>로딩된 클립 제어</h1>
    <p>
      animated를 불러온 뒤 재생을 누르세요. 시작의 속도 0을 1로 바꾸고
      적용합니다. Left의 X가 시간에 따라 달라집니다. pause 뒤 정지 위치를 보고
      stop으로 되감으세요.
    </p>
    <p>
      자체 제작한 두 패널 GLB입니다. 선택 파일은 실행 중에만 사용하며 백업에
      넣지 않습니다. 다시 실행한 뒤 재선택하세요. 2 MiB 이하 self-contained
      비압축 GLB와 내장 PNG/JPEG만 받습니다. 외부 URI·다중 파일
      glTF·Draco·Meshopt·KTX2는 지원하지 않습니다.
    </p>
    <div class="controls">
      <label
        >내장 모델<select id="model">
          <option>static</option>
          <option selected>animated</option>
          <option>textured</option>
          <option>empty</option>
        </select></label
      ><button id="sample">샘플 불러오기</button
      ><button id="race">slow A then fast B</button
      ><button id="invalid">손상 GLB</button
      ><button id="recover">샘플 복구</button
      ><label
        >GLB 파일<input
          id="file"
          type="file"
          accept=".glb,model/gltf-binary" /></label
      ><label><input id="guard" type="checkbox" checked />generation 보호</label
      ><label><input id="stale" type="checkbox" checked />stale 정리</label
      ><label><input id="framing" type="checkbox" checked />맞춤 허용</label
      ><label><input id="minimap" type="checkbox" checked />미니맵</label
      ><label>객체 목록<select id="objects"></select></label
      ><button id="frame">선택 맞춤</button
      ><button id="right">카메라 오른쪽</button><button id="zoom">확대</button
      ><button id="play">재생</button><button id="pause">일시정지</button
      ><button id="stop">정지·되감기</button
      ><label
        >속도<input
          id="speed"
          type="number"
          value="0"
          min="0"
          max="3"
          step="0.25" /></label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="로딩된 클립 제어"></canvas></div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
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

      const loader=new GLTFLoader();const counts={createdGeometry:0,createdMaterial:0,createdTexture:0,geometry:0,material:0,texture:0,bitmap:0,mixer:0,timer:0,stale:0};const books=new Set();let root=null,meshes=[],generation=0,current='',status='loading',selected=0,mixer=null,action=null,playing=false,last=0,completions=[],stats={};const timers=new Map(),retained=new Set();const targetPoint=new THREE.Vector3();
      function book(gltf){const geometry=new Set(),material=new Set(),texture=new Set(),images=new Set();for(const scene of gltf.scenes)scene.traverse(o=>{if(o.geometry)geometry.add(o.geometry);for(const m of Array.isArray(o.material)?o.material:o.material?[o.material]:[]){material.add(m);for(const value of Object.values(m))if(value?.isTexture){texture.add(value);if(value.image?.close)images.add(value.image);}}});const b={geometry,material,texture,images,gltf};for(const [name,set]of Object.entries({geometry,material,texture})){counts['created'+name[0].toUpperCase()+name.slice(1)]+=set.size;for(const r of set)r.addEventListener('dispose',()=>counts[name]++);}books.add(b);return b;}
      function release(b){if(!books.delete(b))return;for(const set of [b.geometry,b.material,b.texture])for(const r of set)r.dispose();for(const image of b.images){image.close();counts.bitmap++;}retained.delete(b);}
      let activeBook=null;function clearMixer(){if(mixer&&root){mixer.stopAllAction();mixer.uncacheRoot(root);counts.mixer++;}mixer=null;action=null;playing=false;}
      function wait(ms){if(!ms)return Promise.resolve();return new Promise(resolve=>{const id=setTimeout(()=>{timers.delete(id);counts.timer++;resolve();},ms);timers.set(id,resolve);});}
      async function loadModel(readBuffer,name,delay=0){const token=++generation;status='loading';document.querySelector('#error').textContent='';draw();let b;try{const buffer=await readBuffer();validateGlb(buffer);const gltf=await loader.parseAsync(buffer,'');b=book(gltf);await wait(delay);completions.push(name);if(disposed||document.querySelector('#guard').checked&&token!==generation){counts.stale++;if(disposed||document.querySelector('#stale').checked)release(b);else retained.add(b);return;}clearMixer();if(root)scene.remove(root);if(activeBook)release(activeBook);activeBook=b;root=gltf.scene;scene.add(root);meshes=[];root.traverse(o=>{if(o.isMesh)meshes.push(o);});selected=0;document.querySelector('#objects').replaceChildren(...meshes.map((o,i)=>new Option(o.name||'Mesh '+i,String(i))));if(gltf.animations.length){mixer=new THREE.AnimationMixer(root);action=mixer.clipAction(gltf.animations[0]);action.play();mixer.timeScale=Number(document.querySelector('#speed').value);playing=true;}current=name;status='ready';draw();}catch(cause){if(b)release(b);if(disposed||token!==generation)return;status='error';document.querySelector('#error').textContent="GLB를 읽지 못했습니다. 샘플 복구 또는 다른 파일을 선택하세요. 상세: "+cause.message;draw();}}
      const bytes=kind=>Uint8Array.from(atob(samples[kind]),c=>c.charCodeAt(0)).buffer;
      on('#sample','click',()=>{document.querySelector('#file').value='';const kind=document.querySelector('#model').value;void loadModel(()=>bytes(kind),kind);});on('#race','click',()=>{void loadModel(()=>bytes('textured'),'A',300);void loadModel(()=>bytes('animated'),'B',20);});on('#invalid','click',()=>void loadModel(()=>new TextEncoder().encode('invalid').buffer,'invalid'));on('#recover','click',()=>void loadModel(()=>bytes('animated'),'recovered'));on('#file','change',()=>{const file=document.querySelector('#file').files[0];if(file)void loadModel(()=>file.arrayBuffer(),file.name);});
      on('#objects','change',()=>{selected=document.querySelector('#objects').selectedIndex;draw();});on('#frame','click',()=>{if(document.querySelector('#framing').checked&&meshes[selected]){const box=new THREE.Box3().setFromObject(meshes[selected]);if(!box.isEmpty()){box.getCenter(targetPoint);const size=box.getSize(new THREE.Vector3()).length();camera.position.copy(targetPoint).add(new THREE.Vector3(0,size*.3,size*1.8));}}draw();});on('#right','click',()=>{camera.position.x++;draw();});on('#zoom','click',()=>{camera.position.z--;draw();});on('#play','click',()=>{if(action){action.paused=false;action.play();playing=true;}draw();});on('#pause','click',()=>{playing=false;if(action)action.paused=true;draw();});on('#stop','click',()=>{playing=false;if(action)action.stop();draw();});on('#apply','click',()=>{const input=document.querySelector('#speed');if(!input.value||!input.checkValidity())return;if(mixer)mixer.timeScale=Number(input.value);for(const b of [...retained])if(document.querySelector('#stale').checked)release(b);draw();});
      const miniCamera=new THREE.PerspectiveCamera(45,1,.01,100);miniCamera.position.set(0,4,7);miniCamera.lookAt(0,0,0);const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);const overlayScene=new THREE.Scene(),overlayCamera=new THREE.OrthographicCamera(-1,1,1,-1,0,2);overlayCamera.position.z=1;const plane=new THREE.PlaneGeometry(2,2),planeMaterial=new THREE.MeshBasicMaterial({map:target.texture,depthTest:false,depthWrite:false});ownedGeometry.add(plane);ownedMaterial.add(planeMaterial);overlayScene.add(new THREE.Mesh(plane,planeMaterial));
      function renderMap(){const saved={target:renderer.getRenderTarget(),face:renderer.getActiveCubeFace(),mip:renderer.getActiveMipmapLevel(),viewport:renderer.getViewport(new THREE.Vector4()),scissor:renderer.getScissor(new THREE.Vector4()),test:renderer.getScissorTest()};try{renderer.setRenderTarget(target);renderer.setViewport(0,0,128,128);renderer.setScissorTest(false);renderer.render(scene,miniCamera);}finally{renderer.setRenderTarget(saved.target,saved.face,saved.mip);renderer.setViewport(saved.viewport);renderer.setScissor(saved.scissor);renderer.setScissorTest(saved.test);}}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.info.autoReset=false;renderer.info.reset();camera.lookAt(targetPoint);if(document.querySelector('#minimap').checked)renderMap();renderer.setRenderTarget(null);renderer.setViewport(0,0,canvas.width,canvas.height);renderer.render(scene,camera);if(document.querySelector('#minimap').checked){const saved=renderer.getViewport(new THREE.Vector4()),scissor=renderer.getScissor(new THREE.Vector4()),test=renderer.getScissorTest();try{const size=Math.min(100,canvas.width*.3);renderer.setViewport(canvas.width-size-4,4,size,size);renderer.setScissor(canvas.width-size-4,4,size,size);renderer.setScissorTest(true);renderer.autoClear=false;renderer.render(overlayScene,overlayCamera);}finally{renderer.autoClear=true;renderer.setViewport(saved);renderer.setScissor(scissor);renderer.setScissorTest(test);}}stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};frames++;output.textContent=JSON.stringify({status,current,generation,completions,selected,name:meshes[selected]?.name,clips:activeBook?.gltf.animations.length??0,playing,time:mixer?.time??0,x:meshes[0]?.position.x,camera:camera.position.toArray(),target:targetPoint.toArray(),stats,...counts});}
      renderer.setAnimationLoop(now=>{const dt=last?(now-last)/1000:0;last=now;if(playing&&mixer){mixer.update(dt);draw();}});function releaseAll(){generation++;for(const [id,resolve]of timers){clearTimeout(id);counts.timer++;resolve();}timers.clear();clearMixer();if(root)scene.remove(root);for(const b of [...books])release(b);root=null;meshes=[];}void loadModel(()=>bytes(document.querySelector('#model').value),document.querySelector('#model').value);
      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="정리 완료"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

<details>
<summary>힌트</summary>

- mixer.update에는 초 단위 delta를 줍니다.

</details>

<details>
<summary>완성 코드와 해설</summary>

speed=1에서 Left가 움직이고 pause는 현재 시간, stop은 초기 위치를 유지합니다. mixer.update에는 초 단위 delta를 줍니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>로딩된 클립 제어</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>로딩된 클립 제어</h1>
    <p>
      animated를 불러온 뒤 재생을 누르세요. 시작의 속도 0을 1로 바꾸고
      적용합니다. Left의 X가 시간에 따라 달라집니다. pause 뒤 정지 위치를 보고
      stop으로 되감으세요.
    </p>
    <p>
      자체 제작한 두 패널 GLB입니다. 선택 파일은 실행 중에만 사용하며 백업에
      넣지 않습니다. 다시 실행한 뒤 재선택하세요. 2 MiB 이하 self-contained
      비압축 GLB와 내장 PNG/JPEG만 받습니다. 외부 URI·다중 파일
      glTF·Draco·Meshopt·KTX2는 지원하지 않습니다.
    </p>
    <div class="controls">
      <label
        >내장 모델<select id="model">
          <option>static</option>
          <option selected>animated</option>
          <option>textured</option>
          <option>empty</option>
        </select></label
      ><button id="sample">샘플 불러오기</button
      ><button id="race">slow A then fast B</button
      ><button id="invalid">손상 GLB</button
      ><button id="recover">샘플 복구</button
      ><label
        >GLB 파일<input
          id="file"
          type="file"
          accept=".glb,model/gltf-binary" /></label
      ><label><input id="guard" type="checkbox" checked />generation 보호</label
      ><label><input id="stale" type="checkbox" checked />stale 정리</label
      ><label><input id="framing" type="checkbox" checked />맞춤 허용</label
      ><label><input id="minimap" type="checkbox" checked />미니맵</label
      ><label>객체 목록<select id="objects"></select></label
      ><button id="frame">선택 맞춤</button
      ><button id="right">카메라 오른쪽</button><button id="zoom">확대</button
      ><button id="play">재생</button><button id="pause">일시정지</button
      ><button id="stop">정지·되감기</button
      ><label
        >속도<input
          id="speed"
          type="number"
          value="1"
          min="0"
          max="3"
          step="0.25" /></label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="로딩된 클립 제어"></canvas></div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
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

      const loader=new GLTFLoader();const counts={createdGeometry:0,createdMaterial:0,createdTexture:0,geometry:0,material:0,texture:0,bitmap:0,mixer:0,timer:0,stale:0};const books=new Set();let root=null,meshes=[],generation=0,current='',status='loading',selected=0,mixer=null,action=null,playing=false,last=0,completions=[],stats={};const timers=new Map(),retained=new Set();const targetPoint=new THREE.Vector3();
      function book(gltf){const geometry=new Set(),material=new Set(),texture=new Set(),images=new Set();for(const scene of gltf.scenes)scene.traverse(o=>{if(o.geometry)geometry.add(o.geometry);for(const m of Array.isArray(o.material)?o.material:o.material?[o.material]:[]){material.add(m);for(const value of Object.values(m))if(value?.isTexture){texture.add(value);if(value.image?.close)images.add(value.image);}}});const b={geometry,material,texture,images,gltf};for(const [name,set]of Object.entries({geometry,material,texture})){counts['created'+name[0].toUpperCase()+name.slice(1)]+=set.size;for(const r of set)r.addEventListener('dispose',()=>counts[name]++);}books.add(b);return b;}
      function release(b){if(!books.delete(b))return;for(const set of [b.geometry,b.material,b.texture])for(const r of set)r.dispose();for(const image of b.images){image.close();counts.bitmap++;}retained.delete(b);}
      let activeBook=null;function clearMixer(){if(mixer&&root){mixer.stopAllAction();mixer.uncacheRoot(root);counts.mixer++;}mixer=null;action=null;playing=false;}
      function wait(ms){if(!ms)return Promise.resolve();return new Promise(resolve=>{const id=setTimeout(()=>{timers.delete(id);counts.timer++;resolve();},ms);timers.set(id,resolve);});}
      async function loadModel(readBuffer,name,delay=0){const token=++generation;status='loading';document.querySelector('#error').textContent='';draw();let b;try{const buffer=await readBuffer();validateGlb(buffer);const gltf=await loader.parseAsync(buffer,'');b=book(gltf);await wait(delay);completions.push(name);if(disposed||document.querySelector('#guard').checked&&token!==generation){counts.stale++;if(disposed||document.querySelector('#stale').checked)release(b);else retained.add(b);return;}clearMixer();if(root)scene.remove(root);if(activeBook)release(activeBook);activeBook=b;root=gltf.scene;scene.add(root);meshes=[];root.traverse(o=>{if(o.isMesh)meshes.push(o);});selected=0;document.querySelector('#objects').replaceChildren(...meshes.map((o,i)=>new Option(o.name||'Mesh '+i,String(i))));if(gltf.animations.length){mixer=new THREE.AnimationMixer(root);action=mixer.clipAction(gltf.animations[0]);action.play();mixer.timeScale=Number(document.querySelector('#speed').value);playing=true;}current=name;status='ready';draw();}catch(cause){if(b)release(b);if(disposed||token!==generation)return;status='error';document.querySelector('#error').textContent="GLB를 읽지 못했습니다. 샘플 복구 또는 다른 파일을 선택하세요. 상세: "+cause.message;draw();}}
      const bytes=kind=>Uint8Array.from(atob(samples[kind]),c=>c.charCodeAt(0)).buffer;
      on('#sample','click',()=>{document.querySelector('#file').value='';const kind=document.querySelector('#model').value;void loadModel(()=>bytes(kind),kind);});on('#race','click',()=>{void loadModel(()=>bytes('textured'),'A',300);void loadModel(()=>bytes('animated'),'B',20);});on('#invalid','click',()=>void loadModel(()=>new TextEncoder().encode('invalid').buffer,'invalid'));on('#recover','click',()=>void loadModel(()=>bytes('animated'),'recovered'));on('#file','change',()=>{const file=document.querySelector('#file').files[0];if(file)void loadModel(()=>file.arrayBuffer(),file.name);});
      on('#objects','change',()=>{selected=document.querySelector('#objects').selectedIndex;draw();});on('#frame','click',()=>{if(document.querySelector('#framing').checked&&meshes[selected]){const box=new THREE.Box3().setFromObject(meshes[selected]);if(!box.isEmpty()){box.getCenter(targetPoint);const size=box.getSize(new THREE.Vector3()).length();camera.position.copy(targetPoint).add(new THREE.Vector3(0,size*.3,size*1.8));}}draw();});on('#right','click',()=>{camera.position.x++;draw();});on('#zoom','click',()=>{camera.position.z--;draw();});on('#play','click',()=>{if(action){action.paused=false;action.play();playing=true;}draw();});on('#pause','click',()=>{playing=false;if(action)action.paused=true;draw();});on('#stop','click',()=>{playing=false;if(action)action.stop();draw();});on('#apply','click',()=>{const input=document.querySelector('#speed');if(!input.value||!input.checkValidity())return;if(mixer)mixer.timeScale=Number(input.value);for(const b of [...retained])if(document.querySelector('#stale').checked)release(b);draw();});
      const miniCamera=new THREE.PerspectiveCamera(45,1,.01,100);miniCamera.position.set(0,4,7);miniCamera.lookAt(0,0,0);const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);const overlayScene=new THREE.Scene(),overlayCamera=new THREE.OrthographicCamera(-1,1,1,-1,0,2);overlayCamera.position.z=1;const plane=new THREE.PlaneGeometry(2,2),planeMaterial=new THREE.MeshBasicMaterial({map:target.texture,depthTest:false,depthWrite:false});ownedGeometry.add(plane);ownedMaterial.add(planeMaterial);overlayScene.add(new THREE.Mesh(plane,planeMaterial));
      function renderMap(){const saved={target:renderer.getRenderTarget(),face:renderer.getActiveCubeFace(),mip:renderer.getActiveMipmapLevel(),viewport:renderer.getViewport(new THREE.Vector4()),scissor:renderer.getScissor(new THREE.Vector4()),test:renderer.getScissorTest()};try{renderer.setRenderTarget(target);renderer.setViewport(0,0,128,128);renderer.setScissorTest(false);renderer.render(scene,miniCamera);}finally{renderer.setRenderTarget(saved.target,saved.face,saved.mip);renderer.setViewport(saved.viewport);renderer.setScissor(saved.scissor);renderer.setScissorTest(saved.test);}}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.info.autoReset=false;renderer.info.reset();camera.lookAt(targetPoint);if(document.querySelector('#minimap').checked)renderMap();renderer.setRenderTarget(null);renderer.setViewport(0,0,canvas.width,canvas.height);renderer.render(scene,camera);if(document.querySelector('#minimap').checked){const saved=renderer.getViewport(new THREE.Vector4()),scissor=renderer.getScissor(new THREE.Vector4()),test=renderer.getScissorTest();try{const size=Math.min(100,canvas.width*.3);renderer.setViewport(canvas.width-size-4,4,size,size);renderer.setScissor(canvas.width-size-4,4,size,size);renderer.setScissorTest(true);renderer.autoClear=false;renderer.render(overlayScene,overlayCamera);}finally{renderer.autoClear=true;renderer.setViewport(saved);renderer.setScissor(scissor);renderer.setScissorTest(test);}}stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};frames++;output.textContent=JSON.stringify({status,current,generation,completions,selected,name:meshes[selected]?.name,clips:activeBook?.gltf.animations.length??0,playing,time:mixer?.time??0,x:meshes[0]?.position.x,camera:camera.position.toArray(),target:targetPoint.toArray(),stats,...counts});}
      renderer.setAnimationLoop(now=>{const dt=last?(now-last)/1000:0;last=now;if(playing&&mixer){mixer.update(dt);draw();}});function releaseAll(){generation++;for(const [id,resolve]of timers){clearTimeout(id);counts.timer++;resolve();}timers.clear();clearMixer();if(root)scene.remove(root);for(const b of [...books])release(b);root=null;meshes=[];}void loadModel(()=>bytes(document.querySelector('#model').value),document.querySelector('#model').value);
      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="정리 완료"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

</details>

- 모델 교체 전에 mixer 캐시를 왜 해제하나요?

### 움직임과 미니맵 연결

미니맵을 켜고 적용하세요. 같은 장면을 별도 카메라로 target에 그린 뒤 오른쪽 아래에 표시합니다. 선택·애니메이션을 바꾸며 두 화면이 함께 갱신되는지 보세요.

**예상 결과**

미니맵 on은 메인·타깃·표시 패스의 총계가 함께 증가합니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>움직임과 미니맵 연결</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>움직임과 미니맵 연결</h1>
    <p>
      미니맵을 켜고 적용하세요. 같은 장면을 별도 카메라로 target에 그린 뒤
      오른쪽 아래에 표시합니다. 선택·애니메이션을 바꾸며 두 화면이 함께
      갱신되는지 보세요.
    </p>
    <p>
      자체 제작한 두 패널 GLB입니다. 선택 파일은 실행 중에만 사용하며 백업에
      넣지 않습니다. 다시 실행한 뒤 재선택하세요. 2 MiB 이하 self-contained
      비압축 GLB와 내장 PNG/JPEG만 받습니다. 외부 URI·다중 파일
      glTF·Draco·Meshopt·KTX2는 지원하지 않습니다.
    </p>
    <div class="controls">
      <label
        >내장 모델<select id="model">
          <option>static</option>
          <option selected>animated</option>
          <option>textured</option>
          <option>empty</option>
        </select></label
      ><button id="sample">샘플 불러오기</button
      ><button id="race">slow A then fast B</button
      ><button id="invalid">손상 GLB</button
      ><button id="recover">샘플 복구</button
      ><label
        >GLB 파일<input
          id="file"
          type="file"
          accept=".glb,model/gltf-binary" /></label
      ><label><input id="guard" type="checkbox" checked />generation 보호</label
      ><label><input id="stale" type="checkbox" checked />stale 정리</label
      ><label><input id="framing" type="checkbox" checked />맞춤 허용</label
      ><label><input id="minimap" type="checkbox" />미니맵</label
      ><label>객체 목록<select id="objects"></select></label
      ><button id="frame">선택 맞춤</button
      ><button id="right">카메라 오른쪽</button><button id="zoom">확대</button
      ><button id="play">재생</button><button id="pause">일시정지</button
      ><button id="stop">정지·되감기</button
      ><label
        >속도<input
          id="speed"
          type="number"
          value="1"
          min="0"
          max="3"
          step="0.25" /></label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="움직임과 미니맵 연결"></canvas></div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
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

      const loader=new GLTFLoader();const counts={createdGeometry:0,createdMaterial:0,createdTexture:0,geometry:0,material:0,texture:0,bitmap:0,mixer:0,timer:0,stale:0};const books=new Set();let root=null,meshes=[],generation=0,current='',status='loading',selected=0,mixer=null,action=null,playing=false,last=0,completions=[],stats={};const timers=new Map(),retained=new Set();const targetPoint=new THREE.Vector3();
      function book(gltf){const geometry=new Set(),material=new Set(),texture=new Set(),images=new Set();for(const scene of gltf.scenes)scene.traverse(o=>{if(o.geometry)geometry.add(o.geometry);for(const m of Array.isArray(o.material)?o.material:o.material?[o.material]:[]){material.add(m);for(const value of Object.values(m))if(value?.isTexture){texture.add(value);if(value.image?.close)images.add(value.image);}}});const b={geometry,material,texture,images,gltf};for(const [name,set]of Object.entries({geometry,material,texture})){counts['created'+name[0].toUpperCase()+name.slice(1)]+=set.size;for(const r of set)r.addEventListener('dispose',()=>counts[name]++);}books.add(b);return b;}
      function release(b){if(!books.delete(b))return;for(const set of [b.geometry,b.material,b.texture])for(const r of set)r.dispose();for(const image of b.images){image.close();counts.bitmap++;}retained.delete(b);}
      let activeBook=null;function clearMixer(){if(mixer&&root){mixer.stopAllAction();mixer.uncacheRoot(root);counts.mixer++;}mixer=null;action=null;playing=false;}
      function wait(ms){if(!ms)return Promise.resolve();return new Promise(resolve=>{const id=setTimeout(()=>{timers.delete(id);counts.timer++;resolve();},ms);timers.set(id,resolve);});}
      async function loadModel(readBuffer,name,delay=0){const token=++generation;status='loading';document.querySelector('#error').textContent='';draw();let b;try{const buffer=await readBuffer();validateGlb(buffer);const gltf=await loader.parseAsync(buffer,'');b=book(gltf);await wait(delay);completions.push(name);if(disposed||document.querySelector('#guard').checked&&token!==generation){counts.stale++;if(disposed||document.querySelector('#stale').checked)release(b);else retained.add(b);return;}clearMixer();if(root)scene.remove(root);if(activeBook)release(activeBook);activeBook=b;root=gltf.scene;scene.add(root);meshes=[];root.traverse(o=>{if(o.isMesh)meshes.push(o);});selected=0;document.querySelector('#objects').replaceChildren(...meshes.map((o,i)=>new Option(o.name||'Mesh '+i,String(i))));if(gltf.animations.length){mixer=new THREE.AnimationMixer(root);action=mixer.clipAction(gltf.animations[0]);action.play();mixer.timeScale=Number(document.querySelector('#speed').value);playing=true;}current=name;status='ready';draw();}catch(cause){if(b)release(b);if(disposed||token!==generation)return;status='error';document.querySelector('#error').textContent="GLB를 읽지 못했습니다. 샘플 복구 또는 다른 파일을 선택하세요. 상세: "+cause.message;draw();}}
      const bytes=kind=>Uint8Array.from(atob(samples[kind]),c=>c.charCodeAt(0)).buffer;
      on('#sample','click',()=>{document.querySelector('#file').value='';const kind=document.querySelector('#model').value;void loadModel(()=>bytes(kind),kind);});on('#race','click',()=>{void loadModel(()=>bytes('textured'),'A',300);void loadModel(()=>bytes('animated'),'B',20);});on('#invalid','click',()=>void loadModel(()=>new TextEncoder().encode('invalid').buffer,'invalid'));on('#recover','click',()=>void loadModel(()=>bytes('animated'),'recovered'));on('#file','change',()=>{const file=document.querySelector('#file').files[0];if(file)void loadModel(()=>file.arrayBuffer(),file.name);});
      on('#objects','change',()=>{selected=document.querySelector('#objects').selectedIndex;draw();});on('#frame','click',()=>{if(document.querySelector('#framing').checked&&meshes[selected]){const box=new THREE.Box3().setFromObject(meshes[selected]);if(!box.isEmpty()){box.getCenter(targetPoint);const size=box.getSize(new THREE.Vector3()).length();camera.position.copy(targetPoint).add(new THREE.Vector3(0,size*.3,size*1.8));}}draw();});on('#right','click',()=>{camera.position.x++;draw();});on('#zoom','click',()=>{camera.position.z--;draw();});on('#play','click',()=>{if(action){action.paused=false;action.play();playing=true;}draw();});on('#pause','click',()=>{playing=false;if(action)action.paused=true;draw();});on('#stop','click',()=>{playing=false;if(action)action.stop();draw();});on('#apply','click',()=>{const input=document.querySelector('#speed');if(!input.value||!input.checkValidity())return;if(mixer)mixer.timeScale=Number(input.value);for(const b of [...retained])if(document.querySelector('#stale').checked)release(b);draw();});
      const miniCamera=new THREE.PerspectiveCamera(45,1,.01,100);miniCamera.position.set(0,4,7);miniCamera.lookAt(0,0,0);const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);const overlayScene=new THREE.Scene(),overlayCamera=new THREE.OrthographicCamera(-1,1,1,-1,0,2);overlayCamera.position.z=1;const plane=new THREE.PlaneGeometry(2,2),planeMaterial=new THREE.MeshBasicMaterial({map:target.texture,depthTest:false,depthWrite:false});ownedGeometry.add(plane);ownedMaterial.add(planeMaterial);overlayScene.add(new THREE.Mesh(plane,planeMaterial));
      function renderMap(){const saved={target:renderer.getRenderTarget(),face:renderer.getActiveCubeFace(),mip:renderer.getActiveMipmapLevel(),viewport:renderer.getViewport(new THREE.Vector4()),scissor:renderer.getScissor(new THREE.Vector4()),test:renderer.getScissorTest()};try{renderer.setRenderTarget(target);renderer.setViewport(0,0,128,128);renderer.setScissorTest(false);renderer.render(scene,miniCamera);}finally{renderer.setRenderTarget(saved.target,saved.face,saved.mip);renderer.setViewport(saved.viewport);renderer.setScissor(saved.scissor);renderer.setScissorTest(saved.test);}}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.info.autoReset=false;renderer.info.reset();camera.lookAt(targetPoint);if(document.querySelector('#minimap').checked)renderMap();renderer.setRenderTarget(null);renderer.setViewport(0,0,canvas.width,canvas.height);renderer.render(scene,camera);if(document.querySelector('#minimap').checked){const saved=renderer.getViewport(new THREE.Vector4()),scissor=renderer.getScissor(new THREE.Vector4()),test=renderer.getScissorTest();try{const size=Math.min(100,canvas.width*.3);renderer.setViewport(canvas.width-size-4,4,size,size);renderer.setScissor(canvas.width-size-4,4,size,size);renderer.setScissorTest(true);renderer.autoClear=false;renderer.render(overlayScene,overlayCamera);}finally{renderer.autoClear=true;renderer.setViewport(saved);renderer.setScissor(scissor);renderer.setScissorTest(test);}}stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};frames++;output.textContent=JSON.stringify({status,current,generation,completions,selected,name:meshes[selected]?.name,clips:activeBook?.gltf.animations.length??0,playing,time:mixer?.time??0,x:meshes[0]?.position.x,camera:camera.position.toArray(),target:targetPoint.toArray(),stats,...counts});}
      renderer.setAnimationLoop(now=>{const dt=last?(now-last)/1000:0;last=now;if(playing&&mixer){mixer.update(dt);draw();}});function releaseAll(){generation++;for(const [id,resolve]of timers){clearTimeout(id);counts.timer++;resolve();}timers.clear();clearMixer();if(root)scene.remove(root);for(const b of [...books])release(b);root=null;meshes=[];}void loadModel(()=>bytes(document.querySelector('#model').value),document.querySelector('#model').value);
      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="정리 완료"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

<details>
<summary>힌트</summary>

- 타깃과 viewport·scissor를 finally에서 복원하세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

미니맵 on은 메인·타깃·표시 패스의 총계가 함께 증가합니다. 타깃과 viewport·scissor를 finally에서 복원하세요.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>움직임과 미니맵 연결</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>움직임과 미니맵 연결</h1>
    <p>
      미니맵을 켜고 적용하세요. 같은 장면을 별도 카메라로 target에 그린 뒤
      오른쪽 아래에 표시합니다. 선택·애니메이션을 바꾸며 두 화면이 함께
      갱신되는지 보세요.
    </p>
    <p>
      자체 제작한 두 패널 GLB입니다. 선택 파일은 실행 중에만 사용하며 백업에
      넣지 않습니다. 다시 실행한 뒤 재선택하세요. 2 MiB 이하 self-contained
      비압축 GLB와 내장 PNG/JPEG만 받습니다. 외부 URI·다중 파일
      glTF·Draco·Meshopt·KTX2는 지원하지 않습니다.
    </p>
    <div class="controls">
      <label
        >내장 모델<select id="model">
          <option>static</option>
          <option selected>animated</option>
          <option>textured</option>
          <option>empty</option>
        </select></label
      ><button id="sample">샘플 불러오기</button
      ><button id="race">slow A then fast B</button
      ><button id="invalid">손상 GLB</button
      ><button id="recover">샘플 복구</button
      ><label
        >GLB 파일<input
          id="file"
          type="file"
          accept=".glb,model/gltf-binary" /></label
      ><label><input id="guard" type="checkbox" checked />generation 보호</label
      ><label><input id="stale" type="checkbox" checked />stale 정리</label
      ><label><input id="framing" type="checkbox" checked />맞춤 허용</label
      ><label><input id="minimap" type="checkbox" checked />미니맵</label
      ><label>객체 목록<select id="objects"></select></label
      ><button id="frame">선택 맞춤</button
      ><button id="right">카메라 오른쪽</button><button id="zoom">확대</button
      ><button id="play">재생</button><button id="pause">일시정지</button
      ><button id="stop">정지·되감기</button
      ><label
        >속도<input
          id="speed"
          type="number"
          value="1"
          min="0"
          max="3"
          step="0.25" /></label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="움직임과 미니맵 연결"></canvas></div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
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

      const loader=new GLTFLoader();const counts={createdGeometry:0,createdMaterial:0,createdTexture:0,geometry:0,material:0,texture:0,bitmap:0,mixer:0,timer:0,stale:0};const books=new Set();let root=null,meshes=[],generation=0,current='',status='loading',selected=0,mixer=null,action=null,playing=false,last=0,completions=[],stats={};const timers=new Map(),retained=new Set();const targetPoint=new THREE.Vector3();
      function book(gltf){const geometry=new Set(),material=new Set(),texture=new Set(),images=new Set();for(const scene of gltf.scenes)scene.traverse(o=>{if(o.geometry)geometry.add(o.geometry);for(const m of Array.isArray(o.material)?o.material:o.material?[o.material]:[]){material.add(m);for(const value of Object.values(m))if(value?.isTexture){texture.add(value);if(value.image?.close)images.add(value.image);}}});const b={geometry,material,texture,images,gltf};for(const [name,set]of Object.entries({geometry,material,texture})){counts['created'+name[0].toUpperCase()+name.slice(1)]+=set.size;for(const r of set)r.addEventListener('dispose',()=>counts[name]++);}books.add(b);return b;}
      function release(b){if(!books.delete(b))return;for(const set of [b.geometry,b.material,b.texture])for(const r of set)r.dispose();for(const image of b.images){image.close();counts.bitmap++;}retained.delete(b);}
      let activeBook=null;function clearMixer(){if(mixer&&root){mixer.stopAllAction();mixer.uncacheRoot(root);counts.mixer++;}mixer=null;action=null;playing=false;}
      function wait(ms){if(!ms)return Promise.resolve();return new Promise(resolve=>{const id=setTimeout(()=>{timers.delete(id);counts.timer++;resolve();},ms);timers.set(id,resolve);});}
      async function loadModel(readBuffer,name,delay=0){const token=++generation;status='loading';document.querySelector('#error').textContent='';draw();let b;try{const buffer=await readBuffer();validateGlb(buffer);const gltf=await loader.parseAsync(buffer,'');b=book(gltf);await wait(delay);completions.push(name);if(disposed||document.querySelector('#guard').checked&&token!==generation){counts.stale++;if(disposed||document.querySelector('#stale').checked)release(b);else retained.add(b);return;}clearMixer();if(root)scene.remove(root);if(activeBook)release(activeBook);activeBook=b;root=gltf.scene;scene.add(root);meshes=[];root.traverse(o=>{if(o.isMesh)meshes.push(o);});selected=0;document.querySelector('#objects').replaceChildren(...meshes.map((o,i)=>new Option(o.name||'Mesh '+i,String(i))));if(gltf.animations.length){mixer=new THREE.AnimationMixer(root);action=mixer.clipAction(gltf.animations[0]);action.play();mixer.timeScale=Number(document.querySelector('#speed').value);playing=true;}current=name;status='ready';draw();}catch(cause){if(b)release(b);if(disposed||token!==generation)return;status='error';document.querySelector('#error').textContent="GLB를 읽지 못했습니다. 샘플 복구 또는 다른 파일을 선택하세요. 상세: "+cause.message;draw();}}
      const bytes=kind=>Uint8Array.from(atob(samples[kind]),c=>c.charCodeAt(0)).buffer;
      on('#sample','click',()=>{document.querySelector('#file').value='';const kind=document.querySelector('#model').value;void loadModel(()=>bytes(kind),kind);});on('#race','click',()=>{void loadModel(()=>bytes('textured'),'A',300);void loadModel(()=>bytes('animated'),'B',20);});on('#invalid','click',()=>void loadModel(()=>new TextEncoder().encode('invalid').buffer,'invalid'));on('#recover','click',()=>void loadModel(()=>bytes('animated'),'recovered'));on('#file','change',()=>{const file=document.querySelector('#file').files[0];if(file)void loadModel(()=>file.arrayBuffer(),file.name);});
      on('#objects','change',()=>{selected=document.querySelector('#objects').selectedIndex;draw();});on('#frame','click',()=>{if(document.querySelector('#framing').checked&&meshes[selected]){const box=new THREE.Box3().setFromObject(meshes[selected]);if(!box.isEmpty()){box.getCenter(targetPoint);const size=box.getSize(new THREE.Vector3()).length();camera.position.copy(targetPoint).add(new THREE.Vector3(0,size*.3,size*1.8));}}draw();});on('#right','click',()=>{camera.position.x++;draw();});on('#zoom','click',()=>{camera.position.z--;draw();});on('#play','click',()=>{if(action){action.paused=false;action.play();playing=true;}draw();});on('#pause','click',()=>{playing=false;if(action)action.paused=true;draw();});on('#stop','click',()=>{playing=false;if(action)action.stop();draw();});on('#apply','click',()=>{const input=document.querySelector('#speed');if(!input.value||!input.checkValidity())return;if(mixer)mixer.timeScale=Number(input.value);for(const b of [...retained])if(document.querySelector('#stale').checked)release(b);draw();});
      const miniCamera=new THREE.PerspectiveCamera(45,1,.01,100);miniCamera.position.set(0,4,7);miniCamera.lookAt(0,0,0);const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);const overlayScene=new THREE.Scene(),overlayCamera=new THREE.OrthographicCamera(-1,1,1,-1,0,2);overlayCamera.position.z=1;const plane=new THREE.PlaneGeometry(2,2),planeMaterial=new THREE.MeshBasicMaterial({map:target.texture,depthTest:false,depthWrite:false});ownedGeometry.add(plane);ownedMaterial.add(planeMaterial);overlayScene.add(new THREE.Mesh(plane,planeMaterial));
      function renderMap(){const saved={target:renderer.getRenderTarget(),face:renderer.getActiveCubeFace(),mip:renderer.getActiveMipmapLevel(),viewport:renderer.getViewport(new THREE.Vector4()),scissor:renderer.getScissor(new THREE.Vector4()),test:renderer.getScissorTest()};try{renderer.setRenderTarget(target);renderer.setViewport(0,0,128,128);renderer.setScissorTest(false);renderer.render(scene,miniCamera);}finally{renderer.setRenderTarget(saved.target,saved.face,saved.mip);renderer.setViewport(saved.viewport);renderer.setScissor(saved.scissor);renderer.setScissorTest(saved.test);}}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.info.autoReset=false;renderer.info.reset();camera.lookAt(targetPoint);if(document.querySelector('#minimap').checked)renderMap();renderer.setRenderTarget(null);renderer.setViewport(0,0,canvas.width,canvas.height);renderer.render(scene,camera);if(document.querySelector('#minimap').checked){const saved=renderer.getViewport(new THREE.Vector4()),scissor=renderer.getScissor(new THREE.Vector4()),test=renderer.getScissorTest();try{const size=Math.min(100,canvas.width*.3);renderer.setViewport(canvas.width-size-4,4,size,size);renderer.setScissor(canvas.width-size-4,4,size,size);renderer.setScissorTest(true);renderer.autoClear=false;renderer.render(overlayScene,overlayCamera);}finally{renderer.autoClear=true;renderer.setViewport(saved);renderer.setScissor(scissor);renderer.setScissorTest(test);}}stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};frames++;output.textContent=JSON.stringify({status,current,generation,completions,selected,name:meshes[selected]?.name,clips:activeBook?.gltf.animations.length??0,playing,time:mixer?.time??0,x:meshes[0]?.position.x,camera:camera.position.toArray(),target:targetPoint.toArray(),stats,...counts});}
      renderer.setAnimationLoop(now=>{const dt=last?(now-last)/1000:0;last=now;if(playing&&mixer){mixer.update(dt);draw();}});function releaseAll(){generation++;for(const [id,resolve]of timers){clearTimeout(id);counts.timer++;resolve();}timers.clear();clearMixer();if(root)scene.remove(root);for(const b of [...books])release(b);root=null;meshes=[];}void loadModel(()=>bytes(document.querySelector('#model').value),document.querySelector('#model').value);
      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="정리 완료"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

</details>

- 미니맵이 멈췄을 때 어떤 갱신을 점검하나요?

### 검사기 오류 복구

손상 GLB, slow A then fast B, 샘플 복구를 차례로 실행하세요. 로딩 실패·stale에도 객체 목록·선택·카메라·재생·미니맵 컨트롤이 남습니다. 복구 후 키보드로 Right 선택·맞춤·재생을 다시 실행하세요.

**예상 결과**

실패는 현재 장면을 보존하고 B 이후 늦은 A는 해제됩니다.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>검사기 오류 복구</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>검사기 오류 복구</h1>
    <p>
      손상 GLB, slow A then fast B, 샘플 복구를 차례로 실행하세요. 로딩
      실패·stale에도 객체 목록·선택·카메라·재생·미니맵 컨트롤이 남습니다. 복구
      후 키보드로 Right 선택·맞춤·재생을 다시 실행하세요.
    </p>
    <p>
      자체 제작한 두 패널 GLB입니다. 선택 파일은 실행 중에만 사용하며 백업에
      넣지 않습니다. 다시 실행한 뒤 재선택하세요. 2 MiB 이하 self-contained
      비압축 GLB와 내장 PNG/JPEG만 받습니다. 외부 URI·다중 파일
      glTF·Draco·Meshopt·KTX2는 지원하지 않습니다.
    </p>
    <div class="controls">
      <label
        >내장 모델<select id="model">
          <option selected>static</option>
          <option>animated</option>
          <option>textured</option>
          <option>empty</option>
        </select></label
      ><button id="sample">샘플 불러오기</button
      ><button id="race">slow A then fast B</button
      ><button id="invalid">손상 GLB</button
      ><button id="recover">샘플 복구</button
      ><label
        >GLB 파일<input
          id="file"
          type="file"
          accept=".glb,model/gltf-binary" /></label
      ><label><input id="guard" type="checkbox" checked />generation 보호</label
      ><label><input id="stale" type="checkbox" checked />stale 정리</label
      ><label><input id="framing" type="checkbox" checked />맞춤 허용</label
      ><label><input id="minimap" type="checkbox" checked />미니맵</label
      ><label>객체 목록<select id="objects"></select></label
      ><button id="frame">선택 맞춤</button
      ><button id="right">카메라 오른쪽</button><button id="zoom">확대</button
      ><button id="play">재생</button><button id="pause">일시정지</button
      ><button id="stop">정지·되감기</button
      ><label
        >속도<input
          id="speed"
          type="number"
          value="1"
          min="0"
          max="3"
          step="0.25" /></label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="검사기 오류 복구"></canvas></div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
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

      const loader=new GLTFLoader();const counts={createdGeometry:0,createdMaterial:0,createdTexture:0,geometry:0,material:0,texture:0,bitmap:0,mixer:0,timer:0,stale:0};const books=new Set();let root=null,meshes=[],generation=0,current='',status='loading',selected=0,mixer=null,action=null,playing=false,last=0,completions=[],stats={};const timers=new Map(),retained=new Set();const targetPoint=new THREE.Vector3();
      function book(gltf){const geometry=new Set(),material=new Set(),texture=new Set(),images=new Set();for(const scene of gltf.scenes)scene.traverse(o=>{if(o.geometry)geometry.add(o.geometry);for(const m of Array.isArray(o.material)?o.material:o.material?[o.material]:[]){material.add(m);for(const value of Object.values(m))if(value?.isTexture){texture.add(value);if(value.image?.close)images.add(value.image);}}});const b={geometry,material,texture,images,gltf};for(const [name,set]of Object.entries({geometry,material,texture})){counts['created'+name[0].toUpperCase()+name.slice(1)]+=set.size;for(const r of set)r.addEventListener('dispose',()=>counts[name]++);}books.add(b);return b;}
      function release(b){if(!books.delete(b))return;for(const set of [b.geometry,b.material,b.texture])for(const r of set)r.dispose();for(const image of b.images){image.close();counts.bitmap++;}retained.delete(b);}
      let activeBook=null;function clearMixer(){if(mixer&&root){mixer.stopAllAction();mixer.uncacheRoot(root);counts.mixer++;}mixer=null;action=null;playing=false;}
      function wait(ms){if(!ms)return Promise.resolve();return new Promise(resolve=>{const id=setTimeout(()=>{timers.delete(id);counts.timer++;resolve();},ms);timers.set(id,resolve);});}
      async function loadModel(readBuffer,name,delay=0){const token=++generation;status='loading';document.querySelector('#error').textContent='';draw();let b;try{const buffer=await readBuffer();validateGlb(buffer);const gltf=await loader.parseAsync(buffer,'');b=book(gltf);await wait(delay);completions.push(name);if(disposed||document.querySelector('#guard').checked&&token!==generation){counts.stale++;if(disposed||document.querySelector('#stale').checked)release(b);else retained.add(b);return;}clearMixer();if(root)scene.remove(root);if(activeBook)release(activeBook);activeBook=b;root=gltf.scene;scene.add(root);meshes=[];root.traverse(o=>{if(o.isMesh)meshes.push(o);});selected=0;document.querySelector('#objects').replaceChildren(...meshes.map((o,i)=>new Option(o.name||'Mesh '+i,String(i))));if(gltf.animations.length){mixer=new THREE.AnimationMixer(root);action=mixer.clipAction(gltf.animations[0]);action.play();mixer.timeScale=Number(document.querySelector('#speed').value);playing=true;}current=name;status='ready';draw();}catch(cause){if(b)release(b);if(disposed||token!==generation)return;status='error';document.querySelector('#error').textContent="GLB를 읽지 못했습니다. 샘플 복구 또는 다른 파일을 선택하세요. 상세: "+cause.message;draw();}}
      const bytes=kind=>Uint8Array.from(atob(samples[kind]),c=>c.charCodeAt(0)).buffer;
      on('#sample','click',()=>{document.querySelector('#file').value='';const kind=document.querySelector('#model').value;void loadModel(()=>bytes(kind),kind);});on('#race','click',()=>{void loadModel(()=>bytes('textured'),'A',300);void loadModel(()=>bytes('animated'),'B',20);});on('#invalid','click',()=>void loadModel(()=>new TextEncoder().encode('invalid').buffer,'invalid'));on('#recover','click',()=>void loadModel(()=>bytes('animated'),'recovered'));on('#file','change',()=>{const file=document.querySelector('#file').files[0];if(file)void loadModel(()=>file.arrayBuffer(),file.name);});
      on('#objects','change',()=>{selected=document.querySelector('#objects').selectedIndex;draw();});on('#frame','click',()=>{if(document.querySelector('#framing').checked&&meshes[selected]){const box=new THREE.Box3().setFromObject(meshes[selected]);if(!box.isEmpty()){box.getCenter(targetPoint);const size=box.getSize(new THREE.Vector3()).length();camera.position.copy(targetPoint).add(new THREE.Vector3(0,size*.3,size*1.8));}}draw();});on('#right','click',()=>{camera.position.x++;draw();});on('#zoom','click',()=>{camera.position.z--;draw();});on('#play','click',()=>{if(action){action.paused=false;action.play();playing=true;}draw();});on('#pause','click',()=>{playing=false;if(action)action.paused=true;draw();});on('#stop','click',()=>{playing=false;if(action)action.stop();draw();});on('#apply','click',()=>{const input=document.querySelector('#speed');if(!input.value||!input.checkValidity())return;if(mixer)mixer.timeScale=Number(input.value);for(const b of [...retained])if(document.querySelector('#stale').checked)release(b);draw();});
      const miniCamera=new THREE.PerspectiveCamera(45,1,.01,100);miniCamera.position.set(0,4,7);miniCamera.lookAt(0,0,0);const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);const overlayScene=new THREE.Scene(),overlayCamera=new THREE.OrthographicCamera(-1,1,1,-1,0,2);overlayCamera.position.z=1;const plane=new THREE.PlaneGeometry(2,2),planeMaterial=new THREE.MeshBasicMaterial({map:target.texture,depthTest:false,depthWrite:false});ownedGeometry.add(plane);ownedMaterial.add(planeMaterial);overlayScene.add(new THREE.Mesh(plane,planeMaterial));
      function renderMap(){const saved={target:renderer.getRenderTarget(),face:renderer.getActiveCubeFace(),mip:renderer.getActiveMipmapLevel(),viewport:renderer.getViewport(new THREE.Vector4()),scissor:renderer.getScissor(new THREE.Vector4()),test:renderer.getScissorTest()};try{renderer.setRenderTarget(target);renderer.setViewport(0,0,128,128);renderer.setScissorTest(false);renderer.render(scene,miniCamera);}finally{renderer.setRenderTarget(saved.target,saved.face,saved.mip);renderer.setViewport(saved.viewport);renderer.setScissor(saved.scissor);renderer.setScissorTest(saved.test);}}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.info.autoReset=false;renderer.info.reset();camera.lookAt(targetPoint);if(document.querySelector('#minimap').checked)renderMap();renderer.setRenderTarget(null);renderer.setViewport(0,0,canvas.width,canvas.height);renderer.render(scene,camera);if(document.querySelector('#minimap').checked){const saved=renderer.getViewport(new THREE.Vector4()),scissor=renderer.getScissor(new THREE.Vector4()),test=renderer.getScissorTest();try{const size=Math.min(100,canvas.width*.3);renderer.setViewport(canvas.width-size-4,4,size,size);renderer.setScissor(canvas.width-size-4,4,size,size);renderer.setScissorTest(true);renderer.autoClear=false;renderer.render(overlayScene,overlayCamera);}finally{renderer.autoClear=true;renderer.setViewport(saved);renderer.setScissor(scissor);renderer.setScissorTest(test);}}stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};frames++;output.textContent=JSON.stringify({status,current,generation,completions,selected,name:meshes[selected]?.name,clips:activeBook?.gltf.animations.length??0,playing,time:mixer?.time??0,x:meshes[0]?.position.x,camera:camera.position.toArray(),target:targetPoint.toArray(),stats,...counts});}
      renderer.setAnimationLoop(now=>{const dt=last?(now-last)/1000:0;last=now;if(playing&&mixer){mixer.update(dt);draw();}});function releaseAll(){generation++;for(const [id,resolve]of timers){clearTimeout(id);counts.timer++;resolve();}timers.clear();clearMixer();if(root)scene.remove(root);for(const b of [...books])release(b);root=null;meshes=[];}void loadModel(()=>bytes(document.querySelector('#model').value),document.querySelector('#model').value);
      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="정리 완료"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

<details>
<summary>힌트</summary>

- 성공할 때만 목록을 재구성하세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

실패는 현재 장면을 보존하고 B 이후 늦은 A는 해제됩니다. 성공할 때만 목록을 재구성하세요.

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>검사기 오류 복구</title>
    <style>
      body{margin:0;padding:12px;font:14px/1.5 system-ui,sans-serif;color:#172554;background:white}h1{font-size:22px}#stage{width:480px;max-width:100%;height:280px}canvas{display:block;width:100%;height:100%}.controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center}input[type=number]{width:70px}input[type=file]{max-width:100%;width:240px}button,select{padding:6px}output,pre{display:block;white-space:pre-wrap;overflow-wrap:anywhere}:focus-visible{outline:3px solid #c2410c;outline-offset:2px}#error{color:#b91c1c}
    </style>
  </head>
  <body>
    <h1>검사기 오류 복구</h1>
    <p>
      손상 GLB, slow A then fast B, 샘플 복구를 차례로 실행하세요. 로딩
      실패·stale에도 객체 목록·선택·카메라·재생·미니맵 컨트롤이 남습니다. 복구
      후 키보드로 Right 선택·맞춤·재생을 다시 실행하세요.
    </p>
    <p>
      자체 제작한 두 패널 GLB입니다. 선택 파일은 실행 중에만 사용하며 백업에
      넣지 않습니다. 다시 실행한 뒤 재선택하세요. 2 MiB 이하 self-contained
      비압축 GLB와 내장 PNG/JPEG만 받습니다. 외부 URI·다중 파일
      glTF·Draco·Meshopt·KTX2는 지원하지 않습니다.
    </p>
    <div class="controls">
      <label
        >내장 모델<select id="model">
          <option>static</option>
          <option selected>animated</option>
          <option>textured</option>
          <option>empty</option>
        </select></label
      ><button id="sample">샘플 불러오기</button
      ><button id="race">slow A then fast B</button
      ><button id="invalid">손상 GLB</button
      ><button id="recover">샘플 복구</button
      ><label
        >GLB 파일<input
          id="file"
          type="file"
          accept=".glb,model/gltf-binary" /></label
      ><label><input id="guard" type="checkbox" checked />generation 보호</label
      ><label><input id="stale" type="checkbox" checked />stale 정리</label
      ><label><input id="framing" type="checkbox" checked />맞춤 허용</label
      ><label><input id="minimap" type="checkbox" checked />미니맵</label
      ><label>객체 목록<select id="objects"></select></label
      ><button id="frame">선택 맞춤</button
      ><button id="right">카메라 오른쪽</button><button id="zoom">확대</button
      ><button id="play">재생</button><button id="pause">일시정지</button
      ><button id="stop">정지·되감기</button
      ><label
        >속도<input
          id="speed"
          type="number"
          value="1"
          min="0"
          max="3"
          step="0.25" /></label
      ><button id="apply">적용</button><button id="cleanup">자원 정리</button>
    </div>
    <p id="error" role="status"></p>
    <div id="stage"><canvas aria-label="검사기 오류 복구"></canvas></div>
    <output aria-live="polite"></output>
    <script type="module">
      import * as THREE from 'three';
      const stage=document.querySelector('#stage'),canvas=document.querySelector('canvas'),output=document.querySelector('output');
      const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f7');const camera=new THREE.PerspectiveCamera(45,1,.01,1000);camera.position.set(0,2,7);camera.lookAt(0,0,0);const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(1);
      const events=new AbortController();let disposed=false,frames=0;const ownedGeometry=new Set(),ownedMaterial=new Set(),ownedTargets=new Set();const on=(s,t,f)=>document.querySelector(s).addEventListener(t,f,{signal:events.signal});

      import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
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

      const loader=new GLTFLoader();const counts={createdGeometry:0,createdMaterial:0,createdTexture:0,geometry:0,material:0,texture:0,bitmap:0,mixer:0,timer:0,stale:0};const books=new Set();let root=null,meshes=[],generation=0,current='',status='loading',selected=0,mixer=null,action=null,playing=false,last=0,completions=[],stats={};const timers=new Map(),retained=new Set();const targetPoint=new THREE.Vector3();
      function book(gltf){const geometry=new Set(),material=new Set(),texture=new Set(),images=new Set();for(const scene of gltf.scenes)scene.traverse(o=>{if(o.geometry)geometry.add(o.geometry);for(const m of Array.isArray(o.material)?o.material:o.material?[o.material]:[]){material.add(m);for(const value of Object.values(m))if(value?.isTexture){texture.add(value);if(value.image?.close)images.add(value.image);}}});const b={geometry,material,texture,images,gltf};for(const [name,set]of Object.entries({geometry,material,texture})){counts['created'+name[0].toUpperCase()+name.slice(1)]+=set.size;for(const r of set)r.addEventListener('dispose',()=>counts[name]++);}books.add(b);return b;}
      function release(b){if(!books.delete(b))return;for(const set of [b.geometry,b.material,b.texture])for(const r of set)r.dispose();for(const image of b.images){image.close();counts.bitmap++;}retained.delete(b);}
      let activeBook=null;function clearMixer(){if(mixer&&root){mixer.stopAllAction();mixer.uncacheRoot(root);counts.mixer++;}mixer=null;action=null;playing=false;}
      function wait(ms){if(!ms)return Promise.resolve();return new Promise(resolve=>{const id=setTimeout(()=>{timers.delete(id);counts.timer++;resolve();},ms);timers.set(id,resolve);});}
      async function loadModel(readBuffer,name,delay=0){const token=++generation;status='loading';document.querySelector('#error').textContent='';draw();let b;try{const buffer=await readBuffer();validateGlb(buffer);const gltf=await loader.parseAsync(buffer,'');b=book(gltf);await wait(delay);completions.push(name);if(disposed||document.querySelector('#guard').checked&&token!==generation){counts.stale++;if(disposed||document.querySelector('#stale').checked)release(b);else retained.add(b);return;}clearMixer();if(root)scene.remove(root);if(activeBook)release(activeBook);activeBook=b;root=gltf.scene;scene.add(root);meshes=[];root.traverse(o=>{if(o.isMesh)meshes.push(o);});selected=0;document.querySelector('#objects').replaceChildren(...meshes.map((o,i)=>new Option(o.name||'Mesh '+i,String(i))));if(gltf.animations.length){mixer=new THREE.AnimationMixer(root);action=mixer.clipAction(gltf.animations[0]);action.play();mixer.timeScale=Number(document.querySelector('#speed').value);playing=true;}current=name;status='ready';draw();}catch(cause){if(b)release(b);if(disposed||token!==generation)return;status='error';document.querySelector('#error').textContent="GLB를 읽지 못했습니다. 샘플 복구 또는 다른 파일을 선택하세요. 상세: "+cause.message;draw();}}
      const bytes=kind=>Uint8Array.from(atob(samples[kind]),c=>c.charCodeAt(0)).buffer;
      on('#sample','click',()=>{document.querySelector('#file').value='';const kind=document.querySelector('#model').value;void loadModel(()=>bytes(kind),kind);});on('#race','click',()=>{void loadModel(()=>bytes('textured'),'A',300);void loadModel(()=>bytes('animated'),'B',20);});on('#invalid','click',()=>void loadModel(()=>new TextEncoder().encode('invalid').buffer,'invalid'));on('#recover','click',()=>void loadModel(()=>bytes('animated'),'recovered'));on('#file','change',()=>{const file=document.querySelector('#file').files[0];if(file)void loadModel(()=>file.arrayBuffer(),file.name);});
      on('#objects','change',()=>{selected=document.querySelector('#objects').selectedIndex;draw();});on('#frame','click',()=>{if(document.querySelector('#framing').checked&&meshes[selected]){const box=new THREE.Box3().setFromObject(meshes[selected]);if(!box.isEmpty()){box.getCenter(targetPoint);const size=box.getSize(new THREE.Vector3()).length();camera.position.copy(targetPoint).add(new THREE.Vector3(0,size*.3,size*1.8));}}draw();});on('#right','click',()=>{camera.position.x++;draw();});on('#zoom','click',()=>{camera.position.z--;draw();});on('#play','click',()=>{if(action){action.paused=false;action.play();playing=true;}draw();});on('#pause','click',()=>{playing=false;if(action)action.paused=true;draw();});on('#stop','click',()=>{playing=false;if(action)action.stop();draw();});on('#apply','click',()=>{const input=document.querySelector('#speed');if(!input.value||!input.checkValidity())return;if(mixer)mixer.timeScale=Number(input.value);for(const b of [...retained])if(document.querySelector('#stale').checked)release(b);draw();});
      const miniCamera=new THREE.PerspectiveCamera(45,1,.01,100);miniCamera.position.set(0,4,7);miniCamera.lookAt(0,0,0);const target=new THREE.WebGLRenderTarget(128,128);ownedTargets.add(target);const overlayScene=new THREE.Scene(),overlayCamera=new THREE.OrthographicCamera(-1,1,1,-1,0,2);overlayCamera.position.z=1;const plane=new THREE.PlaneGeometry(2,2),planeMaterial=new THREE.MeshBasicMaterial({map:target.texture,depthTest:false,depthWrite:false});ownedGeometry.add(plane);ownedMaterial.add(planeMaterial);overlayScene.add(new THREE.Mesh(plane,planeMaterial));
      function renderMap(){const saved={target:renderer.getRenderTarget(),face:renderer.getActiveCubeFace(),mip:renderer.getActiveMipmapLevel(),viewport:renderer.getViewport(new THREE.Vector4()),scissor:renderer.getScissor(new THREE.Vector4()),test:renderer.getScissorTest()};try{renderer.setRenderTarget(target);renderer.setViewport(0,0,128,128);renderer.setScissorTest(false);renderer.render(scene,miniCamera);}finally{renderer.setRenderTarget(saved.target,saved.face,saved.mip);renderer.setViewport(saved.viewport);renderer.setScissor(saved.scissor);renderer.setScissorTest(saved.test);}}
      function draw(){if(disposed||!stage.clientWidth)return;renderer.info.autoReset=false;renderer.info.reset();camera.lookAt(targetPoint);if(document.querySelector('#minimap').checked)renderMap();renderer.setRenderTarget(null);renderer.setViewport(0,0,canvas.width,canvas.height);renderer.render(scene,camera);if(document.querySelector('#minimap').checked){const saved=renderer.getViewport(new THREE.Vector4()),scissor=renderer.getScissor(new THREE.Vector4()),test=renderer.getScissorTest();try{const size=Math.min(100,canvas.width*.3);renderer.setViewport(canvas.width-size-4,4,size,size);renderer.setScissor(canvas.width-size-4,4,size,size);renderer.setScissorTest(true);renderer.autoClear=false;renderer.render(overlayScene,overlayCamera);}finally{renderer.autoClear=true;renderer.setViewport(saved);renderer.setScissor(scissor);renderer.setScissorTest(test);}}stats={calls:renderer.info.render.calls,triangles:renderer.info.render.triangles};frames++;output.textContent=JSON.stringify({status,current,generation,completions,selected,name:meshes[selected]?.name,clips:activeBook?.gltf.animations.length??0,playing,time:mixer?.time??0,x:meshes[0]?.position.x,camera:camera.position.toArray(),target:targetPoint.toArray(),stats,...counts});}
      renderer.setAnimationLoop(now=>{const dt=last?(now-last)/1000:0;last=now;if(playing&&mixer){mixer.update(dt);draw();}});function releaseAll(){generation++;for(const [id,resolve]of timers){clearTimeout(id);counts.timer++;resolve();}timers.clear();clearMixer();if(root)scene.remove(root);for(const b of [...books])release(b);root=null;meshes=[];}void loadModel(()=>bytes(document.querySelector('#model').value),document.querySelector('#model').value);
      function resizeScene(){if(disposed)return;const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}const observer=new ResizeObserver(resizeScene);observer.observe(stage);resizeScene();
      function cleanup(){if(disposed)return;disposed=true;observer.disconnect();events.abort();renderer.setAnimationLoop(null);releaseAll();for(const x of ownedTargets)x.dispose();for(const x of ownedGeometry)x.dispose();for(const x of ownedMaterial)x.dispose();renderer.dispose();scene.clear();output.textContent="정리 완료"+' '+JSON.stringify(counts);}
      on('#cleanup','click',cleanup);window.addEventListener('pagehide',cleanup,{once:true,signal:events.signal});
    </script>
  </body>
</html>
```

</details>

- 오류 뒤에도 함께 작동해야 하는 기능은 무엇인가요?

### API · AnimationMixer.update / uncacheRoot

animated는 Left·Right 2개와 SlideLeft 클립 1개를 가집니다. 먼저 파싱을 끝내고 소유 장면을 교체하세요.

- `deltaTime (update): number` — 초 단위 시간차입니다.
- `root (uncacheRoot): Object3D` — 해제할 애니메이션 root입니다. 먼저 action을 정지합니다.

update는 AnimationMixer 자신을 반환합니다. uncacheRoot는 undefined이며 해당 root의 캐시를 해제합니다.

- 성공할 때만 목록을 재구성하세요.

```js
mixer.update(deltaMs/1000); mixer.stopAllAction(); mixer.uncacheRoot(root);
```

[AnimationMixer.update / uncacheRoot](https://threejs.org/docs/pages/AnimationMixer.html) · three@0.186.1 · 2026-10-27

### API · Box3.setFromObject / getCenter

setFromObject는 world bounds를 계산합니다. 빈 bounds는 제외하고 getCenter(target)와 getSize(size) 결과로 위치·시선을 함께 정합니다.

- `object (setFromObject): Object3D` — world bounds를 구할 장면 객체입니다.
- `target (getCenter): Vector3` — 중심을 쓸 벡터입니다.

setFromObject는 Box3 자신, getCenter는 전달한 Vector3를 반환합니다. 빈 bounds는 isEmpty로 먼저 확인합니다.

- setFromObject는 world bounds를 계산합니다. 빈 bounds는 제외하고 getCenter(target)와 getSize(size) 결과로 위치·시선을 함께 정합니다.

```js
const box=new THREE.Box3().setFromObject(mesh);if(!box.isEmpty()){box.getCenter(targetPoint);camera.lookAt(targetPoint);}
```

[Box3.setFromObject / getCenter](https://threejs.org/docs/pages/Box3.html) · three@0.186.1 · 2026-10-27

### API · WebGLRenderTarget / setRenderTarget

render target을 만든 뒤 별도 카메라로 그립니다. 화면용 별도 scene이 target.texture를 샘플링합니다. 상태를 저장·복원하고 target.dispose는 한 번만 호출합니다.

- `width, height (constructor): number` — 예제는 128×128입니다.
- `renderTarget (setRenderTarget): WebGLRenderTarget | null` — null은 화면, target은 그릴 텍스처입니다.

new WebGLRenderTarget은 타깃 객체를 반환합니다. setRenderTarget과 target.dispose는 undefined입니다.

- render target을 만든 뒤 별도 카메라로 그립니다. 화면용 별도 scene이 target.texture를 샘플링합니다. 상태를 저장·복원하고 target.dispose는 한 번만 호출합니다.

```js
const previous=renderer.getRenderTarget();try{renderer.setRenderTarget(target);renderer.render(scene,miniCamera);}finally{renderer.setRenderTarget(previous);}
```

[WebGLRenderTarget / setRenderTarget](https://threejs.org/docs/pages/WebGLRenderTarget.html) · three@0.186.1 · 2026-10-27

## 다음 학습

[이전: 렌더 통계와 프로파일](../26/README.md) · [다음: 렌더링 자원과 측정](../../03-project/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문

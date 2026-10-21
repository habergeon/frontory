# WebGPU · 03 Canvas 구성과 현재 texture

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 장치와 명령의 기초 · 문서 기반 직접 구현 · 저장 ID: `webgpu-step-03`

## 목표와 학습 후 역량

- Canvas를 GPU 출력에 연결한다.
- 화면 형식 계약을 유지한다.

## 선수 지식

2단위 결과물과 기록을 이어 사용합니다. Canvas 구성과 현재 texture 실험에 앞서 이전 입력과 기준 출력을 보관합니다.

## 핵심 개념과 설명

### 표시 대상

canvas context는 device와 화면 형식을 연결합니다. 현재 프레임 texture는 프레임마다 얻어 render attachment로 사용합니다.

### 형식 일치

pipeline의 color target format은 attachment 형식과 일치해야 합니다. 브라우저 선호 형식은 API로 조회합니다.

## 실습 준비

별도 localhost 또는 HTTPS 프로젝트에서 직접 구현하는 문서 안내 실습입니다. secure context, navigator.gpu, adapter 요청 결과를 확인하고 미지원 안내를 제공합니다. device.lost 처리와 자원 해제를 유지합니다.

이 단위에는 내장 실행 예제가 없습니다. 아래 절차에 따라 별도 실습 파일을 만들고 실행 결과를 필기에 남기세요. 코드 파일은 작업 폴더에서 따로 보관하고 Frontory 필기는 JSON 또는 Markdown으로 백업하세요.

## 실습 과제

1. canvas.js에서 getContext('webgpu')와 getPreferredCanvasFormat을 호출하세요.
2. configure 후 getCurrentTexture().createView()로 clear pass를 만드세요.
3. 배경색을 바꾸며 매 프레임 view를 새로 얻고 configure 값을 기록하세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| clear 색 | 검정 | 짙은 파랑 | 기하 없이도 전체 attachment 색이 바뀔 것으로 예상합니다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 현재 texture view를 프레임별로 얻는다.
- [ ] 선호 형식과 pipeline target 형식이 같은 값으로 기록된다.

## 자가 점검

1. 이전 프레임 texture를 계속 보관하면 왜 문제가 되나요?
2. CSS 배경색과 attachment clear는 무엇이 다른가요?

## 공식 참고

- [WebGPU API와 오류 처리](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [WGSL 명세](https://www.w3.org/TR/WGSL/)

## 연결된 예제와 실행 범위

문서와 필기를 제공합니다. 내장 실행 예제는 아직 제공하지 않습니다.

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: 기능과 limits 협상](../02/README.md) · [다음: 명령 기록과 제출](../04/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문

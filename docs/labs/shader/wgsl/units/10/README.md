# WGSL · 10 Scalar·Vector 정렬

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 자원 선언과 메모리 배치 · 편집 가능한 예제 · 저장 ID: `wgsl-step-10`

## 목표와 학습 후 역량

- 멤버 배치를 계산한다.
- 바이트 기록과 shader 해석을 맞춘다.

## 선수 지식

9단위 결과물과 기록을 이어 사용합니다. Scalar·Vector 정렬 실험에 앞서 이전 입력과 기준 출력을 보관합니다.

## 핵심 개념과 설명

### Alignment와 size

alignment는 시작 주소의 배수 조건이고 size는 데이터가 차지하는 크기입니다. vec3f의 alignment 16과 size 12를 구분해야 다음 멤버 위치를 계산할 수 있습니다.

### 멤버 offset

각 멤버의 시작은 이전 끝에서 자신의 alignment에 맞춰 반올림합니다. 구조체 전체 크기도 구조체 alignment에 맞춰 마무리합니다.

## 실습 준비

예제 화면의 실행 범위 안내를 먼저 확인하세요. 다음은 과제를 별도 프로젝트로 확장할 때의 준비 환경입니다. 별도 localhost 또는 HTTPS 프로젝트에서 직접 구현하는 문서 안내 실습입니다. secure context, navigator.gpu, adapter 요청 결과를 확인하고 미지원 안내를 제공합니다. device.lost 처리와 자원 해제를 유지합니다.

연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며, 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.

## 실습 과제

1. layout.md에 a:f32,b:vec3f,c:f32의 offset 0·16·28과 전체 크기 32를 계산하세요.
2. DataView로 해당 byte offset에 값을 넣어 storage buffer를 만드세요.
3. compute에서 세 필드를 다른 output 위치로 복사해 읽어 보세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| b offset | 16 | 의도적으로 4 | shader가 기대한 위치와 달라 b·c 값이 잘못 읽힐 것으로 예상합니다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 각 멤버의 alignment·size·offset 표가 정확하다.
- [ ] 정상 배치에서 모든 성분을 입력과 일치하게 읽는다.

## 자가 점검

1. vec3 뒤의 f32는 항상 16바이트 뒤에 오나요?
2. 구조체 끝의 padding을 배열에서 무시하면 무엇이 달라지나요?

## 공식 참고

- [WGSL 명세](https://www.w3.org/TR/WGSL/)
- [WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/wgsl-step-10/example.js) · [실행 환경과 제한](../../../../../examples.md)

실제 WebGPU/WGSL 실행. HTTPS/localhost와 지원 adapter 필요; 미지원 환경에는 사유를 표시하며 CPU 결과를 GPU로 대체하지 않습니다.


원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: Group·Binding과 호스트 연결](../09/README.md) · [다음: 행렬과 배열 Stride](../11/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문

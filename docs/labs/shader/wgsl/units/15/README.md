# WGSL · 15 Compute ID와 인덱스

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 병렬 계산과 동기화 · 편집 가능한 예제 · 저장 ID: `wgsl-step-15`

## 목표와 학습 후 역량

- invocation ID를 해석한다.
- 다차원 인덱스를 평탄화한다.

## 선수 지식

14단위 결과물과 기록을 이어 사용합니다. Compute ID와 인덱스 실험에 앞서 이전 입력과 기준 출력을 보관합니다.

## 핵심 개념과 설명

### ID 범위

local_invocation_id는 workgroup 안의 위치이고 workgroup_id는 그룹 위치입니다. global_invocation_id는 둘을 workgroup 크기로 결합한 전체 위치입니다.

### 평탄화

2차원 입력을 1차원 배열로 저장할 때 row stride를 포함해야 합니다. x와 y를 바꾸면 전치되거나 범위를 벗어날 수 있습니다.

## 실습 준비

예제 화면의 실행 범위 안내를 먼저 확인하세요. 다음은 과제를 별도 프로젝트로 확장할 때의 준비 환경입니다. 별도 localhost 또는 HTTPS 프로젝트에서 직접 구현하는 문서 안내 실습입니다. secure context, navigator.gpu, adapter 요청 결과를 확인하고 미지원 안내를 제공합니다. device.lost 처리와 자원 해제를 유지합니다.

연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며, 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.

## 실습 과제

1. ids.wgsl에 @workgroup_size(8,8)과 global id 입력을 선언하세요.
2. width=13,height=9에서 index=y*width+x로 식별값을 출력하세요.
3. dispatchWorkgroups(ceil(width/8),ceil(height/8)) 후 경계 밖 invocation을 제외하세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| 격자 | 8×8 | 13×9 | 부분 workgroup이 생기지만 유효 117개만 기록될 것으로 예상합니다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 117개 값이 좌표별 CPU 식별값과 일치한다.
- [ ] 마지막 행·열과 네 모서리를 따로 검사한다.

## 자가 점검

1. local id만 index로 쓰면 여러 그룹에서 무슨 일이 생기나요?
2. 2D workgroup과 2D 데이터 크기가 꼭 같아야 하나요?

## 공식 참고

- [WGSL 명세](https://www.w3.org/TR/WGSL/)
- [WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/wgsl-step-15/example.js) · [실행 환경과 제한](../../../../../examples.md)

실제 WebGPU/WGSL 실행. HTTPS/localhost와 지원 adapter 필요; 미지원 환경에는 사유를 표시하며 CPU 결과를 GPU로 대체하지 않습니다.


원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: Binding과 메모리 배치](../../02-experiments/README.md) · [다음: 경계 검사와 빈 입력](../16/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문

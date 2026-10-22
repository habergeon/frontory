# WGSL · 04 Const·Let·Var·Override

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 타입과 셰이더 인터페이스 · 편집 가능한 예제 · 저장 ID: `wgsl-step-04`

## 목표와 학습 후 역량

- 값의 수명에 맞는 선언을 선택한다.
- pipeline 상수와 런타임 입력을 구분한다.

## 선수 지식

3단위 결과물과 기록을 이어 사용합니다. Const·Let·Var·Override 실험에 앞서 이전 입력과 기준 출력을 보관합니다.

## 핵심 개념과 설명

### 변경 가능성

const와 let은 재할당하지 않는 값을 표현하지만 평가 시점이 다릅니다. var는 함수 실행 중 바뀌는 상태에 사용합니다.

### Pipeline 상수

override는 pipeline 생성 시 지정할 수 있는 값입니다. 매 프레임 바뀌는 입력은 override보다 uniform 같은 자원 경로가 적합합니다.

## 실습 준비

예제 화면의 실행 범위 안내를 먼저 확인하세요. 다음은 과제를 별도 프로젝트로 확장할 때의 준비 환경입니다. 별도 localhost 또는 HTTPS 프로젝트에서 직접 구현하는 문서 안내 실습입니다. secure context, navigator.gpu, adapter 요청 결과를 확인하고 미지원 안내를 제공합니다. device.lost 처리와 자원 해제를 유지합니다.

연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.

## 실습 과제

1. constants.wgsl에 const 계수·let 중간값·var 누적값을 구분해 작성하세요.
2. override SCALE을 pipeline constants로 1과 2에 설정하세요.
3. let 재대입 오류를 확인하고 프레임별 색 입력은 uniform으로 옮기세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| SCALE | 1 | 2로 pipeline 생성 | 해당 pipeline 결과가 두 배가 되며 uniform 갱신과 다른 수명을 가질 것으로 예상합니다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 네 선언의 평가·변경 시점을 표로 적는다.
- [ ] 두 pipeline 상수 결과와 let 재대입 오류를 기록한다.

## 자가 점검

1. override를 바꾸기 위해 왜 pipeline 구성이 달라지나요?
2. 함수 호출 중 변하지 않는 값은 어떤 선언이 적절한가요?

## 공식 참고

- [WGSL 명세](https://www.w3.org/TR/WGSL/)
- [WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/wgsl-step-04/example.js) · [실행 환경과 제한](../../../../../examples.md)

실제 WebGPU/WGSL 실행. HTTPS/localhost와 지원 adapter 필요; 미지원 환경에는 사유를 표시하며 CPU 결과를 GPU로 대체하지 않습니다.


원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: 벡터·행렬 생성과 곱](../03/README.md) · [다음: 함수와 구조체 계약](../05/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문

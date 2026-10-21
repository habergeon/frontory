# WGSL · 18 Barrier와 균일 제어 흐름

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 병렬 계산과 동기화 · 문서 기반 직접 구현 · 저장 ID: `wgsl-step-18`

## 목표와 학습 후 역량

- 균일한 barrier 경로를 작성한다.
- 동기화 범위를 구분한다.

## 선수 지식

17단위 결과물과 기록을 이어 사용합니다. Barrier와 균일 제어 흐름 실험에 앞서 이전 입력과 기준 출력을 보관합니다.

## 핵심 개념과 설명

### 도달 조건

workgroupBarrier는 workgroup의 invocation들이 함께 도달해야 합니다. 일부 lane만 들어가는 조건문 안에 놓으면 균일성 규칙을 위반할 수 있습니다.

### 범위 한계

storageBarrier도 dispatch 전체의 전역 실행 장벽이 아닙니다. 다른 workgroup 결과를 기다리는 알고리즘은 별도 dispatch 단계로 나눕니다.

## 실습 준비

별도 localhost 또는 HTTPS 프로젝트에서 직접 구현하는 문서 안내 실습입니다. secure context, navigator.gpu, adapter 요청 결과를 확인하고 미지원 안내를 제공합니다. device.lost 처리와 자원 해제를 유지합니다.

이 단위에는 내장 실행 예제가 없습니다. 아래 절차에 따라 별도 실습 파일을 만들고 실행 결과를 필기에 남기세요. 코드 파일은 작업 폴더에서 따로 보관하고 Frontory 필기는 JSON 또는 Markdown으로 백업하세요.

## 실습 과제

1. barrier.wgsl에서 if(valid) 안의 barrier를 포함한 잘못된 사례를 진단하세요.
2. 메모리 접근만 if로 감싸고 barrier는 모든 lane이 지나도록 옮기세요.
3. 그룹별 부분 결과를 다음 dispatch가 읽도록 host.js에 두 pass를 작성하세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| barrier 위치 | 비균일 if 내부 | 모든 lane의 공통 경로 | 균일성 진단을 해결하고 부분 그룹에서도 동기화가 성립할 것으로 예상합니다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 오류와 수정 후 제어 흐름을 그림으로 설명한다.
- [ ] 그룹 간 의존 작업이 동일 dispatch의 대기 루프에 의존하지 않는다.

## 자가 점검

1. barrier 이전 조기 return은 왜 위험한가요?
2. storageBarrier가 전역 동기화를 뜻하지 않는 이유는 무엇인가요?

## 공식 참고

- [WGSL 명세](https://www.w3.org/TR/WGSL/)
- [WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)

## 연결된 예제와 실행 범위

문서와 필기를 제공합니다. 내장 실행 예제는 아직 제공하지 않습니다.

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: Workgroup 메모리와 협력](../17/README.md) · [다음: Atomic과 카운터](../19/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문

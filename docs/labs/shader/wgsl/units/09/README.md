# WGSL · 09 Group·Binding과 호스트 연결

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 자원 선언과 메모리 배치 · 문서 기반 직접 구현 · 저장 ID: `wgsl-step-09`

## 목표와 학습 후 역량

- 자원 위치를 호스트에 연결한다.
- binding 검증 오류를 추적한다.

## 선수 지식

8단위 결과물과 기록을 이어 사용합니다. Group·Binding과 호스트 연결 실험에 앞서 이전 입력과 기준 출력을 보관합니다.

## 핵심 개념과 설명

### 식별 위치

@group와 @binding은 shader 자원의 연결 위치를 정합니다. 숫자가 같아도 texture·sampler·buffer 타입이 다르면 호스트 계약을 맞춰야 합니다.

### 최소 크기

buffer binding에는 shader가 읽을 데이터가 충분히 들어 있어야 합니다. bind group layout의 최소 크기와 실제 binding 범위를 함께 확인합니다.

## 실습 준비

별도 localhost 또는 HTTPS 프로젝트에서 직접 구현하는 문서 안내 실습입니다. secure context, navigator.gpu, adapter 요청 결과를 확인하고 미지원 안내를 제공합니다. device.lost 처리와 자원 해제를 유지합니다.

이 단위에는 내장 실행 예제가 없습니다. 아래 절차에 따라 별도 실습 파일을 만들고 실행 결과를 필기에 남기세요. 코드 파일은 작업 폴더에서 따로 보관하고 Frontory 필기는 JSON 또는 Markdown으로 백업하세요.

## 실습 과제

1. bindings.wgsl에 group 0의 색 uniform과 group 1의 storage 배열을 선언하세요.
2. host.js에 두 bind group layout과 대응 자원을 작성하세요.
3. binding 번호·visibility·buffer type 중 하나씩 틀린 사례를 error scope로 검사하세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| binding 번호 | 양쪽 0 | 호스트만 1 | 자원 연결이 맞지 않아 검증에 실패할 것으로 예상합니다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] shader 선언과 host descriptor 대응표를 작성한다.
- [ ] 오류 세 종류를 구분하고 정상 값으로 복구한다.

## 자가 점검

1. group 번호는 메모리 주소를 의미하나요?
2. 자동 layout을 써도 shader와 자원 타입 검증이 없어지나요?

## 공식 참고

- [WGSL 명세](https://www.w3.org/TR/WGSL/)
- [WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)

## 연결된 예제와 실행 범위

문서와 필기를 제공합니다. 내장 실행 예제는 아직 제공하지 않습니다.

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: 주소 공간과 접근 모드](../08/README.md) · [다음: Scalar·Vector 정렬](../10/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문

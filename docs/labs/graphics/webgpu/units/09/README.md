# WebGPU · 09 Uniform 구조체 정렬

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 렌더 자원과 화면 구성 · 문서 기반 직접 구현 · 저장 ID: `webgpu-step-09`

## 목표와 학습 후 역량

- host와 shader 배치를 맞춘다.
- 두 정렬 규칙을 구분한다.

## 선수 지식

8단위 결과물과 기록을 이어 사용합니다. Uniform 구조체 정렬 실험에 앞서 이전 입력과 기준 출력을 보관합니다.

## 핵심 개념과 설명

### 내부 배치

WGSL 구조체의 멤버 alignment와 size가 CPU 바이트 배치를 결정합니다. vec3f의 alignment 16과 size 12는 다른 개념입니다.

### 바인딩 offset

구조체 멤버 정렬과 dynamic uniform offset 한도는 별개의 규칙입니다. dynamic offset은 device의 최소 정렬을 따라야 합니다.

## 실습 준비

별도 localhost 또는 HTTPS 프로젝트에서 직접 구현하는 문서 안내 실습입니다. secure context, navigator.gpu, adapter 요청 결과를 확인하고 미지원 안내를 제공합니다. device.lost 처리와 자원 해제를 유지합니다.

이 단위에는 내장 실행 예제가 없습니다. 아래 절차에 따라 별도 실습 파일을 만들고 실행 결과를 필기에 남기세요. 코드 파일은 작업 폴더에서 따로 보관하고 Frontory 필기는 JSON 또는 Markdown으로 백업하세요.

## 실습 과제

1. layout.md에 color:vec3f, gain:f32 구조체의 offset 0·12와 크기 16을 계산하세요.
2. DataView로 color와 gain을 각각 기록하고 출력 색을 확인하세요.
3. 두 구조체 슬롯을 만들 때 minUniformBufferOffsetAlignment로 슬롯 stride를 반올림하세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| gain offset | 12 | 의도적으로 16에 기록 | shader가 읽는 gain이 갱신되지 않아 layout 오류가 드러날 것으로 예상합니다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 멤버 offset·크기·alignment 표가 있다.
- [ ] 올바른 배치에서 두 슬롯의 색과 gain이 섞이지 않는다.

## 자가 점검

1. vec3 뒤에 f32를 둘 때 항상 4바이트 padding이 필요한가요?
2. dynamic offset 정렬을 구조체 크기와 같게 볼 수 있나요?

## 공식 참고

- [WebGPU API와 오류 처리](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [WGSL 명세](https://www.w3.org/TR/WGSL/)

## 연결된 예제와 실행 범위

문서와 필기를 제공합니다. 내장 실행 예제는 아직 제공하지 않습니다.

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: Uniform과 bind group](../08/README.md) · [다음: 행렬과 카메라](../10/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문

# Three.js · 01 장면 그래프와 카메라

[시리즈 목차](../README.md) · [전체 기술 지도](../../../README.md)

단계: 장면 좌표·카메라·기하 · 편집 가능한 예제 · 저장 ID: `threejs-01`

## 목표와 학습 후 역량

- local과 world 좌표 변화를 출력한다.
- FOV와 카메라 이동의 효과를 구별한다.

## 선수 지식

JavaScript ES 모듈, 벡터·행렬 기초와 WebGL 첫 장면을 이해해야 합니다.

## 핵심 개념과 설명

### 부모 변환

Group의 변환은 자식의 world 좌표에 누적됩니다. 자식 position은 부모 기준이므로 화면 위치와 같은 값이 아닙니다.

### 시선과 위치

카메라 위치와 바라보는 지점은 서로 다른 값입니다. FOV를 바꾸면 위치를 고정해도 투영 크기가 변합니다.

## 실습 준비

기존 내장 예제는 출발점만 제공합니다. 확장 요구사항 전체가 구현된 예제가 아니며 별도 로컬 HTTP 개발 서버의 HTML·ES 모듈 프로젝트에서 직접 구현합니다. three와 addons를 같은 설치 버전으로 고정하고 기록하세요.

연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.

## 실습 과제

1. 외부 실습 프로젝트의 day-01.js와 index.html을 준비하세요. 기존 threejs-01의 Group에 두 Mesh를 넣고 AxesHelper를 추가하세요.
2. 부모 회전과 카메라 FOV를 입력받아 getWorldPosition 결과를 HTML output에 표시하세요.
3. 입력 조건 0에서 출력을 저장한 뒤 PI/2 조건으로 다시 실행하세요. 예상: 자식 local 좌표는 같아도 world 좌표는 회전합니다. 실제 화면·로그와 대조하고 day-01-notes.md에 실제 결과와 차이의 원인을 남기세요.

## 관찰할 변수

| 변수      | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설                            |
| --------- | --------- | --------- | ------------------------------------------------ |
| 부모 회전 | 0         | PI/2      | 자식 local 좌표는 같아도 world 좌표는 회전합니다 |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] local과 world 좌표 변화를 출력한다.
- [ ] FOV와 카메라 이동의 효과를 구별한다.

## 자가 점검

1. 부모만 이동했는데 자식 position이 그대로인 이유는 무엇인가요?
2. lookAt과 position은 어떻게 다른가요?

## 공식 참고

- [Three.js Fundamentals](https://threejs.org/manual/pages/fundamentals.html)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../src/labs/threejs-01/example.js) · [실행 환경과 제한](../../../../examples.md)

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 단계별 학습

Scene에 객체를 추가하고 자식 수가 어떻게 바뀌는지 확인합니다. 도형을 그리기 전, 장면의 구조를 살펴보는 짧은 실험입니다.

### 선수 단원

- `html-step-02`

### 장면에 객체 추가하기

Scene은 객체를 담는 장면입니다. 시작 코드는 빈 장면의 자식 수를 표시합니다. scene을 만든 다음 Object3D 하나를 추가해 보세요.

**예상 결과**

화면의 숫자가 0에서 1로 바뀝니다.

```html
<!doctype html>
<html lang="ko">
  <meta charset="utf-8" />
  <title>장면 구조 실험</title>
  <p id="count"></p>
  <script type="module">
    import { Scene, Object3D } from 'three'
    const scene = new Scene()
    // 이곳에서 장면에 Object3D를 추가하세요.
    document.querySelector('#count').textContent = String(scene.children.length)
  </script>
</html>
```

<details>
<summary>힌트</summary>

- scene.add()에 새 Object3D를 전달하세요.

</details>

<details>
<summary>완성 코드와 해설</summary>

scene.add(new Object3D())가 객체를 장면의 자식으로 연결합니다. 따라서 scene.children.length가 0에서 1로 바뀝니다. 이 실험에는 renderer가 없어 도형을 그리지 않습니다.

```html
<!doctype html>
<html lang="ko">
  <meta charset="utf-8" />
  <title>장면 구조 실험</title>
  <p id="count"></p>
  <script type="module">
    import { Scene, Object3D } from 'three'
    const scene = new Scene()
    scene.add(new Object3D())
    document.querySelector('#count').textContent = String(scene.children.length)
  </script>
</html>
```

</details>

- 객체를 두 개 추가하면 어떤 숫자가 나올까요?

### API · Object3D.add

객체를 현재 객체의 자식으로 연결합니다. Scene도 Object3D를 상속하므로 같은 메서드를 사용합니다.

- `object: Object3D` — 자식으로 추가할 객체입니다.

호출한 객체 자신을 반환합니다.

- 이미 다른 부모가 있으면 그 부모에서 제거한 뒤 연결합니다.

```js
scene.add(new Object3D())
```

[Object3D.add](https://threejs.org/docs/#api/en/core/Object3D.add) · three@0.186.1 · 2026-10-26

## 다음 학습

[다음: 렌더러와 화면 크기](../units/02/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문

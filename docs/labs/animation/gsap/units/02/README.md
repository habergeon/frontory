# GSAP · 02 시작값과 목표값

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: Tween과 시간 모델 · 편집 가능한 예제 · 저장 ID: `gsap-step-02`

## 목표와 학습 후 역량

- 학습 결과: from과 to의 역할을 설명한다. 입력 사례: 초기 x=40 카드.
- 산출물: 생성 직후와 종료 후 transform 표. 초기 적용 처리의 근거를 코드와 연결해 설명한다.

## 선수 지식

1단위 「Tween과 Timeline」의 Tween 및 재생 헤드 실습 결과를 준비한다.

## 핵심 개념과 설명

### from과 to는 무엇을 생략하는가

x는 요소의 가로 이동 transform 값이며 이 단위에서는 px로 비교합니다. 초기 x가 40인 카드에 gsap.to(card, { x: 240 })를 만들면 현재 값에서 240으로 이동합니다. gsap.from(card, { x: -80 })은 -80에서 시작해 원래 값 40으로 돌아옵니다. gsap.fromTo(card, { x: -80 }, { x: 240 })은 양쪽 값을 직접 지정하므로 원래 40은 이동 구간의 끝점으로 쓰지 않습니다. 세 API를 비교하려면 각각 별도 카드를 만들고 모두 40으로 초기화하세요. 한 카드에 차례로 실행하면 앞선 tween의 종료값이 다음 tween의 현재 값이 되어 다른 조건을 비교하게 됩니다.

### 내장 예제는 fromTo 한 경로를 실행한다

기본 내장 예제의 Run experiment 버튼은 to/from 선택기가 아닙니다. 클릭 전에는 x를 설정하지 않아 카드가 x=0에 있습니다. 첫 클릭에서 reverse가 false에서 true로 바뀌며 gsap.fromTo(box, { x: 240, opacity: 0.2 }, { x: 0, opacity: 1, duration: 1, immediateRender: false })를 만듭니다. 다음 클릭은 시작 x=0, 종료 x=240입니다. 즉 첫 실행은 오른쪽 240에서 원래 위치로 돌아오는 방향입니다. output 문구는 코드에 정한 안내문이며 현재 좌표를 계속 읽은 측정 로그가 아닙니다.

### 초기 적용은 생성 시점과 첫 렌더를 나눈다

from과 fromTo는 기본적으로 immediateRender가 true여서 생성 시 시작값을 적용합니다. immediateRender: false를 지정하면 tween 생성과 첫 렌더 사이에 원래 스타일을 유지합니다. 이 옵션은 fromTo의 세 번째 인자인 목표 설정에 넣으세요. 내장 예제는 tween 자체를 클릭할 때 생성하므로 클릭 전 모습은 유지됩니다. 첫 클릭의 동기 코드 직후에는 x=0이어도 재생을 시작하면 지정한 시작값 x=240 쪽에서 움직이므로 점프가 보일 수 있습니다. immediateRender: false가 현재 위치부터 부드럽게 이어 준다고 해석하면 안 됩니다. 현재 위치에서 출발하려면 to의 역할과 비교하세요.

### 세 API를 같은 조건에서 비교하는 최소 실험

다음은 기본 예제와 분리한 실험입니다. 내장 편집기의 JavaScript 전체를 이 mount 코드로 교체해 실행하거나 별도 실습 환경에서 gsap와 container를 전달하세요. 세 카드는 모두 x=40에서 출발합니다. paused: true로 자동 재생을 멈추고 생성 직후, 진행도 0.5, 진행도 1을 코드가 직접 설정해 표를 출력합니다. 이는 실제로 0.5초를 기다린 시간 측정이 아닙니다.

```js
export function mount({ container, gsap }) {
  const root = document.createElement('section');
  const output = document.createElement('pre');
  const names = ['to', 'from', 'fromTo'];
  const cards = names.map(name => {
    const card = document.createElement('div');
    card.textContent = name;
    card.style.cssText = 'width:64px;margin:8px;background:#76d3de';
    root.append(card);
    return card;
  });
  root.append(output);
  container.append(root);
  gsap.set(cards, { x: 40 });
  const rows = [];
  function sample(phase) {
    cards.forEach((card, index) => rows.push({
      api: names[index], phase,
      x: Number(gsap.getProperty(card, 'x')),
      transform: getComputedStyle(card).transform
    }));
  }
  sample('before');
  const options = { duration: 1, ease: 'none', paused: true };
  const tweens = [
    gsap.to(cards[0], { ...options, x: 240 }),
    gsap.from(cards[1], { ...options, x: -80 }),
    gsap.fromTo(cards[2], { x: -80 }, { ...options, x: 240 })
  ];
  sample('created');
  tweens.forEach(tween => tween.progress(0.5));
  sample('half');
  tweens.forEach(tween => tween.progress(1));
  sample('end');
  output.textContent = JSON.stringify(rows, null, 2);
  return () => {
    tweens.forEach(tween => tween.kill());
    root.remove();
  };
}
```

ease: 'none'을 지정해 중간 진행도에서 거리도 절반이 되도록 통제했습니다. 출력은 숫자 x와 브라우저가 계산한 transform을 함께 담습니다. transform 문자열의 표기만으로 API 차이를 판단하지 말고 x를 비교하세요.

### 통제 실험의 예상 표를 먼저 계산하기

위 코드의 예상 x는 before에서 세 카드 모두 40입니다. created에서는 to=40, from=-80, fromTo=-80을 예상합니다. from 계열은 기본 초기 적용을 유지했기 때문입니다. half에서는 to=140, from=-20, fromTo=80이며 end에서는 to=240, from=40, fromTo=240을 예상합니다. 예를 들어 to 중간값은 40 + (240 - 40) × 0.5 = 140입니다. 이 숫자는 코드 조건에서 계산한 예상값입니다. 실행 후 출력된 각 행을 실제 관찰값으로 저장하고 예상과 다른 행에는 초기값·API·ease·진행도 설정을 함께 적으세요.

### 내장 예제에서 확인한 값과 검증 범위

기존 예제의 mount를 로컬 Vite 페이지에서 실행한 HeadlessChrome 151.0.7922.34 검증에서는 초기 x=0, 첫 클릭의 동기 코드 직후 x=0을 확인했습니다. 첫 tween의 progress(1)을 강제로 설정한 뒤에는 x=0과 opacity=1, 두 번째 tween의 progress(1) 뒤에는 x=240을 읽었습니다. progress(0.5)에서는 x=60과 opacity=0.8을 읽었으며 기본 예제는 ease를 지정하지 않았습니다. 이 기록은 GSAP의 진행도를 직접 이동해 확인한 속성값입니다. 위 세 카드 코드도 같은 브라우저에서 실행해 before·created·half·end의 x가 예상 표와 일치함을 확인했습니다. immediateRender: false를 추가한 경우에도 created는 세 카드 모두 40이고 half·end는 기존 표와 같았습니다. 자연 재생의 실제 소요 시간이나 화면 깜박임 유무를 측정한 기록은 아닙니다. 재현 코드는 [대표 강의 브라우저 검사](../../../../../../tests/browser/representative-lessons.js)에 있습니다.

### 예상과 다른 결과를 만드는 실패 사례

같은 카드에 to, from, fromTo를 연달아 만들면 여러 tween이 같은 속성을 쓰거나 앞선 실행의 스타일을 읽을 수 있습니다. 비교할 카드를 분리하고 각 실행 전 초기값을 다시 맞추세요. 내장 예제는 새 클릭에서 기존 tween을 kill한 뒤 새 fromTo를 생성합니다. 빠르게 클릭할 때 현재 위치를 보존하는 실험으로 쓰지 마세요. 또한 기본 ease에서 progress(0.5)를 거리의 절반이라고 예상하면 잘못 비교합니다. 위 별도 실험만 ease: 'none'으로 통제합니다. duration은 fromTo의 시작 객체가 아닌 세 번째 목표 객체에 넣고, 예상 방향과 실제 종료값을 먼저 확인하세요.

### 초기 적용 하나만 바꾸어 재실험하기

세 카드 실험의 options에 immediateRender: false를 추가한 뒤 다시 실행하세요. paused 상태의 created 행에서는 from과 fromTo도 기존 x=40을 유지할 것으로 예상합니다. progress(0.5)와 progress(1)을 직접 설정하면 해당 구간으로 이동하므로 half와 end의 예상값은 그대로입니다. 이 비교는 생성 직후 스타일과 이동 구간을 분리해 확인합니다. 눈으로 첫 화면의 깜박임까지 확인하려면 별도 실험에서 자동 재생·지연 조건을 정하고 다시 관찰해야 합니다. 정지된 진행도 표만으로 화면의 첫 페인트를 봤다고 기록하지 마세요.

## 실습 준비

프로젝트 의존성은 GSAP 3.15.0입니다. 기본 src/labs/gsap-step-02/example.js는 Run experiment 버튼으로 fromTo를 실행합니다. 본문의 세 API 비교 코드는 이 기본 예제와 분리한 mount 교체 실험이며 mount가 받은 gsap와 container를 사용합니다. 별도 로컬 GSAP 프로젝트에서는 gsap import와 마운트할 DOM 요소를 준비하고 버전·lockfile을 기록하세요. 이 단위는 ScrollTrigger를 사용하지 않습니다.

연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.

## 실습 과제

1. 기본 내장 예제는 fromTo만 실행한다는 점을 확인하세요. 실행 전 카드 위치를 적고 Run experiment를 한 번 누른 뒤 종료 방향을 관찰하세요. 첫 목표는 x=0, 다음 목표는 x=240이라는 코드상의 예상과 비교하세요.
2. to/from/fromTo 비교는 본문의 별도 mount 코드로 진행하세요. 세 카드의 초기 x=40과 ease: none, paused: true 조건을 기록하고 before·created·half·end의 예상값을 먼저 계산하세요.
3. 실행 후 출력된 x와 transform을 저장하세요. 기준 to와 변경 fromTo의 생성 직후·종료 후 행을 비교하고 from의 종료값도 함께 설명하세요. 실제 관찰값이 없는 칸은 미실행으로 남기세요.
4. options에 immediateRender: false만 추가해 다시 실행하세요. created 행의 차이와 half·end 행을 비교하고 notes/day-2.md에 환경·입력·예상·관찰·차이의 원인을 적으세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설                 |
| ---- | --------- | --------- | ------------------------------------- |
| API  | to        | fromTo    | 명시한 시작값으로 이동 구간이 바뀐다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 필수 산출물: 생성 직후와 종료 후 transform 표. 기준 및 변경 조건 각각의 결과가 있어 총 2조건을 비교할 수 있고 입력값과 실행 환경을 함께 기록했다.
- [ ] 두 조건의 차이에 관한 설명에 다음 개념을 모두 연결했다: from과 to, 초기 적용. 예상과 다른 항목은 원인 또는 미해결 이유를 1개 이상 적었다.

## 자가 점검

1. 초기 x=40에서 to의 x=240과 from의 x=-80은 각각 어떤 시작값과 종료값을 사용하나요?
2. 내장 예제의 첫 실행이 0에서 240으로 이동한다고 예상했다면 reverse의 첫 변경값과 fromTo의 두 객체 중 무엇을 놓쳤나요?
3. paused: true 상태에서 immediateRender만 false로 바꾸면 created·half·end 중 어느 관찰 시점이 달라질 것으로 예상하나요? 직접 얻은 표와 비교해 설명하세요.

## 공식 참고

- [GSAP to 목표값과 설정](<https://gsap.com/docs/v3/GSAP/gsap.to()/>)
- [GSAP from 현재 상태와 초기 적용](<https://gsap.com/docs/v3/GSAP/gsap.from()/>)
- [GSAP fromTo 양 끝점과 immediateRender](<https://gsap.com/docs/v3/GSAP/gsap.fromTo()/>)
- [GSAP 속성값 읽기](<https://gsap.com/docs/v3/GSAP/gsap.getProperty()/>)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/gsap-step-02/example.js) · [실행 환경과 제한](../../../../../examples.md)

시작값과 목표값 실험입니다. 직접 조작할 수 있으며 사용한 자원을 정리합니다.

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: Tween과 Timeline](../../01-foundations/README.md) · [다음: Ease의 시간 곡선](../03/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문

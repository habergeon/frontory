# CSS · 04 박스 모델과 실측 크기

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: Cascade와 크기 계산 · 편집 가능한 예제 · 저장 ID: `css-step-04`

## 목표와 학습 후 역량

- 두 카드의 실제 너비를 기록한다.
- 콘텐츠·padding·border·margin 영역을 도구에서 구분한다.

## 선수 지식

3단위 「상속과 초기화」의 결과물과 실험 기록

## 핵심 개념과 설명

### 크기 합산

content-box에서 width: 200px는 콘텐츠 영역의 너비입니다. padding: 20px는 좌우 각각 20px, border: 2px는 좌우 각각 2px이므로 테두리까지의 너비는 200 + 20 × 2 + 2 × 2 = 244px입니다. padding 20을 전체 합계 20으로 계산하면 224px라는 오답이 나옵니다. 이 강의의 기본 카드에는 margin과 transform이 없고 일반 블록으로 배치되어 있으므로 이 식으로 비교합니다.

### 포함 계산

border-box에서는 지정한 width 200px 안에 콘텐츠·padding·border가 들어갑니다. 같은 padding과 border를 유지하면 콘텐츠 너비는 200 - 20 × 2 - 2 × 2 = 156px입니다. 바깥 테두리 너비는 200px이고 콘텐츠가 줄어 텍스트 줄바꿈이 달라질 수 있습니다. margin은 두 방식 모두 width 밖의 간격이므로 이 200px에 포함되지 않습니다.

### 계산값과 측정값

getBoundingClientRect().width는 화면에 그려진 요소의 테두리 상자 너비를 반환하며 margin은 포함하지 않습니다. 예제의 검사 출력 nodes[].width는 이 값을 Math.round로 반올림합니다. 작은 소수 차이를 조사할 때는 개발자 도구에서 원래 반환값을 확인하세요. transform: scale()을 추가하면 이 측정값도 영향을 받으므로 처음 비교할 때는 transform을 넣지 않습니다.

### 컨테이너와 viewport

예제의 폭 슬라이더는 카드가 들어 있는 컨테이너의 폭만 바꿉니다. 검사 출력의 containerWidth와 viewportWidth는 서로 다른 값입니다. 고정 width 카드의 크기 비교에는 같은 컨테이너 조건을 유지하세요. @media의 width 조건은 Shadow DOM을 포함한 미리보기 iframe 문서의 viewport를 기준으로 평가합니다. 메인 앱 전체 창의 너비나 카드 컨테이너 폭과 같다고 가정하지 마세요. 슬라이더만 움직여 미디어 쿼리를 검증하면 잘못 판단할 수 있습니다. viewport 실험은 브라우저 창이나 개발자 도구의 기기 모드 너비를 바꾼 뒤 출력의 viewportWidth가 실제로 변했는지 확인하며 진행합니다.

### 작은 너비와 넘침

border-box도 모든 콘텐츠를 지정한 너비에 맞춰 주지는 않습니다. width보다 좌우 padding과 border 합이 크면 콘텐츠 너비는 0 아래로 줄지 못합니다. 이 조건에서는 실제 테두리 상자가 지정 width보다 커질 수 있습니다. 긴 단어나 min-width, Flex·Grid의 크기 제약도 별도 원인이 될 수 있으므로 기본 박스 계산 실험과 나눠 확인하세요.

### 미리보기에서 검사하기

HTML과 CSS 입력은 적용 버튼을 눌러야 카드에 반영됩니다. 현재 DOM / 스타일 검사 버튼은 현재 카드의 크기와 계산 스타일을 다시 출력합니다. 예제는 Shadow DOM 안에 카드를 만들고 body, html, :root 선택자를 .doc로 옮깁니다. 바깥 페이지의 CSS나 document.querySelector(".card")로 바로 찾는 방식과 다르므로 실제 요소는 개발자 도구의 shadow-root 안에서 선택하세요.

### 복사해서 비교할 두 카드

강의 예제의 HTML 소스와 CSS 소스에 아래 내용을 각각 넣고 적용을 누르세요. 두 카드를 같은 조건에서 비교하며 margin은 테두리 너비 밖의 간격으로 둡니다.

```html
<div class="card content">content-box</div>
<div class="card border">border-box</div>
```

```css
.card { width: 200px; padding: 20px; border: 2px solid #285ea8; margin: 12px; }
.content { box-sizing: content-box; }
.border { box-sizing: border-box; }
```

## 실습 준비

시작 예제는 HTML 소스와 CSS 소스를 적용해 Shadow DOM에서 미리 봅니다. 적용 버튼으로 소스를 반영하고 현재 DOM / 스타일 검사로 테두리 너비를 읽으세요. 폭 슬라이더는 컨테이너 폭을 바꾸며 미리보기 iframe 문서의 viewport를 바꾸지 않습니다. 별도 로컬 프로젝트에서는 index.html에 두 카드를 만들고 link rel="stylesheet"로 box.css를 연결하세요. 개발자 도구의 Elements와 Computed에서 박스 모델을 확인합니다.

연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.

## 실습 과제

1. 강의 예제의 HTML 소스에 `<div class="card">width 200 + padding 40 + border 4</div>`를 넣고 CSS 소스에 `.card{width:200px;padding:20px;border:2px solid #285ea8;box-sizing:content-box}`를 넣으세요. 적용을 누른 뒤 현재 DOM / 스타일 검사를 누릅니다.
2. 실행 전에 테두리 너비를 200 + 40 + 4 = 244px로 예상해 기록하세요. 검사 출력의 nodes에서 DIV 카드의 width와 boxSizing을 읽으세요. 기대값은 244와 content-box입니다. Windows Chromium 151에서 기본 예제를 측정한 값은 244px였습니다. 자신의 화면에서 읽은 값도 별도 칸에 적으세요.
3. CSS의 content-box만 border-box로 바꾸고 적용, 현재 DOM / 스타일 검사 순서로 누르세요. 예상 테두리 너비는 200px, 콘텐츠 너비는 156px입니다. 기존 Chromium 151 검증에서는 테두리 너비 200px를 실측했습니다. 콘텐츠 156px는 계산 스타일의 width 200px에서 좌우 padding 합 40px와 border 합 4px를 뺀 계산값입니다. 예제 출력은 테두리 너비만 보여 주므로 콘텐츠 영역은 개발자 도구의 박스 모델 그림에서도 확인하세요.
4. 두 카드를 동시에 비교하려면 개념 설명의 「복사해서 비교할 두 카드」에서 HTML과 CSS를 각각 복사한 뒤 적용을 누르세요. 예상 테두리 너비는 각각 244px와 200px입니다. margin 12px는 박스 바깥의 간격이며 이 너비에 합산하지 않습니다. 이 두 카드 변형은 직접 실행해 결과를 기록하세요.
5. Elements에서 shadow-root 안의 .content 카드를 선택하세요. Computed의 박스 모델 그림에서 콘텐츠 200, 좌우 padding 20, 좌우 border 2, 좌우 margin 12를 구분합니다. .border 카드는 콘텐츠 156인지 확인하세요. 콘솔에서 선택한 요소를 뜻하는 $0을 사용해 $0.getBoundingClientRect().width를 실행하면 반올림 전 너비를 읽을 수 있습니다.
6. 컨테이너 폭 슬라이더를 움직이고 현재 DOM / 스타일 검사를 누르세요. containerWidth, viewportWidth, 두 카드 너비를 함께 적으세요. CSS에 고정 width를 유지한 조건에서는 카드의 기대 너비도 유지됩니다. 컨테이너의 max-width 제한 때문에 슬라이더 숫자와 실측 containerWidth가 같지 않을 수 있으므로 출력값을 기록합니다. 이 변형은 기존 브라우저 검증 기록의 측정 범위에 포함되지 않습니다.
7. 경계 실험으로 .border에 width:30px를 추가하고 적용하세요. 좌우 padding과 border 합이 44px이므로 콘텐츠를 음수 너비로 만들 수 없어 테두리 너비는 최소 44px가 될 것으로 예상합니다. 현재 DOM / 스타일 검사와 박스 모델 그림으로 직접 확인하고 width 30을 실제 테두리 너비라고 단정했던 이유가 무엇인지 적으세요. 이 값은 계산에 따른 예상이며 여기서 제공한 기존 측정 기록에는 없습니다.
8. 결과가 다르면 적용 버튼을 눌렀는지, 두 카드 중 어느 카드를 선택했는지, boxSizing이 원하는 값인지부터 확인하세요. 이어 min-width, transform, 추가 padding이 있는지 살펴봅니다. 실험 기록에 CSS 원문 / 계산식 / 예상 너비 / 측정 너비 / 차이의 원인을 남기고 기본 CSS로 복구한 뒤 두 카드의 너비를 다시 확인하세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| box-sizing | content-box | border-box | 실행 전 가설: 바깥 너비가 244px에서 200px로 바뀔 것이다. 다른 조건은 고정하고 실행 후 실제 결과를 따로 기록합니다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 두 카드의 실제 너비를 기록한다.
- [ ] 콘텐츠·padding·border·margin 영역을 도구에서 구분한다.

## 자가 점검

1. margin이 width 안에 포함되나요?
2. 최소 콘텐츠 크기는 계산에 어떤 영향을 주나요?

## 공식 참고

- [MDN box-sizing](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-sizing)
- [MDN 박스 모델](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Box_model)
- [MDN getBoundingClientRect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)
- [MDN 미디어 쿼리 사용](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Using)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/css-step-04/example.js) · [실행 환경과 제한](../../../../../examples.md)

box-sizing을 border-box로 바꿔 실측 너비 244px와 200px를 비교하세요. Shadow DOM에서 문서 body/html 선택자를 범위화합니다. @media는 외부 미리보기 viewport에 반응하며 폭 슬라이더는 컨테이너만 변경합니다. 네트워크·폼 이동·iframe 실행은 제한됩니다.


원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: 상속과 초기화](../03/README.md) · [다음: 단위와 유동 글자 크기](../05/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문

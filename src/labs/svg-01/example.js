// viewBox를 0 0 600 300으로 바꾸어 도형의 화면 크기를 비교하세요.
export function mount({locale='ko', container }) {
  const messages=locale==='en'?{"display001":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 300 150\" width=\"100%\" height=\"100%\" role=\"img\" aria-label=\"SVG vector shapes\"><rect width=\"300\" height=\"150\" fill=\"#edf2f7\"/><path d=\"M20 110 Q150 -30 280 110\" fill=\"none\" stroke=\"#3179bf\" stroke-width=\"4\"/><circle cx=\"150\" cy=\"70\" r=\"24\" fill=\"#e97645\"/><text x=\"20\" y=\"140\" font-size=\"12\">viewBox = 0 0 300 150</text></svg>"}:{"display001":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 300 150\" width=\"100%\" height=\"100%\" role=\"img\" aria-label=\"SVG 벡터 도형\"><rect width=\"300\" height=\"150\" fill=\"#edf2f7\"/><path d=\"M20 110 Q150 -30 280 110\" fill=\"none\" stroke=\"#3179bf\" stroke-width=\"4\"/><circle cx=\"150\" cy=\"70\" r=\"24\" fill=\"#e97645\"/><text x=\"20\" y=\"140\" font-size=\"12\">viewBox = 0 0 300 150</text></svg>"};
  container.innerHTML = `${messages.display001}`
  return () => container.replaceChildren()
}

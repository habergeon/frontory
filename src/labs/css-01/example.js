// minmax의 최소 너비와 gap을 바꾸고 결과 영역 너비를 바꿔 보세요.
export function mount({ container ,locale='ko'}) {
const messages=locale==='en'?{}:{};
  container.innerHTML = `<style>.cards { display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:12px;padding:16px }.card {padding:24px;background:#d8e9f5;border-radius:12px;color:#16324b}.card:nth-child(2){background:#d4eee4}</style><div class="cards"><article class="card">HTML</article><article class="card">CSS</article><article class="card">JavaScript</article></div>`
  return () => container.replaceChildren()
}

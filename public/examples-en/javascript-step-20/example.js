// URL filters and back navigation
// Editable experiment input and algorithm.
export function mount({container,locale='ko'}) {
const messages=locale==='en'?{"title":"URL filters and back navigation","help":"This runs a URLSearchParams encoding round trip. Test the actual address bar and back navigation with popstate on a separate HTTP page.","input":"Experiment JSON input","run":"Run experiment"}:{"title":"URL 필터와 뒤로 가기","help":"URLSearchParams 인코딩 왕복을 실행합니다. 실제 주소 표시줄 및 popstate 뒤로 가기 검증은 별도 HTTP 페이지에서 진행하세요.","input":"실험 JSON 입력","run":"실험 실행"};
const INITIAL={"topic":"한글과 공백","base":"https://example.test/notes?topic=css"};
const controller=new AbortController(),signal=controller.signal;
const timers=[],urls=[];let disposed=false;
const later=(fn,delay)=>{const id=setTimeout(fn,delay);timers.push(id);return id};
const title=document.createElement('h2');title.textContent=messages.title;
const help=document.createElement('p');help.textContent=messages.help;
const editor=document.createElement('textarea');editor.value=JSON.stringify(INITIAL,null,2);editor.rows=10;editor.style.cssText='width:100%;font-family:monospace';editor.setAttribute('aria-label',messages.input);
const button=document.createElement('button');button.textContent=messages.run;
const output=document.createElement('pre');output.style.whiteSpace='pre-wrap';output.setAttribute('aria-live','polite');const stage=document.createElement('section');
const show=value=>{if(!disposed)output.textContent=typeof value==='string'?value:JSON.stringify(value,null,2)};
/** @param {any} input */
async function experiment(input){const url=new URL(input.base);const before=url.href;url.searchParams.set('topic',input.topic);return {before,after:url.href,restored:new URL(url.href).searchParams.get('topic')};}
let generation=0;const run=async()=>{const current=++generation;try{const result=await experiment(JSON.parse(editor.value));if(current===generation)show(result)}catch(error){if(current===generation)show({error:String(error)})}};
button.addEventListener('click',run,{signal});container.append(title,help,editor,button,stage,output);run();
return ()=>{disposed=true;controller.abort();timers.forEach(clearTimeout);urls.forEach(url=>URL.revokeObjectURL(url));container.replaceChildren()};
}

// 파일 가져오기와 구조 검사
// 편집할 실험 입력과 알고리즘입니다.
export function mount({container}) {
const INITIAL=[{"id":1,"title":"valid"},{"id":2,"title":42}];
const controller=new AbortController(),signal=controller.signal;
const timers=[],urls=[];let disposed=false;
const later=(fn,delay)=>{const id=setTimeout(fn,delay);timers.push(id);return id};
const title=document.createElement('h2');title.textContent="파일 가져오기와 구조 검사";
const help=document.createElement('p');help.textContent="문자열 → 숫자 조건으로 입력을 바꿔 실행하세요.";
const editor=document.createElement('textarea');editor.value=JSON.stringify(INITIAL,null,2);editor.rows=10;editor.style.cssText='width:100%;font-family:monospace';editor.setAttribute('aria-label','실험 JSON 입력');
const button=document.createElement('button');button.textContent='실험 실행';
const output=document.createElement('pre');output.style.whiteSpace='pre-wrap';output.setAttribute('aria-live','polite');const stage=document.createElement('section');
const show=value=>{if(!disposed)output.textContent=typeof value==='string'?value:JSON.stringify(value,null,2)};
/** @param {any} input */
async function experiment(input){const validate=notes=>Array.isArray(notes)&&notes.every(n=>n&&typeof n.id==='number'&&typeof n.title==='string');stage.replaceChildren();const file=document.createElement('input');file.type='file';file.accept='.json,application/json';file.onchange=async()=>{try{const text=await file.files?.[0]?.text();if(text)show({accepted:validate(JSON.parse(text))})}catch(error){show({error:String(error)})}};stage.append(file);return {accepted:validate(input),committed:validate(input)?input:[],policy:'전체 배열 통과 시에만 반영'};}
let generation=0;const run=async()=>{const current=++generation;try{const result=await experiment(JSON.parse(editor.value));if(current===generation)show(result)}catch(error){if(current===generation)show({error:String(error)})}};
button.addEventListener('click',run,{signal});container.append(title,help,editor,button,stage,output);run();
return ()=>{disposed=true;controller.abort();timers.forEach(clearTimeout);urls.forEach(url=>URL.revokeObjectURL(url));container.replaceChildren()};
}

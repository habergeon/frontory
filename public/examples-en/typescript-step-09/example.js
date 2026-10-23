// Finding Missing Branches with never
// Editable experiment input and algorithm.
export function mount({container,locale='ko'}) {
const messages=locale==='en'?{"title":"Finding Missing Branches with never","help":"The preview is a JavaScript runtime boundary experiment. It does not run TypeScript diagnostics. Check lesson.ts locally with tsc --strict --noEmit --lib ES2023,DOM.","display003":"Experiment JSON input","display004":"Run experiment","display005":"Idle","display006":"Loading","display007":"Done"}:{"title":"never로 분기 누락 찾기","help":"미리보기는 JavaScript 런타임 경계 실험입니다. TypeScript 진단은 실행하지 않습니다. lesson.ts를 로컬 tsc --strict --noEmit --lib ES2023,DOM 으로 검사하세요.","display003":"실험 JSON 입력","display004":"실험 실행","display005":"대기","display006":"진행","display007":"완료"};
const INITIAL={"status":"cancelled"};
const controller=new AbortController(),signal=controller.signal;
const timers=[],urls=[];let disposed=false;
const later=(fn,delay)=>{const id=setTimeout(fn,delay);timers.push(id);return id};
const title=document.createElement('h2');title.textContent=messages.title;
const help=document.createElement('p');help.textContent=messages.help;
const editor=document.createElement('textarea');editor.value=JSON.stringify(INITIAL,null,2);editor.rows=10;editor.style.cssText='width:100%;font-family:monospace';editor.setAttribute('aria-label',messages.display003);
const button=document.createElement('button');button.textContent=messages.display004;
const output=document.createElement('pre');output.style.whiteSpace='pre-wrap';output.setAttribute('aria-live','polite');const stage=document.createElement('section');
const show=value=>{if(!disposed)output.textContent=typeof value==='string'?value:JSON.stringify(value,null,2)};
/** @param {any} input */
async function experiment(input){switch(input.status){case 'idle':return messages.display005;case 'loading':return messages.display006;case 'done':return messages.display007;default:throw new Error('Unhandled: '+input.status)}}
let generation=0;const run=async()=>{const current=++generation;try{const result=await experiment(JSON.parse(editor.value));if(current===generation)show(result)}catch(error){if(current===generation)show({error:String(error)})}};
button.addEventListener('click',run,{signal});container.append(title,help,editor,button,stage,output);run();
return ()=>{disposed=true;controller.abort();timers.forEach(clearTimeout);urls.forEach(url=>URL.revokeObjectURL(url));container.replaceChildren()};
}

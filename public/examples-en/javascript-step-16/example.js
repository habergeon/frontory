// Parallel tasks and partial failures
// Editable experiment input and algorithm.
export function mount({container,locale='ko'}) {
const messages=locale==='en'?{"title":"Parallel tasks and partial failures","help":"Compare {\"reject\":-1} (no failure) with {\"reject\":1} (second job fails). reject is the failure target index.","input":"Experiment JSON input","run":"Run experiment"}:{"title":"병렬 작업과 부분 실패","help":"{\"reject\":-1}(실패 없음)과 {\"reject\":1}(둘째 작업 실패)을 비교하세요. reject는 실패 대상 인덱스입니다.","input":"실험 JSON 입력","run":"실험 실행"};
const INITIAL={"reject":1};
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
async function experiment(input){const jobs=[40,10,25].map((delay,index)=>new Promise((resolve,reject)=>later(()=>index===input.reject?reject(new Error('failed '+index)):resolve(index),delay)));const settled=await Promise.allSettled(jobs);let all;try{all=await Promise.all(jobs)}catch(error){all=String(error)}return {all,settled:settled.map(r=>r.status==='fulfilled'?r:{status:r.status,reason:String(r.reason)})};}
let generation=0;const run=async()=>{const current=++generation;try{const result=await experiment(JSON.parse(editor.value));if(current===generation)show(result)}catch(error){if(current===generation)show({error:String(error)})}};
button.addEventListener('click',run,{signal});container.append(title,help,editor,button,stage,output);run();
return ()=>{disposed=true;controller.abort();timers.forEach(clearTimeout);urls.forEach(url=>URL.revokeObjectURL(url));container.replaceChildren()};
}

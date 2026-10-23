// 함수와 순수 계산
// 편집할 실험 입력과 알고리즘입니다.
export function mount({container,locale='ko'}) {
const messages=locale==='en'?{"title":"Functions and pure calculations","help":"Change the input from 4 to 0 and run the experiment.","input":"Experiment JSON input","run":"Run experiment"}:{"title":"함수와 순수 계산","help":"4 → 0 조건으로 입력을 바꿔 실행하세요.","input":"실험 JSON 입력","run":"실험 실행"};
const INITIAL=[[0,0],[1,4],[4,4]];
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
async function experiment(input){const score=(done,total)=>total===0?0:done/total*100;return input.map(([done,total])=>({done,total,percent:score(done,total),finite:Number.isFinite(score(done,total))}));}
let generation=0;const run=async()=>{const current=++generation;try{const result=await experiment(JSON.parse(editor.value));if(current===generation)show(result)}catch(error){if(current===generation)show({error:String(error)})}};
button.addEventListener('click',run,{signal});container.append(title,help,editor,button,stage,output);run();
return ()=>{disposed=true;controller.abort();timers.forEach(clearTimeout);urls.forEach(url=>URL.revokeObjectURL(url));container.replaceChildren()};
}

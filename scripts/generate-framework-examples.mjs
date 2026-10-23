import { localizeExampleSource, writeGeneratedFile } from './example-presentation.mjs'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const base=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..')
const fixture="[{id:1,title:'State',done:false},{id:2,title:'Effects',done:false},{id:3,title:'Canvas',done:false}]"
const react={}
react[2]=[
"const original=Object.freeze({title:'Pure card',done:false});const [done,setDone]=React.useState(false);",
"function Card({item}){return h('button',{'aria-pressed':item.done},item.title+(item.done?' ✓':' ○'));}",
"const item={...original,done};return h('div',null,h(Card,{item}),h(Card,{item}),button(messages.display02,()=>setDone(!done)),out({original,rendered:item}));"
]
react[3]=["const [count,setCount]=React.useState(0);return h('div',null,out(count),button('Snapshot +1 three times',()=>{setCount(count+1);setCount(count+1);setCount(count+1);}),button('Updater +1 three times',()=>{setCount(c=>c+1);setCount(c=>c+1);setCount(c=>c+1);}),button('Reset',()=>setCount(0)));"]
react[4]=[
"const [items,setItems]=React.useState(fixture),[audit,setAudit]=React.useState(messages.display02);",
"function toggle(id){const next=items.map(item=>item.id===id?{...item,done:!item.done}:item);setAudit(JSON.stringify(items.map((old,i)=>({id:old.id,sameReference:old===next[i],oldDone:old.done,newDone:next[i].done}))));setItems(next);}",
"return h('div',null,...items.map(item=>button(item.title+': '+item.done,()=>toggle(item.id))),out(audit));"
]
react[5]=["const [query,setQuery]=React.useState('');const matches=fixture.filter(item=>item.title.toLowerCase().includes(query.toLowerCase()));return h('div',null,input(query,setQuery),matches.length>0?h('ul',null,...matches.map(item=>h('li',{key:item.id},item.title))):h('p',{role:'status'},messages.display02),button(messages.display03,()=>setQuery('')));"]
react[6]=[
"const [reverse,setReverse]=React.useState(false),[stable,setStable]=React.useState(true);",
"const Row=React.useMemo(()=>function Row({item}){const [note,setNote]=React.useState('');return h('label',null,item.id+' '+item.title,input(note,setNote));},[]);",
"const items=reverse?[...fixture].reverse():fixture;return h('div',null,button(messages.display02,()=>setReverse(!reverse)),button(messages.display03+(stable?'id':'index'),()=>setStable(!stable)),...items.map((item,i)=>h(Row,{key:stable?item.id:i,item})));"
]
react[7]=["const [title,setTitle]=React.useState(''),[items,setItems]=React.useState(fixture),[error,setError]=React.useState('');return h('form',{onSubmit:event=>{event.preventDefault();if(!title.trim()){setError(messages.display02);return;}setItems([...items,{id:Date.now(),title:title.trim(),done:false}]);setTitle('');setError('');}},input(title,setTitle),h('button',{type:'submit'},messages.display03),h('p',{role:'alert'},error),out(items));"]
react[8]=["const [items,setItems]=React.useState(fixture),[selectedId,setSelectedId]=React.useState(1);const selected=items.find(item=>item.id===selectedId);return h('div',null,...items.map(item=>button(item.title,()=>setSelectedId(item.id))),h('h3',null,messages.display02+selected.title),input(selected.title,title=>setItems(items.map(item=>item.id===selectedId?{...item,title}:item))));"]
react[9]=[
"function reducer(state,action){if(action.type==='select')return {...state,selectedId:action.id};if(action.type==='delete')return {items:state.items.filter(item=>item.id!==action.id),selectedId:state.selectedId===action.id?null:state.selectedId};return state;}",
"const [state,dispatch]=React.useReducer(reducer,{items:fixture,selectedId:1});return h('div',null,out({selectedId:state.selectedId}),...state.items.map(item=>h('div',{key:item.id},button(item.title,()=>dispatch({type:'select',id:item.id})),button(messages.display02+item.id,()=>dispatch({type:'delete',id:item.id})))));"
]
react[10]=[
"const Context=React.useMemo(()=>React.createContext('light'),[]);const [theme,setTheme]=React.useState('light'),[fresh,setFresh]=React.useState(false),[tick,setTick]=React.useState(0);",
"const Consumer=React.useMemo(()=>React.memo(function Consumer(){const value=React.useContext(Context);const renders=React.useRef(0);return out({theme:value,renders:++renders.current});}),[Context]);",
"return h(Context.Provider,{value:fresh?{theme}:theme},button(messages.display02,()=>setTheme(theme==='light'?'dark':'light')),button(messages.display03+(fresh?messages.display04:'string'),()=>setFresh(!fresh)),button(messages.display05+tick,()=>setTick(tick+1)),h(Consumer));"
]
react[11]=["const field=React.useRef(null),clicks=React.useRef(0);const [renders,setRenders]=React.useState(0);return h('div',null,h('input',{ref:field,placeholder:messages.display02}),button(messages.display03,()=>field.current.focus()),button(messages.display04,()=>clicks.current++),button(messages.display05,()=>setRenders(renders+1)),out({refValueAtLastRender:clicks.current,renders}));"]
react[12]=["const [channel,setChannel]=React.useState('A'),[log,setLog]=React.useState([]);React.useEffect(()=>{setLog(old=>[...old,messages.display02+channel]);return ()=>setLog(old=>[...old,messages.display03+channel]);},[channel]);return h('div',null,button(messages.display04+channel,()=>setChannel(channel==='A'?'B':'A')),out(log));"]
react[13]=["const [query,setQuery]=React.useState('A'),[result,setResult]=React.useState(messages.display02),[slow,setSlow]=React.useState(true);React.useEffect(()=>{let ignore=false;const timer=setTimeout(()=>{if(!ignore)setResult(query+messages.display03);},query==='A'&&slow?800:100);return ()=>{ignore=true;clearTimeout(timer);};},[query,slow]);return h('div',null,button(messages.display04,()=>setQuery('A')),button(messages.display05,()=>setQuery('B')),button(messages.display06+(slow?800:100)+'ms',()=>setSlow(!slow)),out({query,result}));"]
react[15]=[
"const [visible,setVisible]=React.useState(true),[audit,setAudit]=React.useState(0);const active=React.useRef(0);",
"const Clock=React.useMemo(()=>{function useTicks(){const [time,setTime]=React.useState(0);React.useEffect(()=>{active.current++;setAudit(active.current);const timer=setInterval(()=>setTime(t=>t+1),500);return ()=>{clearInterval(timer);active.current--;setAudit(active.current);};},[]);return time;}return function Clock(){const ticks=useTicks();return out({ticks});};},[]);",
"return h('div',null,button(messages.display02,()=>setVisible(!visible)),out({activeSubscriptions:audit}),h(Clock),visible&&h(Clock));"
]
react[16]=[
"const key='react-step16-draft';const load=()=>{try{const value=JSON.parse(localStorage.getItem(key)||JSON.stringify(''));return {text:typeof value==='string'?value:'',error:typeof value==='string'?'':messages.display02};}catch{return {text:'',error:messages.display03};}};",
"const [draft,setDraft]=React.useState(load);React.useEffect(()=>{try{localStorage.setItem(key,JSON.stringify(draft.text));}catch{}},[draft.text]);return h('div',null,input(draft.text,text=>setDraft({text,error:''})),out(draft.error),button(messages.display04,()=>{try{localStorage.setItem(key,'{broken');setDraft(load());}catch{setDraft({text:'',error:messages.display05});}}));"
]
react[17]=[
"const [unit,setUnit]=React.useState('A'),[drafts,setDrafts]=React.useState({A:'',B:''}),[keyed,setKeyed]=React.useState(true);",
"const Editor=React.useMemo(()=>function Editor({text,onChange}){const [edits,setEdits]=React.useState(0);return h('div',null,input(text,value=>{setEdits(edits+1);onChange(value);}),out({localEdits:edits}));},[]);",
"return h('div',null,button(messages.display02+unit,()=>setUnit(unit==='A'?'B':'A')),button(messages.display03+(keyed?'unitId':'fixed'),()=>setKeyed(!keyed)),h(Editor,{key:keyed?unit:'fixed',text:drafts[unit],onChange:text=>setDrafts({...drafts,[unit]:text})}),out(drafts));"
]
react[18]=["const [tools,setTools]=React.useState(false),[saved,setSaved]=React.useState(false);function Panel({toolbar,children}){return h('section',null,h('header',null,toolbar),h('article',null,children));}return h('div',null,button(messages.display02,()=>setTools(!tools)),h(Panel,{toolbar:tools?button(messages.display03,()=>setSaved(true)):null},h('p',null,messages.display04)),out({saved}));"]
react[19]=["const [state,setState]=React.useState({status:'idle',data:[]}),[fail,setFail]=React.useState(true);const timer=React.useRef();React.useEffect(()=>()=>clearTimeout(timer.current),[]);function load(){clearTimeout(timer.current);setState({status:'loading',data:[]});timer.current=setTimeout(()=>setState({status:fail?'error':'success',data:fail?[]:fixture}),350);}return h('div',null,button(messages.display02+(fail?messages.display03:'success'),()=>setFail(!fail)),button(messages.display04,load),out(state));"]
react[20]=["const [query,setQuery]=React.useState(''),[defer,setDefer]=React.useState(true);const deferred=React.useDeferredValue(query),used=defer?deferred:query;const results=React.useMemo(()=>Array.from({length:1500},(_,i)=>'Lesson '+i).filter(title=>title.includes(used)),[used]);return h('div',null,input(query,setQuery),button(messages.display02+defer,()=>setDefer(!defer)),out({query,listQuery:used,stale:query!==used,total:results.length}),h('ul',{style:{maxHeight:220,overflow:'auto',opacity:query!==used?.5:1}},...results.map(title=>h('li',{key:title},title))));"]
react[21]=["const [count,setCount]=React.useState(100),[tick,setTick]=React.useState(0);const report=React.useRef(null);return h('div',null,button(messages.display02+count,()=>setCount(count===100?1000:100)),button(messages.display03+tick,()=>setTick(tick+1)),h('pre',{ref:report},messages.display04),h(React.Profiler,{id:'rows',onRender:(_id,phase,duration)=>{if(report.current)report.current.textContent=phase+': '+duration.toFixed(2)+' ms';}},h('ul',{style:{maxHeight:200,overflow:'auto'}},...Array.from({length:count},(_,i)=>h('li',{key:i},messages.display05+i)))));"]
react[22]=["const [memo,setMemo]=React.useState(true),[tick,setTick]=React.useState(0);const Row=React.useMemo(()=>function Row({title}){const renders=React.useRef(0);return h('p',null,title+messages.display02+(++renders.current));},[]);const MemoRow=React.useMemo(()=>React.memo(Row),[Row]);return h('div',null,button(messages.display03+tick,()=>setTick(tick+1)),button(messages.display04+memo,()=>setMemo(!memo)),...fixture.map(item=>h(memo?MemoRow:Row,{key:item.id,title:item.title})));"]
react[23]=["const [size,setSize]=React.useState(50),[page,setPage]=React.useState(0);const total=1000,start=page*size;return h('div',null,button(messages.display02+size,()=>{setSize(size===50?1000:50);setPage(0);}),button(messages.display03,()=>setPage(Math.max(0,page-1))),button(messages.display04,()=>setPage(Math.min(Math.ceil(total/size)-1,page+1))),out({total,visible:Math.min(size,total-start),page:page+1}),h('ul',{style:{maxHeight:220,overflow:'auto'}},...Array.from({length:Math.min(size,total-start)},(_,i)=>h('li',{key:start+i},messages.display05+(start+i)))));"]
react[24]=["const [items,setItems]=React.useState(fixture),[selected,setSelected]=React.useState(null),[log,setLog]=React.useState([]);return h('div',null,out({selected,log}),...items.map(item=>h('div',{key:item.id},button(messages.display02+item.title,()=>{setSelected(item.id);setLog([...log,messages.display03+item.id]);}),button(messages.display04+item.title,()=>{setItems(items.filter(row=>row.id!==item.id));setLog([...log,messages.display05+item.id]);}))));"]
react[25]=["const store=React.useMemo(()=>{let snapshot={text:'Stable snapshot'};const listeners=new Set();return {getSnapshot:()=>snapshot,subscribe:listener=>{listeners.add(listener);return ()=>listeners.delete(listener);},set:text=>{snapshot={text};listeners.forEach(listener=>listener());}};},[]);const value=React.useSyncExternalStore(store.subscribe,store.getSnapshot);const [audit,setAudit]=React.useState('');return h('div',null,input(value.text,store.set),button(messages.display02,()=>setAudit(messages.display03+(store.getSnapshot()===store.getSnapshot()))),out(audit),h('p',null,messages.display04));"]
react[26]=["const [unit,setUnit]=React.useState('A'),[drafts,setDrafts]=React.useState({A:'',B:''}),[report,setReport]=React.useState('');function seed(){setUnit('A');setDrafts({A:'saved A',B:''});setReport(messages.display02);}return h('div',null,button(messages.display03,seed),button(messages.display04+unit,()=>setUnit(unit==='A'?'B':'A')),input(drafts[unit],text=>setDrafts({...drafts,[unit]:text})),button(messages.display05,()=>setReport(drafts.A!==drafts.B?messages.display06:messages.display07)),out({unit,drafts,report}));"]
react[27]=["const [unit,setUnit]=React.useState('A'),[drafts,setDrafts]=React.useState({A:'',B:''}),[audit,setAudit]=React.useState([]);const live=React.useRef(0);React.useEffect(()=>{live.current++;setAudit(old=>[...old,messages.display02+unit+': '+live.current+messages.display03]);const timer=setInterval(()=>{},1000);return ()=>{clearInterval(timer);live.current--;};},[unit]);return h('div',null,button(messages.display04+unit,()=>setUnit(unit==='A'?'B':'A')),input(drafts[unit],text=>setDrafts({...drafts,[unit]:text})),out({drafts,activeResources:live.current,audit}));"]
const reactTitleKeys={"2":"display03","4":"display03","5":"display04","6":"display04","7":"display04","8":"display03","9":"display03","10":"display06","11":"display06","12":"display05","13":"display07","15":"display03","16":"display06","17":"display04","18":"display05","19":"display05","20":"display03","21":"display06","22":"display05","23":"display06","24":"display06","25":"display05","26":"display08","27":"display05"}
function reactSource(unit,body){const pilot=unit.day===3;return [
'// '+unit.title,
'// Executable React createElement equivalent of JSX. Edit the experiment below.',
'/** @param {any} context */',
pilot?"export function mount({React,createRoot,container}){":'export function mount({locale=\'ko\',React,createRoot,container}){',
...(pilot?[]:['/* framework messages */']),'const h=React.createElement;',
"const button=(label,onClick)=>h('button',{type:'button',onClick,style:{margin:4}},label);",
pilot?"const input=(value,onChange)=>h('input',{value,onChange:event=>onChange(event.target.value),'aria-label':'Experiment input'});":"const input=(value,onChange)=>h('input',{value,onChange:event=>onChange(event.target.value),'aria-label':messages.display01});",
"const out=value=>h('pre',null,typeof value==='string'?value:JSON.stringify(value,null,2));",
'const fixture='+fixture+';',
'function Experiment(){',...body,'}',
"const root=createRoot(container);root.render(h('section',{style:{padding:16,color:'#172033',background:'#f6f8fc',minHeight:'100%'}},h('h2',null,"+(pilot?JSON.stringify(unit.title):"messages."+reactTitleKeys[unit.day])+"),h(Experiment)));",
'return ()=>root.unmount();','}',''
].join('\n')}
const vue={}
vue[2]=["const disabled=Vue.ref(false);return ()=>[button(messages.display02,()=>disabled.value=!disabled.value),h('button',{disabled:disabled.value,onClick:()=>message.value=messages.display03},messages.display04),out({disabled:disabled.value,message:message.value})];"]
vue[3]=["const state=Vue.reactive({title:'State'});const detached=state.title;const {title}=Vue.toRefs(state);return ()=>[input(state.title,v=>state.title=v),out({detached,linked:title.value})];"]
vue[4]=["const query=Vue.ref(''),theme=Vue.ref('light');let evaluations=0;const matches=Vue.computed(()=>{evaluations++;return fixture.filter(item=>item.title.includes(query.value));});return ()=>[input(query.value,v=>query.value=v),button(messages.display02+theme.value,()=>theme.value=theme.value==='light'?'dark':'light'),out({matches:matches.value,evaluations,theme:theme.value})];"]
vue[5]=["const visible=Vue.ref(true),remove=Vue.ref(false);const Row={setup(){const note=Vue.ref('');return ()=>input(note.value,v=>note.value=v);}};return ()=>[button(messages.display02+visible.value,()=>visible.value=!visible.value),button(messages.display03+(remove.value?'v-if':'v-show'),()=>remove.value=!remove.value),remove.value?(visible.value?h(Row):null):h('div',{style:{display:visible.value?'block':'none'}},[h(Row)])];"]
vue[6]=["const raw=Vue.ref('3');const value=Vue.computed(()=>raw.value.trim()===''?null:Number(raw.value));return ()=>[h('input',{type:'number',value:raw.value,onInput:event=>raw.value=event.target.value,'aria-label':messages.display02}),out({raw:raw.value,number:value.value,valid:value.value!==null&&Number.isFinite(value.value)})];"]
vue[7]=["const done=Vue.ref(false),selected=Vue.ref(false);return ()=>[button(messages.display02,()=>done.value=!done.value),button(messages.display03,()=>selected.value=!selected.value),h('button',{'aria-pressed':selected.value,style:{border:selected.value?'3px solid #2563eb':'3px solid transparent',textDecoration:done.value?'line-through':'none'}},messages.display04+(done.value?messages.display05:messages.display06))];"]
vue[8]=["const title=Vue.ref('State');const Card={props:{title:{type:String,default:'Untitled'}},setup:props=>()=>h('p',messages.display02+props.title)};return ()=>[input(title.value,v=>title.value=v),h(Card,{title:title.value})];"]
vue[9]=["const items=Vue.ref(fixture);const Card={props:['item'],emits:['toggle'],setup:(props,{emit})=>()=>button(props.item.title+': '+props.item.done,()=>emit('toggle',props.item.id))};return ()=>[button(messages.display02,()=>items.value=[...items.value].reverse()),...items.value.map(item=>h(Card,{key:item.id,item,onToggle:id=>items.value=items.value.map(row=>row.id===id?{...row,done:!row.done}:row)}))];"]
vue[10]=["const draft=Vue.ref('Shared draft');const Editor={props:['modelValue'],emits:['update:modelValue'],setup:(props,{emit})=>()=>input(props.modelValue,value=>emit('update:modelValue',value))};return ()=>[h(Editor,{modelValue:draft.value,'onUpdate:modelValue':value=>draft.value=value}),h(Editor,{modelValue:draft.value,'onUpdate:modelValue':value=>draft.value=value}),out(draft.value)];"]
vue[11]=["const detail=Vue.ref(false);const List={props:['items'],setup:(props,{slots})=>()=>h('ul',props.items.map(item=>h('li',{key:item.id},slots.item?slots.item({item}):item.title)))};return ()=>[button(messages.display02+detail.value,()=>detail.value=!detail.value),h(List,{items:fixture},{item:({item})=>detail.value?item.title+messages.display03+item.id:item.title})];"]
vue[12]=["const filters=Vue.reactive({query:'',theme:'light'}),broad=Vue.ref(false),logs=Vue.ref([]);Vue.watch(()=>broad.value?JSON.stringify(filters):filters.query,value=>logs.value.push(messages.display02+value));return ()=>[input(filters.query,v=>filters.query=v),button(messages.display03,()=>filters.theme=filters.theme==='light'?'dark':'light'),button(messages.display04+(broad.value?messages.display05:'query'),()=>broad.value=!broad.value),out(logs.value)];"]
vue[13]=["const query=Vue.ref('A'),result=Vue.ref(messages.display02),slow=Vue.ref(true);Vue.watch([query,slow],([id,delay],_old,onCleanup)=>{const timer=setTimeout(()=>result.value=id+messages.display03,id==='A'&&delay?800:100);onCleanup(()=>clearTimeout(timer));},{immediate:true});return ()=>[button(messages.display04,()=>query.value='A'),button(messages.display05,()=>query.value='B'),button(messages.display06+slow.value,()=>slow.value=!slow.value),out({requested:query.value,result:result.value})];"]
vue[15]=["const shown=Vue.ref(false),field=Vue.ref(null);async function reveal(){shown.value=true;await Vue.nextTick();field.value?.focus();}return ()=>[button(messages.display02,reveal),button(messages.display03,()=>shown.value=false),shown.value?h('textarea',{ref:field,'aria-label':messages.display04}):null];"]
vue[16]=["const second=Vue.ref(true),active=Vue.ref(0);function usePointer(){const point=Vue.ref(messages.display02);const handler=e=>point.value=e.clientX+', '+e.clientY;Vue.onMounted(()=>{window.addEventListener('pointermove',handler);active.value++;});Vue.onUnmounted(()=>{window.removeEventListener('pointermove',handler);active.value--;});return point;}const Consumer={setup(){const point=usePointer();return ()=>out(point.value);}};return ()=>[button(messages.display03,()=>second.value=!second.value),out({activeListeners:active.value}),h(Consumer),second.value?h(Consumer):null];"]
vue[17]=["const key=Symbol('workspace');const Consumer={setup(){const workspace=Vue.inject(key);return ()=>input(workspace.value,v=>workspace.value=v);}};const Inner={setup(){Vue.provide(key,Vue.ref('Nested workspace'));return ()=>h(Consumer);}};const root=Vue.ref('Outer workspace');Vue.provide(key,root);return ()=>[h('p',messages.display02),h(Consumer),h('p',messages.display03),h(Inner),out(root.value)];"]
vue[18]=["const createWorkspace=()=>Vue.reactive({draft:''});const shared=createWorkspace(),isolated=Vue.ref(true),first=createWorkspace(),second=createWorkspace();return ()=>{const a=isolated.value?first:shared,b=isolated.value?second:shared;return [button(messages.display02+isolated.value,()=>isolated.value=!isolated.value),input(a.draft,v=>a.draft=v),input(b.draft,v=>b.draft=v),out({A:a.draft,B:b.draft})];};"]
vue[19]=["const raw=Vue.ref(JSON.stringify({A:'Saved draft'})),drafts=Vue.ref({});function restore(){try{const value=JSON.parse(raw.value);if(!value||typeof value!=='object'||Object.values(value).some(v=>typeof v!=='string'))throw Error('Expected draft map');drafts.value=value;message.value=messages.display02;}catch(error){drafts.value={};message.value=error.message;}}return ()=>[input(raw.value,v=>raw.value=v),button(messages.display03,restore),button(messages.display04,()=>raw.value='{broken'),out({drafts:drafts.value,message:message.value})];"]
vue[20]=["const fail=Vue.ref(false),show=Vue.ref(false);let timer;Vue.onUnmounted(()=>clearTimeout(timer));const Async=Vue.defineAsyncComponent({loader:()=>new Promise((resolve,reject)=>{timer=setTimeout(()=>fail.value?reject(Error('Module unavailable')):resolve({render:()=>h('p',messages.display02)}),700);}),delay:0,loadingComponent:{render:()=>h('p',messages.display03)},errorComponent:{render:()=>h('p',{role:'alert'},messages.display04)},onError(_error,_retry,failLoad){failLoad();}});return ()=>[button(messages.display05+fail.value,()=>fail.value=!fail.value),button(messages.display06,()=>show.value=true),show.value?h(Async):null];"]
vue[21]=["const visible=Vue.ref(true),cache=Vue.ref(true);const Pane={setup(){const note=Vue.ref(''),ticks=Vue.ref(0);let timer;const start=()=>{clearInterval(timer);timer=setInterval(()=>ticks.value++,500);};const stop=()=>clearInterval(timer);Vue.onMounted(start);Vue.onActivated(start);Vue.onDeactivated(stop);Vue.onUnmounted(stop);return ()=>h('div',[input(note.value,v=>note.value=v),out({ticks:ticks.value})]);}};return ()=>[button(messages.display02+visible.value,()=>visible.value=!visible.value),button(messages.display03+cache.value,()=>cache.value=!cache.value),cache.value?h(Vue.KeepAlive,null,{default:()=>visible.value?h(Pane):null}):(visible.value?h(Pane):null)];"]
vue[22]=["const shown=Vue.ref(true),active=Vue.ref(0);const Scene={setup(){const canvas=Vue.ref(null);let frame;Vue.onMounted(()=>{active.value++;const ctx=canvas.value.getContext('2d');const draw=time=>{ctx.clearRect(0,0,300,140);ctx.fillRect(140+70*Math.sin(time/1000),50,20,20);frame=requestAnimationFrame(draw);};frame=requestAnimationFrame(draw);});Vue.onUnmounted(()=>{cancelAnimationFrame(frame);active.value--;});return ()=>h('canvas',{ref:canvas,width:300,height:140});}};return ()=>[button(messages.display02,()=>shown.value=!shown.value),out({activeLoops:active.value}),shown.value?h(Scene):null];"]
vue[23]=["const speed=Vue.ref(1),canvas=Vue.ref(null);let angle=0,last=0,frame;Vue.onMounted(()=>{const ctx=canvas.value.getContext('2d');const draw=time=>{if(last)angle+=(time-last)/1000*speed.value;last=time;ctx.clearRect(0,0,300,180);ctx.save();ctx.translate(150,90);ctx.rotate(angle);ctx.fillRect(-40,-10,80,20);ctx.restore();frame=requestAnimationFrame(draw);};frame=requestAnimationFrame(draw);});Vue.onUnmounted(()=>cancelAnimationFrame(frame));return ()=>[button(messages.display02+speed.value,()=>speed.value=speed.value===1?2:1),h('canvas',{ref:canvas,width:300,height:180})];"]
vue[24]=["const external=Vue.shallowRef({position:{x:0}});const displayed=Vue.computed(()=>external.value.position.x);return ()=>[button(messages.display02,()=>external.value.position.x++),button(messages.display03,()=>Vue.triggerRef(external)),button(messages.display04,()=>external.value={position:{x:external.value.position.x+1}}),out({observed:displayed.value,proxy:Vue.isProxy(external.value)})];"]
vue[25]=["const selected=Vue.ref(1),stable=Vue.ref(true);const Row={props:['item','selected','selectedId'],setup:props=>{let renders=0;return ()=>h('p',(props.selected||props.selectedId===props.item.id?'● ':'○ ')+props.item.title+messages.display02+(++renders));}};return ()=>[button(messages.display03,()=>selected.value=selected.value%3+1),button(messages.display04+stable.value,()=>stable.value=!stable.value),...fixture.map(item=>h(Row,{key:item.id,item,...(stable.value?{selected:selected.value===item.id}:{selectedId:selected.value})}))];"]
vue[26]=["const unit=Vue.ref('A'),drafts=Vue.reactive({A:'',B:''}),saved=Vue.reactive({A:'',B:''}),delay=Vue.ref(600);const timers=new Map();Vue.watch(()=>[unit.value,drafts[unit.value]],([id,text])=>{clearTimeout(timers.get(id));timers.set(id,setTimeout(()=>saved[id]=text,delay.value));});Vue.onUnmounted(()=>timers.forEach(clearTimeout));return ()=>[button(messages.display02+unit.value,()=>unit.value=unit.value==='A'?'B':'A'),input(drafts[unit.value],v=>drafts[unit.value]=v),button(messages.display03+delay.value,()=>delay.value=delay.value===600?100:600),out({drafts,saved})];"]
vue[27]=["const unit=Vue.ref('A'),drafts=Vue.reactive({A:'',B:''}),live=Vue.ref(0),audit=Vue.ref([]);Vue.watch(unit,(id,_old,onCleanup)=>{live.value++;audit.value.push(messages.display02+id+messages.display03+live.value);const timer=setInterval(()=>{},1000);onCleanup(()=>{clearInterval(timer);live.value--;});},{immediate:true});return ()=>[button(messages.display04+unit.value,()=>unit.value=unit.value==='A'?'B':'A'),input(drafts[unit.value],v=>drafts[unit.value]=v),out({drafts,active:live.value,audit:audit.value})];"]
function vueSource(unit,body){return [
'// '+unit.title,'// Real Vue render functions; templates and SFCs require a compiler.','/** @param {any} context */',
'export function mount({locale=\'ko\',Vue,container}){','/* framework messages */','const h=Vue.h;',
"const button=(label,onClick)=>h('button',{type:'button',onClick,style:{margin:'4px'}},label);",
"const input=(value,change)=>h('input',{value,onInput:event=>change(event.target.value),'aria-label':messages.display01});",
"const out=value=>h('pre',JSON.stringify(value,null,2));",'const fixture='+fixture+';',
"const app=Vue.createApp({setup(){const message=Vue.ref('');",...body,'}});',
'app.mount(container);return ()=>app.unmount();','}',''
].join('\n')}
// Each Svelte lesson includes genuine compiler input, plus an explicitly labelled DOM/store harness.
const svelte={}
svelte[2]=[
"const title=writable('Card title');const output=el('p');cleanups.push(title.subscribe(value=>output.textContent=value));field('Title','Card title',value=>title.set(value));control('HTML-looking string',()=>title.set('<img src=x onerror=alert(1)>'));",
"let title=$state('Card title');",
'<input aria-label="Title" bind:value={title}/><p>{title}</p><button onclick={()=>title="<b>plain text</b>"}>HTML-looking text</button>'
]
svelte[3]=[
"const state=writable({done:false});const detached=false;cleanups.push(state.subscribe(value=>show({detached,derived:value.done})));control('Toggle done',()=>state.update(value=>({...value,done:!value.done})));",
"let card=$state({done:false});const detached=card.done;let linked=$derived(card.done);",
'<button onclick={()=>card.done=!card.done}>Toggle</button><p>Detached {String(detached)} / derived {String(linked)}</p>'
]
svelte[4]=[
"const items=['State','Effects','Canvas'];field('Query','',value=>show({matches:items.filter(item=>item.toLowerCase().includes(value.toLowerCase())),original:items}));show(items);",
"let query=$state('');let items=$state(['State','Effects','Canvas']);let matches=$derived(items.filter(item=>item.toLowerCase().includes(query.toLowerCase())));",
'<input aria-label="Query" bind:value={query}/>{#each matches as title (title)}<p>{title}</p>{/each}'
]
svelte[5]=[
"const list=el('div');function render(q){list.replaceChildren();const matches=['State','Effects','Canvas'].filter(v=>v.includes(q));if(matches.length)matches.forEach(v=>{const p=document.createElement('p');p.textContent=v;list.append(p);});else list.textContent='No matches. Reset query to restore.';}const query=field('Query','',render);control('Reset',()=>{query.value='';render('');});render('');",
"let query=$state('');const items=['State','Effects','Canvas'];let matches=$derived(items.filter(v=>v.includes(query)));",
'<input aria-label="Query" bind:value={query}/>{#if matches.length}{#each matches as title}<p>{title}</p>{/each}{:else}<p>No matches</p><button onclick={()=>query=""}>Reset</button>{/if}'
]
svelte[6]=[
"const list=el('div');let ids=[1,2,3];const rows=new Map(ids.map(id=>{const row=document.createElement('label');row.textContent='Card '+id;const input=document.createElement('input');input.setAttribute('aria-label','Memo '+id);row.append(input);return [id,row];}));function render(){ids.forEach(id=>list.append(rows.get(id)));}control('Reverse keyed DOM nodes',()=>{ids.reverse();render();});render();",
"let items=$state([{id:1,note:''},{id:2,note:''},{id:3,note:''}]);",
'<button onclick={()=>items=[...items].reverse()}>Reverse</button>{#each items as item (item.id)}<label>Card {item.id}<input bind:value={item.note}/></label>{/each}'
]
svelte[7]=[
"let title='';const items=[];const input=field('Title','',v=>title=v);control('Submit',()=>{if(!title.trim()){show('Rejected: blank title');return;}items.push(title.trim());title='';input.value='';show(items);});",
"let title=$state(''),items=$state([]),error=$state('');function submit(e){e.preventDefault();if(!title.trim()){error='Title required';return;}items.push(title.trim());title='';error='';}",
'<form onsubmit={submit}><input aria-label="Title" bind:value={title}/><button>Add</button><p>{error}</p></form>{#each items as item}<p>{item}</p>{/each}'
]
svelte[8]=[
"let items=[{id:1,title:'State',done:false},{id:2,title:'Canvas',done:false}];const list=el('div');function toggle(id){items=items.map(v=>v.id===id?{...v,done:!v.done}:v);render();}function render(){list.replaceChildren();items.forEach(item=>{const b=document.createElement('button');b.textContent=item.id+' '+item.title+': '+item.done;b.onclick=()=>toggle(item.id);list.append(b);});}control('Reverse',()=>{items.reverse();render();});render();",
"let {item={id:1,title:'State',done:false},ontoggle=(id)=>console.log(id)}=$props();",
'<button onclick={()=>ontoggle(item.id)}>{item.title}: {String(item.done)}</button>'
]
svelte[9]=[
"const draft=writable('Shared draft');const a=field('Editor A','',v=>draft.set(v)),b=field('Editor B','',v=>draft.set(v));cleanups.push(draft.subscribe(value=>{a.value=value;b.value=value;show({parentDraft:value});}));",
"let {value=$bindable('Shared draft')}=$props();",
'<input aria-label="Bindable editor" bind:value/><p>{value}</p>'
]
svelte[10]=[
"let detailed=false;function render(){show([{id:1,title:'State'},{id:2,title:'Canvas'}].map(v=>detailed?v.title+' / id '+v.id:v.title));}control('Toggle compact/detailed',()=>{detailed=!detailed;render();});render();",
"let detailed=$state(false);const items=[{id:1,title:'State'},{id:2,title:'Canvas'}];",
'{#snippet row(item)}<p>{item.title}{#if detailed} / id {item.id}{/if}</p>{/snippet}<button onclick={()=>detailed=!detailed}>Detail</button>{#each items as item (item.id)}{@render row(item)}{/each}'
]
svelte[11]=[
"const host=el('div');control('Create then focus (DOM harness)',()=>{host.replaceChildren();const input=document.createElement('textarea');input.setAttribute('aria-label','New editor');host.append(input);queueMicrotask(()=>{if(input.isConnected)input.focus();});});",
"import {tick} from 'svelte';let visible=$state(false),editor;async function reveal(){visible=true;await tick();editor?.focus();}",
'<button onclick={reveal}>Show then focus</button>{#if visible}<textarea aria-label="Editor" bind:this={editor}></textarea>{/if}'
]
svelte[12]=[
"let period=100,ticks=0,timer;function restart(){clearInterval(timer);timer=setInterval(()=>show({period,ticks:++ticks,activeTimers:1}),period);}control('Period 100 / 500ms',()=>{period=period===100?500:100;restart();});restart();cleanups.push(()=>clearInterval(timer));",
"let period=$state(100),ticks=$state(0);$effect(()=>{const timer=setInterval(()=>ticks++,period);return ()=>clearInterval(timer);});",
'<button onclick={()=>period=period===100?500:100}>Period {period}ms</button><p>Ticks {ticks}</p>'
]
svelte[13]=[
"let enabled=false,events=0;const handler=()=>show({events:++events,activeListeners:1});function toggle(){enabled=!enabled;window.removeEventListener('pointermove',handler);if(enabled)window.addEventListener('pointermove',handler);show({events,activeListeners:enabled?1:0});}control('Mount / unmount pointer listener',toggle);cleanups.push(()=>window.removeEventListener('pointermove',handler));toggle();",
"import {onMount} from 'svelte';let moves=$state(0);onMount(()=>{const handler=()=>moves++;window.addEventListener('pointermove',handler);return ()=>window.removeEventListener('pointermove',handler);});",
'<p>Pointer events {moves}; unmount this component to remove the listener.</p>'
]
svelte[15]=[
"const store=writable('Store value');let unsub=null;field('Store','Store value',v=>store.set(v));control('Subscribe',()=>{if(!unsub)unsub=store.subscribe(value=>show({subscribed:true,value}));});control('Unsubscribe',()=>{unsub?.();unsub=null;show('Unsubscribed: edits no longer update output');});cleanups.push(()=>unsub?.());",
"import {writable} from 'svelte/store';const title=writable('Store value');",
'<input aria-label="Store value" bind:value={$title}/><p>Auto-subscription: {$title}</p>'
]
svelte[16]=[
"function createWorkspace(){return writable({draft:''});}const a=createWorkspace(),b=createWorkspace();field('Workspace A','',draft=>a.set({draft}));field('Workspace B','',draft=>b.set({draft}));let state={A:'',B:''};cleanups.push(a.subscribe(v=>{state.A=v.draft;show(state);}),b.subscribe(v=>{state.B=v.draft;show(state);}));",
"import {createWorkspace} from './workspace.svelte.js';const a=createWorkspace(),b=createWorkspace();",
'<label>A <input bind:value={a.draft}/></label><label>B <input bind:value={b.draft}/></label>'
]
svelte[17]=[
"const contexts=[{draft:'Outer'},{draft:'Inner'}];field('Outer provider',contexts[0].draft,v=>{contexts[0].draft=v;show(contexts);});field('Nearest inner provider',contexts[1].draft,v=>{contexts[1].draft=v;show(contexts);});show(contexts);",
"import {setContext} from 'svelte';import Consumer from './Consumer.svelte';let workspace=$state({draft:'Provider draft'});setContext('workspace',workspace);",
'<Consumer/><p>Provider: {workspace.draft}</p>'
]
svelte[18]=[
"let timer;function request(id){clearTimeout(timer);show({pending:id});timer=setTimeout(()=>show({result:id}),id==='A'?800:100);}control('Request slow A',()=>request('A'));control('Request fast B',()=>request('B'));cleanups.push(()=>clearTimeout(timer));request('A');",
"let query=$state('A'),result=$state('Waiting');$effect(()=>{const id=query;let ignore=false;const timer=setTimeout(()=>{if(!ignore)result=id;},id==='A'?800:100);return ()=>{ignore=true;clearTimeout(timer);};});",
'<button onclick={()=>query="A"}>Slow A</button><button onclick={()=>query="B"}>Fast B</button><p>{result}</p>'
]
svelte[19]=[
"let timer;function request(fail){clearTimeout(timer);show('Loading');timer=setTimeout(()=>show(fail?{error:'Request failed; retry available'}:{items:['State','Canvas']}),400);}control('Fail request',()=>request(true));control('Retry success',()=>request(false));cleanups.push(()=>clearTimeout(timer));request(false);",
"import {onDestroy} from 'svelte';let timer;function request(fail){clearTimeout(timer);return new Promise((resolve,reject)=>{timer=setTimeout(()=>fail?reject(Error('Request failed')):resolve(['State','Canvas']),400);});}let promise=$state(request(false));onDestroy(()=>clearTimeout(timer));",
'<button onclick={()=>promise=request(true)}>Fail</button><button onclick={()=>promise=request(false)}>Retry</button>{#await promise}<p>Loading</p>{:then items}{#each items as item}<p>{item}</p>{/each}{:catch error}<p role="alert">{error.message}</p>{/await}'
]
svelte[20]=[
"let raw=JSON.stringify({A:'Saved draft'});field('Serialized draft',raw,v=>raw=v);control('Restore',()=>{try{const data=JSON.parse(raw);if(typeof data.A!=='string')throw Error('Expected string A');show(data);}catch{show({A:'',error:'Invalid storage; recovered empty draft'});}});",
"let raw=$state(JSON.stringify({A:'Saved draft'})),draft=$state(''),error=$state('');function restore(){try{const data=JSON.parse(raw);if(typeof data.A!=='string')throw Error('Expected string');draft=data.A;error='';}catch{draft='';error='Invalid storage';}}",
'<input aria-label="Serialized data" bind:value={raw}/><button onclick={restore}>Restore</button><textarea aria-label="Draft" bind:value={draft}></textarea><p>{error}</p>'
]
svelte[21]=[
"let unit='A',edits=0;const drafts={A:'',B:''};const input=field('Draft','',value=>{drafts[unit]=value;edits++;show({unit,drafts,localEdits:edits});});control('Switch unit and recreate local state',()=>{unit=unit==='A'?'B':'A';edits=0;input.value=drafts[unit];show({unit,drafts,localEdits:edits});});",
"import Editor from './Editor.svelte';let unit=$state('A'),drafts=$state({A:'',B:''});",
'<button onclick={()=>unit=unit==="A"?"B":"A"}>Unit {unit}</button>{#key unit}<Editor bind:value={drafts[unit]}/>{/key}<pre>{JSON.stringify(drafts)}</pre>'
]
svelte[22]=[
"const canvas=el('canvas');canvas.width=300;canvas.height=180;const ctx=canvas.getContext('2d');let speed=1,last=0,angle=0,frame;control('Speed 1 / 2',()=>{speed=speed===1?2:1;show({speed});});function draw(time){if(last)angle+=(time-last)/1000*speed;last=time;ctx.clearRect(0,0,300,180);ctx.save();ctx.translate(150,90);ctx.rotate(angle);ctx.fillRect(-40,-10,80,20);ctx.restore();frame=requestAnimationFrame(draw);}frame=requestAnimationFrame(draw);cleanups.push(()=>cancelAnimationFrame(frame));",
"import {onMount} from 'svelte';let canvas,speed=$state(1);onMount(()=>{const ctx=canvas.getContext('2d');let frame,last=0,angle=0;function draw(time){if(last)angle+=(time-last)/1000*speed;last=time;ctx.clearRect(0,0,300,180);ctx.save();ctx.translate(150,90);ctx.rotate(angle);ctx.fillRect(-40,-10,80,20);ctx.restore();frame=requestAnimationFrame(draw);}frame=requestAnimationFrame(draw);return ()=>cancelAnimationFrame(frame);});",
'<button onclick={()=>speed=speed===1?2:1}>Speed {speed}</button><canvas bind:this={canvas} width="300" height="180"></canvas>'
]
svelte[23]=[
"let selected=false;const b=control('Select card with mouse, Space, or Enter',()=>{selected=!selected;b.setAttribute('aria-pressed',String(selected));b.style.background=selected?'#9bdfff':'';show({selected});});b.setAttribute('aria-pressed','false');",
"let selected=$state(false);",
'<button class:selected aria-pressed={selected} onclick={()=>selected=!selected}>Select card</button><style>button{padding:1rem}.selected{background:#9bdfff}button:focus-visible{outline:3px solid #174fc7}</style>'
]
svelte[24]=[
"const panel=el('p');panel.textContent='Persistent draft panel';let duration=300,visible=true;control('Duration 300 / 0ms',()=>{duration=duration?0:300;show({duration});});control('Toggle transition',()=>{visible=!visible;panel.style.transition='opacity '+duration+'ms';panel.style.opacity=visible?'1':'0';});field('Preserved draft','',value=>show({draft:value,duration}));",
"import {fade} from 'svelte/transition';let visible=$state(true),duration=$state(300),draft=$state('');",
'<button onclick={()=>duration=duration?0:300}>Duration {duration}</button><button onclick={()=>visible=!visible}>Toggle</button><input aria-label="Draft" bind:value={draft}/>{#if visible}<p transition:fade={{duration}}>Draft {draft}</p>{/if}'
]
svelte[25]=[
"const list=el('div');let count=100;function measure(){const start=performance.now();const fragment=document.createDocumentFragment();for(let i=0;i<count;i++){const p=document.createElement('p');p.textContent='Card '+i;fragment.append(p);}list.replaceChildren(fragment);show({count,domBuildMs:performance.now()-start,note:'DOM harness timing, not compiled Svelte timing'});}control('100 / 1000 cards',()=>{count=count===100?1000:100;measure();});measure();",
"import {tick} from 'svelte';let count=$state(100),elapsed=$state(0);let rows=$derived(Array.from({length:count},(_,id)=>id));async function measure(){const start=performance.now();count=count===100?1000:100;await tick();elapsed=performance.now()-start;}",
'<button onclick={measure}>100 / 1000 rows</button><p>Update to tick: {elapsed.toFixed(2)} ms</p>{#each rows as id (id)}<p>Card {id}</p>{/each}'
]
svelte[26]=[
"const drafts={A:'',B:''};let unit='A';const input=field('Draft','',v=>{drafts[unit]=v;show({unit,drafts});});control('Seed fixture',()=>{drafts.A='Saved A';drafts.B='';unit='A';input.value=drafts.A;show(drafts);});control('Switch',()=>{unit=unit==='A'?'B':'A';input.value=drafts[unit];show({unit,drafts});});control('Check isolation',()=>show({pass:drafts.A!==drafts.B,drafts}));",
"let unit=$state('A'),drafts=$state({A:'',B:''});function seed(){unit='A';drafts={A:'Saved A',B:''};}",
'<button onclick={seed}>Seed</button><button onclick={()=>unit=unit==="A"?"B":"A"}>Switch {unit}</button><input aria-label="Draft" bind:value={drafts[unit]}/><pre>{JSON.stringify(drafts)}</pre>'
]
svelte[27]=[
"const fixture=[{id:1,title:'State',done:false},{id:2,title:'Canvas',done:false}];const store=writable(fixture);cleanups.push(store.subscribe(items=>show({total:items.length,done:items.filter(v=>v.done).length,items})));fixture.forEach(item=>control('Toggle id '+item.id,()=>store.update(items=>items.map(v=>v.id===item.id?{...v,done:!v.done}:v))));",
"let items=$state([{id:1,title:'State',done:false},{id:2,title:'Canvas',done:false}]);let done=$derived(items.filter(v=>v.done).length);",
'<p>Total {items.length}; done {done}</p>{#each items as item (item.id)}<button aria-pressed={item.done} onclick={()=>item.done=!item.done}>{item.title}</button>{/each}'
]
function svelteSource(unit,body){return [
'// '+unit.title,'// Browser: real Svelte writable + DOM harness, NOT compiled Svelte components.',
'// Open App.svelte in a Svelte 5 project to execute runes, snippets, bindings, and transitions.',
'/** @param {any} context */','export function mount({writable,container}){',
'const cleanups=[];',
"/** @returns {any} */ function el(tag){const node=document.createElement(tag);container.append(node);return node;}",
"el('h2').textContent="+JSON.stringify(unit.title)+";",
"el('p').textContent='DOM/store harness — App.svelte is the actual compiler experiment.';",
"const report=el('pre');const show=value=>report.textContent=JSON.stringify(value,null,2);",
"function control(label,handler){const b=el('button');b.textContent=label;b.type='button';b.onclick=handler;return b;}",
"function field(label,value,change){const node=el('input');node.setAttribute('aria-label',label);node.placeholder=label;node.value=value;node.oninput=()=>change(node.value);return node;}",
body,
'return ()=>{cleanups.reverse().forEach(dispose=>dispose());container.replaceChildren();};','}',''
].join('\n')}
const fiber={}
fiber[2]=["const camera=Fiber.useThree(s=>s.camera);React.useEffect(()=>{camera.fov=a?75:50;camera.updateProjectionMatrix();},[a,camera]);return box();","FOV 50 / 75"]
fiber[3]=["const ref=React.useRef();React.useEffect(()=>report({geometryUUID:ref.current.geometry.uuid,argsMode:a,size:b?1.5:1}),[a,b]);return h('mesh',{ref,scale:a?1:(b?1.5:1)},h('boxGeometry',{args:a?[b?1.5:1,1,1]:[1,1,1]}),h('meshNormalMaterial'));","Scale / geometry args","Size 1 / 1.5"]
fiber[4]=["const ref=React.useRef();React.useEffect(()=>{ref.current.updateWorldMatrix(true,false);report({local:ref.current.position.toArray(),world:ref.current.getWorldPosition(new THREE.Vector3()).toArray()});},[a]);return h('group',{rotation:[0,0,a?Math.PI/2:0]},box({ref,position:[1.5,0,0]}));","Parent rotation 0 / PI/2"]
fiber[5]=["return h(React.Fragment,null,h('directionalLight',{position:[2,3,4],intensity:a?3:0}),h('mesh',{position:[-1,0,0]},h('sphereGeometry'),h('meshStandardMaterial',{color:'#ef9545',roughness:.45})),h('mesh',{position:[1,0,0]},h('sphereGeometry'),h('meshBasicMaterial',{color:'#ef9545'})));","Light 0 / 3"]
fiber[6]=["const ref=React.useRef();Fiber.useFrame((_,delta)=>{ref.current.rotation.y+=delta;});React.useEffect(()=>report({uuid:ref.current.uuid,propsRotationEnabled:a}),[a,b]);return box({ref,...(a?{rotation:[0,b?1:0,0]}:{})});","Ref only / prop rotation","Prop rotation 0 / 1"]
fiber[7]=["const ref=React.useRef(),angle=React.useRef(0);Fiber.useFrame((_,delta)=>{angle.current+=delta*(a?2:1);ref.current.rotation.y=angle.current;report({speed:a?2:1,angle:angle.current.toFixed(2)});});return box({ref});","Speed 1 / 2 rad/s"]
fiber[8]=["const size=Fiber.useThree(s=>s.size),viewport=Fiber.useThree(s=>s.viewport);React.useEffect(()=>report({pixels:[size.width,size.height],world:[viewport.width,viewport.height]}),[size,viewport]);return box();","Width 400 / 800"]
fiber[9]=["const camera=Fiber.useThree(s=>s.camera);React.useEffect(()=>{camera.fov=a?70:40;camera.updateProjectionMatrix();report({fov:camera.fov,projection:camera.projectionMatrix.elements.slice(0,6)});},[a,camera]);return box();","FOV 40 / 70"]
fiber[10]=["return h(React.Fragment,null,...[-1,1].map((x,id)=>box({key:id,position:[x,0,0],onClick:event=>{event.stopPropagation();setA(Boolean(id));report({selectedId:id});}},a===Boolean(id)?'#ff9650':'#3489be')));","Select left / right"]
fiber[11]=["const log=React.useRef([]);function record(value){log.current=[...log.current.slice(-8),value];report(log.current);}return h('group',{onClick:()=>record('ancestor')},box({position:[0,0,1],onClick:event=>{if(a)event.stopPropagation();record('front');}},'#ff9844'),box({position:[0,0,-.5],scale:1.7,onClick:()=>record('back')},'#438ac0'));","Propagation allow / stop"]
fiber[12]=["const ref=React.useRef(),drag=React.useRef(false);return box({ref,onPointerDown:event=>{event.stopPropagation();drag.current=true;if(a)event.target.setPointerCapture(event.pointerId);},onPointerMove:event=>{if(drag.current){ref.current.position.x=event.point.x;report({dragging:true,x:event.point.x,capture:a});}},onPointerUp:event=>{drag.current=false;if(event.target.hasPointerCapture(event.pointerId))event.target.releasePointerCapture(event.pointerId);report({dragging:false});}});","Pointer capture off / on"]
fiber[13]=["const ref=React.useRef();Fiber.useFrame((_,delta)=>{const target=a?1.5:-1.5,k=b?8:2;ref.current.position.x=THREE.MathUtils.damp(ref.current.position.x,target,k,delta);report({target,k,error:Math.abs(target-ref.current.position.x).toFixed(4)});});return box({ref});","Target left / right","Interpolation k 2 / 8"]
fiber[15]=["if(!loadedModel)throw modelTask;return h('primitive',{object:loadedModel,rotation:[0,a?1:0,0]});","Loaded JSON model rotation"]
fiber[16]=["const source=React.useMemo(()=>new THREE.Mesh(new THREE.TorusKnotGeometry(.5,.18,64,8),new THREE.MeshNormalMaterial()),[]);const copies=React.useMemo(()=>[source.clone(),source.clone()],[source]);React.useEffect(()=>()=>{source.geometry.dispose();source.material.dispose();},[source]);React.useEffect(()=>report({separateObjects:copies[0]!==copies[1],sharedGeometry:copies[0].geometry===copies[1].geometry}),[copies]);return h(React.Fragment,null,h('primitive',{object:a?copies[0]:source,position:[-1,0,0],dispose:null}),h('primitive',{object:a?copies[1]:source,position:[1,0,0],dispose:null}));","Same object / clone hierarchy"]
fiber[17]=["const texture=React.useMemo(()=>{const size=a?1024:256,canvas=document.createElement('canvas');canvas.width=canvas.height=size;const ctx=canvas.getContext('2d');for(let y=0;y<16;y++)for(let x=0;x<16;x++){ctx.fillStyle=(x+y)%2?'#1b3550':'#f0b252';ctx.fillRect(x*size/16,y*size/16,size/16,size/16);}const value=new THREE.CanvasTexture(canvas);value.colorSpace=THREE.SRGBColorSpace;report({size,baseRGBABytes:size*size*4});return value;},[a]);React.useEffect(()=>()=>texture.dispose(),[texture]);return h('mesh',null,h('boxGeometry'),h('meshBasicMaterial',{map:texture}));","Texture 256 / 1024"]
fiber[18]=["const shared=React.useMemo(()=>({geometry:new THREE.BoxGeometry(.35,.35,.35),material:new THREE.MeshNormalMaterial()}),[]);React.useEffect(()=>()=>{shared.geometry.dispose();shared.material.dispose();},[shared]);return h(React.Fragment,null,...Array.from({length:36},(_,i)=>a?h('mesh',{key:'shared'+i,geometry:shared.geometry,material:shared.material,dispose:null,position:[(i%6-2.5)*.55,(Math.floor(i/6)-2.5)*.55,0]}):h('mesh',{key:'unique'+i,position:[(i%6-2.5)*.55,(Math.floor(i/6)-2.5)*.55,0]},h('boxGeometry',{args:[.35,.35,.35]}),h('meshNormalMaterial'))));","Per-mesh / shared resources"]
fiber[19]=["const ref=React.useRef(),scratch=React.useMemo(()=>new THREE.Vector3(),[]),allocations=React.useRef(0);Fiber.useFrame(({clock},delta)=>{const point=a?scratch:new THREE.Vector3();if(!a)allocations.current++;point.set(Math.sin(clock.elapsedTime),Math.cos(clock.elapsedTime),0);ref.current.position.lerp(point,1-Math.exp(-delta*4));report({reuse:a,newVectors:allocations.current,frameMs:delta*1000});});return box({ref});","Allocate / reuse Vector3"]
fiber[20]=["const count=100,ref=React.useRef();const shared=React.useMemo(()=>({geometry:new THREE.BoxGeometry(.2,.2,.2),material:new THREE.MeshNormalMaterial()}),[]);React.useEffect(()=>()=>{shared.geometry.dispose();shared.material.dispose();},[shared]);React.useLayoutEffect(()=>{if(!a)return;const matrix=new THREE.Matrix4();for(let i=0;i<count;i++)ref.current.setMatrixAt(i,matrix.makeTranslation((i%10-4.5)*.35,(Math.floor(i/10)-4.5)*.35,0));ref.current.instanceMatrix.needsUpdate=true;ref.current.computeBoundingSphere();},[a]);return a?h('instancedMesh',{ref,args:[shared.geometry,shared.material,count],dispose:null}):h(React.Fragment,null,...Array.from({length:count},(_,i)=>h('mesh',{key:i,geometry:shared.geometry,material:shared.material,dispose:null,position:[(i%10-4.5)*.35,(Math.floor(i/10)-4.5)*.35,0]})));","100 shared mesh / instancedMesh"]
fiber[21]=["const ref=React.useRef();React.useLayoutEffect(()=>{const matrix=new THREE.Matrix4();for(let i=0;i<9;i++)ref.current.setMatrixAt(i,matrix.makeTranslation(i===0&&a?2.2:(i%3-1)*.7,(Math.floor(i/3)-1)*.7,0));ref.current.instanceMatrix.needsUpdate=true;ref.current.computeBoundingSphere();},[a]);return h('instancedMesh',{ref,args:[undefined,undefined,9],onClick:event=>{event.stopPropagation();report({instanceId:event.instanceId,boundsRadius:ref.current.boundingSphere.radius});}},h('boxGeometry',{args:[.45,.45,.45]}),h('meshNormalMaterial'));","Move instance 0 outside grid"]
fiber[22]=["const ref=React.useRef(),invalidate=Fiber.useThree(s=>s.invalidate),frames=React.useRef(0);React.useEffect(()=>{ref.current.rotation.y=b?1:0;invalidate();},[b,invalidate]);Fiber.useFrame(()=>report({frames:++frames.current,policy:a?'demand':'always'}));return box({ref});","Frameloop always / demand","Manual rotation + invalidate"]
fiber[23]=["const ref=React.useRef(),invalidate=Fiber.useThree(s=>s.invalidate),frames=React.useRef(0);React.useEffect(()=>invalidate(),[a,b,invalidate]);Fiber.useFrame((_,delta)=>{const target=b?1.5:-1.5,epsilon=a?.001:0;ref.current.position.x=THREE.MathUtils.damp(ref.current.position.x,target,8,delta);const error=Math.abs(target-ref.current.position.x);if(error>epsilon)invalidate();else ref.current.position.x=target;report({frames:++frames.current,error,epsilon,settled:error<=epsilon});});return box({ref});","Stop epsilon 0 / .001","Target left / right"]
fiber[24]=["return h(React.Fragment,null,h('directionalLight',{position:[3,5,4],intensity:3,castShadow:b,'shadow-mapSize':[1024,1024]}),box({castShadow:b,position:[0,.7,0]}),h('mesh',{rotation:[-Math.PI/2,0,0],position:[0,-.5,0],receiveShadow:b},h('planeGeometry',{args:[8,8]}),h('meshStandardMaterial',{color:'#a2adbd'})));","DPR 1 / 2","Shadows off / on"]
fiber[25]=["const Child=React.useMemo(()=>function Child(){return box();},[]);return a?(b?null:h(Child)):h('group',{visible:!b},h(Child));","Hide / unmount policy","Toggle scene"]
fiber[26]=["return h(React.Fragment,null,...[-1,1].map((x,id)=>box({key:id,position:[x,0,0],onClick:()=>setA(Boolean(id))},a===Boolean(id)?'#ff9b45':'#4785b1')));","Accessible DOM selection left / right"]
fiber[27]=["const count=a?1000:100,ref=React.useRef();React.useLayoutEffect(()=>{const matrix=new THREE.Matrix4();for(let i=0;i<count;i++)ref.current.setMatrixAt(i,matrix.makeTranslation((i%32-15.5)*.12,(Math.floor(i/32)-15.5)*.12,0));ref.current.instanceMatrix.needsUpdate=true;ref.current.computeBoundingSphere();},[count]);return h('instancedMesh',{key:count,ref,args:[undefined,undefined,count],onClick:event=>report({selectedInstance:event.instanceId,count})},h('boxGeometry',{args:[.09,.09,.09]}),h('meshNormalMaterial'));","Instance count 100 / 1000"]
function fiberSource(unit,entry){const [body,label,second]=entry;const day=unit.day;return [
'// '+unit.title,'// Real React Three Fiber / Three.js objects; no JSX compilation is needed.',
'/** @param {any} context */','export function mount({React,createRoot,Fiber,THREE,container}){',
'const h=React.createElement;',
day===15?"let loadedModel,closed=false;const disposeModel=model=>model.traverse(object=>{object.geometry?.dispose();if(Array.isArray(object.material))object.material.forEach(material=>material.dispose());else object.material?.dispose();});const fixtureModel=new THREE.Mesh(new THREE.IcosahedronGeometry(.9),new THREE.MeshNormalMaterial());const modelJSON=fixtureModel.toJSON();disposeModel(fixtureModel);const modelTask=new THREE.ObjectLoader().parseAsync(modelJSON).then(model=>{loadedModel=model;if(closed)disposeModel(model);});":'',
"const box=(props={},color='#388cc5')=>h('mesh',props,h('boxGeometry'),h('meshStandardMaterial',{color}));",
'function Scene({a,b,setA,report}){',body,'}',
"function Metrics({report}){const gl=Fiber.useThree(s=>s.gl);const last=React.useRef(0);Fiber.useFrame(({clock},delta)=>{if(clock.elapsedTime-last.current>.5){last.current=clock.elapsedTime;report({drawCalls:gl.info.render.calls,geometries:gl.info.memory.geometries,textures:gl.info.memory.textures,frameMs:Number((delta*1000).toFixed(2)),buffer:[gl.domElement.width,gl.domElement.height]});}});return null;}",
"function App(){const [a,setA]=React.useState(false),[b,setB]=React.useState(false);const detail=React.useRef(null),metrics=React.useRef(null);const report=value=>{if(detail.current)detail.current.textContent=JSON.stringify(value,null,2);};",
"return h('section',{style:{height:'100%',display:'flex',flexDirection:'column'}},h('h3',null,"+JSON.stringify(unit.title)+"),h('div',null,h('button',{onClick:()=>setA(!a)},"+JSON.stringify(label)+",' · ',String(a))"+(second?",h('button',{onClick:()=>setB(!b)},"+JSON.stringify(second)+",' · ',String(b))":'')+"),",
"h('pre',{ref:detail,style:{margin:4}},'Use controls or interact with the scene'),h('pre',{ref:metrics,style:{margin:4}},'Renderer metrics'),",
"h('div',{style:{height:300,minHeight:220,width:"+(day===8?"a?'min(800px,100%)':'min(400px,100%)'":"'100%'")+"}},h(Fiber.Canvas,{camera:{position:[0,0,6],fov:50},dpr:"+(day===24?'a?2:1':'1')+",shadows:"+(day===24?'b':'false')+",frameloop:"+(day===22?"a?'demand':'always'":day===23?"'demand'":"'always'")+",fallback:h('p',null,'WebGL unavailable; use the DOM controls to inspect selection.')},",
day===5?"h('ambientLight',{intensity:0}),":"h('ambientLight',{intensity:1.5}),h('directionalLight',{position:[3,4,5],intensity:2}),",
"h(React.Suspense,{fallback:null},h(Scene,{a,b,setA,report})),h(Metrics,{report:value=>{if(metrics.current)metrics.current.textContent=JSON.stringify(value);}}))));}",
'const root=createRoot(container);root.render(h(App));return ()=>{root.unmount();'+(day===15?'closed=true;if(loadedModel)disposeModel(loadedModel);':'')+'};','}',''
].join('\n')}

const all={react,vue,svelte,'react-three-fiber':fiber}
for(const [series,examples] of Object.entries(all)){
 if(process.argv[2]&&process.argv[2]!==series)continue
 const curriculum=JSON.parse(fs.readFileSync(path.join(base,'content/curricula',series+'.json'),'utf8'))
 const manifest={}
 for(const unit of curriculum.units){
  if(!unit.id.includes('-step-'))continue
  const entry=examples[unit.day]
  if(!entry)throw Error('Missing '+unit.id)
  const directory=path.join(base,'src/labs',unit.id)
  fs.mkdirSync(directory,{recursive:true})
  const source=series==='react'?reactSource(unit,entry):series==='vue'?vueSource(unit,entry):series==='svelte'?svelteSource(unit,entry[0]):fiberSource(unit,entry)
  const localized=localizeExampleSource(unit.id,source,{'Snapshot +1 three times':'snapshot','Updater +1 three times':'updater','Reset':'reset','Experiment input':'input'},unit.id==='react-step-03'?{}:{messagesMarker:'/* framework messages */'})
  writeGeneratedFile(path.join(directory,'example.js'),localized.source)
  manifest[unit.id]={...(localized.readingSource?{readingSource:localized.readingSource}:{}),mode:'browser',note:series==='react'?'실제 React API 실험입니다. JSX 대신 createElement를 사용합니다.':series==='vue'?'실제 Vue 반응성과 render 함수 실험입니다. SFC 템플릿은 외부 컴파일 환경에서 확인합니다.':'실제 React Three Fiber Canvas 실험입니다. WebGL을 지원하는 브라우저가 필요합니다.'}
  if(series==='svelte'){
   writeGeneratedFile(path.join(directory,'App.svelte'),'<script>\n'+entry[1]+'\n</script>\n'+entry[2]+'\n')
   manifest[unit.id]={mode:'external',note:'미리보기는 Svelte writable/DOM 계약 실험입니다. runes·snippet·컴파일 결과는 실제 App.svelte를 Svelte 5 프로젝트에서 실행하세요.',files:['src/labs/'+unit.id+'/App.svelte']}
   const extras={}
   if(unit.day===16)extras['workspace.svelte.js']="export function createWorkspace(){const workspace=$state({draft:''});return workspace;}\n"
   if(unit.day===17)extras['Consumer.svelte']="<script>\nimport {getContext} from 'svelte';const workspace=getContext('workspace');\n</script>\n<label>Consumer <input bind:value={workspace.draft}/></label>\n"
   if(unit.day===21)extras['Editor.svelte']="<script>\nlet {value=$bindable('')}=$props();let edits=$state(0);\n</script>\n<input aria-label=\"Draft\" bind:value oninput={()=>edits++}/><p>Local edits {edits}</p>\n"
   for(const [name,code] of Object.entries(extras)){writeGeneratedFile(path.join(directory,name),code);manifest[unit.id].files.push('src/labs/'+unit.id+'/'+name)}
  }
  if(series==='react'&&unit.day===21)manifest[unit.id].note+=' Profiler callback은 profiling 지원 빌드에서 측정하세요. 배포 React 빌드에서는 callback이 비활성일 수 있습니다.'
  if(series==='react-three-fiber'&&unit.day===15){
   manifest[unit.id]={mode:'external',note:'미리보기는 Three ObjectLoader의 실제 JSON 모델 로딩입니다. GLB·Suspense·오류 경계 실험은 외부 App.jsx와 유효한 /model.glb가 필요합니다.',files:['src/labs/'+unit.id+'/App.jsx']}
   writeGeneratedFile(path.join(directory,'App.jsx'),[
"import React, {Suspense, useState} from 'react';",
"import {Canvas, useLoader} from '@react-three/fiber';",
"import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';",
"class ErrorBoundary extends React.Component {state={error:null};static getDerivedStateFromError(error){return {error};}render(){return this.state.error?<p role=\"alert\">{this.state.error.message}</p>:this.props.children;}}",
"function Model({url}){const gltf=useLoader(GLTFLoader,url);return <primitive object={gltf.scene}/>;}",
"export default function App(){const [url,setUrl]=useState('/model.glb');return <><button onClick={()=>setUrl(url==='/model.glb'?'/missing.glb':'/model.glb')}>Valid / missing GLB</button><ErrorBoundary key={url}><Suspense fallback={<p>Loading model…</p>}><Canvas camera={{position:[0,0,5]}}><ambientLight intensity={2}/><Model url={url}/></Canvas></Suspense></ErrorBoundary></>;}"
   ].join('\n'))
  }
  if(localized.readingSource)manifest[unit.id].readingSource=localized.readingSource
 }
 fs.mkdirSync(path.join(base,'content/examples'),{recursive:true})
 writeGeneratedFile(path.join(base,'content/examples',series+'.json'),JSON.stringify(manifest,null,2)+'\n')
 console.log(series+': '+Object.keys(manifest).length+' new examples')
}

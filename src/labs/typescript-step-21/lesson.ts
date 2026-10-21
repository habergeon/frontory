type Note={title:string;done:boolean};
function emit<K extends keyof Note>(name:`${K}Changed`,payload:Note[K]):void {}
emit("titleChanged","A");
// @ts-expect-error title needs string
emit<"title">("titleChanged",42);
export {};

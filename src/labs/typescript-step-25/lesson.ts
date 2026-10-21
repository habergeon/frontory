// legacy.d.ts: export function save(value:string):number;
declare function save(value:string):number;
if(false){save("A");
// @ts-expect-error declaration rejects number
save(42)}
export {};

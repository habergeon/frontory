// Split these declarations into model.ts and main.ts in a local project.
export type Note={id:number;title:string};
export const create=(title:string):Note=>({id:1,title});
// Consumer: import type { Note } from "./model.js";
// Consumer: import { create } from "./model.js";
export {};

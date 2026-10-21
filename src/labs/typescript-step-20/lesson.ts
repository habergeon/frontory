type ElementOf<T> = T extends (infer U)[] ? U : T;
type Distributed<T> = T extends string ? "text" : "other";
type Whole<T> = [T] extends [string] ? "text" : "other";
const distributed:Distributed<string|number>="text";
const whole:Whole<string|number>="other";
export {};

const mode = "idle";
function start(mode: "idle" | "running") { return mode }
start(mode);
let widened = "idle";
// @ts-expect-error widened string is not a state
start(widened);
export {};

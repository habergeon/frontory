type Point = [x: number, y: number]
const point: Point = [10, 20]
// @ts-expect-error tuple requires two elements
const bad: Point = [10]
export {}

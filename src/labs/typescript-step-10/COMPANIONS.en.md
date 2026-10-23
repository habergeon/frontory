# typescript-step-10 companion execution

Run tsc against the supplied lesson.ts with strict checking, no emit, and ES2023/DOM libraries. Preserve @ts-expect-error directives; an unused directive is a failed fixture check. Typechecking does not execute DOM interactions.

In an isolated project with TypeScript installed: `npx tsc --strict --noEmit --target ES2023 --lib ES2023,DOM --skipLibCheck lesson.ts`.

- [lesson.ts](./lesson.ts) · preserved original

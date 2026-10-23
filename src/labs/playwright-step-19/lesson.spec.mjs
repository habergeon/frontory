import {test,expect} from '@playwright/test';import {readFile} from 'node:fs/promises';
test.beforeEach(async({page})=>{await page.goto('/')});
test("시계와 예약 저장",async({page,browser},testInfo)=>{
await page.clock.install({time:new Date('2026-01-01T00:00:00Z')});await page.clock.pauseAt(new Date('2026-01-01T01:00:00Z'));await page.getByRole('textbox',{name:'Notes',exact:true}).fill('debounced');await page.clock.runFor(499);await expect(page.getByRole('status')).toHaveText('Unsaved');await page.clock.runFor(1);await expect(page.getByRole('status')).toHaveText('Saved');expect(await page.evaluate(()=>localStorage.getItem('note:a'))).toBe('debounced');
});

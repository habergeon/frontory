import {test,expect} from '@playwright/test';import {readFile} from 'node:fs/promises';
test.beforeEach(async({page})=>{await page.goto('/')});
test("시각 기준 만들기",async({page,browser},testInfo)=>{
await page.evaluate(()=>document.fonts.ready);await expect(page.getByRole('region',{name:'Notes'})).toHaveScreenshot('notes.png',{animations:'disabled',caret:'hide',maxDiffPixels:0});
});

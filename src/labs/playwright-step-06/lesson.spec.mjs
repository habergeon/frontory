import {test,expect} from '@playwright/test';import {readFile} from 'node:fs/promises';
test.beforeEach(async({page})=>{await page.goto('/')});
test("재시도 Assertion",async({page,browser},testInfo)=>{
await page.getByRole('textbox',{name:'Notes',exact:true}).fill('Delayed save');await expect(page.getByRole('status')).toHaveText('Saved');
});

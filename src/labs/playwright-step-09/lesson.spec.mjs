import {test,expect} from '@playwright/test';import {readFile} from 'node:fs/promises';
test.beforeEach(async({page})=>{await page.goto('/')});
test("저장과 새로고침",async({page,browser},testInfo)=>{
await page.getByLabel('Notes',{exact:true}).fill('Persist through reload');await page.getByRole('button',{name:'Save notes',exact:true}).click();await expect(page.getByRole('status')).toHaveText('Saved');await page.reload();await expect(page.getByLabel('Notes',{exact:true})).toHaveValue('Persist through reload');
});

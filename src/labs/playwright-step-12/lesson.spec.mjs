import {test,expect} from '@playwright/test';import {readFile} from 'node:fs/promises';
test.beforeEach(async({page})=>{await page.goto('/')});
test("잘못된 파일과 보존",async({page,browser},testInfo)=>{
await page.getByLabel('Notes',{exact:true}).fill('keep me');await page.getByRole('button',{name:'Save notes',exact:true}).click();await page.getByLabel('Import backup').setInputFiles({name:'bad.json',mimeType:'application/json',buffer:Buffer.from('{invalid')});await expect(page.getByRole('status')).toHaveText('Invalid backup; existing note preserved');await page.reload();await expect(page.getByLabel('Notes',{exact:true})).toHaveValue('keep me');
});

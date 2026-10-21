import {test,expect} from '@playwright/test';import {readFile} from 'node:fs/promises';
test.beforeEach(async({page})=>{await page.goto('/')});
test("파일 업로드",async({page,browser},testInfo)=>{
await page.getByLabel('Import backup').setInputFiles({name:'valid.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({version:1,text:'restored'}))});await expect(page.getByRole('status')).toHaveText('Imported');await expect(page.getByLabel('Notes',{exact:true})).toHaveValue('restored');
});

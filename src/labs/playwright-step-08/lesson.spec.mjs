import {test,expect} from '@playwright/test';import {readFile} from 'node:fs/promises';
test.beforeEach(async({page})=>{await page.goto('/')});
test("BrowserContext 격리",async({page,browser},testInfo)=>{
await page.getByRole('textbox',{name:'Notes',exact:true}).fill('private');await page.getByRole('button',{name:'Save notes',exact:true}).click();const other=await browser.newContext();try{const isolated=await other.newPage();await isolated.goto('http://127.0.0.1:4179');await expect(isolated.getByRole('textbox',{name:'Notes',exact:true})).toHaveValue('')}finally{await other.close()}
});

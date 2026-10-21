import {test,expect} from '@playwright/test';import {readFile} from 'node:fs/promises';
test.beforeEach(async({page})=>{await page.goto('/')});
test("Label과 입력",async({page,browser},testInfo)=>{
await page.getByLabel('Notes',{exact:true}).fill('Accessible label');await expect(page.getByLabel('Notes',{exact:true})).toHaveValue('Accessible label');
});

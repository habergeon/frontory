import {test,expect} from '@playwright/test';import {readFile} from 'node:fs/promises';
test.beforeEach(async({page})=>{await page.goto('/')});
test("Network Route",async({page,browser},testInfo)=>{
await page.route('**/docs/old',route=>route.fulfill({status:200,contentType:'text/plain',body:'Controlled document'}));await page.getByRole('button',{name:'Load document',exact:true}).click();await expect(page.getByRole('article',{name:'Document'})).toHaveText('Controlled document');
});

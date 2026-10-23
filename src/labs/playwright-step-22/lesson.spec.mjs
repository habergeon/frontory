import {test as base,expect} from '@playwright/test';import {readFile} from 'node:fs/promises';
const test=base.extend({page:async({page},use)=>{await page.goto('/');await page.evaluate(()=>localStorage.clear());await page.reload();await use(page);await page.evaluate(()=>localStorage.clear())}});
test.beforeEach(async({page})=>{await page.goto('/')});
test("Fixtures와 준비 책임",async({page,browser},testInfo)=>{
await expect(page.getByRole('textbox',{name:'Notes',exact:true})).toHaveValue('');await page.getByRole('textbox',{name:'Notes',exact:true}).fill('fixture scoped state');await page.getByRole('button',{name:'Save notes',exact:true}).click();
});

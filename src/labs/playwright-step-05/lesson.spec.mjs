import {test,expect} from '@playwright/test';import {readFile} from 'node:fs/promises';
test.beforeEach(async({page})=>{await page.goto('/')});
test("Locator 범위",async({page,browser},testInfo)=>{
const panel=page.getByRole('region',{name:'Notes'});await panel.getByRole('button',{name:'Save notes',exact:true}).click();await expect(panel.getByRole('status')).toHaveText('Saved');
});

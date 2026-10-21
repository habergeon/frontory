import {test,expect} from '@playwright/test';import {readFile} from 'node:fs/promises';
test.beforeEach(async({page})=>{await page.goto('/')});
test("Viewport와 반응형",async({page,browser},testInfo)=>{
for(const width of [375,1280]){await page.setViewportSize({width,height:800});await expect(page.getByLabel('Notes',{exact:true})).toBeVisible();await page.getByLabel('Notes',{exact:true}).fill('width '+width);await page.getByRole('button',{name:'Save notes',exact:true}).click();await expect(page.getByRole('status')).toHaveText('Saved')}
});

import {test,expect} from '@playwright/test';import {readFile} from 'node:fs/promises';
test.beforeEach(async({page})=>{await page.goto('/')});
test("설정과 실행 범위",async({page,browser},testInfo)=>{
await page.goto('/');await expect(page).toHaveTitle('Learning notes fixture');
});

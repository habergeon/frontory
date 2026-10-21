import {test,expect} from '@playwright/test';import {readFile} from 'node:fs/promises';
test.beforeEach(async({page})=>{await page.goto('/')});
test("Keyboard 탐색",async({page,browser},testInfo)=>{
await page.keyboard.press('Tab');await expect(page.getByRole('button',{name:'Lesson A',exact:true})).toBeFocused();await page.keyboard.press('Tab');await page.keyboard.press('Enter');await expect(page.getByRole('heading')).toHaveText('Lesson B');
});

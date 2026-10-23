import {test,expect} from '@playwright/test';import {readFile} from 'node:fs/promises';
test.beforeEach(async({page})=>{await page.goto('/')});
test("항목별 저장 격리",async({page,browser},testInfo)=>{
await page.getByRole('textbox',{name:'Notes',exact:true}).fill('A only');await page.getByRole('button',{name:'Save notes',exact:true}).click();await page.getByRole('button',{name:'Lesson B',exact:true}).click();await expect(page.getByRole('textbox',{name:'Notes',exact:true})).toHaveValue('');await page.getByRole('textbox',{name:'Notes',exact:true}).fill('B only');await page.getByRole('button',{name:'Save notes',exact:true}).click();await page.getByRole('button',{name:'Lesson A',exact:true}).click();await expect(page.getByRole('textbox',{name:'Notes',exact:true})).toHaveValue('A only');
});

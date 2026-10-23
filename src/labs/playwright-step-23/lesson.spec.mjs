import {test,expect} from '@playwright/test';import {readFile} from 'node:fs/promises';
test.beforeEach(async({page})=>{await page.goto('/')});
test("병렬 실행과 충돌",async({page,browser},testInfo)=>{
const unique='worker-'+testInfo.workerIndex+'-'+testInfo.testId;await page.getByRole('textbox',{name:'Notes',exact:true}).fill(unique);await page.getByRole('button',{name:'Save notes',exact:true}).click();await page.reload();await expect(page.getByRole('textbox',{name:'Notes',exact:true})).toHaveValue(unique);
});

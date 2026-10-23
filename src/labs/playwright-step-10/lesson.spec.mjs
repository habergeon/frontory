import {test,expect} from '@playwright/test';import {readFile} from 'node:fs/promises';
test.beforeEach(async({page})=>{await page.goto('/')});
test("다운로드 이벤트",async({page,browser},testInfo)=>{
await page.getByRole('textbox',{name:'Notes',exact:true}).fill('download content');const event=page.waitForEvent('download');await page.getByRole('button',{name:'Download backup'}).click();const download=await event;expect(download.suggestedFilename()).toBe('notes.json');const file=await download.path();expect(JSON.parse(await readFile(file,'utf8'))).toEqual({version:1,text:'download content'});
});

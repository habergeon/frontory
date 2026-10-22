import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { gsap } from 'gsap'
import gsapCurriculum from '/content/curricula/gsap.json'
import reactCurriculum from '/content/curricula/react.json'
import reactSource from '/src/labs/react-step-03/example.js?raw'
import { mount as reactMount } from '/src/labs/react-step-03/example.js'
import { mount as gsapMount } from '/src/labs/gsap-step-02/example.js'
import { mount as jsMount } from '/src/labs/javascript-step-02/example.js'
import { mount as cssMount } from '/src/labs/css-step-04/example.js'
const results = []
const stage = document.querySelector('#stage')
const paint = () => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
const check = (name, actual, expected) => {
  const ok = JSON.stringify(actual) === JSON.stringify(expected)
  results.push({ name, actual, expected, ok })
  if (!ok) throw new Error(name + ': ' + JSON.stringify(actual))
}
try {
  const locale = new URLSearchParams(location.search).get('locale') || undefined
  const english = locale === 'en'
  let dispose = reactMount({ React, createRoot, container: stage, locale })
  await paint()
  const buttons = [...stage.querySelectorAll('button')]
  const value = () => Number(stage.querySelector('pre').textContent)
  check('React localized title', stage.querySelector('h2').textContent, english ? 'Events and state snapshots' : '이벤트와 상태 스냅샷')
  check('React localized controls', buttons.map(x => x.textContent), english ? ['Snapshot +1 three times', 'Updater +1 three times', 'Reset'] : ['Snapshot +1 세 번', 'Updater +1 세 번', '초기화'])
  check('React initial', value(), 0)
  buttons[0].click(); await paint(); check('React snapshot three updates', value(), 1)
  buttons[2].click(); await paint(); check('React reset', value(), 0)
  buttons[1].click(); await paint(); check('React functional three updates', value(), 3)
  buttons[1].click(); await paint(); check('React functional second click', value(), 6)
  dispose(); check('React cleanup', stage.childElementCount, 0)
  const experiment = reactCurriculum.units.find(unit => unit.id === 'react-step-03').concepts.find(concept => concept.title === '내장 코드에서 두 경로를 나란히 읽기').explanation.match(/```js\n([\s\S]*?)\n```/)[1]
  const replacement = reactSource.slice(0, reactSource.indexOf('function Experiment(){')) + experiment + reactSource.slice(reactSource.indexOf('\nconst root='))
  const reactUrl = URL.createObjectURL(new Blob([replacement], { type: 'text/javascript' }))
  const { mount: replacementMount } = await import(/* @vite-ignore */ reactUrl)
  URL.revokeObjectURL(reactUrl)
  dispose = replacementMount({ React, createRoot, container: stage, locale }); await paint()
  const replacementButtons = [...stage.querySelectorAll('button')]
  for (const expected of [1, 2, 3]) {
    replacementButtons[0].click(); await paint(); check('React documented separate snapshot click', value(), expected)
  }
  replacementButtons[2].click(); await paint(); check('React documented reset', value(), 0)
  replacementButtons[1].click(); await paint(); check('React documented updater', value(), 3)
  dispose(); check('React documented cleanup', stage.childElementCount, 0)
  dispose = jsMount({ container: stage, locale }); await paint()
  check('JavaScript localized title', stage.querySelector('h2').textContent, english ? 'String input and number conversion' : '문자열 입력과 숫자 변환')
  check('JavaScript input aria', stage.querySelector('textarea').getAttribute('aria-label'), english ? 'Experiment JSON input' : '실험 JSON 입력')
  check('JavaScript localized help', stage.querySelector('p').textContent, english ? 'Change the input from 15 to an empty string and run the experiment.' : '15 → 빈 문자열 조건으로 입력을 바꿔 실행하세요.')
  check('JavaScript localized button', stage.querySelector('button').textContent, english ? 'Run experiment' : '실험 실행')
  let output = JSON.parse(stage.querySelector('pre').textContent)
  check('JavaScript initial conversion', output.map(x => [x.raw, x.ok, x.value]), [['15', true, 15], ['', false, 0], ['15px', false, null], ['-1', false, -1]])
  stage.querySelector('textarea').value = JSON.stringify(['  ', '0', 'Infinity', '0x10', '1e3'])
  stage.querySelector('button').click(); await paint()
  output = JSON.parse(stage.querySelector('pre').textContent)
  check('JavaScript numeric boundaries', output.map(x => [x.raw, x.ok, x.value]), [['  ', false, 0], ['0', true, 0], ['Infinity', false, null], ['0x10', true, 16], ['1e3', true, 1000]])
  stage.querySelector('textarea').value = '['; stage.querySelector('button').click(); await paint()
  check('JavaScript invalid JSON reports error', typeof JSON.parse(stage.querySelector('pre').textContent).error, 'string')
  stage.querySelector('textarea').value = '["2"]'; stage.querySelector('button').click(); await paint()
  check('JavaScript recovers after invalid JSON', JSON.parse(stage.querySelector('pre').textContent)[0].value, 2)
  dispose(); check('JavaScript cleanup', stage.childElementCount, 0)
  dispose = cssMount({ container: stage, locale }); await paint()
  check('CSS localized title', stage.querySelector('h2').textContent, english ? 'Box model and measured dimensions' : '박스 모델과 실측 크기')
  check('CSS input aria', [...stage.querySelectorAll('textarea')].map(x => x.getAttribute('aria-label')), english ? ['HTML source', 'CSS source'] : ['HTML 소스', 'CSS 소스'])
  check('CSS inspect label', stage.querySelectorAll('button')[1].textContent, english ? 'Inspect current DOM / styles' : '현재 DOM / 스타일 검사')
  check('CSS width aria', stage.querySelector('input').getAttribute('aria-label'), english ? 'Container width' : '컨테이너 폭')
  const host = [...stage.querySelectorAll('section')].find(x => x.shadowRoot)
  const width = () => host.shadowRoot.querySelector('.card').getBoundingClientRect().width
  check('CSS content-box border width', width(), 244)
  const css = stage.querySelectorAll('textarea')[1]
  css.value = css.value.replace('content-box', 'border-box')
  ;[...stage.querySelectorAll('button')].find(x => x.textContent === (english ? 'Apply' : '적용')).click(); await paint()
  check('CSS border-box border width', width(), 200)
  check('CSS border-box content width', parseFloat(getComputedStyle(host.shadowRoot.querySelector('.card')).width) - 40 - 4, 156)
  dispose(); check('CSS cleanup', stage.childElementCount, 0)
  dispose = gsapMount({ container: stage, gsap, locale }); await paint()
  check('GSAP localized title', stage.querySelector('h3').textContent, english ? 'Starting and target values' : '시작값과 목표값')
  check('GSAP localized description', stage.querySelector('p').textContent, english ? 'from and to / initial rendering' : 'from과 to / 초기 적용')
  check('GSAP localized button', stage.querySelector('button').textContent, english ? 'Run experiment' : '실험 실행')
  const box = stage.querySelector('.stage > div')
  check('GSAP initial position', Number(gsap.getProperty(box, 'x')), 0)
  stage.querySelector('button').click()
  check('GSAP localized result', stage.querySelector('output').textContent, english ? 'fromTo supplies both endpoints; initial styles stay unchanged until Run' : 'fromTo는 시작값과 목표값을 모두 지정합니다. 실행 전에는 초기 스타일을 유지합니다.')
  const tween = gsap.getTweensOf(box)[0]
  check('GSAP immediateRender false before first render', Number(gsap.getProperty(box, 'x')), 0)
  tween.progress(0.5).pause()
  results.push({name:'GSAP first run midpoint',x:gsap.getProperty(box,'x'),opacity:gsap.getProperty(box,'opacity')})
  tween.progress(1)
  check('GSAP first run target', Number(gsap.getProperty(box, 'x')), 0)
  check('GSAP first run target opacity', Number(gsap.getProperty(box, 'opacity')), 1)
  stage.querySelector('button').click(); gsap.getTweensOf(box)[0].progress(1).pause()
  check('GSAP second run target', Number(gsap.getProperty(box, 'x')), 240)
  dispose(); check('GSAP cleanup tween count', gsap.getTweensOf(box).length, 0)
  check('GSAP cleanup DOM', stage.childElementCount, 0)
  const comparison = gsapCurriculum.units.find(unit => unit.id === 'gsap-step-02').concepts.find(concept => concept.title === '세 API를 같은 조건에서 비교하는 최소 실험').explanation.match(/```js\n([\s\S]*?)\n```/)[1]
  for (const immediateRender of [true, false]) {
    const code = immediateRender ? comparison : comparison.replace('paused: true', 'paused: true, immediateRender: false')
    const url = URL.createObjectURL(new Blob([code], { type: 'text/javascript' }))
    const { mount } = await import(/* @vite-ignore */ url)
    URL.revokeObjectURL(url)
    const cleanup = mount({ container: stage, gsap, locale })
    const rows = JSON.parse(stage.querySelector('pre').textContent)
    check('GSAP documented three-card comparison, immediateRender=' + immediateRender, rows.map(row => row.x), [40, 40, 40, 40, immediateRender ? -80 : 40, immediateRender ? -80 : 40, 140, -20, 80, 240, 40, 240])
    cleanup(); check('GSAP documented comparison cleanup', stage.childElementCount, 0)
  }
  document.querySelector('#state').textContent = 'PASS'
} catch (error) {
  results.push({error:String(error)}); document.querySelector('#state').textContent = 'FAIL'
}
document.querySelector('#results').textContent = JSON.stringify({ userAgent:navigator.userAgent, results }, null, 2)

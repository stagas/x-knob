import { KnobElement } from '../src'

customElements.define('x-knob', KnobElement)

// @ts-ignore
const fontUrl = new URL('Kanit-Light.ttf', import.meta.url).toString()

document.body.innerHTML = /*html*/ `
<style>
@font-face {
  src: url(${fontUrl}) format('truetype');
  font-family: 'Kanit';
  font-style: 'light';
  font-display: 'fallback';
}
html,
body {
  width: 100%;
  height: 100%;
  background: #383838;
}
x-knob {
  width: 150px;
  height: 150px;
  font-family: Kanit;
}
</style>
<div id="demo" style="display:grid;grid:1fr 1fr 1fr/1fr 1fr 1fr;width:450px">
<x-knob theme="power" value="50"></x-knob>
<x-knob theme="intense" value="50"></x-knob>
<x-knob theme="amp" value="5" max="11" step="0.1"></x-knob>
<x-knob theme="retro" value="50"></x-knob>
<x-knob theme="metallic" value="50"></x-knob>
<x-knob theme="sweet" symmetric min="-60" value="0" max="60"></x-knob>
<x-knob theme="flat" value="50"></x-knob>
<x-knob theme="ableton" value="50"></x-knob>
<x-knob theme="zen" value="50"></x-knob>
</div>
`

const knobs = document.querySelectorAll('x-knob') as NodeListOf<KnobElement>
let i = 0
const ivl = setInterval(() => {
  const knob = knobs[i++ % knobs.length]
  knob.targetValue! += (knob.normal > 0.5 ? -1 : knob.normal === 0.5 ? (Math.random() - 0.5) * 2 : 1) * Math.random()
    * knob.scale
    * 0.95
  if (i >= knobs.length) clearInterval(ivl)
}, 60)

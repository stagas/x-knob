/** @jsxImportSource minimal-view */

import { render } from 'minimal-view'

import { Knob } from '../src'

render(<div style="width:400px;height:100px;display:flex;">
  <Knob
    id="a"
    min={0}
    max={1}
    step={0.001}
    value={0.5}
    theme="zen"
  />
  <Knob
    id="b"
    min={0}
    max={1}
    step={0.001}
    value={0.5}
    theme="cowbell"
  />
  <Knob
    id="b"
    min={0}
    max={1}
    step={0.001}
    value={0.5}
    theme="zen"
  />
  <Knob
    id="b"
    min={0}
    max={1}
    step={0.001}
    value={0.5}
    theme="zen"
  />
</div>, document.body)

// customElements.define('x-knob', KnobElement)

// document.body.innerHTML = /*html*/ `
// <style>
// html,
// body {
//   width: 100%;
//   height: 100%;
//   background: #383838;
// }
// x-knob {
//   width: 150px;
//   height: 150px;
// }
// </style>
// <div id="demo" style="display:grid;grid:1fr 1fr 1fr/1fr 1fr 1fr;width:450px">
// <x-knob theme="power" value="50" min="-60" step="1" value="0" max="60"></x-knob>
// <x-knob theme="intense" value="50" min="-60" step="1" value="0" max="60"></x-knob>
// <x-knob theme="amp" value="5" max="11" step="0.1" min="0"></x-knob>
// <x-knob theme="retro"  value="50" min="-60" step="1" value="0" max="60"></x-knob>
// <x-knob theme="metallic" value="50" min="-60" step="1" value="0" max="60"></x-knob>
// <x-knob theme="sweet" symmetric min="-60" step="1" value="0" max="60"></x-knob>
// <x-knob theme="flat" value="50" min="-60" step="1" value="0" max="60"></x-knob>
// <x-knob theme="ableton" value="50" min="-60" step="1" value="0" max="60"></x-knob>
// <x-knob theme="zen" value="50" min="-60" step="1" value="0" max="60"></x-knob>
// <div style="margin: 10px; border:2px solid #000; width: 150px; height: 150px;"><x-knob style="width:100%; height:100%" theme="zen" value="50" min="-60" step="1" value="0" max="60"></x-knob></div>
// <div style="margin: 10px; border:2px solid #000; width: 150px; height: 150px;"><x-knob style="width:100%; height:100%" theme="circle" value="50" min="-60" step="1" value="0" max="60"></x-knob></div>
// </div>
// `

// // const knobs = document.querySelectorAll('x-knob') as NodeListOf<KnobElement>
// // let i = 0
// // const ivl = setInterval(() => {
// //   const knob = knobs[i++ % knobs.length]
// //   knob.targetValue! += (knob.normal > 0.5 ? -1 : knob.normal === 0.5 ? (Math.random() - 0.5) * 2 : 1) * Math.random()
// //     * knob.scale
// //     * 0.95
// //   if (i >= knobs.length) clearInterval(ivl)
// // }, 60)

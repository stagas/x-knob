

<h1>
x-knob <a href="https://npmjs.org/package/x-knob"><img src="https://img.shields.io/badge/npm-v4.0.0-F00.svg?colorA=000"/></a> <a href="src"><img src="https://img.shields.io/badge/loc-1,528-FFF.svg?colorA=000"/></a> <a href="https://cdn.jsdelivr.net/npm/x-knob@4.0.0/dist/x-knob.min.js"><img src="https://img.shields.io/badge/brotli-13.3K-333.svg?colorA=000"/></a> <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-F0B.svg?colorA=000"/></a>
</h1>

<p></p>

Web Component Knobs

<h4>
<table><tr><td title="Triple click to select and copy paste">
<code>npm i x-knob </code>
</td><td title="Triple click to select and copy paste">
<code>pnpm add x-knob </code>
</td><td title="Triple click to select and copy paste">
<code>yarn add x-knob</code>
</td></tr></table>
</h4>

## Examples

<details id="example$web" title="web" open><summary><span><a href="#example$web">#</a></span>  <code><strong>web</strong></code></summary>  <ul><p></p>  <a href="https://stagas.github.io/x-knob/example/web.html"><img width="514.2857142857142" src="example/web.webp"></img>  <p><strong>Try it live</strong></p></a>    <details id="source$web" title="web source code" ><summary><span><a href="#source$web">#</a></span>  <code><strong>view source</strong></code></summary>  <a href="example/web.tsx">example/web.tsx</a>  <p>

```tsx
/** @jsxImportSource minimal-view */

import { render } from 'minimal-view'

import { Knob } from 'x-knob'

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
```

</p>
</details></ul></details>


## API

<p>  <details id="themes$1" title="Variable" open><summary><span><a href="#themes$1">#</a></span>  <code><strong>themes</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>...</code></span>  </summary>  <a href=""></a>  <ul><p>any</p>        </ul></details><details id="Knob$2" title="Function" open><summary><span><a href="#Knob$2">#</a></span>  <code><strong>Knob</strong></code><em>(props)</em>    </summary>  <a href=""></a>  <ul>    <p>    <details id="props$4" title="Parameter" ><summary><span><a href="#props$4">#</a></span>  <code><strong>props</strong></code>    </summary>    <ul><p><span>props</span></p>        </ul></details>  <p><strong>Knob</strong><em>(props)</em>  &nbsp;=&gt;  <ul><span>VKid</span></ul></p></p>    </ul></details></p>

## Credits
- [everyday-utils](https://npmjs.org/package/everyday-utils) by [stagas](https://github.com/stagas) &ndash; Everyday utilities
- [memoize-pure](https://npmjs.org/package/memoize-pure) by [stagas](https://github.com/stagas) &ndash; low footprint memoize for just pure sync functions with scalar arguments
- [minimal-view](https://npmjs.org/package/minimal-view) by [stagas](https://github.com/stagas) &ndash; Minimal reactive component view library.
- [relative-mouse](https://npmjs.org/package/relative-mouse) by [stagas](https://github.com/stagas) &ndash; Get mouse position relative to a DOM element.
- [sigl](https://npmjs.org/package/sigl) by [stagas](https://github.com/stagas) &ndash; Web framework

## Contributing

[Fork](https://github.com/stagas/x-knob/fork) or [edit](https://github.dev/stagas/x-knob) and submit a PR.

All contributions are welcome!

## License

<a href="LICENSE">MIT</a> &copy; 2023 [stagas](https://github.com/stagas)

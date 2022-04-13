<h1>
x-knob <a href="https://npmjs.org/package/x-knob"><img src="https://img.shields.io/badge/npm-v1.0.0-F00.svg?colorA=000"/></a> <a href="src"><img src="https://img.shields.io/badge/loc-1,224-FFF.svg?colorA=000"/></a> <a href="https://cdn.jsdelivr.net/npm/x-knob@1.0.0/dist/x-knob.min.js"><img src="https://img.shields.io/badge/brotli-8.2K-333.svg?colorA=000"/></a> <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-F0B.svg?colorA=000"/></a>
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

<details id="example$web" title="web" open><summary><span><a href="#example$web">#</a></span>  <code><strong>web</strong></code></summary>  <ul><p></p>  <a href="https://stagas.github.io/x-knob/example/web.html"><img width="514.2857142857142" src="example/web.webp"></img>  <p><strong>Try it live</strong></p></a>    <details id="source$web" title="web source code" ><summary><span><a href="#source$web">#</a></span>  <code><strong>view source</strong></code></summary>  <a href="example/web.ts">example/web.ts</a>  <p>

```ts
import { KnobElement } from 'x-knob'

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
  knob.target! += (knob.normal > 0.5
    ? -1
    : knob.normal === 0.5
    ? (Math.random() - 0.5) * 2
    : 1)
    * Math.random()
    * knob.scale
    * 0.95
  if (i >= knobs.length)
    clearInterval(ivl)
}, 60)
```

</p>
</details></ul></details>

## API

<p>  <details id="KnobElement$2" title="Class" open><summary><span><a href="#KnobElement$2">#</a></span>  <code><strong>KnobElement</strong></code>    </summary>  <a href="src/x-knob.tsx#L9">src/x-knob.tsx#L9</a>  <ul>        <p>  <details id="constructor$4" title="Constructor" ><summary><span><a href="#constructor$4">#</a></span>  <code><strong>constructor</strong></code><em>()</em>    </summary>    <ul>    <p>  <details id="new KnobElement$5" title="ConstructorSignature" ><summary><span><a href="#new KnobElement$5">#</a></span>  <code><strong>new KnobElement</strong></code><em>()</em>    </summary>    <ul><p><a href="#KnobElement$2">KnobElement</a></p>        </ul></details></p>    </ul></details><details id="arrow$39" title="Property" ><summary><span><a href="#arrow$39">#</a></span>  <code><strong>arrow</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>...</code></span>  </summary>  <a href="src/x-knob.tsx#L63">src/x-knob.tsx#L63</a>  <ul><p>{<p>  <details id="pos$42" title="Property" ><summary><span><a href="#pos$42">#</a></span>  <code><strong>pos</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>23</code></span>  </summary>    <ul><p>number</p>        </ul></details><details id="size$41" title="Property" ><summary><span><a href="#size$41">#</a></span>  <code><strong>size</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>0</code></span>  </summary>    <ul><p>number</p>        </ul></details><details id="width$43" title="Property" ><summary><span><a href="#width$43">#</a></span>  <code><strong>width</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>5</code></span>  </summary>    <ul><p>number</p>        </ul></details></p>}</p>        </ul></details><details id="circle$13" title="Property" ><summary><span><a href="#circle$13">#</a></span>  <code><strong>circle</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>-1</code></span>  </summary>  <a href="src/x-knob.tsx#L25">src/x-knob.tsx#L25</a>  <ul><p>number</p>        </ul></details><details id="cone$16" title="Property" ><summary><span><a href="#cone$16">#</a></span>  <code><strong>cone</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>...</code></span>  </summary>  <a href="src/x-knob.tsx#L36">src/x-knob.tsx#L36</a>  <ul><p>{<p>  <details id="contrast$21" title="Property" ><summary><span><a href="#contrast$21">#</a></span>  <code><strong>contrast</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>1.38</code></span>  </summary>    <ul><p>number</p>        </ul></details><details id="radius$18" title="Property" ><summary><span><a href="#radius$18">#</a></span>  <code><strong>radius</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>28</code></span>  </summary>    <ul><p>number</p>        </ul></details><details id="rays$19" title="Property" ><summary><span><a href="#rays$19">#</a></span>  <code><strong>rays</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>0</code></span>  </summary>    <ul><p>number</p>        </ul></details><details id="shine$20" title="Property" ><summary><span><a href="#shine$20">#</a></span>  <code><strong>shine</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>1.2</code></span>  </summary>    <ul><p>number</p>        </ul></details></p>}</p>        </ul></details><details id="css$7" title="Property" ><summary><span><a href="#css$7">#</a></span>  <code><strong>css</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>''</code></span>  </summary>  <a href="src/x-knob.tsx#L15">src/x-knob.tsx#L15</a>  <ul><p>string</p>        </ul></details><details id="disc$22" title="Property" ><summary><span><a href="#disc$22">#</a></span>  <code><strong>disc</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>...</code></span>  </summary>  <a href="src/x-knob.tsx#L43">src/x-knob.tsx#L43</a>  <ul><p>{<p>  <details id="behind$24" title="Property" ><summary><span><a href="#behind$24">#</a></span>  <code><strong>behind</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>false</code></span>  </summary>    <ul><p>boolean</p>        </ul></details><details id="count$27" title="Property" ><summary><span><a href="#count$27">#</a></span>  <code><strong>count</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>131</code></span>  </summary>    <ul><p>number</p>        </ul></details><details id="radius$25" title="Property" ><summary><span><a href="#radius$25">#</a></span>  <code><strong>radius</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>0</code></span>  </summary>    <ul><p>number</p>        </ul></details><details id="rays$26" title="Property" ><summary><span><a href="#rays$26">#</a></span>  <code><strong>rays</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>5</code></span>  </summary>    <ul><p>number</p>        </ul></details></p>}</p>        </ul></details><details id="dot$54" title="Property" ><summary><span><a href="#dot$54">#</a></span>  <code><strong>dot</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>...</code></span>  </summary>  <a href="src/x-knob.tsx#L81">src/x-knob.tsx#L81</a>  <ul><p>{<p>  <details id="pos$57" title="Property" ><summary><span><a href="#pos$57">#</a></span>  <code><strong>pos</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>25</code></span>  </summary>    <ul><p>number</p>        </ul></details><details id="size$56" title="Property" ><summary><span><a href="#size$56">#</a></span>  <code><strong>size</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>0</code></span>  </summary>    <ul><p>number</p>        </ul></details></p>}</p>        </ul></details><details id="fill$44" title="Property" ><summary><span><a href="#fill$44">#</a></span>  <code><strong>fill</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>...</code></span>  </summary>  <a href="src/x-knob.tsx#L69">src/x-knob.tsx#L69</a>  <ul><p>{<p>  <details id="gap$48" title="Property" ><summary><span><a href="#gap$48">#</a></span>  <code><strong>gap</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>6</code></span>  </summary>    <ul><p>number</p>        </ul></details><details id="radius$46" title="Property" ><summary><span><a href="#radius$46">#</a></span>  <code><strong>radius</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>37</code></span>  </summary>    <ul><p>number</p>        </ul></details><details id="size$47" title="Property" ><summary><span><a href="#size$47">#</a></span>  <code><strong>size</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>-1</code></span>  </summary>    <ul><p>number</p>        </ul></details></p>}</p>        </ul></details><details id="filters$15" title="Property" ><summary><span><a href="#filters$15">#</a></span>  <code><strong>filters</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>...</code></span>  </summary>  <a href="src/x-knob.tsx#L31">src/x-knob.tsx#L31</a>  <ul><p>any</p>        </ul></details><details id="gap$14" title="Property" ><summary><span><a href="#gap$14">#</a></span>  <code><strong>gap</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>30</code></span>  </summary>  <a href="src/x-knob.tsx#L26">src/x-knob.tsx#L26</a>  <ul><p>number</p>        </ul></details><details id="leds$28" title="Property" ><summary><span><a href="#leds$28">#</a></span>  <code><strong>leds</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>...</code></span>  </summary>  <a href="src/x-knob.tsx#L50">src/x-knob.tsx#L50</a>  <ul><p>{<p>  <details id="count$30" title="Property" ><summary><span><a href="#count$30">#</a></span>  <code><strong>count</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>0</code></span>  </summary>    <ul><p>number</p>        </ul></details><details id="radius$32" title="Property" ><summary><span><a href="#radius$32">#</a></span>  <code><strong>radius</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>30</code></span>  </summary>    <ul><p>number</p>        </ul></details><details id="size$31" title="Property" ><summary><span><a href="#size$31">#</a></span>  <code><strong>size</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>5</code></span>  </summary>    <ul><p>number</p>        </ul></details></p>}</p>        </ul></details><details id="line$49" title="Property" ><summary><span><a href="#line$49">#</a></span>  <code><strong>line</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>...</code></span>  </summary>  <a href="src/x-knob.tsx#L75">src/x-knob.tsx#L75</a>  <ul><p>{<p>  <details id="pos$52" title="Property" ><summary><span><a href="#pos$52">#</a></span>  <code><strong>pos</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>25</code></span>  </summary>    <ul><p>number</p>        </ul></details><details id="size$51" title="Property" ><summary><span><a href="#size$51">#</a></span>  <code><strong>size</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>0</code></span>  </summary>    <ul><p>number</p>        </ul></details><details id="width$53" title="Property" ><summary><span><a href="#width$53">#</a></span>  <code><strong>width</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>6.5</code></span>  </summary>    <ul><p>number</p>        </ul></details></p>}</p>        </ul></details><details id="marks$33" title="Property" ><summary><span><a href="#marks$33">#</a></span>  <code><strong>marks</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>...</code></span>  </summary>  <a href="src/x-knob.tsx#L56">src/x-knob.tsx#L56</a>  <ul><p>{<p>  <details id="big$37" title="Property" ><summary><span><a href="#big$37">#</a></span>  <code><strong>big</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>7</code></span>  </summary>    <ul><p>number</p>        </ul></details><details id="count$35" title="Property" ><summary><span><a href="#count$35">#</a></span>  <code><strong>count</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>0</code></span>  </summary>    <ul><p>number</p>        </ul></details><details id="radius$36" title="Property" ><summary><span><a href="#radius$36">#</a></span>  <code><strong>radius</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>40</code></span>  </summary>    <ul><p>number</p>        </ul></details><details id="small$38" title="Property" ><summary><span><a href="#small$38">#</a></span>  <code><strong>small</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>4</code></span>  </summary>    <ul><p>number</p>        </ul></details></p>}</p>        </ul></details><details id="max$10" title="Property" ><summary><span><a href="#max$10">#</a></span>  <code><strong>max</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>100</code></span>  </summary>  <a href="src/x-knob.tsx#L20">src/x-knob.tsx#L20</a>  <ul><p>number</p>        </ul></details><details id="min$9" title="Property" ><summary><span><a href="#min$9">#</a></span>  <code><strong>min</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>0</code></span>  </summary>  <a href="src/x-knob.tsx#L19">src/x-knob.tsx#L19</a>  <ul><p>number</p>        </ul></details><details id="minMax$58" title="Property" ><summary><span><a href="#minMax$58">#</a></span>  <code><strong>minMax</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>...</code></span>  </summary>  <a href="src/x-knob.tsx#L86">src/x-knob.tsx#L86</a>  <ul><p>{<p>  <details id="pos$61" title="Property" ><summary><span><a href="#pos$61">#</a></span>  <code><strong>pos</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>10</code></span>  </summary>    <ul><p>number</p>        </ul></details><details id="size$60" title="Property" ><summary><span><a href="#size$60">#</a></span>  <code><strong>size</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>0</code></span>  </summary>    <ul><p>number</p>        </ul></details><details id="space$62" title="Property" ><summary><span><a href="#space$62">#</a></span>  <code><strong>space</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>10</code></span>  </summary>    <ul><p>number</p>        </ul></details></p>}</p>        </ul></details><details id="shape$63" title="Property" ><summary><span><a href="#shape$63">#</a></span>  <code><strong>shape</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>...</code></span>  </summary>  <a href="src/x-knob.tsx#L92">src/x-knob.tsx#L92</a>  <ul><p>{<p>  <details id="edge$68" title="Property" ><summary><span><a href="#edge$68">#</a></span>  <code><strong>edge</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>1.4</code></span>  </summary>    <ul><p>number</p>        </ul></details><details id="gap$69" title="Property" ><summary><span><a href="#gap$69">#</a></span>  <code><strong>gap</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>5</code></span>  </summary>    <ul><p>number</p>        </ul></details><details id="notches$66" title="Property" ><summary><span><a href="#notches$66">#</a></span>  <code><strong>notches</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>15</code></span>  </summary>    <ul><p>number</p>        </ul></details><details id="radius$65" title="Property" ><summary><span><a href="#radius$65">#</a></span>  <code><strong>radius</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>0</code></span>  </summary>    <ul><p>number</p>        </ul></details><details id="tension$67" title="Property" ><summary><span><a href="#tension$67">#</a></span>  <code><strong>tension</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>1.6</code></span>  </summary>    <ul><p>number</p>        </ul></details></p>}</p>        </ul></details><details id="step$11" title="Property" ><summary><span><a href="#step$11">#</a></span>  <code><strong>step</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>1</code></span>  </summary>  <a href="src/x-knob.tsx#L21">src/x-knob.tsx#L21</a>  <ul><p>number</p>        </ul></details><details id="symmetric$12" title="Property" ><summary><span><a href="#symmetric$12">#</a></span>  <code><strong>symmetric</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>false</code></span>  </summary>  <a href="src/x-knob.tsx#L23">src/x-knob.tsx#L23</a>  <ul><p>boolean</p>        </ul></details><details id="target$70" title="Property" ><summary><span><a href="#target$70">#</a></span>  <code><strong>target</strong></code>    </summary>  <a href="src/x-knob.tsx#L100">src/x-knob.tsx#L100</a>  <ul><p>number</p>        </ul></details><details id="theme$6" title="Property" ><summary><span><a href="#theme$6">#</a></span>  <code><strong>theme</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>''</code></span>  </summary>  <a href="src/x-knob.tsx#L14">src/x-knob.tsx#L14</a>  <ul><p>string</p>        </ul></details><details id="value$8" title="Property" ><summary><span><a href="#value$8">#</a></span>  <code><strong>value</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>0</code></span>  </summary>  <a href="src/x-knob.tsx#L17">src/x-knob.tsx#L17</a>  <ul><p>number</p>        </ul></details></p></ul></details><details id="themes$1" title="Variable" open><summary><span><a href="#themes$1">#</a></span>  <code><strong>themes</strong></code>  <span><span>&nbsp;=&nbsp;</span>  <code>...</code></span>  </summary>  <a href="src/themes.ts#L4">src/themes.ts#L4</a>  <ul><p><span>Record</span>&lt;string, <span>Omit</span>&lt;<span>Omit</span>&lt;<span>Partial</span>&lt;<a href="#KnobElement$2">KnobElement</a>&gt;, <code>"children"</code>&gt;, keyof     <span>JSX.HTMLAttributes</span>&lt;<a href="#KnobElement$2">KnobElement</a>&gt;&gt;&gt;</p>        </ul></details></p>

## Credits

- [memoize-pure](https://npmjs.org/package/memoize-pure) by [stagas](https://github.com/stagas) &ndash; low footprint memoize for just pure sync functions with scalar arguments
- [mixter](https://npmjs.org/package/mixter) by [stagas](https://github.com/stagas) &ndash; A Web Components framework.
- [relative-mouse](https://npmjs.org/package/relative-mouse) by [stagas](https://github.com/stagas) &ndash; Get mouse position relative to a DOM element.

## Contributing

[Fork](https://github.com/stagas/x-knob/fork) or [edit](https://github.dev/stagas/x-knob) and submit a PR.

All contributions are welcome!

## License

<a href="LICENSE">MIT</a> &copy; 2022 [stagas](https://github.com/stagas)

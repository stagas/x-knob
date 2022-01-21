import './style.css'

import { css } from 'nested-css'
import { RgbaStringBase } from 'vanilla-colorful/lib/entrypoints/rgba-string'
import { Fragment, h, render } from '@stagas/vele'
import { KnobElement } from '../src'
import { Control } from '../src/control'

customElements.define('x-knob', KnobElement)
customElements.define('x-control', Control)
customElements.define('x-rgba', RgbaStringBase)

const style = css`
  x-knob {
    input[type='range'] {
      display: none;
    }
  }

  .dark x-knob,
  x-knob.dark {
    --white: #000;
    --black: #fff;

    user-select: none;

    &::part(knob-circle) {
      fill: var(--white);
    }

    &::part(knob-fill) {
      stroke: var(--white);
    }

    &::part(knob-fill-value) {
      stroke: var(--black);
    }

    &::part(knob-outer) {
      width: 100px;
      height: 100px;
    }
  }

  x-control {
    display: flex;
    flex-flow: row nowrap;
    place-items: center;
    label {
      color: var(--grey);
    }
    x-knob {
      display: flex;
      flex-flow: row nowrap;
      &::part(knob-container) {
        display: flex;
        flex-flow: row nowrap;
        place-items: center;
      }
      &::part(knob-minmax) {
        display: none;
      }
    }
    input[type='number'] {
      width: 50px;
    }
  }

  .knobs {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;

    x-knob {
      margin: 10px;
    }
  }

  x-knob.smaller::part(knob-outer) {
    width: 30px;
    height: 30px;
  }

  .controls {
    display: flex;
    padding: 20px;
    background: rgba(0, 0, 0, 0.85);
    flex-flow: column nowrap;
    align-items: flex-end;
    position: fixed;
    z-index: 10000;
    top: 0;
    right: 0;
  }

  .color-picker {
    &-rgba {
      position: absolute;
      padding: 50px;
      right: -30px;
      top: -50px;
    }
    &:not(:hover) &-rgba {
      display: none;
    }
  }

  x-rgba {
    border-radius: 0;
    width: 60px;
    height: 80px;
    &::part(saturation) {
      width: 60px;
      height: 60px;
      border-radius: 0;
    }
    &::part(alpha),
    &::part(hue) {
      width: 60px;
      border-radius: 0;
      max-height: 15px;
    }
    &::part(saturation-pointer) {
      width: 12px;
      height: 12px;
      margin-top: 6px;
      border-width: 1px;
      box-shadow: none;
    }
    &::part(alpha-pointer),
    &::part(hue-pointer) {
      width: 7px;
      height: 90%;
      border-radius: 0;
      border: none !important;
      outline: none !important;
      border: 1px solid #fff !important;
      background-color: inherit !important;
    }
  }
`

const mainStyle = document.createElement('style')
mainStyle.innerHTML = style('html,body')
document.head.appendChild(mainStyle)

const Range = ({
  query,
  attr,
  value,
  min,
  max,
  step,
}: {
  query: string
  attr: string
  value?: string | number
  min: string | number
  max: string | number
  step: string | number
}) => (
  <x-control query={query} attr={attr}>
    <label>{attr}</label>
    <x-knob class="c smaller" line="20" shape fill>
      <input type="range" value={value} min={min} max={max} step={step} />
      <input type="number" min={min} max={max} step={step} />
    </x-knob>
  </x-control>
)

const Multiple = ({ query, options }: { query: string; options: string[] }) => (
  <x-control query={query} options={options}>
    <select multiple size={options.length}>
      {options.map(value => (
        <option
          key={value}
          value={value}
          onmousedown={e => {
            e.preventDefault()
            e.currentTarget.selected = !e.currentTarget.selected
            e.currentTarget.dispatchEvent(new InputEvent('input', { bubbles: true }))
          }}
        >
          {value}
        </option>
      ))}
    </select>
  </x-control>
)

// const Color = () => {
//   const ref = {
//     set current(value: RgbaStringBase) {
//       value.addEventListener('color-changed', e => {
//         const color = e.detail.value
//         div.current!.style.background = color
//       })
//     },
//   }
//   const div = {} as { current?: HTMLElement }
//   const initial = 'rgba(255,0,0,1)'
//   return (
//     <div class="color-picker" ref={div} style={{ width: '20px', height: '20px', background: initial, position: 'relative' }}>
//       <div class="color-picker-rgba">
//         <x-rgba ref={ref} color={initial}></x-rgba>
//       </div>
//     </div>
//   )
// }

const rand = (n: number) => (Math.random() * n) | 0

const App = () => (
  <>
    <div class="page">
      <div class="knobs">
        <x-knob class="dark" theme="gauge">
          <input type="range" step="1" value={rand(100)} />
        </x-knob>
        <x-knob class="dark" theme="compass">
          <input type="range" step="1" value={rand(100)} />
        </x-knob>
        <x-knob class="dark" theme="ableton">
          <input type="range" step="1" value={rand(100)} />
        </x-knob>
        <x-knob class="dark" theme="retro" symmetric>
          <input type="range" step="1" value={rand(100)} />
        </x-knob>
        <x-knob theme="sweet">
          <input type="range" step="1" value={rand(100)} />
        </x-knob>
        <x-knob class="dark" theme="power" symmetric>
          <input type="range" step="1" value={rand(100)} />
        </x-knob>
        <x-knob class="dark" theme="dark" symmetric>
          <input type="range" step="1" value={rand(100)} />
        </x-knob>
      </div>

      <div class="controls">
        <button
          onclick={() => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const obj = Object.fromEntries(
              [...(document.querySelectorAll('x-control') as any)]
                .map(c => {
                  const target = document.querySelector(c.query)
                  if (c.attr) {
                    return [[c.attr, target[c.attr]]]
                  } else if (c.options) {
                    return c.options.map((o: string) => [o, target.hasAttribute(o)])
                  }
                })
                .flat()
            )
            navigator.clipboard.writeText(JSON.stringify(obj, null, 2))
            console.log(obj)
            console.log('copied')
          }}
        >
          copy
        </button>
        <Range query="x-knob" attr="gap" min="0" max="360" step="1" />
        <Range query="x-knob" attr="marks" value="20" min="0" max="200" step="1" />
        <Range query="x-knob" attr="leds" value="20" min="-1" max="100" step="1" />
        <Range query="x-knob" attr="disc" value="20" min="-1" max="100" step="0.5" />
        <Range query="x-knob" attr="fill" value="20" min="-1" max="20" step="0.5" />
        <Range query="x-knob" attr="fillgap" value="20" min="0" max="20" step="0.5" />

        <Range query="x-knob" attr="circle" value="36" min="-1" max="100" step="0.5" />
        <Range query="x-knob" attr="radius" value="20" min="-1" max="100" step="0.5" />

        <Range query="x-knob" attr="arrow" value="7" min="0" max="50" step="0.5" />
        <Range query="x-knob" attr="arrowpos" value="25" min="0" max="50" step="0.5" />

        <Range query="x-knob" attr="line" value="0" min="0" max="100" step="0.5" />
        <Range query="x-knob" attr="linepos" value="0" min="0" max="100" step="0.5" />
        <Range query="x-knob" attr="linewidth" value="0" min="0" max="20" step="0.5" />

        <Range query="x-knob" attr="shapenotches" value="0" min="0" max="20" step="1" />
        <Range query="x-knob" attr="shapetension" value="0" min="1" max="3" step="0.01" />
        <Range query="x-knob" attr="shapeedge" value="0" min="0" max="10" step="0.05" />
        <Range query="x-knob" attr="shapegap" value="0" min="0" max="10" step="0.25" />

        <Multiple query="x-knob" options={['cone', 'symmetric']} />
        {/* <Color /> */}
      </div>
    </div>
  </>
)

render(<App />, document.querySelector('main')!)

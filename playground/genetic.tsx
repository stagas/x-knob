/** @jsxImportSource mixter/jsx */

import { create } from 'mixter'
import { element, jsx } from 'mixter/jsx'
import { KnobElement, themes } from '../src'

const css = /*css*/ `
html, body {
  background: #333;
}
`
const style = document.createElement('style')
style.textContent = css
document.body.appendChild(style)
class Schema {
  circle = [-1, 35, 0.1]
  gap = [0, 30, 0.1]

  inset = {
    show: [false, true, 0.2],
    dx: [1.5, 1.5, 0.1],
    dy: [3.5, 3.5, 0.1],
    blur: [2.5, 2.5, 0.2],
  }

  light = {
    show: [false, true, 0.1],
  }

  shine = {
    show: [false, true, 0.1],
    scale: [7, 7, 0.1],
  }

  cone = {
    radius: [0, 28, 0.1],
    rays: [40, 40, 0.1],
    shine: [1.2, 1.2, 0.1],
    contrast: [1.38, 1.38, 0.1],
  }

  disc = {
    behind: [false, true, 0.1],
    radius: [0, 30, 0.1],
    rays: [5, 5, 0.1],
    count: [131, 131, 0.3],
  }

  leds = {
    count: [0, 30, 0.3],
    size: [5, 5, 0.2],
    radius: [30, 30, 0.1],
  }

  marks = {
    count: [0, 15, 0.3],
    radius: [40, 40, 0.1],
    big: [7, 7, 0.1],
    small: [4, 4, 0.1],
  }

  arrow = {
    size: [0, 5, 0.1],
    pos: [23, 23, 0.1],
    width: [5, 5, 0.1],
  }

  fill = {
    radius: [37, 37, 0.1],
    size: [-1, 5, 0.1],
    gap: [6, 6, 0.1],
  }

  line = {
    size: [0, 15, 0.1],
    pos: [25, 25, 0.1],
    width: [6.5, 6.5, 0.1],
  }

  dot = {
    size: [0, 2, 0.1],
    pos: [25, 25, 0.1],
  }

  minMax = {
    size: [0, 12, 0.1],
    pos: [10, 10, 0.1],
    space: [10, 10, 0.1],
  }

  shape = {
    radius: [0, 30, 0.1],
    notches: [15, 15, 0.1],
    tension: [1.6, 1.6, 0.1],
    edge: [1.4, 1.4, 0.1],
    gap: [5, 5, 0.1],
  }

  css = ''
}

const deviate = (v: number | boolean, a: number) =>
  typeof v === 'boolean'
    ? Math.random() < a
    : v + (v * a) * (Math.random() - 0.5)
const mutate = (theme: any, schema: any, source: any, a: number) => {
  for (const [key, value] of Object.entries(schema)) {
    if (typeof value === 'string') {
      theme[key] = source[key]
      continue
    }
    if (Array.isArray(value)) {
      const [off, on, chances] = value
      theme[key] = key in source ? source[key] : off
      // turn on or off
      if (Math.random() < chances && Math.random() < a) {
        if (!(key in source) || source[key] === off) theme[key] = on
        else theme[key] = off
      }
      // deviate
      if (key in theme && theme[key] !== off) theme[key] = deviate(theme[key], a)
    } else {
      theme[key] = mutate({}, value, source[key] || {}, a)
    }
  }
  return theme
}

const App = create(
  class {
    Knob = element(KnobElement)
    themes = themes
    sourceTheme?: any
    generateTheme?: (source: any) => void
  },
  ({ $, effect }) => {
    const { render } = jsx($)

    effect(({ sourceTheme }) => {
      const schema = new Schema()
      const themes: any = []
      for (let a = 0.1; a < 0.75; a += 0.05) {
        const theme = mutate({}, schema, sourceTheme, a)
        themes.push(theme)
      }
      $.themes = themes
    })

    render(({ Knob, themes }) => {
      const knobs = Object
        .values(themes)
        .map(theme => (
          <div style="display:inline-flex; flex-flow: column nowrap;">
            <div style="display:flex;justify-content:center;gap:10px;">
              <button
                onclick={e => {
                  e.preventDefault()
                  navigator.clipboard.writeText(JSON.stringify(theme, null, 2))
                }}
              >
                copy
              </button>
              <button
                onclick={() => {
                  $.sourceTheme = theme
                }}
              >
                pick
              </button>
            </div>
            <Knob {...theme} />
          </div>
        ))

      return (
        <>
          <style>
            {`
            ${Knob} {
              width: 130px;
            }
            button {
              background: none;
              border: 1px solid #666;
              color: #999;
              cursor: pointer;
            }
            button:hover {
              border-color: #fff;
              color: #fff;
            }
            button:hover:active {
              background: #fff;
              color: #000;
            }
          `}
          </style>
          {knobs}
        </>
      )
    })
  }
)

customElements.define('x-app', App)
const app = new App()
document.body.appendChild(app)

import { settable, setter } from 'setter-decorator'
import { withProperties } from 'with-properties'
import { Fragment, h, render } from '@stagas/vele'
import { Cone, Disc, MinMax, Rotary } from './components'
import { drawFill, drawLeds, drawMarks, drawShape } from './shapes'
import { themes } from './themes'
import { allChildrenOf } from './util'

type Input = {
  value: number
  oninput: () => void
  getAttribute: (attr: string) => number
} & Element

const boolean = setter(value => (typeof value === 'boolean' ? value : value != null))
const finite = setter((value, oldValue) => (isFinite(+value) ? +value : oldValue))
const finiteOr = (fallback: number) => setter(value => (isFinite(+value) ? +value : fallback))

@settable
export class HTMLKnobElement {
  theme = 'sweet'

  @boolean cone?: boolean
  @boolean radial?: boolean
  @boolean symmetric?: boolean

  @finite disc = -1
  @finite marks = -1

  @finite fill = -1
  @finite fillgap = 6

  @finite leds = -1
  @finite radius = 48

  @finite shapenotches = 15
  @finite shapetension = 1.6
  @finite shapeedge = 1.4
  @finite shapegap = 5

  @finite arrow = 0
  @finite arrowpos = 23
  @finite line = 0
  @finite linepos = 25
  @finite linewidth = 6.5
  @finite gap = 30
  @finite circle = -1
  @finite minmaxy = 92.5
  @finite size = 100
  @finite fontsize = 12
  @finite fontpos = 10
  @finite fontspace = 10

  @finiteOr(1) step!: number
  @finiteOr(0) min!: number
  @finiteOr(100) max!: number

  @finite value = 50
}

export class KnobElement extends withProperties(HTMLElement, HTMLKnobElement) {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.attachEvents()
  }

  draw() {
    // computed
    const normal = (this.value - this.min) / (this.max - this.min)

    render(
      <>
        <style>
          {
            /*css*/ `
          :host {
            --white: #fff;
            --grey: #888;
            --dark: #666;
            --light: #aaa;
            --black: #151515;

            display: flex;
            flex-flow: column wrap;
            place-items: center;
          }

          [part=knob-svg] {
            position: absolute;
          }

          [part=knob-circle] {
            fill: var(--black);
          }

          [part=knob-arrow] {
            fill: var(--black);
          }

          path[part=knob-line] {
            stroke: var(--black);
            stroke-width: ${this.linewidth}px;
            stroke-linejoin: round;
          }

          circle[part=knob-line] {
            fill: var(--black);
          }

          [part=knob-fill] {
            fill: none;
            stroke: var(--dark);
            stroke-width: ${this.fill || 5}px;
          }

          [part=knob-fill-value] {
            fill: none;
            stroke: var(--white);
            stroke-width: ${this.fill || 5}px;
          }

          [part=knob-cone] {
            stroke: var(--grey);
          }

          [part=knob-marks] {
            stroke: var(--dark);
            stroke-width: 1px;
          }

          [part=knob-leds] {
            fill: var(--dark);
            stroke: var(--dark);
          }

          [part=knob-leds-value] {
            fill: var(--black);
            stroke: var(--black);
            stroke-width: 2px;
          }

          [part=knob-outline] {
            fill: var(--black);
            stroke: var(--grey);
            stroke-width: 1px;
          }

          [part=knob-shape] {
            fill: var(--white);
          }

          [part=knob-outer] {
            pointer-events: none;
            box-sizing: border-box;
            position: relative;
            display: flex;
            width: 100px;
            height: 100px;
            align-items: center;
            justify-content: center;
          }

          [part=knob-disc] {
            position: absolute;
            box-sizing: border-box;
            background: var(--grey);
            box-shadow:
              inset 4px 4px 8px -2px var(--white),
              inset -4px -4px 8px -2px var(--dark)
              ;
            width: ${this.disc || 20}%;
            height: ${this.disc || 20}%;
            border-radius: 100%;
            z-index: 1;
          }

          [part=knob-minmax] {
            fill: var(--dark);
          }

          * {
            transform-origin: 50% 50%;
          }
        `
          }
        </style>

        <div part="knob-container" class={this.theme}>
          <div part="knob-outer">
            <svg part="knob-svg" viewBox="0 0 100 120">
              <svg viewBox="0 0 100 100">
                {this.circle >= 0 && <circle part="knob-circle" cx="50" cy="50" r={this.circle || 36} />}
                {this.fill >= 0 && (
                  <g>
                    <path part="knob-fill" d={drawFill(normal, this.gap, this.fillgap, this.symmetric)} />
                    <path part="knob-fill-value" d={drawFill(normal, this.gap, this.fillgap, this.symmetric, true)} />
                  </g>
                )}
                {this.leds > 0 && (
                  <g>
                    <path part="knob-leds" d={drawLeds(normal, this.leds, this.gap, this.symmetric)} />
                    <path part="knob-leds-value" d={drawLeds(normal, this.leds, this.gap, this.symmetric, true)} />
                  </g>
                )}
                {this.marks >= 2 && <path part="knob-marks" d={drawMarks(this.marks, this.gap)} />}
                <Rotary part="knob-rotary" normal={normal} gap={this.gap}>
                  {this.cone && <Cone part="knob-cone" normal={normal} gap={this.gap} />}
                  {this.radius >= 0 && (
                    <g>
                      <defs>
                        <clipPath id="shape">
                          <path
                            d={drawShape(this.shapenotches, 25, this.shapetension, this.shapeedge, this.shapegap)}
                            style={{ transform: `scale(${(this.radius || 50) / 50})` }}
                          />
                        </clipPath>
                      </defs>
                      <circle part="knob-shape" clip-path="url(#shape)" cx="50" cy="50" r="50" />
                    </g>
                  )}
                  {this.line &&
                    (this.line > 1 ? (
                      <path part="knob-line" clip-path={this.radius >= 0 ? 'url(#shape)' : null} d={`M ${this.linepos} 50 l ${this.line} 0 z`} />
                    ) : (
                      <circle part="knob-line" cx={this.linepos} cy="50" r={this.linewidth / 2} />
                    ))}
                  {!!this.arrow && (
                    <path part="knob-arrow" d={`M ${this.arrowpos} 50 L ${this.arrowpos + this.arrow} 45 L ${this.arrowpos + this.arrow} 55 z`} />
                  )}
                </Rotary>
                {this.disc >= 0 && <Disc part="knob-disc" disc={this.disc} normal={normal} gap={this.gap} />}
              </svg>

              {this.minmaxy >= 0 && (
                <MinMax
                  part="knob-minmax"
                  min={this.min}
                  max={this.max}
                  y={this.minmaxy}
                  fontsize={this.fontsize}
                  fontpos={this.fontpos}
                  fontspace={this.fontspace}
                />
              )}
            </svg>
          </div>
          <slot part="slot"></slot>
        </div>
      </>,
      this.shadowRoot as unknown as Element
    )
  }

  attachEvents() {
    let inputs: Input[] = []

    this.addEventListener(
      'wheel',
      (e: WheelEvent) => {
        const [pilot, ...rest] = inputs
        const sign = Math.sign(e.deltaY)
        const abs = Math.abs(e.deltaY)
        pilot.value = +pilot.value + Math.max(this.step, abs * 0.0005 * (this.max - this.min)) * sign
        // this.value = pilot.value

        rest.forEach(input => {
          input.value = pilot.value
          input.dispatchEvent(new InputEvent('input', { bubbles: true }))
        })

        pilot.dispatchEvent(new InputEvent('input', { bubbles: true }))
      },
      { passive: true }
    )

    // prevent page from scrolling
    this.addEventListener(
      'wheel',
      (e: WheelEvent) => {
        e.preventDefault()
        e.stopPropagation()
      },
      { passive: false }
    )

    this.shadowRoot!.addEventListener('slotchange', e => {
      const slot = e.target as HTMLSlotElement
      inputs = []
      allChildrenOf(slot).forEach(el => {
        if (el.nodeName !== 'INPUT') return

        const input = el as Input
        inputs.push(input)

        const mirrorValue = () => {
          this.value = input.value
          this.draw()
        }
        input.addEventListener('input', mirrorValue)

        // if this is the pilot element
        if (inputs.length === 1) {
          const mirrorAttributes = () => {
            this.step = input.getAttribute('step')
            this.min = input.getAttribute('min')
            this.max = input.getAttribute('max')
            if (this.min === this.max) {
              this.min = 0
              this.max = 100
            }
          }
          const observer = new MutationObserver(mutationsList => {
            for (const mutation of mutationsList) {
              if (mutation.type === 'attributes') {
                switch (mutation.attributeName) {
                  case 'step':
                  case 'min':
                  case 'max':
                    mirrorAttributes()
                    this.draw()
                    break
                }
              }
            }
          })
          observer.observe(input, { attributes: true })

          mirrorAttributes()
          mirrorValue()
        } else {
          input.value = inputs[0].value
        }
      })
    })
  }

  connectedCallback() {
    super.connectedCallback?.()
    if (this.theme) Object.assign(this, themes[this.theme])
    this.draw()
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    super.attributeChangedCallback?.(name, oldValue, newValue)
    if (name === 'theme') Object.assign(this, themes[this.theme])
    this.draw()
  }
}

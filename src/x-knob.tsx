/** @jsxImportSource minimal-view */

import { web, view, part, queue, chain, on, Off, element, event } from 'minimal-view'

// import { cheapRandomId } from 'everyday-utils'
// import { getRelativeMouseFromEvent } from 'relative-mouse'

// import { Style } from './components'
import { drawFill, drawLeds, drawMarks, drawRays, drawShape } from './shapes'
import { themes } from './themes'

class Theme {
  circle = 0
  gap = 30

  filters: any = {
    rotary: [],
    rotaryLine: [],
  }

  border = 0

  cone = {
    radius: 28,
    rays: 0,
    shine: 1.2,
    contrast: 1.38,
  }

  disc = {
    behind: false,
    radius: 0,
    rays: 5,
    count: 131,
  }

  leds = {
    count: 0,
    size: 5,
    radius: 30,
  }

  marks = {
    count: 0,
    radius: 40,
    big: 7,
    small: 4,
  }

  arrow = {
    size: 0,
    pos: 23,
    width: 5,
  }

  fill = {
    radius: 37,
    size: -1,
    gap: 6,
  }

  line = {
    size: 0,
    pos: 25,
    width: 6.5,
  }

  dot = {
    size: 0,
    pos: 25,
  }

  minMax = {
    size: 0,
    pos: 10,
    space: 10,
  }

  shape = {
    radius: 0,
    notches: 15,
    tension: 1.6,
    edge: 1.4,
    gap: 5,
  }
}

// interface Layout extends $.Element<Layout> {
//   fixed?: boolean
// }

// export interface KnobEvents {
//   lockstart: CustomEvent<{ cursor: string }>
//   lockend: CustomEvent
// }

export const Knob = web(view('knob', class props {
  id!: string
  theme!: string
  extraCss?= ''

  value!: number
  min!: number
  max!: number
  step!: number

  symmetric?= false

  vertical?= false

  circle?= 0
  gap?= 30
  pointerDownControl?= true
}, class local {
  host = element

  ownValue?: number
  min?: number
  max?: number

  animValue?: number
  border: any = 0

  filters: any = {
    rotary: [],
    rotaryLine: [],
  }

  cone = {
    radius: 28,
    rays: 0,
    shine: 1.2,
    contrast: 1.38,
  }

  disc = {
    behind: false,
    radius: 0,
    rays: 5,
    count: 131,
  }

  leds = {
    count: 0,
    size: 5,
    radius: 30,
  }

  marks = {
    count: 0,
    radius: 40,
    big: 7,
    small: 4,
  }

  arrow = {
    size: 0,
    pos: 23,
    width: 5,
  }

  fill = {
    radius: 37,
    size: -1,
    gap: 6,
  }

  line = {
    size: 0,
    pos: 25,
    width: 6.5,
  }

  dot = {
    size: 0,
    pos: 25,
  }

  minMax = {
    size: 0,
    pos: 10,
    space: 10,
  }

  shape = {
    radius: 0,
    notches: 15,
    tension: 1.6,
    edge: 1.4,
    gap: 5,
  }

  /** @private */
  scale = 1
  /** @private */
  normal = 0
  /** @private */
  vel = 0
  /** @private */
  degrees = 0

  /** @private */
  pointer = {
    id: -1,
    x: 0,
    y: 0,
  }
  /** @private */
  pointerDown = false

  /** @private */
  start = {
    y: -1,
    value: 0,
  }

  clipCircle = false

  svg?: SVGSVGElement
  rotary?: SVGGElement

  isHovering = false
},

  function actions({ $, fns, fn }) {
    return fns(new class actions {
      onWheel = fn(({ step, scale }) => (e: WheelEvent) => {
        const mul = e.deltaMode === 1 ? 15 : 1.12
        const sign = Math.sign(e.deltaY)
        const abs = Math.abs(e.deltaY) * mul
        $.ownValue! += Math.max(step, abs * 0.00015 * scale) * sign * (e.shiftKey ? 0.2 : 1)
      })
    })
  },

  ({ $, fx, fn, refs }) => {

    // const resetStart: () => void = () => {

    // }
    // const updatePointer: (e: PointerEvent) => void
    // const onPointerMove: (e: PointerEvent) => void
    // const onPointerDown: (e: PointerEvent) => void
    // const onPointerLeave: (e: PointerEvent) => void
    // const onHover: (e: PointerEvent) => void
    // const onWheel: (e: WheelEvent) => void


    fx(({ value }) => {
      if (value !== $.ownValue) {
        $.ownValue = value
      }
    })

    fx(({ theme }) => {
      if (theme) {
        Object.assign($, new Theme(), themes[theme])
      }
    })


    fx(({ min, max }) => {
      // this guard is the case where attribute 'min' arrives before 'max'
      // and there are operations that rely on 'max - min' (scale) being >0
      if (max - min <= 0) $.max = min + 1

      $.scale = max - min
    })

    fx(({ ownValue: value, min, max }) => {
      $.ownValue = Math.max(min, Math.min(max, value))
    })

    fx(({ animValue, min, max }) => {
      $.animValue = Math.max(min, Math.min(max, animValue))
    })

    fx(({ ownValue: value }) => {
      if ($.animValue == null) $.animValue = value
    })

    fx(({ animValue, min, scale }) => {
      $.normal = (animValue - min) / scale
    })

    fx(({ normal, gap }) => {
      const start = gap / 2 - 90
      const circle = 360 - gap
      $.degrees = normal * circle + start
    })

    // the raf here is to have time to receive the value from the compiler
    fx(({ host, ownValue: _, min: _0, max: _1 }) => {
      // $.dispatch.composed(host, 'input')
    })

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerId !== $.pointer.id) return
      $.pointer = {
        id: e.pointerId,
        ...({ x: e.pageX, y: e.pageY }), //getRelativeMouseFromEvent(host, e),
      }
    }

    const draw = fn(({ step }) => queue.raf((target: number) => {
      if (step == null) return
      // const target = $.value!
      $.vel *= 0.62

      if (Math.abs(target - $.animValue!) > step) {
        $.vel += (target - $.animValue!) * 0.068
        // if (Math.abs($.vel) > $.step * 14) {
        //   $.value = $.target
        //   $.vel = 0
        //   return
        // }
        const result = $.animValue! + $.vel
        if ((target > $.animValue! && result > target) || (target < $.animValue! && result < target)) {
          $.animValue = target
          $.vel = 0
        } else {
          $.animValue = result
          draw(target)
          // requestAnimationFrame(draw)
        }
        // if (($.vel < 0 && $.target! > $.value) || ($.vel > 0 && $.target! < $.value)) {
        //   $.value = $.target!
        //   $.vel = 0
        // } else {
        // }
      } else {
        $.animValue = target
        $.vel = 0
      }
    }))

    fx(({ ownValue: value }) => {
      draw(value)
    })

    fx(({ pointerDown, pointer, start, scale }) => {
      if (!pointerDown) return
      $.ownValue = start.value + (start.y - pointer.y) * scale * 0.01
    })


    const onPointerDown = fn(({ host }) => (e => {
      $.pointer = {
        id: e.pointerId,
        ...({ x: e.pageX, y: e.pageY }), //getRelativeMouseFromEvent(host, e),
      }
      $.start = {
        y: $.pointer.y,
        value: $.animValue!,
      }
      $.pointerDown = true
      // $.dispatch.composed.bubbles(host, 'lockstart', { cursor: 'ns' })
    }))

    fx(({ host, pointerDown }) => {
      if (!pointerDown) return

      const off: Off = on(window).pointermove(onPointerMove)
      const offOnce = on(window).pointerup.once(() => {
        $.pointerDown = false
        off()
        // $.dispatch.composed.bubbles(host, 'lockend')
      })

      return chain(off, offOnce)
    })



    const Border = part((update) => {
      fx(({ border }) => {
        update(<circle part="border" cx="50" cy="50" r={border ? border.radius : 38} />)
      })
    })

    const Circle = part((update) => {
      fx(({ normal, circle, clipCircle }) => {
        const r = circle || 36
        const diameter = r * 1.67
        const margin = (100 - diameter) / 2
        const height = normal * diameter
        update(<g>
          <defs>
            <clipPath id="circle">
              <rect id="circle-fill"
                x={0}
                y={margin + (diameter - height)}
                width={100}
                height={height} />
            </clipPath>
          </defs>
          <circle part="circle" clip-path={clipCircle ? "url(#circle)" : void 0} cx="50" cy="50" r={r} />
          {/* <use part="circle-outline" href="#circle-fill" /> */}
        </g>)
      })
    })

    const Fill = part((update) => {
      fx(({ normal, fill, gap, symmetric }) => {
        update(<g>
          <path part="fill" d={drawFill(normal, fill.radius, fill.gap, gap, symmetric)}
            vector-effect="non-scaling-stroke"
          />
          {normal > 0 && <path part="fill-value" d={drawFill(normal, fill.radius, fill.gap, gap, symmetric, true)}
            vector-effect="non-scaling-stroke"
          />}
        </g>)
      })
    })

    const Leds = part((update) => {
      fx(({ normal, leds, gap, symmetric }) => {
        update(<g>
          <path part="leds" d={drawLeds(normal, leds.count, leds.radius, leds.size, gap, symmetric)} />
          <path part="leds-value" d={drawLeds(normal, leds.count, leds.radius, leds.size, gap, symmetric, true)} />
        </g>)
      })
    })

    const Marks = part((update) => {
      fx(({ marks, gap }) => {
        update(<g>
          <path part="marks" d={drawMarks(marks.count, marks.radius, marks.big, marks.small, gap)} />
        </g>)
      })
    })


    const Cone = part((update) => {
      fx(({ normal, gap, cone }) => {
        const cn = (360 - gap) / 360
        const { rays, contrast, shine, radius } = cone
        update(
          <g part="cone">
            {drawRays(rays, radius).map((d, i) => {
              const r = rays * 2
              const half = r / 2
              let xi = normal * (r - r * (1 - cn)) + 1.6
              xi -= half * cn
              while (xi < 0) xi += r
              xi = i + xi
              xi %= r
              const light = 5 + shine * contrast ** (xi < half ? xi : half - (xi - half))
              return (
                <path
                  key={i}
                  d={d}
                  fill={`hsl(var(--cone-hue),var(--cone-sat),${light}%)`}
                  stroke={`hsl(var(--cone-hue),var(--cone-sat),${light}%)`}
                />
              )
            })}
          </g>
        )
      })
    })

    const Shape = part((update) => {
      fx(({ shape }) => {
        update(shape.radius > 0 && (
          <g>
            <defs>
              <clipPath id="shape">
                <path
                  id="shape-path"
                  d={drawShape(shape.notches, 25, shape.tension, shape.edge, shape.gap)}
                  style={{ transform: `scale(${shape.radius / 50})` }}
                />
              </clipPath>
            </defs>
            <circle part="shape" clip-path="url(#shape)" cx="50" cy="50" r="50" />
            <use part="outline" href="#shape-path" />
          </g>
        ))
      })
    })

    const Line = part((update) => {
      fx(({ line, shape }) => {
        update(<path
          part="line"
          clip-path={shape.radius > 0 ? 'url(#shape)' : null}
          d={`M ${line.pos} 50 l ${line.size} 0 z`}
          vector-effect="non-scaling-stroke"
        />)
      })
    })

    const Dot = part((update) => {
      fx(({ dot }) => {
        update(<circle part="dot" cx={dot.pos} cy="50" r={dot.size} />)
      })
    })

    const Arrow = part((update) => {
      fx(({ arrow }) => {
        update(<path
          part="arrow"
          d={`M ${arrow.pos} 50 L ${arrow.pos + arrow.size} ${50 - arrow.width} L ${arrow.pos + arrow.size} ${50 + arrow.width
            } z`}
        />)
      })
    })

    const RotaryKnobView = part((update) => {
      fx(({ filters, degrees, cone, shape }) => {
        update(
          <g
            part="rotary-knob-filters"
            style={{ filter: filters.rotaryKnob?.map((_: any, i: any) => `url(#rotaryKnob${i})`).join(' ') }}
          >
            <g part="rotary-knob" style={{ transform: `rotate(${degrees}deg)` }}>
              {cone.rays && <Cone />}
              {shape.radius && <Shape />}
            </g>
          </g>
        )
      })
    })

    const RotaryLineView = part((update) => {
      fx(({ filters, degrees, dot, line, arrow }) => {
        update(
          <g
            part="rotary-line-filters"
            style={{ filter: filters.rotaryLine?.map((_: any, i: any) => `url(#rotaryLine${i})`).join(' ') }}
          >
            <circle r="5" cx="0" cy="0" visibility="hidden"></circle>
            <g part="rotary-line" style={{ transform: `rotate(${degrees}deg)` }}>
              {line.size && <Line />}
              {dot.size && <Dot />}
              {!!arrow.size && <Arrow />}
            </g>
          </g>
        )
      })
    })

    const Disc = part((update) => {
      fx(({ disc, normal, gap }) => {
        const cn = (360 - gap) / 360
        const { count, radius, rays } = disc
        update(
          <g part="disc">
            {drawRays(count, radius).map((d, i) => {
              const r = count * 2
              let half = r / 2
              let xi = normal * (r * cn - r * cn * 2)
              xi -= half * cn
              while (xi < 0) xi += r
              xi = i + xi
              xi %= r / rays
              half = r / rays / 2
              const light = 10 + 35 * 1.22 ** ((i % 12 === 0 ? 1.09 : 1.065) ** (xi < half ? xi : half - (xi - half)))
              return <path key={i} d={d} fill={`hsl(0,0%,${light}%)`} stroke={`hsl(0,0%,${light}%)`} />
            })}
          </g>
        )
      })
    })

    fx(({ border, disc, fill, line, extraCss }) => {
      $.css = /*css*/`
      & {
        contain: layout style paint;
        --font-size: 20;
        --white: #fff;
        --grey: #888;
        --dark: #666;
        --light: #aaa;
        --black: #1515157a;
        --cone-hue: 0;
        --cone-sat: 0%;
        font-family: sans-serif;
        position: relative;
        touch-action: none;
        display: inline-flex;
        align-items: center;
        flex-flow: column nowrap;
        justify-content: space-around;
        user-select: none;
        overflow: hidden;
        overscroll-behavior: contain;
        width: 100%;
        height: 100%;
      }

      /* [part=slot] {
        display: flex;
        place-items: center;
        flex-flow: column nowrap;
        width: 100%;
      }
      */
      [part=svg] {
        contain: layout style paint;
        width: 100%;
        height: 100%;
        user-select: none;
        overflow: hidden;
        touch-action: none;
        shape-rendering: geometricPrecision;
      }

      [part=viewbox] {
        contain: size layout style paint;
        display: contents;
        overflow: hidden;
        pointer-events: none;
      }

      [part=circle] {
        fill: var(--black);
      }

      [part=border] {
        stroke: var(--black);
        stroke-width: ${border.size}px;
      }

      [part=arrow] {
        fill: var(--black);
      }

      [part=line] {
        stroke: var(--black);
        stroke-width: ${line.width}px;
        stroke-linejoin: round;
      }

      [part=dot] {
        fill: var(--white);
      }

      [part=outline] {
        fill: none;
        stroke: var(--light);
        stroke-width: 1px;
      }

      [part=fill] {
        fill: none;
        stroke: var(--dark);
        stroke-width: ${fill.size || 5}px;
        stroke-linejoin: round;
        stroke-linecap: round;
      }

      [part=fill-value] {
        fill: none;
        stroke: var(--white);
        stroke-width: ${fill.size || 5}px;
        stroke-linejoin: round;
        stroke-linecap: round;
      }

      [part=cone] {
        stroke: var(--grey);
      }

      [part=marks] {
        stroke: var(--dark);
        stroke-width: 1px;
      }

      [part=leds] {
        fill: var(--dark);
        stroke: var(--dark);
      }

      [part=leds-value] {
        fill: var(--black);
        stroke: var(--white);
        stroke-width: 2px;
      }

      [part=outline] {
        fill: var(--black);
        stroke: var(--grey);
        stroke-width: 1px;
      }

      [part=shape] {
        fill: var(--white);
      }

      [part=disc] {
        display: contents;
        box-sizing: border-box;
        background: var(--grey);
        /* box-shadow:
          inset 4px 4px 8px -2px var(--white),
          inset -4px -4px 8px -2px var(--dark); */
        width: ${disc.radius}%;
        height: ${disc.radius}%;
        border-radius: 100%;
        z-index: 1;
      }

      [part=minmax] {
        fill: var(--dark);
      }

      [part=rotary-outer] {
        pointer-events: all;
        touch-action: none;
      }

      * {
        transform-origin: 50% 50%;
      }

      ${extraCss ?? ''}
      `
    })

    fx(({ filters, border, circle, disc, fill, leds, marks, pointerDownControl, vertical }) => {
      $.view = <>
        {(
          <svg
            part="svg"
            ref={refs.svg}
            preserveAspectRatio={vertical ? 'xMaxYMid' : 'xMidYMax'}
            viewBox="0 0 100 100"
          >
            <svg part="viewbox" viewBox="0 0 100 100">
              <defs>
                {Object.entries(filters).map(([key, filters]: any) =>
                  filters.map((filter: any, i: number) => {
                    const { Filter } = filter
                    return <Filter id={key + i} {...filter} />
                  })
                )}
              </defs>
              <g
                part="rotary-outer"
                ref={refs.rotary}
                onpointerenter={() => {
                  $.isHovering = true
                }}
                onpointermove={() => {
                  $.isHovering = true
                }}
                onpointerleave={() => {
                  $.isHovering = false
                }}
                onpointercancel={() => {
                  $.isHovering = false
                }}
                onwheel={event.not.passive.prevent.stop(e => {
                  if (e.altKey) return
                  if ($.isHovering) {
                    e.stopPropagation()
                    e.preventDefault()
                    $.onWheel(e)
                  }
                  return false
                })}
                onpointerdown={pointerDownControl && onPointerDown}
              >
                {border && <Border />}
                {circle && <Circle />}
                {marks.count >= 2 && <Marks />}
                {leds.count > 0 && <Leds />}
                {disc.radius > 0 && <Disc />}
                {fill.size >= 0 && <Fill />}
                <g part="rotary">
                  <RotaryKnobView />
                  <RotaryLineView />
                </g>

                {disc.radius > 0 && !disc.behind && <Disc />}
              </g>
            </svg>
          </svg>
        )
        }
      </>
    })

  }))


  // TODO: autoSymmetric



//   mounted($: KnobElement['$']) {
//     // // the debounce here because when pulling from the context menu
//     // // the change events don't arrive because they haven't been registered yet
//     // // in the new workspace.
//     // $.effect.debounce(200)(({ host, fixed }) => {
//     //   if (!fixed) {
//     //     $.dispatch(host, 'change')
//     //   }
//     // })







//     // const Circle = $.part(({ circle }) => <circle part="circle" cx="50" cy="50" r={circle || 36} />)


//     // const MinMax = $.part(({ min, max, minMax }) => (
//     //   <g part="minmax">
//     //     <TextAlignCenter fontSize={minMax.size} width={50 + minMax.space} x={-minMax.space} y={90 + minMax.pos}>
//     //       {min}
//     //     </TextAlignCenter>
//     //     <TextAlignCenter fontSize={minMax.size} width={50 + minMax.space} x={50} y={90 + minMax.pos}>
//     //       {max}
//     //     </TextAlignCenter>
//     //   </g>
//     // ))

//     // .task here fixes issues with changing theme corrupting the view
//   }
// }

// // export const Knob = $.element(KnobElement)


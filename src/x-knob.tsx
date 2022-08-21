/** @jsxImportSource sigl */
import $ from 'sigl'

import { cheapRandomId } from 'everyday-utils'
// import { getRelativeMouseFromEvent } from 'relative-mouse'

import { Style } from './components'
import { drawFill, drawLeds, drawMarks, drawRays, drawShape } from './shapes'
import { themes } from './themes'

export interface KnobElement extends $.Element<KnobElement> {}

class Theme {
  circle = 0
  gap = 30

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
}

@$.element()
export class KnobElement extends HTMLElement {
  @$.attr.out() id = cheapRandomId()

  @$.attr() theme = ''
  @$.attr() extraCss = ''

  @$.attr.out() value = 0
  @$.attr() vertical = false

  @$.attr.out() min = $.Number
  @$.attr.out() max = $.Number
  @$.attr.out() step = $.Number

  // TODO: autoSymmetric
  @$.attr() symmetric = false

  @$.attr() circle = 0
  @$.attr() gap = 30

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

  targetValue?: number

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

  svg?: SVGSVGElement
  rotary?: SVGGElement

  isHovering = false

  resetStart?: () => void
  updatePointer?: (e: PointerEvent) => void
  onPointerMove?: (e: PointerEvent) => void
  onPointerDown?: (e: PointerEvent) => void
  onPointerLeave?: (e: PointerEvent) => void
  onHover?: (e: PointerEvent) => void
  onWheel?: (e: WheelEvent) => void

  mounted($: KnobElement['$']) {
    $.effect(({ theme }) => {
      if (theme) {
        Object.assign($, new Theme(), themes[theme])
      }
    })

    $.scale = $.reduce(({ min, max }) => {
      // this guard is the case where attribute 'min' arrives before 'max'
      // and there are operations that rely on 'max - min' (scale) being >0
      if (max - min <= 0) $.max = min + 1

      return max - min
    })

    $.targetValue = $.reduce(({ targetValue, min, max }) => Math.max(min, Math.min(max, targetValue)))
    $.value = $.reduce(({ value, min, max }) => Math.max(min, Math.min(max, value)))

    $.effect(({ value }) => {
      if ($.targetValue == null) $.targetValue = value
    })

    $.normal = $.reduce(({ value, min, scale }) => (value - min) / scale)

    $.degrees = $.reduce(({ normal, gap }) => {
      const start = gap / 2 - 90
      const circle = 360 - gap
      return normal * circle + start
    })

    // the raf here is to have time to receive the value from the compiler
    $.effect.raf(({ host, value: _, min: _0, max: _1 }) => {
      $.dispatch.composed(host, 'input')
    })

    $.onPointerMove = $.reduce(() => (e => {
      if (e.pointerId !== $.pointer.id) return
      $.pointer = {
        id: e.pointerId,
        ...({ x: e.pageX, y: e.pageY }), //getRelativeMouseFromEvent(host, e),
      }
    }))

    const draw = $.queue.raf(() =>
      $.mutate(() => {
        if ($.step == null) return
        const target = $.targetValue!
        $.vel *= 0.66
        if (Math.abs(target - $.value) > $.step * 0.15) {
          $.vel += (target - $.value) * 0.064
          // if (Math.abs($.vel) > $.step * 14) {
          //   $.value = $.target
          //   $.vel = 0
          //   return
          // }
          const result = $.value + $.vel
          if ((target > $.value && result > target) || (target < $.value && result < target)) {
            $.value = target
            $.vel = 0
          } else {
            $.value = result
            requestAnimationFrame(draw)
          }
          // if (($.vel < 0 && $.target! > $.value) || ($.vel > 0 && $.target! < $.value)) {
          //   $.value = $.target!
          //   $.vel = 0
          // } else {
          // }
        } else {
          $.value = $.targetValue!
          $.vel = 0
        }
      })
    )

    $.effect(({ targetValue: _ }) => {
      draw()
    })

    $.effect(({ pointerDown, pointer, start, scale }) => {
      if (!pointerDown) return
      $.targetValue = start.value + (start.y - pointer.y) * scale * 0.01
    })

    $.effect(({ pointerDown, onPointerMove }) => {
      if (!pointerDown) return

      const off: $.Off = $.on(window).pointermove(onPointerMove)
      const offOnce = $.on(window).pointerup.once(() => {
        $.pointerDown = false
        off()
      })

      return $.chain(off, offOnce)
    })

    $.onPointerDown = $.reduce(() => (e => {
      $.pointer = {
        id: e.pointerId,
        ...({ x: e.pageX, y: e.pageY }), //getRelativeMouseFromEvent(host, e),
      }
      $.start = {
        y: $.pointer.y,
        value: $.value,
      }
      $.pointerDown = true
    }))

    $.onWheel = $.reduce(({ step, scale }) => (e => {
      const mul = e.deltaMode === 1 ? 15 : 1.12
      const sign = Math.sign(e.deltaY)
      const abs = Math.abs(e.deltaY) * mul
      $.targetValue! += Math.max(step, abs * 0.0005 * scale) * sign * (e.shiftKey ? 0.2 : 1)
    }))

    const Circle = $.part(({ circle }) => <circle part="circle" cx="50" cy="50" r={circle || 36} />)

    const Fill = $.part(({ normal, fill, gap, symmetric }) => (
      <g>
        <path part="fill" d={drawFill(normal, fill.radius, fill.gap, gap, symmetric)} />
        <path part="fill-value" d={drawFill(normal, fill.radius, fill.gap, gap, symmetric, true)} />
      </g>
    ))

    const Leds = $.part(({ normal, leds, gap, symmetric }) => (
      <g>
        <path part="leds" d={drawLeds(normal, leds.count, leds.radius, leds.size, gap, symmetric)} />
        <path part="leds-value" d={drawLeds(normal, leds.count, leds.radius, leds.size, gap, symmetric, true)} />
      </g>
    ))

    const Marks = $.part(({ marks, gap }) => (
      <g>
        <path part="marks" d={drawMarks(marks.count, marks.radius, marks.big, marks.small, gap)} />
      </g>
    ))

    const Cone = $.part(({ normal, gap, cone }) => {
      const cn = (360 - gap) / 360
      const { rays, contrast, shine, radius } = cone
      return (
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

    const Shape = $.part(({ shape }) => (
      <g>
        <defs>
          <clipPath id="shape">
            <path
              id="shape-path"
              d={drawShape(shape.notches, 25, shape.tension, shape.edge, shape.gap)}
              style={{ transform: `scale(${(shape.radius || 50) / 50})` }}
            />
          </clipPath>
        </defs>
        <circle part="shape" clip-path="url(#shape)" cx="50" cy="50" r="50" />
        <use part="outline" href="#shape-path" />
      </g>
    ))

    const Line = $.part(({ line, shape }) => (
      <path
        part="line"
        clip-path={shape.radius > 0 ? 'url(#shape)' : null}
        d={`M ${line.pos} 50 l ${line.size} 0 z`}
      />
    ))

    const Dot = $.part(({ dot }) => <circle part="dot" cx={dot.pos} cy="50" r={dot.size} />)

    const Arrow = $.part(({ arrow }) => (
      <path
        part="arrow"
        d={`M ${arrow.pos} 50 L ${arrow.pos + arrow.size} ${50 - arrow.width} L ${arrow.pos + arrow.size} ${
          50 + arrow.width
        } z`}
      />
    ))

    const RotaryKnob = $.part(({ filters, degrees, cone, shape }) => {
      return (
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

    const RotaryLine = $.part(({ filters, degrees, dot, line, arrow }) => {
      return (
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

    const Disc = $.part(({ disc, normal, gap }) => {
      const cn = (360 - gap) / 360
      const { count, radius, rays } = disc
      return (
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

    // const MinMax = $.part(({ min, max, minMax }) => (
    //   <g part="minmax">
    //     <TextAlignCenter fontSize={minMax.size} width={50 + minMax.space} x={-minMax.space} y={90 + minMax.pos}>
    //       {min}
    //     </TextAlignCenter>
    //     <TextAlignCenter fontSize={minMax.size} width={50 + minMax.space} x={50} y={90 + minMax.pos}>
    //       {max}
    //     </TextAlignCenter>
    //   </g>
    // ))

    // .task here fixes issues with changing theme corrupting the view
    $.render.task((
      { filters, disc, fill, leds, line, marks, extraCss, onPointerDown, onWheel, vertical },
    ) => (
      <>
        <style>
          <Style lineWidth={line.width} fill={fill.size} disc={disc} extraCss={extraCss} />
        </style>
        <svg
          part="svg"
          ref={$.ref.svg}
          preserveAspectRatio={vertical ? 'xMaxYMid' : 'xMidYMax'}
          viewBox="0 0 100 120"
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
              ref={$.ref.rotary}
              onpointermove={() => {
                $.isHovering = true
              }}
              onpointerleave={() => {
                $.isHovering = false
              }}
              onwheel={$.event.not.passive(e => {
                if ($.isHovering) {
                  e.stopPropagation()
                  e.preventDefault()
                  onWheel(e)
                }
              })}
              onpointerdown={onPointerDown}
            >
              <Circle />
              {marks.count >= 2 && <Marks />}
              {leds.count > 0 && <Leds />}
              {disc.radius > 0 && disc.behind && <Disc />}
              <g part="rotary">
                <RotaryKnob />
                <RotaryLine />
              </g>
              {fill.size >= 0 && <Fill />}
              {disc.radius > 0 && !disc.behind && <Disc />}
            </g>
          </svg>
          {/* TODO: <text> trigger layout, need to rewrite using foreignElement + span */}
          {/* {minMax.size && <MinMax />} */}
        </svg>
      </>
    ))
  }
}

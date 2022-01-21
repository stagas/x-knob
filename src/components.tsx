import { h } from '@stagas/vele'
import { drawRays } from './shapes'

export const MinMax = ({
  fontsize,
  fontspace,
  fontpos,
  part,
  min,
  max,
  y,
}: {
  fontsize: number
  fontspace: number
  fontpos: number
  part: string
  min: number
  max: number
  y: number
}) => (
  <g part={part}>
    <TextAlignCenter fontsize={fontsize} width={50 - fontspace} x={fontspace} y={y + fontpos}>
      {min}
    </TextAlignCenter>
    <TextAlignCenter fontsize={fontsize} width={50 - fontspace} x={50} y={y + fontpos}>
      {max}
    </TextAlignCenter>
  </g>
)

export const Rotary = ({ part, normal, gap, children }: { part: string; normal: number; gap: number; children?: never }) => {
  const start = gap / 2 - 90
  const circle = 360 - gap
  const degrees = normal * circle + start
  return (
    <g part={part} style={{ transform: `rotate(${degrees}deg)` }}>
      {children}
    </g>
  )
}

export const Cone = ({ part, normal, gap }: { part: string; normal: number; gap: number }) => {
  const cn = (360 - gap) / 360
  return (
    <g part={part}>
      {drawRays(11).map((d, i) => {
        const r = 11 * 2
        const half = r / 2
        let xi = normal * (r - r * (1 - cn)) + 1.6
        xi -= half * cn
        while (xi < 0) xi += r
        xi = i + xi
        xi %= r
        const light =
          5 +
          1.2 *
            1.38 **
              (xi < half
                ? xi //
                : half - (xi - half))
        return <path key={i} d={d} fill={`hsl(0,0%,${light}%)`} stroke={`hsl(0,0%,${light}%)`} />
      })}
    </g>
  )
}

export const Disc = ({ part, disc, normal, gap }: { part: string; disc: number; normal: number; gap: number }) => {
  const cn = (360 - gap) / 360
  return (
    <g part={part}>
      {drawRays(131, disc || 20).map((d, i) => {
        const r = 131 * 2
        let half = r / 2
        let xi = normal * (r * cn - r * cn * 2)
        xi -= half * cn
        while (xi < 0) xi += r

        xi = i + xi
        xi %= r / 5
        half = r / 5 / 2
        const light =
          10 +
          35 *
            1.22 **
              ((i % 12 === 0 ? 1.09 : 1.065) **
                (xi < half
                  ? xi //
                  : half - (xi - half)))
        return <path key={i} d={d} fill={`hsl(0,0%,${light}%)`} stroke={`hsl(0,0%,${light}%)`} />
      })}
    </g>
  )
}

export const TextAlignCenter = ({ fontsize, width, x, y, children }: { fontsize: number; width: number; x: number; y: number; children?: never }) => (
  <g transform={`translate(${x},${y})`}>
    <rect width={width} height="0" fill="transparent"></rect>
    <text x={width / 2} y="0" text-anchor="middle" font-size={fontsize} alignment-baseline="middle">
      {children}
    </text>
  </g>
)

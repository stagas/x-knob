import { memoize } from 'memoize-pure'

interface Vec extends Array<number> {
  0: number
  1: number
}

class Vec extends Array<number> {
  get x() {
    return this[0]
  }
  get y() {
    return this[1]
  }
  toString() {
    return this[0] + ' ' + this[1]
  }
}
const vec = (x: number, y: number) => new Vec(x, y)
const cos = memoize((a: number) => Math.cos(a))
const sin = memoize((a: number) => Math.sin(a))
const trig = memoize((a: number, radius = 1) => vec(cos(a) * radius, sin(a) * radius))
export const rads = memoize((deg: number) => (Math.PI * deg) / 180)

export const drawLeds = memoize((normal: number, total: number, gap: number, symmetric = false, inverse = false) => {
  const circle = Math.PI * 2 - rads(gap)
  const step = circle / (total - 1)
  const amount = (total - 1) * normal
  const half = total / 2
  const offset = Math.PI / 2
  const path = ['M 50 50']
  for (let n = 0, a = offset + rads(gap / 2); n < total; n++, a += step) {
    // prettier-ignore
    if (
      +(symmetric
        ? normal < 0.5 ? n >= half - (half - amount) && n < half  // 0..0.5
        : normal > 0.5 ? n <= total - (total - amount) && n >= half - 0.9 // 0.5..1
        : false // normal === 0.5
      : n < amount +
      +(n >= total / 2) * 0.01 // this because otherwise never reaches 100%, after .5 we push a little
    )
    ^ +!inverse) { // finally XOR condition on inverse
      path.push(`M 50 50 m ${trig(a, 30)} l ${trig(a, 8)}`)
    }
  }
  path.push('z')
  return path.join(' ')
})

export const drawMarks = memoize((total: number, gap: number, skip = false) => {
  total += skip ? 2 : 0
  const radius = 40.5
  const big = 7
  const small = 4
  const offset = Math.PI / 2
  const circle = Math.PI * 2 - rads(gap)
  const step = circle / (total - 1)
  const marks = [90, 180, 270, 135, 225, 45, 315, 0].map(x => (offset + rads(x)).toPrecision(2))
  const path = ['M 50 50']
  for (let n = skip ? 1 : 0, a = offset + rads(gap / 2) + (skip ? step : 0); n < total - (skip ? 1 : 0); n++, a += step) {
    const length = n === (total - 1) / 2 || marks.includes(a.toPrecision(2)) ? big : small
    path.push(`M 50 50 m ${trig(a, radius)} l ${trig(a, length)}`)
  }
  path.push('z')
  return path.join(' ')
})

export const drawRays = memoize((total = 8, length = 28) => {
  const r = []
  for (let i = 0; i <= Math.PI * 2; i += Math.PI / total) r.push(trig(i))
  const path = ['M 50 50']
  for (let i = 0; i < r.length; i++) {
    const [ax, bx] = [r[i].x, r[(i + 1) % r.length].x]
    const [ay, by] = [r[i].y, r[(i + 1) % r.length].y]
    path.push(`M 50 50 L
      ${50 + ax * length} ${50 + ay * length}
      ${50 + bx * length} ${50 + by * length}
    `)
  }
  return path
})

export const drawFill = memoize((normal: number, gap: number, notch: number, symmetric = false, inverse = false) => {
  const size = 37
  const offset = 90
  const circle = 360 - gap
  const half = circle / 2
  const start = gap / 2 + offset
  const end = 360 - gap / 2 + offset
  const middle = start + half
  const center = [50, 50] as [number, number]
  if (symmetric) {
    if (normal >= 0.5) {
      const sc = middle + notch
      if (inverse) {
        const ec = middle + half * (normal - 0.5) * 2
        return ec - sc > 0 ? arc(...center, size, sc, ec) : ''
      } else {
        const ec = end
        return `${arc(...center, size, start, middle - notch)} ${arc(...center, size, sc, ec)}`
      }
    } else {
      if (inverse) {
        const sc = middle - ((circle - notch) / 2) * (0.5 - normal) * 2
        const ec = middle - notch //
        return ec - sc > 0 ? arc(...center, size, sc - notch / 2, ec) : ''
      } else {
        const sc = start + notch
        const ec = Math.min(middle - notch * 2, middle - half * (0.5 - normal) * 2)
        return `${arc(...center, size, middle + notch, end)} ${arc(...center, size, sc - notch, ec + notch)}`
      }
    }
  } else {
    return inverse
      ? arc(...center, size, start + 0.00001, start + circle * normal * 0.999999)
      : arc(...center, size, start + 0.00001 + circle * normal * 0.999999, end)
  }
})

const polarToCartesian = memoize(function polarToCartesian(centerX: number, centerY: number, radius: number, deg: number): Vec {
  const a = rads(deg)
  return vec(centerX + radius * cos(a), centerY + radius * sin(a))
})

const arc = memoize(function arc(x: number, y: number, radius: number, startAngle: number, endAngle: number): string {
  const start = polarToCartesian(x, y, radius, endAngle)
  const end = polarToCartesian(x, y, radius, startAngle)

  const large = endAngle - startAngle <= 180 ? '0' : '1'
  const d = ['M', start.x, start.y, 'A', radius, radius, 0, large, 0, end.x, end.y].join(' ')

  return d
})

export const drawShape = memoize(function drawShape(total: number, radius: number, tension = 2, edge = 3, gap = 5) {
  total = total * 3 // ?????

  const slice = (Math.PI * 2) / total
  const start = -Math.PI
  const center = vec(50, 50)

  const points = []
  for (let i = 0; i < total; i++) {
    const pos = i * slice
    const a = start + pos
    const point = vec(
      center.x + cos(a) * radius - Math.tanh(cos(pos) * (i % gap ? 1 : -1)) * edge,
      center.y + sin(a) * radius - Math.tanh(sin(pos) * (i % gap ? 1 : -1)) * edge
    )
    points.push(point)
  }

  return cardinal(points, true, tension)
})

// Cardinal spline - a uniform Catmull-Rom spline with a tension option
function cardinal(data: Vec[], closed: boolean, tension?: number) {
  if (data.length < 1) return 'M 0 0'
  if (tension == null) tension = 1

  const size = data.length - (closed ? 0 : 1)

  const path = [`M ${data[0]} C`] as (string | number)[]

  for (let i = 0; i < size; i++) {
    let p0: Vec, p1: Vec, p2: Vec, p3: Vec

    if (closed) {
      p0 = data[(i - 1 + size) % size]
      p1 = data[i]
      p2 = data[(i + 1) % size]
      p3 = data[(i + 2) % size]
    } else {
      p0 = i == 0 ? data[0] : data[i - 1]
      p1 = data[i]
      p2 = data[i + 1]
      p3 = i == size - 1 ? p2 : data[i + 2]
    }

    const x1 = p1.x + ((p2.x - p0.x) / 6) * tension
    const y1 = p1.y + ((p2.y - p0.y) / 6) * tension

    const x2 = p2.x - ((p3.x - p1.x) / 6) * tension
    const y2 = p2.y - ((p3.y - p1.y) / 6) * tension

    path.push(x1, y1, x2, y2, p2.x, p2.y)
  }

  closed && path.push('z')

  return path.join(' ')
}

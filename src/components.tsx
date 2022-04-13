/** @jsxImportSource mixter/jsx */

export const TextAlignCenter = (
  { fontSize, width, x, y, children }: { fontSize: number; width: number; x: number; y: number; children?: never },
) => (
  <g transform={`translate(${x},${y})`}>
    <rect width={width} height="0" fill="transparent"></rect>
    <text
      x={width / 2}
      y="0"
      text-anchor="middle"
      font-size={fontSize || 'var(--font-size)'}
      alignment-baseline="middle"
    >
      {children}
    </text>
  </g>
)

export const Style = (
  { lineWidth, fill, disc, css }: { lineWidth: number; fill: number; disc: { radius: number }; css: string },
) => /*css*/ `
:host {
  --font-size: 20;
  --white: #fff;
  --grey: #888;
  --dark: #666;
  --light: #aaa;
  --black: #151515;
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
  width: 100%;
  height: 100%;
  user-select: none;
  overflow: hidden;
}

[part=viewbox] {
  display: contents;
  overflow: hidden;
}

[part=circle] {
  fill: var(--black);
}

[part=arrow] {
  fill: var(--black);
}

[part=line] {
  stroke: var(--black);
  stroke-width: ${lineWidth}px;
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
  stroke-width: ${fill || 5}px;
}

[part=fill-value] {
  fill: none;
  stroke: var(--white);
  stroke-width: ${fill || 5}px;
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
  box-shadow:
    inset 4px 4px 8px -2px var(--white),
    inset -4px -4px 8px -2px var(--dark);
  width: ${disc.radius}%;
  height: ${disc.radius}%;
  border-radius: 100%;
  z-index: 1;
}

[part=minmax] {
  fill: var(--dark);
}

* {
  transform-origin: 50% 50%;
}

${css ?? ''}`

import type { KnobElement } from './'
import * as Filters from './filters'

export const themes: Record<
  string,
  Omit<
    Omit<Partial<KnobElement>, 'children'>,
    keyof JSX.HTMLAttributes<KnobElement>
  >
> = {
  ableton: {
    extraCss: /*css*/ `
      [part=line] {
        stroke:var(--white)
      }
      [part=fill] {
        stroke:none
      }`,
    gap: 37,
    fill: {
      radius: 30,
      size: 3,
      gap: 6,
    },
    circle: 39,
    line: {
      size: 29.5,
      pos: 20.5,
      width: 3.5,
    },
  },
  retro: {
    extraCss: /*css*/ `
      [part=arrow] {
        fill:var(--white)
      }
      [part=rotary] {
        /* filter: drop-shadow(2px 2px 1px #0005); */
      }
      [part=leds-value] {
        stroke-width: 1px;
        stroke:var(--white)
      }`,
    filters: {
      rotaryKnob: [
        {
          Filter: Filters.Inset,
          dx: 7.5,
          dy: 7.5,
          blur: 7.5,
          color: 'rgba(200,200,200,0.05)',
        },
      ],
    },
    cone: {
      radius: 33,
      rays: 11,
      shine: 0.14,
      contrast: 1.72,
    },
    gap: 91,
    marks: {
      count: 13,
      radius: 41,
      big: 5,
      small: 2,
    },
    leds: {
      count: 56,
      size: 3.5,
      radius: 34,
    },
    disc: {
      behind: false,
      radius: 24,
      rays: 3,
      count: 81,
    },
    fill: {
      radius: 35,
      size: -1,
      gap: 0,
    },
    circle: void 0,
    arrow: {
      size: 9,
      pos: 19.4,
      width: 6.5,
    },
    line: {
      size: 0,
      pos: 25,
      width: 6.5,
    },
    minMax: {
      size: 11,
      pos: 1,
      space: -4,
    },
  },
  metallic: {
    extraCss: /*css*/ `
      [part=dot] {
        fill: var(--black);
      }
      [part=leds-value] {
        stroke:var(--white);
        stroke-width: 1px;
      }`,

    gap: 91,
    marks: {
      count: 13,
      radius: 37.5,
      big: 5,
      small: 0,
    },
    dot: {
      pos: 30,
      size: 2,
    },

    leds: {
      count: 31,
      size: 5,
      radius: 30,
    },
    disc: {
      behind: true,
      radius: 26,
      rays: 5,
      count: 131,
    },
    fill: {
      radius: 37,
      size: -1,
      gap: 0,
    },
    circle: 30,
    line: {
      size: 0,
      pos: 25,
      width: 6.5,
    },
    minMax: {
      size: 10,
      pos: -5,
      space: -16,
    },
  },
  sweet: {
    extraCss: /*css*/ `
      [part=outline] {
        display:none
      }`,
    gap: 58,
    marks: {
      count: 0,
      radius: 40,
      big: 7,
      small: 4,
    },
    fill: {
      radius: 37,
      size: 3.5,
      gap: 6,
    },
    // cone: {
    //   radius: 37,
    //   rays: 30,
    //   shine: 1.92,
    //   contrast: 1.1,
    // },
    circle: 35.2,
    line: { size: 20, pos: 25, width: 6.5 },
    shape: {
      radius: 47,
      notches: 15,
      tension: 1.6,
      edge: 1.4,
      gap: 5,
    },
    minMax: {
      size: 11,
      pos: 4,
      space: -5,
    },
  },
  dark: {
    extraCss: /*css*/ `
      [part=outline] {
        display:none
      }
      [part=circle] {
        fill: var(--black);
      }
      [part=line] {
        stroke: var(--white);
      }
      [part=leds-value] {
        stroke:var(--white);
        stroke-width: 1px;
      }
      `,
    gap: 60,
    // marks: {
    //   count: 0,
    //   radius: 40,
    //   big: 7,
    //   small: 4,
    // },
    fill: {
      radius: 35,
      size: 1.75,
      gap: 0,
    },
    // cone: {
    //   radius: 37,
    //   rays: 30,
    //   shine: 1.92,
    //   contrast: 1.1,
    // },
    circle: 35,
    line: { size: 9, pos: 31, width: 5 },
    // shape: {
    //   radius: 47,
    //   notches: 15,
    //   tension: 1.6,
    //   edge: 1.4,
    //   gap: 5,
    // },
    // minMax: {
    //   size: 11,
    //   pos: 4,
    //   space: -5,
    // },
  },
  // dark: {
  //   gap: 91,
  //   marks: 45,
  //   leds: -1,
  //   disc: -1,
  //   fill: 3,
  //   fillGap: 0,
  //   circle: 30,
  //   radius: -1,
  //   arrow: 0,
  //   arrowPos: 23,
  //   line: 1,
  //   linePos: 30,
  //   lineWidth: 6.5,
  // },
  power: {
    extraCss: /*css*/ `
      [part=shape] {
        fill: var(--black)
      }
      [part=line] {
        stroke: #fff;
      }
      [part=outline] {
        stroke-width: 0px;
      }
      [part=rotary] {
        /* filter: drop-shadow(0.5px 2px 2px #0005); */
      }
      [part=circle] {
        stroke: var(--black);
        fill: var(--black);
      }`,
    gap: 100,
    filters: {
      rotaryKnob: [
        {
          Filter: Filters.Shine,
          scale: 7,
          blur: 2.5,
          color: '#111111',
          con: 40,
          exp: 200,
          x: 50,
          y: -60,
          z: 150,
        },
      ],
      rotaryLine: [
        {
          Filter: Filters.Inset,
          dx: 1.2,
          dy: 1.35,
          blur: 1.1,
          color: 'rgba(20,20,20,1.0)',
        },
      ],
    },
    marks: {
      count: 5,
      radius: 40,
      big: 7,
      small: 4,
    },
    leds: {
      count: 0,
      size: 5,
      radius: 30,
    },
    circle: 30,
    line: {
      size: 10,
      pos: 29,
      width: 2.4,
    },
    shape: {
      radius: 55,
      notches: 3,
      tension: 0.9,
      edge: 4,
      gap: 10,
    },
    fill: {
      radius: 37,
      size: 1.5,
      gap: 6,
    },
    minMax: {
      size: 12,
      pos: 0,
      space: -8,
    },
  },
  intense: {
    extraCss: /*css*/ `
      [part=shape] {
        fill: var(--black);
      }
      [part=line] {
        stroke: #fff;
      }
      [part=outline] {
        stroke-width: 0px;
      }
      [part=rotary] {
        /* filter: drop-shadow(1.15px 3px 1.5px rgba(0,0,0,.28)); */
      }
      [part=circle] {
        fill: var(--black);
      }`,
    filters: {
      rotaryKnob: [
        {
          Filter: Filters.Shine,
          scale: 6,
          blur: 2.85,
          color: '#121212',
          con: 25,
          exp: 100,
          x: 50,
          y: -90,
          z: 140,
        },
      ],
      rotaryLine: [
        {
          Filter: Filters.Inset,
          dx: 1.2,
          dy: 1.35,
          blur: 1.1,
          color: 'rgba(20,20,20,1.0)',
        },
      ],
    },
    gap: 119,
    marks: {
      count: 27,
      radius: 34,
      big: 10,
      small: 6,
    },
    leds: {
      count: 0,
      size: 5,
      radius: 30,
    },
    circle: void 0,
    line: {
      size: 8,
      pos: 27,
      width: 2.1,
    },
    shape: {
      radius: 53,
      notches: 2,
      tension: 2.05,
      edge: 2.1,
      gap: 2,
    },
    fill: {
      radius: 35,
      size: 2,
      gap: 6,
    },
    minMax: {
      size: 12,
      pos: 0,
      space: -8,
    },
  },
  amp: {
    extraCss: /*css*/ `
      [part=shape] {
        fill: var(--black);
      }
      [part=line] {
        stroke: #fff;
      }
      [part=outline] {
        stroke-width: 0px;
      }
      [part=rotary] {
        /* filter: drop-shadow(1.15px 3px 1.5px rgba(0,0,0,.28)); */
      }
      [part=circle] {
        fill: var(--black);
      }`,
    filters: {
      rotaryKnob: [
        {
          Filter: Filters.Shine,
          scale: 6,
          blur: 2.85,
          color: '#121212',
          con: 25,
          exp: 100,
          x: 50,
          y: -90,
          z: 140,
        },
      ],
      rotaryLine: [
        {
          Filter: Filters.Inset,
          dx: 1.2,
          dy: 1.35,
          blur: 1.1,
          color: 'rgba(20,20,20,1.0)',
        },
      ],
    },
    gap: 119,
    marks: {
      count: 0,
      radius: 34,
      big: 10,
      small: 6,
    },
    leds: {
      count: 11,
      size: 7,
      radius: 33,
    },
    circle: void 0,
    line: {
      size: 8,
      pos: 27,
      width: 2.1,
    },
    shape: {
      radius: 53,
      notches: 5,
      tension: 1.3,
      edge: 2.1,
      gap: 5,
    },
    fill: {
      radius: 0,
      size: 2,
      gap: 6,
    },
    minMax: {
      size: 12,
      pos: 0,
      space: -8,
    },
  },
  flat: {
    extraCss: /*css*/ `
      [part=shape] {
        fill: var(--black);
      }
      [part=arrow] {
        fill: var(--white)
      }
      [part=outline] {
        stroke-width:1.2px
      }
      [part=leds-value] {
        stroke-width: 1px;
      }
      [part=circle] {
        stroke: var(--light);
        fill:var(--black);
      }`,
    gap: 75,
    leds: {
      count: 36,
      size: 3.8,
      radius: 34,
    },
    circle: 30,
    arrow: {
      size: 5.5,
      pos: 26,
      width: 3,
    },
    // dot: {
    //   pos: 33,
    //   size: 1.5,
    // },

    minMax: {
      size: 11,
      pos: -0.5,
      space: -10,
    },
  },
  zen: {
    circle: 40,
    gap: 0,
    fill: {
      radius: 34,
      size: 2.5,
      gap: 6,
    },
    line: {
      size: 0,
      pos: 25,
      width: 6.5,
    },
    dot: {
      size: 2,
      pos: 27,
    },
    minMax: {
      size: 0,
      pos: 10,
      space: 10,
    },
    shape: {
      radius: 19.905180883293024,
      notches: 15,
      tension: 1.6,
      edge: 1.4,
      gap: 5,
    },
    extraCss:
      '\n      [part=shape] {\n        fill: var(--black)\n      }\n      [part=line] {\n        stroke: var(--light)\n      }\n      [part=outline] {\n        stroke-width: 0px;\n      }\n      [part=circle] {\n        stroke: var(--black);\n        fill: var(--black);\n      }',
  },
  // compass: {
  //   gap: 0,
  //   marks: 13,
  //   leds: 29,
  //   disc: -1,
  //   fill: -1,
  //   fillGap: 6,
  //   circle: 35,
  //   radius: -1,
  //   arrow: 47,
  //   arrowPos: 24,
  //   line: 0,
  //   linePos: 29,
  //   lineWidth: 6.5,
  //   shapeNotches: 15,
  //   shapeTension: 1.6,
  //   shapeEdge: 1.4,
  //   shapeGap: 5,
  //   cone: false,
  //   symmetric: false,
  //   minMaxY: -1,
  // },
  // gauge: {
  //   gap: 180,
  //   marks: 9,
  //   leds: 8,
  //   disc: -1,
  //   fill: 2,
  //   fillGap: 6,
  //   circle: 0,
  //   radius: 30,
  //   arrow: 40.5,
  //   arrowPos: 10.5,
  //   line: 0,
  //   linePos: 25,
  //   lineWidth: 6.5,
  //   shapeNotches: 7,
  //   shapeTension: 1,
  //   shapeEdge: 1.3,
  //   shapeGap: 0.75,
  //   cone: false,
  //   symmetric: false,
  //   minMaxY: 75,
  // },
}

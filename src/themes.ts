import * as Filters from './filters'

export const themes: any = {
  // ableton: {
  //   extraCss: /*css*/ `
  //     [part=line] {
  //       stroke:var(--white);
  //     }
  //     [part=fill] {
  //       stroke:none;
  //     }`,
  //   gap: 37,
  //   fill: {
  //     radius: 48,
  //     size: 3,
  //     gap: 6,
  //   },
  //   circle: 39,
  //   line: {
  //     size: 29.5,
  //     pos: 20.5,
  //     width: 3.5,
  //   },
  // },
  ableton: {
    circle: 47,
    // gap: 90,
    gap: 0.0001,
    border: 0,
    fill: {
      radius: 40,
      size: 2.5,
      gap: 0,
    },
    line: {
      size: 42.5,
      pos: 7,
      width: 2.5,
    },
    shape: {
      radius: 0,
      notches: 15,
      tension: 1.6,
      edge: 1.4,
      gap: 5,
    },
    extraCss:
      /*css*/`
      [part=shape] {
        fill: var(--black);
      }
      [part=line] {
        stroke: var(--white);
      }
      [part=outline] {
        stroke-width: 0px;
      }
      [part=circle] {
        fill: transparent;
      }
    `,
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
      [part=line] {
        stroke:var(--dark);
      }
      [part=outline] {
        fill: transparent;
        stroke: transparent;
      }`,
    gap: 58,
    marks: {
      count: 0,
      radius: 40,
      big: 7,
      small: 4,
    },
    fill: {
      radius: 47,
      size: 4,
      gap: 6,
    },
    // cone: {
    //   radius: 37,
    //   rays: 30,
    //   shine: 1.92,
    //   contrast: 1.1,
    // },
    circle: 0,
    line: {
      size: 20,
      pos: 15,
      width: 6.5
    },
    shape: {
      radius: 65,
      notches: 45,
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
  sweetLow: {
    extraCss: /*css*/ `
      [part=line] {
        stroke: #000;
      }
      [part=outline] {
        fill: transparent;
        stroke: transparent;
      }`,
    gap: 58,
    marks: {
      count: 0,
      radius: 40,
      big: 7,
      small: 4,
    },
    fill: {
      radius: 47.5,
      size: 4.5,
      gap: 6,
    },

    shape: {
      radius: 62,
      notches: 35,
      tension: 2.15,
      edge: 1.3,
      gap: 5,
    },

    // cone: {
    //   radius: 37,
    //   rays: 30,
    //   shine: 1.92,
    //   contrast: 1.1,
    // },
    circle: 45,
    line: {
      size: 26,
      pos: 14,
      width: 8
    },
    // shape: {
    //   radius: 60,
    //   notches: 6,
    //   tension: 2.1,
    //   edge: 1.4,
    //   gap: 2,
    // },
    // shape: {
    //   radius: 60,
    //   notches: 13,
    //   tension: 0.86,
    //   edge: 2,
    //   gap: 6.5,
    // },
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
      notches: 9,
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
  cowbell: {
    extraCss: /*css*/`
      [part=outline] {
        fill: transparent;
        stroke-width: 4px;
        display: none;
      }
    `,
    // extraCss: /*css*/ `
    //   [part=shape] {
    //     /* fill: var(--black) */
    //   }
    //   [part=line] {
    //     /* fill: #fff; */
    //     /* stroke: #fff; */
    //   }
    //   [part=rotary-line] {
    //     /* stroke: #000; */
    //     /* fill: #fff; */
    //   }
    //   [part=outline] {
    //     stroke-width: 0px;
    //   }
    //   [part=rotary] {
    //     /* filter: drop-shadow(0.5px 2px 2px #0005); */
    //   }
    //   [part=circle] {
    //     /* stroke: var(--black); */
    //     /* fill: var(--black); */
    //   }`,
    // // gap: 100,
    filters: {
      rotaryKnob: [
        {
          Filter: Filters.Inset,
          dx: 0,
          dy: -2,
          blur: 2.15,
          color: '#000',
        },
        {
          Filter: Filters.Inset,
          dx: 0,
          dy: 2,
          blur: 2.15,
          color: '#b9f7',
        },
      ]
      // rotaryKnob: [
      //   {
      //     Filter: Filters.Shine,
      //     scale: -.5,
      //     blur: 15,
      //     color: '#4488ff',
      //     con: 18,
      //     exp: 30,
      //     x: 50,
      //     y: -1,
      //     z: 50,
      //   },
      // ],
      // rotaryLine: [
      //   {
      //     Filter: Filters.Inset,
      //     dx: 1.2,
      //     dy: 1.35,
      //     blur: 1.15,
      //     color: '#000',
      //   },
      // ],
    },
    // marks: {
    //   count: 5,
    //   radius: 40,
    //   big: 7,
    //   small: 4,
    // },
    // leds: {
    //   count: 0,
    //   size: 5,
    //   radius: 30,
    // },
    circle: 42,
    line: {
      size: 25,
      pos: 20,
      width: 3,
    },
    // shape: {
    //   radius: 55,
    //   notches: 9,
    //   tension: 0.9,
    //   edge: 4,
    //   gap: 10,
    // },
    fill: {
      radius: 45,
      size: 2,
      gap: 4,
    },

    gap: 90,
    // marks: {
    //   count: 0,
    //   radius: 40,
    //   big: 7,
    //   small: 4,
    // },
    // fill: {
    //   radius: 47.5,
    //   size: 4.5,
    //   gap: 6,
    // },

    shape: {
      radius: 65,
      notches: 35,
      tension: 2.15,
      edge: 1.3,
      gap: 5,
    },

    // minMax: {
    //   size: 12,
    //   pos: 0,
    //   space: -8,
    // },
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
    circle: 47,
    gap: 0,
    border: 0,
    fill: {
      radius: 47,
      size: 4,
      gap: 0,
    },
    line: {
      size: 0,
      pos: 25,
      width: 6.5,
    },
    dot: {
      size: 3,
      pos: 17.2,
    },
    minMax: {
      size: 0,
      pos: 10,
      space: 10,
    },
    shape: {
      radius: 0,
      notches: 15,
      tension: 1.6,
      edge: 1.4,
      gap: 5,
    },
    extraCss:
      '\n      [part=shape] {\n        fill: var(--black)\n      }\n      [part=line] {\n        stroke: var(--light)\n      }\n      [part=outline] {\n        stroke-width: 0px;\n      }\n      [part=circle] {\n               fill: var(--black);\n      }',
  },
  circle: {
    circle: 38,
    border: {
      radius: 48,
      size: 2,
    },
    gap: 0,
    fill: {
      radius: 36,
      size: 10,
      gap: 0,
    },
    line: {
      size: 0,
      pos: 25,
      width: 6.5,
    },
    dot: {
      size: 0,
      pos: 27,
    },
    minMax: {
      size: 0,
      pos: 10,
      space: 10,
    },
    shape: {
      radius: 0,
      notches: 15,
      tension: 1.6,
      edge: 1.4,
      gap: 5,
    },
    extraCss: /*css*/ `
      [part=shape] {
        fill: var(--black);
      }
      [part=fill] {
        stroke: transparent;
      }
      [part=line] {
        stroke: transparent;
        fill: transparent;
      }
      [part=outline] {
        stroke-width: 0px;
      }
      [part=circle] {
        stroke: transparent;
        fill: transparent;
      }`,
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

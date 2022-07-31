/** @jsxImportSource sigl */

export const Inset = ({ id, dx, dy, blur, color }: any) => (
  <filter id={id} x="-20%" y="-20%" width="140%" height="140%">
    {/* Shadow offset */}
    <feOffset dx={dx} dy={dy} />
    {/* Shadow blur */}
    <feGaussianBlur stdDeviation={blur} result="offset-blur" />
    {/* Invert drop shadow to make an inset shadow */}
    <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
    {/* Cut colour inside shadow */}
    <feFlood flood-color={color} flood-opacity="1" result="color" />
    <feComposite operator="in" in="color" in2="inverse" result="shadow" />
    {/* Placing shadow over element */}
    <feComposite operator="over" in="shadow" in2="SourceGraphic" />
  </filter>
)

export const Glow = ({ id, blur }: any) =>
  <filter id={id} x="-20%" y="-20%" width="140%" height="140%">
    <feColorMatrix
      in="SourceAlpha"
      type="matrix"
      values="-1 0 0 0 1, 0 -1 0 0 1, 0 0 -1 0 1, 0 0 0 1 0"
      result="matrix"
    />
    <feGaussianBlur in="matrix" stdDeviation={blur} result="blur" />
    <feComposite in="SourceGraphic" in2="blur" operator="over" />
  </filter>

/* https://www.smashingmagazine.com/2015/05/why-the-svg-filter-is-awesome/#lighting-effect */
export const Shine = ({ id, x, y, z, con, exp, scale, color, blur }: any) => (
  <filter id={id}>
    {/*We create a heightmap by blurring the source: */}

    <feGaussianBlur stdDeviation={blur} in="SourceAlpha" result="blur" />

    {/* We then define a lighting effect with a point light that is positioned at virtual 3D coordinates x: 40px, y: -30px, z: 200px: */}

    <feSpecularLighting
      surfaceScale={scale}
      specularConstant={con}
      specularExponent={exp}
      lighting-color={color}
      in="blur"
      result="specular"
    >
      <fePointLight x={x} y={y} z={z} />
    </feSpecularLighting>

    {/* We cut off the parts that overlap the source graphic… */}

    <feComposite operator="in" in="specular" in2="SourceAlpha" result="composite" />

    {/* … and then merge source graphic and lighting effect: */}

    <feMerge>
      <feMergeNode in="SourceGraphic" />
      <feMergeNode in="composite" />
    </feMerge>
  </filter>
)

export const Light = ({ id }: any) => (
  <filter id={id}>
    <feGaussianBlur stdDeviation="1" result="blur" />
    <feSpecularLighting
      result="spec"
      in="blur"
      specularConstant="4"
      specularExponent="5"
      lighting-color="#fff"
    >
      <feSpotLight x="-200" y="-200" z="100" limitingConeAngle="11" />
    </feSpecularLighting>
    <feComposite in="SourceGraphic" in2="spec" operator="in" />
  </filter>
)

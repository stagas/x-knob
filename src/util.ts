const getOffset = (el: HTMLElement) => {
  let x = 0
  let y = 0
  do {
    x += el.offsetLeft - el.scrollLeft
    y += el.offsetTop - el.scrollTop
  } while ((el = el.offsetParent as HTMLElement))
  return { x, y }
}

export const getRelativeMouseCoords = (el: HTMLElement, event: MouseEvent | PointerEvent) => {
  let x = 0
  let y = 0
  const offset = getOffset(el)
  // when moving cursor outside the window it very weirdly wraps
  // its coordinates so this is correcting it (on Chrome/Linux)
  let pageY = event.pageY
  if (pageY > 16384) pageY -= 32768
  x = event.pageX - offset.x
  y = pageY - offset.y
  return { x, y }
}

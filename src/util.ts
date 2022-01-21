export const allChildren = (els: Element[]) => [...els].map(el => [el, ...(el.querySelectorAll('*') as never)]).flat(Infinity) as Element[]
export const allChildrenOf = (slot: HTMLSlotElement) => allChildren(slot.assignedElements())

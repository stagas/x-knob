export {}
// import { withProperties } from 'with-properties'
// import { allChildrenOf } from './util'
// import { waitForTheElement } from 'wait-for-the-element'

// type Input = {
//   value: number | string
//   oninput: () => void
//   options: HTMLOptionElement[]
//   getAttribute: (attr: string) => number
// } & Element

// class ControlState {
//   query!: string
//   attr!: string
//   options!: string
// }

// export class Control extends withProperties(HTMLElement, ControlState) {
//   inputs: Input[] = []

//   constructor() {
//     super()

//     this.attachShadow({ mode: 'open' }).innerHTML = '<slot part="slot"></slot>'

//     this.shadowRoot!.addEventListener('slotchange', e => {
//       const inputs = (this.inputs = [] as Input[])
//       const slot = e.target as HTMLSlotElement
//       allChildrenOf(slot).forEach(el => {
//         if (el.nodeName !== 'INPUT' && el.nodeName !== 'SELECT') return
//         const input = el as Input
//         inputs.push(input)
//         input.addEventListener('input', () => {
//           const target = document.querySelector(this.query)
//           if (!target) return
//           if (input.nodeName === 'SELECT') {
//             ;[...input.options].forEach(o => {
//               if (o.selected) target.setAttribute(o.value, '')
//               else target.removeAttribute(o.value)
//             })
//           } else {
//             target.setAttribute(this.attr, input.value as unknown as string)
//           }
//         })
//       })
//     })
//   }

//   attributeChangedCallback(name: string, oldValue: string, newValue: string) {
//     super.attributeChangedCallback?.(name, oldValue, newValue)
//     if (name === 'query')
//       waitForTheElement(this.query).then(el => {
//         const target = el as HTMLElement
//         if (this.attr) {
//           const value = target[this.attr as never] as string
//           this.inputs.forEach(input => {
//             if (input.nodeName === 'INPUT') {
//               input.value = value
//               input.dispatchEvent(new InputEvent('input', { bubbles: true }))
//             }
//           })
//         } else {
//           this.inputs.forEach(input => {
//             if (input.nodeName === 'SELECT') {
//               ;[...input.options].forEach(o => {
//                 o.selected = target.hasAttribute(o.value)
//               })
//               input.dispatchEvent(new InputEvent('input', { bubbles: true }))
//             }
//           })
//         }
//       })
//   }
// }

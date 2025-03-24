import { Directive, DirectiveBinding } from 'vue'
const vTyping: Directive = {
  mounted: (el: HTMLElement, binding: DirectiveBinding<string>) => {
    let currentIndex = 0
    let timer: NodeJS.Timeout | number | null = null
    const str = binding.value
    const total = str.length
    function typing() {
      const isEmpty = str[currentIndex] == ' '
      clearTimeout(timer as number)
      const span = el.querySelector('span')
      if (!isEmpty) {
        timer = setTimeout(() => {
          if (span) {
            el.removeChild(span)
          }
          el.innerHTML += str[currentIndex] + '<span class="underline">_</span>'
          currentIndex++
          if (currentIndex == total) {
            const span = el.querySelector('span')
            el.removeChild(span as Node)
          }
          if (currentIndex != total) {
            typing()
          }
        }, 100)
      } else {
        el.innerHTML += str[currentIndex]
        currentIndex++
        if (currentIndex != total) {
          typing()
        }
      }
    }
    typing()
  }
}
export default vTyping

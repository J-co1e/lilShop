import { Directive, DirectiveBinding } from 'vue'
import useAppStore from '@/store/modules/app'
const vSchema: Directive = {
  mounted: (el: HTMLElement, binding: DirectiveBinding<string>) => {
    const appStore = useAppStore()
    el.addEventListener('click', (event: MouseEvent) => {
      if (!document.startViewTransition) return appStore.changeSchema()
      const transition = document.startViewTransition(() => {
        appStore.changeSchema()
      })
      transition.ready.then(() => {
        const currentSchema = appStore.schema
        const isDark = currentSchema == 'dark'
        const x = event.clientX
        const y = event.clientY
        //计算按钮到最远点的距离用作裁剪圆形的半径
        const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
        const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]
        //开始动画
        document.documentElement.animate(
          {
            clipPath: isDark ? [...clipPath].reverse() : clipPath
          },
          {
            duration: 400,
            easing: 'ease-in',
            pseudoElement: isDark ? '::view-transition-old(root)' : '::view-transition-new(root)'
          }
        )
      })
    })
  }
}
export default vSchema

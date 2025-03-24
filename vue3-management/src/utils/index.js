/**
 * 防抖
 * @param fn 回调函数
 * @param delay 延迟时间
 */
export function debounce(fn, delay) {
  let timer = null
  return (...args) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
/**
 * 节流
 * @param fn 回调函数
 * @param delay 延迟时间
 */
export function throttle(fn, delay) {
  let timer = null
  return (...args) => {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args)
        timer = null
      }, delay)
    }
  }
}

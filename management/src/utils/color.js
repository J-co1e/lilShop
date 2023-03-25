import lightStyle from './light' // light 样式文件
import darkStyle from './dark'   // dark 样式文件

/**
 * @param {*} theme
 * 根据传入的样式风格, 返回不同的样式
 * 深浅色模式
 */
export function getThemeMap (theme = 'light') {
  return theme == 'light' ? lightStyle : darkStyle
}
/**
 * 
 * @param {*} theme 
 * 获取传入类型的样式文件, 然后使用 JS 设置, CSS 变量的样式
 * 
 */
export function setTheme (theme = 'light') {
  // 获取样式信息
  const themeMap = getThemeMap(theme)
  // 获取根节点
  let body = document.body
  // 循环给根节点的 CSS 变量赋值
  Object.keys(themeMap).forEach(key => {
    // 这里使用-- 作为前缀名, 是为了区分变量名
    body.style.setProperty(`--${key}`, themeMap[key])
  })
  if (body.style[8]) {
    return
  } else {
    body.style.setProperty(`--themeColor`, '#5fdc84')
    sessionStorage.setItem('themeColor', '#5fdc84')
  }
}
export function setThemeColor (themeColor) {
  let body = document.body
  // 循环给根节点的 CSS 变量赋值
  // 这里使用-- 作为前缀名, 是为了区分变量名
  body.style.setProperty(`--themeColor`, themeColor)
  sessionStorage.setItem('themeColor', themeColor)
}

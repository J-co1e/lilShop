export const getIdentity = function () {
  const responseTime = Math.floor(Math.random() * (1000 - 300 + 1)) + 300
  return new Promise((res) => {
    setTimeout(() => {
      res('admin')
    }, responseTime)
  })
}

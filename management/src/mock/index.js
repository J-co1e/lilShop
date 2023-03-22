import Mock, { Random } from 'mockjs'
Mock.mock('/getCenterChart', 'get', () => {
  const yData = ['烤羊肉串', '烤牛肉串', '烤羊腰', '炒米粉', '烤豆腐串', '可乐', '烤生蚝']
  const xData = []
  for (let i = 0; i < yData.length; i++) {
    const count = Random.integer(10, 200)
    xData.push(count)
  }
  return {
    yData: yData,
    xData: xData
  }
})
Mock.mock('/getRightChart', 'get', () => {
  const data = [
    { value: 0, name: '支付宝' },
    { value: 0, name: '微信' },
    { value: 0, name: '云闪付' },
    { value: 0, name: '现金' },
    { value: 0, name: '银联' }
  ]
  data.forEach(item => {
    item.value = Random.integer(100, 200)
  })
  return data
})
Mock.mock('/getBtmChart', 'get', () => {
  const data = []
  for (let i = 0; i < 7; i++) {
    const count = Random.integer(30, 200)
    data.push(count)
  }
  return data
})
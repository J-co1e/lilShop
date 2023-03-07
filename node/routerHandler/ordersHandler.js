const db = require('../sql')
const axios = require('axios')
const utils = require('../utils/index')
const AlipayFormData = require('alipay-sdk/lib/form').default
const alipaySdk = utils.aliPay
exports.getOrders = (req, res) => { // 获取订单
  const size = req.query.size
  const current = req.query.current
  const offset = (Number(current) - 1) * Number(size)
  db.query(`SELECT * FROM orders limit ${+size} offset ${offset}`, (err, result) => {
    if (err) return res.send(err)
    db.query(`SELECT * FROM orders`, (err1, result1) => {
      res.send({
        code: '200',
        msg: '成功',
        data: result,
        total: result1.length
      })
    })
  })
}
exports.addOrders = (req, res) => { // 添加订单
  const nowDate = utils.getNowDate()
  const order = req.body.orderData
  const tableNo = req.body.tableNo
  db.query(`select * from orders where tableNo = ${tableNo} order by applyDate desc`, (err, result) => {
    if (err) return res.send(err)
    if (result[0].orderStatus === 0) { // 当前订单未完结,追加订单
      let currentOrders = JSON.parse(result[0].orderData)
      const order = req.body.orderData
      currentOrders = [...currentOrders, ...order]
      const sqlStr = `update orders set orderData = '${order}', applyDate = '${nowDate}' where orderId = ${result[0].orderId}`
      db.query(sqlStr, (err1, result1) => {
        if (err1) return res.send(err1)
        res.send({
          code: '200',
          msg: '成功'
        })
      })
    } else { // 当前订单已完结,添加新订单
      const order = req.body
      order.applyDate = nowDate
      const sqlStr = `insert into orders set ?`
      db.query(sqlStr, order, (err, result) => {
        if (err) return res.send(err)
        res.send({
          code: '200',
          msg: '成功'
        })
      })
    }
  })
}
exports.deleteOrders = (req, res) => { // 删除订单
  const orderId = req.body.orderId
  db.query(`update orders set isDelete = "1" where orderId = ${orderId}`, (err, result) => {
    if (err) return res.send(err)
    res.send({
      code: '200',
      msg: '成功'
    })
  })
}
exports.searchOrders = (req, res) => { // 查询订单
  const startDate = req.body.startDate
  const endDate = req.body.endDate
  const tableNo = req.body.tableNo
  const orderStatus = req.body.orderStatus
  let sqlStr = ''
  if (tableNo === '') {
    if (orderStatus === 2) {
      sqlStr = `select * from orders where applyDate between "${startDate}" and "${endDate}"`
    } else {
      if (startDate === '') {
        sqlStr = `select * from orders where orderStatus = ${orderStatus}`
      } else {
        sqlStr = `select * from orders where applyDate between "${startDate}" and "${endDate}" and orderStatus = ${orderStatus}`
      }
    }
  } else if (startDate === '') {
    if (orderStatus === 2) {
      sqlStr = `select * from orders where tableNO = ${tableNo}`
    } else {
      sqlStr = `select * from orders where tableNO = ${tableNo} = orderStatus = ${orderStatus}`
    }
  } else {
    if (orderStatus === 2) {
      sqlStr = `select * from orders where applyDate between "${startDate}" and "${endDate}" and tableNo = ${tableNo}`
    } else {
      sqlStr = `select * from orders where applyDate between "${startDate}" and "${endDate}" and tableNo = ${tableNo} and orderStatus = ${orderStatus}`
    }
  }
  db.query(sqlStr, (err, result) => {
    if (err) res.send(err)
    res.send({
      code: '200',
      msg: '成功',
      data: result,
      total: result.length
    })
  })
}
exports.doneOrders = (req, res) => { // 完结订单
  db.query(`update orders set orderStatus = 1 where orderId = ${req.body.orderId}`, (err, result) => {
    if (err) res.send(err)
    res.send({
      code: '200',
      msg: '成功'
    })
  })
}
exports.settleOrder = (req, res) => {
  (async () => {        // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
    const formData = new AlipayFormData()
    formData.setMethod('get')
    // 通过 addField 增加参数
    // 在用户支付完成之后，支付宝服务器会根据传入的 notify_url，以 POST 请求的形式将支付结果作为参数通知到商户系统。
    formData.addField('notifyUrl', 'http://www.baidu.com') // 支付成功回调地址，必须为可以直接访问的地址，不能带参数
    formData.addField('bizContent', {
      outTradeNo: req.body.outTradeNo, // 商户订单号,64个字符以内、可包含字母、数字、下划线,且不能重复
      productCode: 'FAST_INSTANT_TRADE_PAY', // 销售产品码，与支付宝签约的产品码名称,仅支持FAST_INSTANT_TRADE_PAY
      totalAmount: '0.01', // 订单总金额，单位为元，精确到小数点后两位
      subject: '订单支付', // 订单标题
      body: '商品详情', // 订单描述
      returnUrl: 'http://www.baidu.com'
    })        // 如果需要支付后跳转到商户界面，可以增加属性"returnUrl"
    const result = await alipaySdk.exec(
      'alipay.trade.page.pay', // 统一收单下单并支付页面接口
      {}, // api 请求的参数（包含“公共请求参数”和“业务参数”）
      { formData: formData },)       // result 为可以跳转到支付链接的 url
    res.json({ url: result })
  })()
}
exports.queryPaidStatus = (req, res) => {
  (async function () {
    const { outTradeNo } = req.body // outTradeNo为订单号
    const formData = new AlipayFormData()
    formData.setMethod('get')
    formData.addField('bizContent', {
      outTradeNo
    })
    // 通过该接口主动查询订单状态
    const result = await alipaySdk.exec(
      'alipay.trade.query',
      {},
      { formData: formData },
    )
    axios({
      method: 'GET',
      url: result
    })
      .then(data => {
        let r = data.data.alipay_trade_query_response
        if (r.code === '10000') { // 接口调用成功
          switch (r.trade_status) {
            case 'WAIT_BUYER_PAY':
              res.send('交易创建，等待买家付款');
              break
            case 'TRADE_CLOSED':
              res.sed('未付款交易超时关闭，或支付完成后全额退款')
              break
            case 'TRADE_SUCCESS':
              res.send('交易支付成功')
              break
            case 'TRADE_FINISHED':
              res.send('交易结束，不可退款')
              break
          }
        } else if (r.code === '40004') {
          res.send('交易不存在')
        }
      })
      .catch(err => {
        res.json({
          msg: '查询失败',
          err
        })
      })
  })()
}
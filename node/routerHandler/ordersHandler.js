const db = require('../sql')

exports.getOrders = (req, res) => { // 获取订单
  const size = req.query.size
  const current = req.query.current
  const offset = (Number(current) - 1) * Number(size)
  db.query(`SELECT * FROM orders where isDelete = "0" limit ${+size} offset ${offset}`, (err, result) => {
    if (err) return res.send(err)
    db.query(`SELECT * FROM orders where isDelete = "0"`, (err1, result1) => {
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
  const sqlStr = 'insert into order set ?'
  const order = req.body
  console.log(order)
  db.query(sqlStr, order, (err, result) => {
    if (err) return res.send(err)
    res.send({
      code: '200',
      msg: '成功'
    })
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
exports.updateOrders = (req, res) => { // 更新订单
  const orderId = +req.body.orderId
  const order = req.body.order
  db.query(`select * from orders where isDelete = "0" and orderId = ${orderId}`, (err, result) => {
    if (err) return res.send(err)
    const orderData = result[0].orderData
    console.log(orderData)
    console.log(order)
  })
}
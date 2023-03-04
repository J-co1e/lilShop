const db = require('../sql')

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
  db.query(`update orders set orderStatus = 2 where orderId = ${req.body.orderId}`, (err, result) => {
    if (err) res.send(err)
    res.send({
      code: '200',
      msg: '成功'
    })
  })
}
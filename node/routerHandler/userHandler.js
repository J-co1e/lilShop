const db = require('../sql')
const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')
const secretKey = 'yyds'
const constantRoute = [
  {
    path: "/home",
    name: "home",
    label: "首页",
    icon: "s-home",
    url: "Home/Home",
  },
  {
    path: "/foods",
    name: "foods",
    label: "菜品管理",
    icon: "dish",
    url: "MallManage/MallManage",
  },
  {
    path: '/orders',
    name: 'orders',
    label: '订单管理',
    icon: 's-claim'
  }
]
const managerRoute = [
  {
    path: "/home",
    name: "home",
    label: "首页",
    icon: "s-home",
    url: "Home/Home",
  },
  {
    path: "/foods",
    name: "foods",
    label: "菜品管理",
    icon: "dish",
    url: "MallManage/MallManage",
  },
  {
    path: "/user",
    name: "user",
    label: "用户管理",
    icon: "s-custom",
    url: "UserManage/UserManage",
  },
  {
    path: '/orders',
    name: 'orders',
    label: '订单管理',
    icon: 's-claim'
  },
  {
    path: '/shop',
    name: 'shop',
    label: '店铺信息',
    icon: 's-shop'
  }
]
exports.login = (req, res) => {
  const username = req.body.username
  const password = req.body.password
  const sqlStr = `select * from users where username='${username}' and password='${password}'`
  const tokenStr = jwt.sign({ username: req.body.username }, secretKey, { expiresIn: '3h' })
  db.query(sqlStr, (err, result) => {
    if (err) res.send(err)
    if (result.length === 1) {
      console.log(result[0].status)
      res.send({
        code: '200',
        msg: '成功',
        token: tokenStr,
        routes: result[0].status === 1 ? managerRoute : constantRoute
      })
    } else {
      res.send({
        code: '9999',
        msg: '失败'
      })
    }
  })
}
exports.getUsers = (req, res) => {
  db.query('select * from users', (err, result) => {
    if (err) return res.send(err)
    res.send({
      code: '200',
      msg: '成功',
      data: result
    })
  })
}
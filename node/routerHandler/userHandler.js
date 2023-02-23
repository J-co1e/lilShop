const db = require('../sql')
exports.login = (req, res) => {
  const username = req.query.username
  const password = req.query.password
  console.log(req.query.username)
  const sqlStr = `select * from users where username='${username}' and password='${password}'`
  db.query(sqlStr,(err,result)=>{
    if(err) res.send(err)
    if(result!==undefined){
      res.send('登录成功')
    }
  })
}
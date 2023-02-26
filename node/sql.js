const mysql = require('mysql')

const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'order'
})
// INSERT INTO users (username,password,status) VALUES ("zs","123456","1")
// SELECT * FROM users WHERE username = 'zs'
// DELETE FROM users WHERE username = "zs"
// UPDATE users SET password = "666666" WHERE username = "zs"
// const user = {username: 'www',password: '88888',status: '1'}
// const sqlStr = 'INSERT INTO users SET ?'
// db.query(sqlStr,user, (err, res) => {
//   if (err) return console.log(err)
//   console.log(res)
// }) 
// const updateStr = 'UPDATE users SET ? WHERE status=?'
// db.query(updateStr,[user,user.status],(err,res)=>{
//   if (err) return console.log(err)
//   console.log(res)
//   if (res.affectedRows === 1) {
//     console.log('success')
//   }
// })

module.exports = db
const mysql = require('mysql');
const config = require('../config/default.js')

const pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE
});

const query = function (sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {        
        return({code:500, data: '操作失败' })
      } else {
        connection.query(sql, values, (err, rows) => {
          // console.log(sql);
          if (err) {
            reject({code:500, data: '操作失败' })
          } else {
            resolve({ code: 200, data: rows })
          }
          connection.release()
        })
      }
    })
  })

}

module.exports = {
  query,
}
const pool = require('../../lib/mysql')
const { query } = pool

const login = (val) => {
  const { user_name, password } = val;
  const _sql = 'select * from users where user_name = ? and password = ?';
  return query(_sql, [user_name, password]);
}

const getInfo = (val) => {
  const { user_name } = val;
  const _sql = 'select * from users where user_name = ?';
  return query(_sql, [user_name]);
}

const register = (val) => {
  const { user_name, password, name } = val;
  const _sql = 'update users set password = ?, name = ? where user_name = ?';
  return query(_sql, [password, name, user_name]);
}

const upVerify = (val) => {
  const { user_name, verification } = val;
  const _sql = 'update users set verification = ? where user_name = ?';
  return query(_sql, [verification, user_name]);
}

const insertVerify = (val) => {
  const { user_name, verification } = val;
  const _sql = 'insert into users (user_name, verification) values (?, ?)';
  return query(_sql, [user_name, verification]);
}

module.exports = {  
  login,
  getInfo,
  register,
  upVerify,
  insertVerify
}
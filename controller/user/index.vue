const pool = require('../../lib/mysql')
const { query } = pool

const getInfo = (val) => {
  const { user_name } = val;
  const _sql = 'select * from users where user_name = ?';
  return query(_sql, [user_name]);
}

const register = (val) => {
  const { user_name, password } = val;
  const _sql = 'update users set password = ? where user_name = ?';
  return query(_sql, [password, user_name]);
}

const upVerify = (val) => {
  const { user_name, verification } = val;
  const _sql = 'update users set verification = ? where user_name = ?';
  return query(_sql, [verification, user_name]);
}

const insertVerify = (val) => {
  const { user_name, verification } = val;
  const _sql = 'insert into users(user_name, verification) values (?, ?)';
  return query(_sql, [user_name, verification]);
}

const upPassworld = (val) => {
  const { user_name, password } = val;
  const _sql = 'update users set password = ? where user_name = ?';
  return query(_sql, [password, user_name]);
}

module.exports = {
  getInfo,
  register,
  upVerify,
  insertVerify,
  upPassworld
}
const pool = require('../../lib/mysql')
const { query } = pool

const getInfo = (val) => {
  const { user_name } = val;
  const _sql = 'select * from admin where user_name = ?';
  return query(_sql, [user_name]);
}

const getAdminList = () => {
  const _sql = 'select * from admin';
  return query(_sql, []);
}

const insertAdmin = (val) => {
  const { user_name, password } = val;
  const _sql = 'insert into admin(user_name, password) values (?, ?)';
  return query(_sql, [user_name, password]);
}

const upPassworld = (val) => {
  const { user_name, password } = val;
  const _sql = 'update admin set password = ? where user_name = ?';
  return query(_sql, [password, user_name]);
}

const delAdmin = (val) => {
  const { user_name } = val;
  const _sql = 'delete from admin where user_name = ?';
  return query(_sql, [user_name]);
}

module.exports = {
  getInfo,
  getAdminList,
  insertAdmin, 
  upPassworld,
  delAdmin
}
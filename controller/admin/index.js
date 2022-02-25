const pool = require('../../lib/mysql')
const { query } = pool

const getInfo = (val) => {
  const { user_name } = val;
  const _sql = 'select name, type, sex, birthday, abode, introduce, avatar from users where user_name = ?';
  return query(_sql, [user_name]);
}

const getByIdInfo = (val) => {
  const { user_name } = val;
  const _sql = 'select * from users where user_name = ?';
  return query(_sql, [user_name]);
}

const getPlayerList = (val) => {
  const { user_name } = val;
  let _sql = 'select user_name, name, type, sex, birthday, abode, introduce, avatar from users';
  if (user_name) _sql += ' where user_name = ?'
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

const upUserInfo = (val) => {
  const { user_name, name, sex, birthday, abode, introduce, avatar } = val;
  const _sql = 'update users set name = ?, sex = ?,birthday = ?,abode = ?,introduce = ?,avatar = ? where user_name = ?';
  return query(_sql, [name, sex, birthday, abode, introduce, avatar, user_name]);
}

module.exports = {
  getInfo,
  register,
  getPlayerList,
  upVerify,
  insertVerify,
  upPassworld,
  getByIdInfo,
  upUserInfo
}
const pool = require('../../lib/mysql')
const { query } = pool
var uuid = require('node-uuid');

const getNoticeList = (val) => {  
    const { name } = val;
    let _sql = 'select * from notice';
    if(name) _sql += ' where txt like ?'
    return query(_sql, ['%' + name + '%']);
}

const getById = (val) => {  
  const { id } = val;
  const _sql = 'select * from notice where id = ?';
  return query(_sql, [id]);
}

const upNotice = (val) => {
  const { id, txt} = val;
  const _sql = 'update notice set txt = ? where id = ?';
  return query(_sql, [txt, id]);
}

const insertNotice = (val) => {
  const { txt } = val;
  const _sql = 'insert into notice(id, txt, time) values (?, ?, ?)';
  return query(_sql, [uuid.v1(), txt, new Date()]);
}

const delNotice = (val) => {
  const { id } = val;
  const _sql = 'delete from notice where id = ?';
  return query(_sql, [id]);
}

const getStudyList = (val) => {  
    const { name } = val;
    let _sql = 'select * from study';
    if(name) _sql += ' where title like ?'
    return query(_sql, ['%' + name + '%']);
}

const getSyudyById = (val) => {  
  const { id } = val;
  const _sql = 'select * from study where id = ?';
  return query(_sql, [id]);
}

const upSyudy = (val) => {
  const { id, title, txt} = val;
  const _sql = 'update study set title = ?, txt = ? where id = ?';
  return query(_sql, [title, txt, id]);
}

const insertSyudy = (val) => {
  const { title, txt } = val;
  const _sql = 'insert into study(id, title, txt, time) values (?, ?, ?, ?)';
  return query(_sql, [uuid.v1(), title, txt, new Date()]);
}

const delSyudy = (val) => {
  const { id } = val;
  const _sql = 'delete from study where id = ?';
  return query(_sql, [id]);
}
module.exports = {
    getNoticeList,
    insertNotice,
    upNotice,
    delNotice,
    getById,
    getStudyList,
    getSyudyById,
    upSyudy,
    insertSyudy,
    delSyudy,
}
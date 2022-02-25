const pool = require('../../lib/mysql')
const { query } = pool
var uuid = require('node-uuid');

const getSlideshowList = (val) => {  
    const { name } = val;
    let _sql = 'select * from slideshow';
    if(name) _sql += ' where title like ?';
    return query(_sql, ['%' + name + '%']);
}

const getById = (val) => {  
  const { id } = val;
  const _sql = 'select * from slideshow where id = ?';
  return query(_sql, [id]);
}

const upSlideshow = (val) => {
  const { id, title, link, img } = val;
  const _sql = 'update slideshow set title = ?, link = ?, img = ? where id = ?';
  return query(_sql, [title, link, img, id]);
}

const insertSlideshow = (val) => {
  const { title, link, img } = val;
  const _sql = 'insert into slideshow(id, title, link, img) values (?, ?, ?, ?)';
  return query(_sql, [uuid.v1(), title, link, img]);
}

const delSlideshow = (val) => {
  const { id } = val;
  const _sql = 'delete from slideshow where id = ?';
  return query(_sql, [id]);
}

module.exports = {
    getSlideshowList,
    insertSlideshow,
    upSlideshow,
    delSlideshow,
    getById
}
const pool = require('../../lib/mysql')
const { query } = pool
var uuid = require('node-uuid');

const getSlideshowList = (val) => {  
    const { name } = val;
    const _sql = 'select * from slideshow where title like ?';
    return query(_sql, ['%' + name + '%']);
}

const upSlideshow = (val) => {
  const { id, title, link, img } = val;
  const _sql = 'update users set title = ?, link = ?, msg = ? where id = ?';
  return query(_sql, [id, title, link, img]);
}

const insertSlideshow = (val) => {
  const { title, link, img } = val;
  const _sql = 'insert into slideshow(id, title, link, img) values (?, ?, ?, ?)';
  return query(_sql, [uuid.v1(), title, link, img]);
}

const delSlideshow = (val) => {
  const { id } = val;
  const _sql = 'update users set password = ? where user_name = ?';
  return query(_sql, [password, user_name]);
}

module.exports = {
    getSlideshowList,
    insertSlideshow,
    upSlideshow,
    delSlideshow
}
const pool = require('../../lib/mysql')
const { query } = pool
var uuid = require('node-uuid');

const getSuggestList = () => {      
    let _sql = 'select * from suggest';    
    return query(_sql, []);
}

const insertSuggest = (val) => {
  const { type, txt, img } = val;
  const _sql = 'insert into suggest(id, type, txt, img) values (?, ?, ?, ?)';
  return query(_sql, [uuid.v1(), type, txt, img]);
}

const getAboutList = (val) => {  
  let _sql = 'select * from about';  
  return query(_sql, []);
}

const getAboutById = (val) => {  
const { id } = val;
const _sql = 'select * from about where id = ?';
return query(_sql, [id]);
}

const upAbout = (val) => {
const { id, txt} = val;
const _sql = 'update about set txt = ? where id = ?';
return query(_sql, [txt, id]);
}

const insertAbout = (val) => {
const { txt } = val;
const _sql = 'insert into about(id, txt) values (?, ?)';
return query(_sql, [uuid.v1(), txt]);
}

const delAbout = (val) => {
const { id } = val;
const _sql = 'delete from about where id = ?';
return query(_sql, [id]);
}

const getPayList = (val) => {  
  let _sql = 'select * from pay';  
  return query(_sql, []);
}

const getPayById = (val) => {  
const { id } = val;
const _sql = 'select * from pay where id = ?';
return query(_sql, [id]);
}

const upPay = (val) => {
const { id, img} = val;
const _sql = 'update pay set img = ? where id = ?';
return query(_sql, [img, id]);
}

const insertPay = (val) => {
const { img } = val;
const _sql = 'insert into pay(id, img) values (?, ?)';
return query(_sql, [uuid.v1(), img]);
}

const delPay = (val) => {
const { id } = val;
const _sql = 'delete from pay where id = ?';
return query(_sql, [id]);
}

module.exports = {
    getSuggestList,
    insertSuggest,    
    getAboutList,
    getAboutById,
    upAbout,
    insertAbout,
    delAbout,
    getPayList,
    getPayById,
    upPay,
    insertPay,
    delPay
}
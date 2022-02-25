const pool = require('../../lib/mysql')
const { query } = pool
var uuid = require('node-uuid');
const { format } = require('../../helper/format');


const getGameList = () => {
    const _sql = 'select * from game';
    return query(_sql, []);
}

const getGameTypeList = (val) => {
    let { guishu } = val;
    let _sql = 'select * from game_type';
    if (guishu) _sql += ' where guishu = ?'
    return query(_sql, [guishu]);
}

const getById = (val) => {
    const { id } = val;
    const _sql = 'select * from game_type where id = ?';
    return query(_sql, [id]);
}

const getGameById = (val) => {
    const { id } = val;
    const _sql = 'select * from game where id = ?';
    return query(_sql, [id]);
}

const upGame = (val) => {
    const { id, name } = val;
    const _sql = 'update game set name = ? where id = ?';
    return query(_sql, [name, id]);
}

const upGameType = (val) => {
    const { id, type, name, guishu } = val;
    const _sql = 'update game_type set type = ?, name = ?, guishu = ? where id = ?';
    return query(_sql, [type, name, guishu, id]);
}

const insertGame = (val) => {
    let { id, name } = val;
    if (!id) id = 1;
    const _sql = 'insert into game(id, name) values (?, ?)';
    return query(_sql, [id, name]);
}

const insertGameType = (val) => {
    const { type, name, guishu } = val;
    const _sql = 'insert into game_type(id, type, name, guishu) values (?, ?, ?, ?)';
    return query(_sql, [uuid.v1(), type, name, guishu]);
}

const delGame = (val) => {
    const { id } = val;
    const _sql = 'delete from game where id = ?';
    return query(_sql, [id]);
}

const delGameType = (val) => {
    const { id } = val;
    const _sql = 'delete from game_type where id = ?';
    return query(_sql, [id]);
}

const getBillTypeList = (val) => {
    const { start_time, end_time, game_type } = val;
    let _sql = 'select * from bill_type where game_type = ?';
    if (!end_time) _sql += ' and TO_DAYS(time) - TO_DAYS(?) <= 30 ORDER BY time DESC';
    else _sql += ' and date(time) between ? and ? ORDER BY time DESC';
    return query(_sql, [game_type, start_time, end_time]);
}

const insertBillType = (val) => {
    const { id, status, game_type } = val;
    const _sql = 'insert into bill_type(id, status, game_type, time) values (?, ?, ?, ?)';
    return query(_sql, [id, status || 0, game_type, new Date()]);
}

const upBillType = (val) => {
    const { id, status, game_type } = val;
    const _sql = 'update bill_type set status = ?, game_type = ? where id = ?';
    return query(_sql, [status, game_type, id]);
}

const delBillType = (val) => {
    const { id } = val;
    const _sql = 'delete from bill_type where id = ?';
    return query(_sql, [id]);
}

const getBillTypeById = (val) => {
    const { id } = val;
    const _sql = 'select * from bill_type where id = ?';
    return query(_sql, [id]);
}

const getBillList = (val) => {
    const { old_bill, bill } = val;
    let _sql = 'select * from bill_info where old_bill = ?';
    if (bill) _sql += ' and bill like ?'
    return query(_sql, [old_bill, '%' + bill + '%']);
}

const insertBillInfo = (val) => {
    const { old_bill, bill, title, txt } = val;
    const _sql = 'insert into bill_info(id, old_bill, bill, title, txt, time) values (?, ?, ?, ?, ?, ?)';
    return query(_sql, [uuid.v1(), old_bill, bill, title, txt, format('yyyy/MM/dd')]);
}

const upBillInfo = (val) => {
    const { id, old_bill, bill, title, txt } = val;
    const _sql = 'update bill_info set old_bill = ?, bill = ?, title = ?, txt = ? where id = ?';
    return query(_sql, [old_bill, bill, title, txt, id]);
}

const delBillInfo = (val) => {
    const { id } = val;
    const _sql = 'delete from bill_info where id = ?';
    return query(_sql, [id]);
}

const getBillById = (val) => {
    const { id } = val;
    const _sql = 'select * from bill_info where id = ?';
    return query(_sql, [id]);
}

const getVipTypeList = (val) => {
    const { type } = val;
    let _sql = 'select * from users';
    if (type) _sql += ' where type = ?'
    return query(_sql, [type]);
}

const insertVipInfo = (val) => {
    const { user_name, name, type } = val;
    const _sql = 'insert into users(user_name, name, type, time) values (?, ?, ?, ?)';
    return query(_sql, [user_name, name, type, new Date()]);
}

const upVipType = (val) => {
    const { user_name, type } = val;
    const _sql = 'update users set type = ?, time = ? where user_name = ?';
    return query(_sql, [type || 0, new Date(), user_name]);
}

const getVipById = (val) => {
    const { user_name } = val;
    const _sql = 'select * from users where user_name = ?';
    return query(_sql, [user_name]);
}
module.exports = {
    getGameList,
    getGameTypeList,
    getGameById,
    upGame,
    upGameType,
    insertGame,
    insertGameType,
    delGame,
    delGameType,
    getById,
    getBillTypeList,
    insertBillType,
    upBillType,
    delBillType,
    getBillTypeById,
    getBillList,
    insertBillInfo,
    upBillInfo,
    delBillInfo,
    getBillById,
    getVipTypeList,
    insertVipInfo,
    upVipType,    
    getVipById
}
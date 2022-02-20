const pool = require('../../lib/mysql')
const { query } = pool
var uuid = require('node-uuid');


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
    return query(_sql, [id, status, game_type, new Date().toLocaleDateString()]);
}

const upBillType = (val) => {
    const { id, status, game_type } = val;
    const _sql = 'update bill_type set status = ?, game_type = ? where id = ?';
    return query(_sql, [id, status, game_type]);
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
    return query(_sql, [uuid.v1(), old_bill, bill, title, txt, new Date().toLocaleDateString()]);
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
    let _sql = 'select * from vip_type';
    if (type) _sql += ' where type = ?'
    return query(_sql, [type]);
}

const insertVipInfo = (val) => {
    const { account, name, type } = val;
    const _sql = 'insert into vip_type(account, name, type, time) values (?, ?, ?, ?)';
    return query(_sql, [account, name, type, new Date().toLocaleDateString()]);
}

const upVipType = (val) => {
    const { account, name, type } = val;
    const _sql = 'update vip_type set name = ?, type = ? where account = ?';
    return query(_sql, [name, type, account]);
}

const delVipType = (val) => {
    const { account } = val;
    const _sql = 'delete from vip_type where account = ?';
    return query(_sql, [account]);
}

const getVipById = (val) => {
    const { account } = val;
    const _sql = 'select * from vip_type where account = ?';
    return query(_sql, [account]);
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
    delVipType,
    getVipById
}
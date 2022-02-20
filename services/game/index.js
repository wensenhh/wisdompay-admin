const controller = require('../../controller/game')
var _ = require('lodash');
const { success, failed } = require('../../helper/pojo')
const canerr = { code: 201, msg: '参数错误' };
const shiban = { code: 201, msg: '服务器异常' };

const getGameList = async ctx => {
    let res;
    try {
        let list = await controller.getGameList();
        if (list.code != 200) return res = success(shiban);
        res = success({ code: 200, data: { list: list.data } });
    } catch (err) {
        res = failed(err);
    } finally {
        ctx.body = res;
    }
}

const getGameTypeList = async ctx => {
    let res;
    try {
        let val = ctx.request.query;
        let list = await controller.getGameTypeList(val);
        if (list.code != 200) return res = success(shiban);
        res = success({ code: 200, data: { list: list.data } });
    } catch (err) {
        res = failed(err);
    } finally {
        ctx.body = res;
    }
}

const insertGame = async ctx => {
    let res;
    try {
        const val = ctx.request.body;
        const { name } = val;
        if (!name) return success(canerr);
        let list = await controller.getGameList();
        if (list.code != 200) return res = success(shiban);
        let id = list.data.length;
        for (let i = id; i++;) {            
            let data = await controller.getGameById({id: i});
            if(data.code != 200 || data.data.length == 0) {
                id = i;
                break;
            }
        }
        await controller.insertGame({id, name});
        res = success({ code: 200, msg: '添加成功' });
    } catch (err) {
        res = failed(err);
    } finally {
        ctx.body = res;
    }
}

const insertGameType = async ctx => {
    let res;
    try {
        const val = ctx.request.body;
        const { type, name, guishu } = val;
        if (!type || !name || !guishu) return success(canerr);       
        await controller.insertGameType(val);
        res = success({ code: 200, msg: '添加成功' });
    } catch (err) {
        res = failed(err);
    } finally {
        ctx.body = res;
    }
}

const upGame = async ctx => {
    let res;
    try {
        const val = ctx.request.body;
        const { id, name } = val;
        if (!id || !name) return success(canerr);
        let list = await controller.getGameById(val);
        if (list.code != 200) return res = success(shiban);
        if (list.data.length == 0) return res = success({ code: 201, msg: '数据不存在' });
        await controller.upGame(val);
        res = success({ code: 200, msg: '修改成功' });
    } catch (err) {
        res = failed(err);
    } finally {
        ctx.body = res;
    }
}

const upGameType = async ctx => {
    let res;
    try {
        const val = ctx.request.body;
        const { id, name, type, guishu } = val;
        if (!id || !name || !type || !guishu) return success(canerr);
        let list = await controller.getById(val);
        if (list.code != 200) return res = success(shiban);
        if (list.data.length == 0) return res = success({ code: 201, msg: '数据不存在' });
        await controller.upGameType(val);
        res = success({ code: 200, msg: '修改成功' });
    } catch (err) {
        res = failed(err);
    } finally {
        ctx.body = res;
    }
}

const delGame = async ctx => {
    let res;
    try {
        const val = ctx.request.body;
        const { id } = val;
        if (!id) return success(canerr);
        let list = await controller.getGameById(val);
        if (list.code != 200) return res = success(shiban);
        if (list.data.length == 0) return res = success({ code: 201, msg: '数据不存在' });
        await controller.delGame(val);
        res = success({ code: 200, msg: '删除成功' });
    } catch (err) {
        res = failed(err);
    } finally {
        ctx.body = res;
    }
}

const delGameType = async ctx => {
    let res;
    try {
        const val = ctx.request.body;
        const { id } = val;
        if (!id) return success(canerr);
        let list = await controller.getById(val);
        if (list.code != 200) return res = success(shiban);
        if (list.data.length == 0) return res = success({ code: 201, msg: '数据不存在' });
        await controller.delGameType(val);
        res = success({ code: 200, msg: '删除成功' });
    } catch (err) {
        res = failed(err);
    } finally {
        ctx.body = res;
    }
}

const getBillTypeList = async ctx => {
    let res;
    try {
        const val = ctx.request.query;
        let { start_time, game_type } = val;        
        if(!game_type) return success(canerr);
        if(!start_time) start_time = new Date().toLocaleDateString();
        val.start_time = start_time;
        let list = await controller.getBillTypeList(val);
        if (list.code != 200) return res = success(shiban);
        res = success({ code: 200, data: { list: list.data } });        
    } catch (err) {
        res = failed(err);
    } finally {        
        ctx.body = res;
    }
}

const insertBillType = async ctx => {
    let res;
    try {
        const val = ctx.request.body;
        const { id, status, game_type } = val;
        if (!id || !status || !game_type) return success(canerr);       
        await controller.insertBillType(val);
        res = success({ code: 200, msg: '添加成功' });
    } catch (err) {
        res = failed(err);
    } finally {
        ctx.body = res;
    }
}

const upBillType = async ctx => {
    let res;
    try {
        const val = ctx.request.body;
        const { id, status, game_type } = val;
        if (!id || !status || !game_type) return success(canerr);
        let list = await controller.getBillTypeById(val);
        if (list.code != 200) return res = success(shiban);
        if (list.data.length == 0) return res = success({ code: 201, msg: '数据不存在' });
        await controller.upBillType(val);
        res = success({ code: 200, msg: '修改成功' });
    } catch (err) {
        res = failed(err);
    } finally {
        ctx.body = res;
    }
}

const delBillType = async ctx => {
    let res;
    try {
        const val = ctx.request.body;
        const { id } = val;
        if (!id) return success(canerr);
        let list = await controller.getBillTypeById(val);
        if (list.code != 200) return res = success(shiban);
        if (list.data.length == 0) return res = success({ code: 201, msg: '数据不存在' });
        await controller.delBillType(val);
        res = success({ code: 200, msg: '删除成功' });
    } catch (err) {
        res = failed(err);
    } finally {
        ctx.body = res;
    }
}

const getBillList = async ctx => {
    let res;
    try {
        const val = ctx.request.query;
        let { old_bill } = val;
        if(!old_bill) return success(canerr);        
        let list = await controller.getBillList(val);
        if (list.code != 200) return res = success(shiban);
        res = success({ code: 200, data: { list: list.data } });        
    } catch (err) {
        res = failed(err);
    } finally {        
        ctx.body = res;
    }
}

const insertBillInfo = async ctx => {
    let res;
    try {
        const val = ctx.request.body;
        const { old_bill, bill, title, txt } = val;
        if (!old_bill || !bill || !title || !txt) return success(canerr);       
        await controller.insertBillInfo(val);
        res = success({ code: 200, msg: '添加成功' });
    } catch (err) {
        res = failed(err);
    } finally {
        ctx.body = res;
    }
}

const upBillInfo = async ctx => {
    let res;
    try {
        const val = ctx.request.body;
        const { id, old_bill, bill, title, txt } = val;
        if (!id || !old_bill || !bill || !title || !txt) return success(canerr);
        let list = await controller.getBillById(val);
        if (list.code != 200) return res = success(shiban);
        if (list.data.length == 0) return res = success({ code: 201, msg: '数据不存在' });
        await controller.upBillInfo(val);
        res = success({ code: 200, msg: '修改成功' });
    } catch (err) {
        res = failed(err);
    } finally {
        ctx.body = res;
    }
}

const delBillInfo = async ctx => {
    let res;
    try {
        const val = ctx.request.body;
        const { id } = val;
        if (!id) return success(canerr);
        let list = await controller.getBillById(val);
        if (list.code != 200) return res = success(shiban);
        if (list.data.length == 0) return res = success({ code: 201, msg: '数据不存在' });
        await controller.delBillInfo(val);
        res = success({ code: 200, msg: '删除成功' });
    } catch (err) {
        res = failed(err);
    } finally {
        ctx.body = res;
    }
}

const getVipTypeList = async ctx =>{
    let res;
    try {
        const val = ctx.request.query;                 
        let list = await controller.getVipTypeList(val);
        if (list.code != 200) return res = success(shiban);
        res = success({ code: 200, data: { list: list.data } });        
    } catch (err) {
        res = failed(err);
    } finally {        
        ctx.body = res;
    }
}

const insertVipInfo = async ctx => {
    let res;
    try {
        const val = ctx.request.body;
        const { account, name, type } = val;
        if (!account || !name || !type) return success(canerr);       
        await controller.insertVipInfo(val);
        res = success({ code: 200, msg: '添加成功' });
    } catch (err) {
        res = failed(err);
    } finally {
        ctx.body = res;
    }
}

const upVipType = async ctx => {
    let res;
    try {
        const val = ctx.request.body;
        const { account, name, type } = val;
        if (!account || !name || !type) return success(canerr);    
        let list = await controller.getVipById(val);
        if (list.code != 200) return res = success(shiban);
        if (list.data.length == 0) return res = success({ code: 201, msg: '数据不存在' });
        await controller.upVipType(val);
        res = success({ code: 200, msg: '修改成功' });
    } catch (err) {
        res = failed(err);
    } finally {
        ctx.body = res;
    }
}

const delVipType = async ctx => {
    let res;
    try {
        const val = ctx.request.body;
        const { account } = val;
        if (!account) return success(canerr);
        let list = await controller.getVipById(val);
        if (list.code != 200) return res = success(shiban);
        if (list.data.length == 0) return res = success({ code: 201, msg: '数据不存在' });
        await controller.delVipType(val);
        res = success({ code: 200, msg: '删除成功' });
    } catch (err) {
        res = failed(err);
    } finally {
        ctx.body = res;
    }
}
module.exports = {
    getGameList,
    getGameTypeList,
    insertGame,
    insertGameType,
    upGame,
    upGameType,
    delGame,
    delGameType,
    getBillTypeList,
    insertBillType,
    upBillType,
    delBillType,
    getBillList,
    insertBillInfo,
    upBillInfo,
    delBillInfo,
    getVipTypeList,
    insertVipInfo,
    upVipType,
    delVipType    
}
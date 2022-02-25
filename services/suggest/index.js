const controller = require('../../controller/suggest')
var _ = require('lodash');
const { success, failed } = require('../../helper/pojo')
const canerr = { code: 201, msg: '参数错误' };
const shiban = { code: 201, msg: '服务器异常' };

const getSuggestList = async ctx => {
    let res;
    try {        
        let list = await controller.getSuggestList();
        if (list.code != 200) return res = success(shiban);
        res = success({ code: 200, data: { list: list.data } });
    } catch (err) {
        res = failed(err);
    } finally {
        ctx.body = res;
    }
}

const insertSuggest = async ctx => {
    let res;
    try {
        const val = ctx.request.body;
        const { type } = val;
        if(!type) return success(canerr);
        await controller.insertSuggest(val);
        res = success({ code: 200, msg: '添加成功'});
    } catch (err) {
        res = failed(err);
    } finally {
        ctx.body = res;
    }
}

const getAboutList = async ctx => {
    let res;
    try {          
        let list = await controller.getAboutList();
        if (list.code != 200) return res = success(shiban);
        res = success({ code: 200, data: { list: list.data } });
    } catch (err) {
        res = failed(err);
    } finally {
        ctx.body = res;
    }
}

const insertAbout = async ctx => {
    let res;
    try {
        const val = ctx.request.body;
        const { txt } = val;
        if(!txt) return success(canerr);
        await controller.insertAbout(val);
        res = success({ code: 200, msg: '添加成功'});
    } catch (err) {
        res = failed(err);
    } finally {
        ctx.body = res;
    }
}

const upAbout = async ctx => {
    let res;
    try {
        const val = ctx.request.body;
        const { id, txt } = val;
        if(!id || !txt) return success(canerr);
        let list = await controller.getAboutById(val);
        if (list.code != 200) return res = success(shiban);
        if(list.data.length == 0) return res = success({ code: 201, msg: '数据不存在'});
        await controller.upAbout(val);
        res = success({ code: 200, msg: '修改成功'});
    } catch (err) {
        res = failed(err);
    } finally {
        ctx.body = res;
    }
}

const delAbout = async ctx => {
    let res;
    try {
        const val = ctx.request.body;
        const { id } = val;
        if(!id) return success(canerr);
        let list = await controller.getAboutById(val);
        if (list.code != 200) return res = success(shiban);
        if(list.data.length == 0) return res = success({ code: 201, msg: '数据不存在'});
        await controller.delAbout(val);
        res = success({ code: 200, msg: '删除成功'});
    } catch (err) {
        res = failed(err);
    } finally {
        ctx.body = res;
    }
}

const getPayList = async ctx => {
    let res;
    try {          
        let list = await controller.getPayList();
        if (list.code != 200) return res = success(shiban);
        res = success({ code: 200, data: { list: list.data } });
    } catch (err) {
        res = failed(err);
    } finally {
        ctx.body = res;
    }
}

const insertPay = async ctx => {
    let res;
    try {
        const val = ctx.request.body;
        const { img } = val;
        if(!img) return success(canerr);
        await controller.insertPay(val);
        res = success({ code: 200, msg: '添加成功'});
    } catch (err) {
        res = failed(err);
    } finally {
        ctx.body = res;
    }
}

const upPay = async ctx => {
    let res;
    try {
        const val = ctx.request.body;
        const { id, img } = val;
        if(!id || !img) return success(canerr);
        let list = await controller.getPayById(val);
        if (list.code != 200) return res = success(shiban);
        if(list.data.length == 0) return res = success({ code: 201, msg: '数据不存在'});
        await controller.upPay(val);
        res = success({ code: 200, msg: '修改成功'});
    } catch (err) {
        res = failed(err);
    } finally {
        ctx.body = res;
    }
}

const delPay = async ctx => {
    let res;
    try {
        const val = ctx.request.body;
        const { id } = val;
        if(!id) return success(canerr);
        let list = await controller.getPayById(val);
        if (list.code != 200) return res = success(shiban);
        if(list.data.length == 0) return res = success({ code: 201, msg: '数据不存在'});
        await controller.delPay(val);
        res = success({ code: 200, msg: '删除成功'});
    } catch (err) {
        res = failed(err);
    } finally {
        ctx.body = res;
    }
}

module.exports = {
    getSuggestList,    
    insertSuggest,
    getAboutList,    
    upAbout,
    insertAbout,
    delAbout,
    getPayList,    
    upPay,
    insertPay,
    delPay
}


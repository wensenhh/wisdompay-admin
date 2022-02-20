const controller = require('../../controller/notice')
var _ = require('lodash');
const { success, failed } = require('../../helper/pojo')
const canerr = { code: 201, msg: '参数错误' };
const shiban = { code: 201, msg: '服务器异常' };

const getNoticeList = async ctx => {
    let res;
    try {
        const val = ctx.request.query;       
        let list = await controller.getNoticeList(val);
        if (list.code != 200) return res = success(shiban);
        res = success({ code: 200, data: { list: list.data } });
    } catch (err) {
        res = failed(err);
    } finally {
        ctx.body = res;
    }
}

const insertNotice = async ctx => {
    let res;
    try {
        const val = ctx.request.body;
        const { txt } = val;
        if(!txt) return success(canerr);
        await controller.insertNotice(val);
        res = success({ code: 200, msg: '添加成功'});
    } catch (err) {
        res = failed(err);
    } finally {
        ctx.body = res;
    }
}

const upNotice = async ctx => {
    let res;
    try {
        const val = ctx.request.body;
        const { id, txt } = val;
        if(!id || !txt) return success(canerr);
        let list = await controller.getById(val);
        if (list.code != 200) return res = success(shiban);
        if(list.data.length == 0) return res = success({ code: 201, msg: '数据不存在'});
        await controller.upNotice(val);
        res = success({ code: 200, msg: '修改成功'});
    } catch (err) {
        res = failed(err);
    } finally {
        ctx.body = res;
    }
}

const delNotice = async ctx => {
    let res;
    try {
        const val = ctx.request.body;
        const { id } = val;
        if(!id) return success(canerr);
        let list = await controller.getById(val);
        if (list.code != 200) return res = success(shiban);
        if(list.data.length == 0) return res = success({ code: 201, msg: '数据不存在'});
        await controller.delNotice(val);
        res = success({ code: 200, msg: '删除成功'});
    } catch (err) {
        res = failed(err);
    } finally {
        ctx.body = res;
    }
}

const getStudyList = async ctx => {
    let res;
    try {
        const val = ctx.request.query;       
        let list = await controller.getStudyList(val);
        if (list.code != 200) return res = success(shiban);
        res = success({ code: 200, data: { list: list.data } });
    } catch (err) {
        res = failed(err);
    } finally {
        ctx.body = res;
    }
}

const insertSyudy = async ctx => {
    let res;
    try {
        const val = ctx.request.body;
        const { title, txt } = val;
        if(!txt || !title) return success(canerr);
        await controller.insertSyudy(val);
        res = success({ code: 200, msg: '添加成功'});
    } catch (err) {
        res = failed(err);
    } finally {
        ctx.body = res;
    }
}

const upSyudy = async ctx => {
    let res;
    try {
        const val = ctx.request.body;
        const { id, txt, title } = val;
        if(!id || !txt || !title) return success(canerr);
        let list = await controller.getSyudyById(val);
        if (list.code != 200) return res = success(shiban);
        if(list.data.length == 0) return res = success({ code: 201, msg: '数据不存在'});
        await controller.upSyudy(val);
        res = success({ code: 200, msg: '修改成功'});
    } catch (err) {
        res = failed(err);
    } finally {
        ctx.body = res;
    }
}

const delSyudy = async ctx => {
    let res;
    try {
        const val = ctx.request.body;
        const { id } = val;
        if(!id) return success(canerr);
        let list = await controller.getSyudyById(val);
        if (list.code != 200) return res = success(shiban);
        if(list.data.length == 0) return res = success({ code: 201, msg: '数据不存在'});
        await controller.delSyudy(val);
        res = success({ code: 200, msg: '删除成功'});
    } catch (err) {
        res = failed(err);
    } finally {
        ctx.body = res;
    }
}

module.exports = {
    getNoticeList,
    insertNotice,
    upNotice,
    delNotice,
    getStudyList,
    upSyudy,
    insertSyudy,
    delSyudy,
}
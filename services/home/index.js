const controller = require('../../controller/home')
var _ = require('lodash');
const { success, failed } = require('../../helper/pojo')
const canerr = { code: 201, msg: '参数错误' };
const shiban = { code: 201, msg: '服务器异常' };

const getSlideshowList = async ctx => {
    let res;
    try {
        const val = ctx.request.body;
        let list = await controller.getSlideshowList(val);
        if (list.code != 200) return res = success(shiban);
        res = success({ code: 200, data: { list: list.data } });
    } catch (err) {
        res = failed(err);
    } finally {
        ctx.body = res;
    }
}

const upload = async ctx => {
    let res;
    try {
        let path = ctx.request.files.file.path;
        let a = _.split(path, '\\');
        let data = '/' + a[a.length - 2] + '/' + a.pop();
        res = success({ code: 200, data });
    } catch (err) {
        console.log(err);
        res = failed(err);
    }
    ctx.body = res;
}

const instertSlideshow = async ctx => {
    let res;
    try {
        const val = ctx.request.body;
        const { title, link, img} = val;
        if(!title || !link || !img) return success(canerr);
        await controller.insertSlideshow(val);
        res = success({ code: 200, msg: '添加成功'});
    } catch (err) {
        res = failed(err);
    } finally {
        ctx.body = res;
    }
}

const upSlideshow = async ctx => {
    let res;
    try {
        const val = ctx.request.body;
        const { id, title, link, img} = val;
        if(!id || !title || !link || !img) return success(canerr);
        let list = await controller.getById(val);
        if (list.code != 200) return res = success(shiban);
        if(list.data.length == 0) return res = success({ code: 201, msg: '数据不存在'});
        await controller.upSlideshow(val);
        res = success({ code: 200, msg: '修改成功'});
    } catch (err) {
        res = failed(err);
    } finally {
        ctx.body = res;
    }
}

const delSlideshow = async ctx => {
    let res;
    try {
        const val = ctx.request.body;
        const { id } = val;
        if(!id) return success(canerr);
        let list = await controller.getById(val);
        if (list.code != 200) return res = success(shiban);
        if(list.data.length == 0) return res = success({ code: 201, msg: '数据不存在'});
        await controller.delSlideshow(val);
        res = success({ code: 200, msg: '删除成功'});
    } catch (err) {
        res = failed(err);
    } finally {
        ctx.body = res;
    }
}

module.exports = {
    getSlideshowList,
    upload,
    instertSlideshow,
    upSlideshow,
    delSlideshow
}
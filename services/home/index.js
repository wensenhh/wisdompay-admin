const controller = require('../../controller/home')
var _ = require('lodash');
const { success, failed } = require('../../helper/pojo')
const canerr = { code: 201, msg: '参数错误' }

const getSlideshowList = async ctx => {
    let res;
    try {
        const val = ctx.request.body;
        let list = await controller.getSlideshowList(val);
        if (list.code != 200) res = success(user);
        res = success({ code: 200, data: { list: list.data } });
    } catch (err) {
        res = failed(err);
    }
    ctx.body = res;
}

const upload = async ctx => {
    let res;
    try{        
        let path = ctx.request.files.file.path;
        let a = _.split(path,'\\');
        let data = '/' + a[a.length - 2] + '/' + a.pop();
        res = success({ code: 200, data });
    } catch (err){
        console.log(err);
        res = failed(err);
    }                
    ctx.body = res;
}

module.exports = {
    getSlideshowList,
    upload
}
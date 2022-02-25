const controller = require('../../controller/user')
var _ = require('lodash');
const { success, failed } = require('../../helper/pojo')
const canerr = { code: 201, msg: '参数错误' };
const shiban = { code: 201, msg: '服务器异常' };

const accountLogin = async ctx => {
    let res;
    try {
      const val = ctx.request.query;
      const { user_name, password } = val;
      if (!user_name || !password) {
        return res = success(canerr);
      }
      await controller.getInfo(val).then(result => {
        if (result.code == 200) {
          if (result.data.length === 0 || result === null || result === undefined) return res = success({ code: 201, msg: '账号不存在' });
          let data = result.data[0];         
          if (password != data.password) return res = success({ code: 201, msg: '密码错误' });          
          ctx.session.user_id = user_name;
          res = success({ code: 200, data: { token: user_name }, msg: '登陆成功' });
        } else return res = success(shiban);
      })
    } catch (err) {
      res = failed(err);
    } finally {
      ctx.body = res;
    }
}

const getUserInfo = async ctx => {
    let res;
    try {      
      const user_name = ctx.session.user_id;
      if(!user_name) return res = success({ code: 402, msg: '登录超时'})      
      let user = await controller.getInfo({ user_name });
      if (user.code != 200) return res = success(shiban);      
      if (user.data.length != 1) res = success({ code: 201, msg: '账号不存在' });
      else res = success({
        code: 200,
        data: { list: user.data },
        message: '成功'
      })
    } catch (err) {      
      res = success({
        code: 401,
        type: 'GET_ADMIN_INFO_FAILED',
        message: '获取用户信息失败'
      })
    } finally {
      ctx.body = res;
    }
}

const getUserList = async ctx => {
    let res;
    try {      
      let user = await controller.getAdminList();
      if (user.code != 200) return res = success(shiban);
      if (user.data.length == 0) res = success({ code: 201, msg: '账号不存在' });
      else res = success({
        code: 200,
        data: { list: user.data },
        message: '成功'
      })
    } catch (err) {
      res = success({
        code: 401,
        type: 'GET_ADMIN_INFO_FAILED',
        message: '获取用户信息失败'
      })
    } finally {
      ctx.body = res;
    }
}

const singout = ctx => {
    let res;
    try {
      ctx.session.destroy();
      res = success({
        code: 200,
        data: ['1'],
        message: '退出成功'
      })
    } catch (err) {
      res = success(canerr);
    }
    ctx.body = res;
}

const insertAdmin = async ctx => {
    let res;
    try {
        const val = ctx.request.body;
        const { user_name, password } = val;
        if(!user_name || !password) return success(canerr);
        let list = await controller.getInfo(val);
        if (list.code == 200 && list.data.length > 0) return res = success({code:201,msg: '账号已存在'});
        await controller.insertAdmin(val);
        res = success({ code: 200, msg: '添加成功'});
    } catch (err) {
        res = failed(err);
    } finally {
        ctx.body = res;
    }
}

const upPassworld = async ctx => {
    let res;
    try {
        const val = ctx.request.body;
        const { user_name, password } = val;
        if(!user_name || !password) return success(canerr);
        let list = await controller.getInfo(val);
        if (list.code != 200) return res = success(shiban);
        if(list.data.length == 0) return res = success({ code: 201, msg: '数据不存在'});
        await controller.upPassworld(val);
        res = success({ code: 200, msg: '修改成功'});
    } catch (err) {
        res = failed(err);
    } finally {
        ctx.body = res;
    }
}

const delAdmin = async ctx => {
    let res;
    try {
        const val = ctx.request.body;
        const { user_name } = val;
        if(!user_name) return success(canerr);
        let list = await controller.getInfo(val);
        if (list.code != 200) return res = success(shiban);
        if(list.data.length == 0) return res = success({ code: 201, msg: '数据不存在'});
        await controller.delAdmin(val);
        res = success({ code: 200, msg: '删除成功'});
    } catch (err) {
        res = failed(err);
    } finally {
        ctx.body = res;
    }
}

module.exports = {
    accountLogin,
    getUserInfo,
    getUserList,
    singout,
    insertAdmin,
    upPassworld,
    delAdmin
}
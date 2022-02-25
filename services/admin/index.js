const controller = require('../../controller/admin')
var _ = require('lodash');
const { success, failed } = require('../../helper/pojo')
const note = require('../../helper/note');
const canerr = { code: 201, msg: '参数错误' };
const shiban = { code: 201, msg: '服务器异常' };
const crypto = require('crypto');


const login = async ctx => {
  let res;
  try {
    const val = ctx.request.body;
    const { user_name, password, verification } = val;
    if (!user_name || (!password && !verification)) {
      return res = success(canerr);
    }
    let result = await controller.getByIdInfo(val);
    if (result.code == 200) {
      if (result.data.length === 0 || result === null || result === undefined) return res = success({ code: 201, msg: '账号不存在' });
      let data = result.data[0];
      if (verification) {
        if (!data.verification) return res = success({ code: 201, msg: '请获取验证码' });
        if (verification != data.verification) return res = success({ code: 201, msg: '验证码错误' });
      }
      if (password) {
        if (!data.password) return res = success({ code: 201, msg: '手机号未注册' });
        if (password != data.password) return res = success({ code: 201, msg: '密码错误' });
      }
      ctx.session.user_name = user_name;
      res = success({ code: 200, data: { token: Md5(user_name), vip_type: data.type }, msg: '登陆成功' });
    } else res = success(shiban);    
  } catch (err) {
    res = failed(err);
  } finally {
    ctx.body = res;
  }
}

function Md5(password) {
	const md5 = crypto.createHash('md5');
	return md5.update(password).digest('base64');
}

const verif = async ctx => {
  let res;
  try {
    const val = ctx.request.body;
    const { user_name } = val;
    if (!user_name) return res = success(canerr);
    let user = await controller.getInfo(val);
    if (user.code != 200) return res = success(shiban);
    let verification = setVerification();
    if (user.data.length > 0) {
      await controller.upVerify({ user_name, verification });
    } else {
      await controller.insertVerify({ user_name, verification });
    }
    // note.main({phone: user_name, verification });
    res = success({ code: 200, msg: '发送成功' });
  } catch (err) {
    res = failed(err);
  } finally {
    ctx.body = res;
  }
}

const register = async ctx => {
  let res;
  try {
    const val = ctx.request.body;
    const { user_name, password, verification } = val;
    if (!user_name || !password || !verification) return res = success(canerr);
    let user = await controller.getByIdInfo(val);
    if (user.code != 200) return res = success(shiban);
    if (user.data.length != 1) return res = success({ code: 201, msg: '验证码错误' });
    let data = user.data[0];
    if (verification != data.verification) return res = success({ code: 201, msg: '验证码错误' });
    await controller.upPassworld(val);
    ctx.session.user_name = user_name;
    res = success({ code: 200, data: { token: Md5(user_name), vip_type: data.type }, msg: '注册成功' });
  } catch (err) {
    res = failed(err);
  } finally {
    ctx.body = res;
  }
}

const updatePassword = async ctx => {
  let res;
  try {
    const val = ctx.request.body;
    const { user_name, password, verification } = val;
    if (!user_name || !password || !verification) return res = success(canerr);
    let user = await controller.getByIdInfo(val);
    if (user.code != 200) return res = success(shiban);
    if (user.data.length != 1) return res = success({ code: 201, msg: '账号不存在' });
    let data = user.data[0];
    if (verification != data.verification) return res = success({ code: 201, msg: '验证码错误' });
    await controller.upPassworld(val);
    res = success({ code: 200, msg: '修改成功' });
  } catch (err) {
    res = failed(err);
  } finally {
    ctx.body = res;
  }
}

const getUserInfo = async ctx => {
  let res;
  try {
    const val = ctx.request.body;    
    const user_name = ctx.session.user_name;
      if(!user_name) return res = success({ code: 402, msg: '登录超时'})
    let user = await controller.getInfo({user_name});
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

const getPlayerList = async ctx => {
  let res;
  try {
    const val = ctx.request.body;    
    let user = await controller.getPlayerList(val);
    if (user.code != 200) return res = success(shiban);
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

const upUserInfo = async ctx => {
  let res;
  try {
    const user_name = ctx.session.user_name;
    if(!user_name) return res = success({ code: 402, msg: '登录超时'})
    const val = ctx.request.body;
    const { name, sex, birthday, abode, introduce, avatar } = val;    
    let user = await controller.getByIdInfo({user_name});
    if (user.code != 200) return res = success(shiban);
    if (user.data.length != 1) return res = success({ code: 201, msg: '账号不存在' });
    await controller.upUserInfo({user_name, name, sex, birthday, abode, introduce, avatar });
    res = success({ code: 200, msg: '修改成功' });
  } catch (err) {
    res = failed(err);
  } finally {
    ctx.body = res;
  }
}

// 生成验证码
const setVerification = function () {
  let a = "";
  for (let i = 0; i < 6; i++) {
    let b = _.random(0, 9);
    a += b;
  }
  return a;
}
module.exports = {
  login,
  verif,
  register,
  updatePassword,
  getUserInfo,
  getPlayerList,
  upUserInfo
}
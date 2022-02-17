const controller = require('../../controller/admin')
const model = require('../model')
var _ = require('lodash');
const { success, failed } = require('../../helper/pojo')
const canerr = { code: 201, msg: '参数错误' }


const login = async ctx => {
  let res;
  try {
    const val = ctx.request.body;
    const { user_name, password } = val;
    if (!user_name || !password) {
      res = success(canerr);
    } else {
      await controller.login(val).then(result => {
        if (result.code == 200) {
          if (result.data.length === 0 || result === null || result === undefined) {
            res = success({ code: 201, msg: '用户名或密码错误' });
          } else {
            ctx.session.user_id = user_name;
            res.send({
              code: 200,
              data: { token: user_name },
              message: C.succeed
            })
            res = success({ code: 200, data: { user: user_name }, msg: '登陆成功' });
          }
        } else {
          res = success(result);
        }
      })
    }
  } catch (err) {
    res = failed(err);
  }
  ctx.body = res;
}

const verif = async ctx => {
  let res;
  try {
    const val = ctx.request.body;
    const { user_name } = val;
    if (!user_name) {
      res = success(canerr);
    } else {
      let user = await controller.getInfo(val);
      if (user.code != 200) res = success(user);
      let result = {};
      verification = setVerification();
      if (user.data.length > 0) {
        result = await controller.upVerify({ user_name, verification });
      } else {
        result = await controller.insertVerify({ user_name, verification });
      }
      res = success({ code: 200 });
    }
  } catch (err) {
    res = failed(err);
  }
  ctx.body = res;
}

const register = async ctx => {
  let res;
  try {
    const val = ctx.request.body;
    const { user_name, password, name, verification } = val;
    if (!user_name || !password || !verification) {
      res = success(canerr);
    } else {
      let user = await controller.getInfo(val);
      if (user.code != 200) res = success(user);
      if (user.data.length > 0) {
        res = success({ code: 201, msg: '账号已存在' });
      } else {
        res = success({ code: 200, data: { user: user_name }, msg: '登陆成功' });
      }
    }
  } catch (err) {
    res = failed(err);
  }
  ctx.body = res;
}

const getUserInfo = async ctx => {
  let res;
  try {
    const admin_id = ctx.session.user_id;
    if (!admin_id) {
      res.send({
        code: 0,
        type: 'ERROR_SESSION',
        message: '102'
      })
      return
    }
    let user = await controller.getInfo({ user_name: admin_id });
    if (user.code != 200) res = success(user);
    if (user.data.length != 1) res = success({ code: 201, msg: '账号不存在' });
    else res.send({
      code: 200,
      data: { name: user.data.name, avatar: '' },
      message: '成功'
    })
  } catch (err) {
    res.send({
      code: 0,
      type: 'GET_ADMIN_INFO_FAILED',
      message: '获取用户信息失败'
    })
  }
  ctx.body = res;
}

const singout = ctx => {
  let res;
  try {
    ctx.session.destroy();
    res.send({
      code: 200,
      data: ['1'],
      message: '退出成功'
    })
  } catch (err) {
    res.send(error('退出失败'));
  }
  ctx.body = res;
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
  getUserInfo,
  singout
}
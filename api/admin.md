// 登陆
  /api/admin/login
  发送 { user_name,password}
  返回 {code: 200, msg: '登陆成功'}

// 基础数据
 /api/report/profileData
 发送 无
 返回 {code：200 data：[{rq,"new_user":0,"hue_user":0,"zczs":0,"zcze":0,"xczs":0,"xcze":0}]}

 
// 用户信息
  /api/report/playerInfo
  发送 {channel：渠道，page：第几页，limit：每页多少条，name：昵称，areaid：区服}
  返回 {}

  // 存留用户
  /api/report/userKoop
  发送 {}
  返回 {}

  // 基础报表
  /api/report/basicStatement
   发送 {}
  返回 {}

  // 区服报表
    /api/report/areaStatement
  发送 {}
  返回 {}
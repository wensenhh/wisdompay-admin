const methods = require('../methods')
module.exports = {
  'getNoticeList': { method: methods.get },  
  'insertNotice': { method: methods.post },
  'upNotice': { method: methods.post },
  'delNotice': { method: methods.post },
  'getStudyList': { method: methods.get },  
  'insertSyudy': { method: methods.post },
  'upSyudy': { method: methods.post },
  'delSyudy': { method: methods.post },
}
const methods = require('../methods')
module.exports = {
  'getNoticeList': { method: methods.post },  
  'insertNotice': { method: methods.post },
  'upNotice': { method: methods.post },
  'delNotice': { method: methods.post },
  'getStudyList': { method: methods.post },  
  'insertSyudy': { method: methods.post },
  'upSyudy': { method: methods.post },
  'delSyudy': { method: methods.post },
  'getStudyInfo': { method: methods.post },
}
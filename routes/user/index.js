const methods = require('../methods')
module.exports = {
  'accountLogin': { method: methods.get },
  'getUserInfo': { method: methods.post },
  'getUserList': { method: methods.post },
  'insertAdmin': { method: methods.post },
  'upPassworld': { method: methods.post },
  'delAdmin': { method: methods.post },
  'singout': { method: methods.get },
}
    
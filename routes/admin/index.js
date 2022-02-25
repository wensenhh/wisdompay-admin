const methods = require('../methods')
module.exports = {
  'login': { method: methods.post },
  'verif': { method: methods.post },
  'updatePassword': { method: methods.post },
  'register': { method: methods.post },
  'getUserInfo': { method: methods.post },
  'getPlayerList': { method: methods.post },
  'upUserInfo': { method: methods.post },
}

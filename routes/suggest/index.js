const methods = require('../methods')
module.exports = {
  'getSuggestList': { method: methods.post },
  'insertSuggest': { method: methods.post },
  'getAboutList': { method: methods.post },
  'upAbout': { method: methods.post },
  'insertAbout': { method: methods.post },
  'delAbout': { method: methods.post },
  'getPayList': { method: methods.post },
  'upPay': { method: methods.post },
  'insertPay': { method: methods.post },
  'delPay': { method: methods.post },
}
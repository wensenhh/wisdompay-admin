const methods = require('../methods')
module.exports = {
  'getGameList': { method: methods.get },
  'getGameTypeList': { method: methods.get },
  'insertGame': { method: methods.post },
  'insertGameType': { method: methods.post },
  'upGame': { method: methods.post },
  'upGameType': { method: methods.post },
  'delGame': { method: methods.post },
  'delGameType': { method: methods.post },
  'getBillTypeList': { method: methods.get },
  'insertBillType': { method: methods.post },
  'upBillType': { method: methods.post },
  'delBillType': { method: methods.post },
  'getBillList': { method: methods.get },
  'insertBillInfo': { method: methods.post },
  'upBillInfo': { method: methods.post },
  'delBillInfo': { method: methods.post },
  'getVipTypeList': { method: methods.get },
  'insertVipInfo': { method: methods.post },
  'upVipType': { method: methods.post },
  'delVipType': { method: methods.post },
}
 
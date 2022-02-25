const methods = require('../methods')
module.exports = {
  'getGameList': { method: methods.post },
  'getGameTypeList': { method: methods.post },
  'insertGame': { method: methods.post },
  'insertGameType': { method: methods.post },
  'upGame': { method: methods.post },
  'upGameType': { method: methods.post },
  'delGame': { method: methods.post },
  'delGameType': { method: methods.post },
  'getBillTypeList': { method: methods.post },
  'insertBillType': { method: methods.post },
  'upBillType': { method: methods.post },
  'delBillType': { method: methods.post },
  'getBillList': { method: methods.post },
  'insertBillInfo': { method: methods.post },
  'upBillInfo': { method: methods.post },
  'delBillInfo': { method: methods.post },
  'getVipTypeList': { method: methods.post },
  'insertVipInfo': { method: methods.post },
  'upVipType': { method: methods.post },  
  'getBillInfo': { method: methods.post },  
}
 
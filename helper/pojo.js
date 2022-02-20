const success = (result) => {
  return {
    code: result.code,
    data: result.data || '',
    msg: result.msg || ''
  }
}
const failed = (error) => {  
  console.log(error);
  return {
    code: 500,
    msg: '服务器异常'
  }
}

module.exports = {
  success,
  failed
}
const Core = require('@alicloud/pop-core');

var client = new Core({
  accessKeyId: '<your-access-key-id>',
  accessKeySecret: '<your-access-key-secret>',
  // securityToken: '<your-sts-token>', // use STS Token
  endpoint: 'https://dysmsapi.aliyuncs.com',
  apiVersion: '2017-05-25'
});

var requestOption = {
  method: 'POST'
};

const main = (data) => {
  var params = {
    "PhoneNumbers": data.phone,//接收短信的手机号码
    "SignName": "",//短信签名名称
    "TemplateCode": "", //短信模板CODE
    "TemplateParam": data.verification

  }
  client.request('SendSms', params, requestOption).then((result) => {
    return result;
  }, (ex) => {
    console.log(ex);
  })
}

module.exports = {
  main
}
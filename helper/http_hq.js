let fs = require('fs');
let qs = require('querystring');
let http = require('http');
var url = require('url');

var get_search_data = function(data, host,url,cb) {
    data = JSON.stringify(data);
    var http_request = {
        host: host+':1003',
        port: 1003,
        path: url,
        method: 'POST',
        headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Content-Length':Buffer.byteLength(postData)
        }
    }
    var req = http.request(http_request, function(_res) {
        var content = '';
        _res.setEncoding('utf-8');
        _res.on('data', function(chunk) {
            content += chunk;            
        });
        _res.on('end',function(){
            cb(content);
        });
    })
    req.write(data);
    req.end();
}


var http_post = function (postJSON,host,can) {
    var postData = postJSON;
    if (typeof postJSON != 'string') {
     postData = JSON.stringify(postJSON);
    }
    return new Promise(resolve => {
     var options = url.parse('http://'+host+':1003'+can);
     options.method = 'POST';
     options.headers = {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
     };
     var req = http.request(options, res => {
      res.setEncoding('utf8');
      var data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
            resolve(data)
        });
     });
     req.on('error', () => resolve(''));
     req.setTimeout(45000, () => resolve(''));
     req.write(postData);
     req.end();
    });
   };
module.exports = {
    GetSearchData: get_search_data,
    http_post:http_post
};
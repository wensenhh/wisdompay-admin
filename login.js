var player = require('./models/player');
var _ = require('lodash');
const pool = require('./helper/http_hq')

var main = function(){
    pool.http_post({},'127.0.0.1','/getUserList');
}
if(require.main===module){
    main();
}
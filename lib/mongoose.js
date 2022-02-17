var mongoose = require('mongoose'),
    DB_URL = 'mongodb://localhost:27017/word_rpg_fwq';

/**
 * 连接
 */
mongoose.connect(DB_URL, {
  useCreateIndex: true,
  useNewUrlParser: true
})
.then(() => console.log('connecting to database successful'))
.catch(err => console.error('could not connect to mongo DB', err));
/**
  * 连接成功
  */
mongoose.connection.on('connected', function () {    
    console.log('Mongoose connection open to ' + DB_URL);  
});


module.exports = mongoose;
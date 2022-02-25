'use strict';
var _ = require('lodash');
const { success, failed } = require('./pojo');

const checkAdmin = (ctx, next) =>{
	let res;	
	const user_id = ctx.session.user_id;
	const user_name = ctx.session.user_name;
	if (!user_id || user_name) {
		res = success({
			code: 403,
			type: 'ERROR_SESSION',
			message: '102',
		})
		ctx.body = res;
	}
	next();
}

module.exports = checkAdmin;
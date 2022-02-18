/**
 * 整合所有子路由
 */

const router = require('koa-router')()
const routes = require('../routes')
const checkAdmin = require('../helper/check');

router.post('/api', (ctx, next) => {
  if(ctx.request.path != '/api/admin'){
    checkAdmin(ctx, next);
  }
})

routes.forEach(item => {
  const service = require(`../services/${item.service}`)  
  router[item.method](item.path, service[item.action])
})
module.exports = router

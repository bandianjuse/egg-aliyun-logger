const AliyunTransport = require('./lib/AliyunTransport')
const LogUtil = require('./lib/LogUtil')

module.exports = app => {
  // 注入公共函数
  app.logUtil = LogUtil.bind(this, app);
  if (app.config.aliyunLogger.app) app.addSingleton('aliyunLogger', createClient);
  // 插入中间件
  if (app.config.aliyunLogger.middleware)  app.config.coreMiddleware.push('aliyunLogger');
}

function createClient(config, app) {
  const client = new AliyunTransport(config);
  app.logger.set(config.clientId, client);
  return client;
}
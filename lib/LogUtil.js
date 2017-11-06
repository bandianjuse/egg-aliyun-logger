const PutLogs = require('./PutLogs')

module.exports = (app, busiCode, jsonStr) => {
  const { clients } = app.config.aliyunLogger
  const defaultClient = Object.assign({
    busiCode,
    jsonStr,
    reqid
  }, app.config.aliyunLogger.default); 
  for (let key in clients) {
    if (clients.hasOwnProperty(key)) {
      PutLogs(Object.assign({}, defaultClient, clients[key]))
    }
  }
};
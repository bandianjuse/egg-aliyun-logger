const PutLogs = require('../../lib/PutLogs')

module.exports = (options, app) => {
  return function* (next) {
    yield next;

    for (let key in options.clients) {
      if (options.clients.hasOwnProperty(key)) {
        const client = options.clients[key];
        // PutLogs(Object.assign({}, client))
      }
    }
  }
}
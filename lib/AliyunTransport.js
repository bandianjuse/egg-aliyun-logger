var PutLogs = require('./PutLogs')
const Transport = require('egg-logger').Transport;
 
class AliyunTransport extends Transport {
  constructor(options) {
    super(options);
  }

  log(level, args, meta) {
    const jsonStr = super.log(level, args, meta);
    this.options.jsonStr = jsonStr;
    return PutLogs(this.options);
  }
}

module.exports = AliyunTransport;
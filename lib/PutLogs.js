const ALY = require('aliyun-sdk');
const moment = require('moment');

const WTOIPSTAT_TAG_PREFIX = "<WTOIPSTAT_";
const WTOIPSTAT_TAG_END = "WTOIPSTAT>";

// todo: 直接上报会影响性能，待优化
module.exports = (options) => {
  const sls = new ALY.SLS({
    // 在阿里云OSS申请的 accessKeyId
    accessKeyId: options.accessKeyId,

    // 在阿里云OSS申请的 secretAccessKey
    secretAccessKey: options.secretAccessKey,

    // sts token 中的 securityToken
    // securityToken: "",

    // 根据你的 sls project所在地区选择填入
    endpoint: options.endpoint,

    // 这是 sls sdk 目前支持最新的 api 版本, 不需要修改
    apiVersion: '2015-06-01'

    //以下是可选配置
    //,httpOptions: {
    //    timeout: 1000  //1sec, 默认没有timeout
    //}
  });

  const time = moment().format('YYYYMMDDHHmmss');
  const reqid = 'reqid';
  const jsonStr = JSON.stringify(options.jsonStr || '');
  const contents = [{
    key: 'busicode',
    value: options.busiCode
  }, {
    key: 'jsonstr',
    value: jsonStr
  }, {
    key: 'level',
    value: ''
  }, {
    key: 'location',
    value: ''
  }, {
    key: 'message',
    value: `${WTOIPSTAT_TAG_PREFIX}${options.busiCode}\t${time}\t${reqid}\t${jsonStr}\t${WTOIPSTAT_TAG_END}`
  }, {
    key: 'reqid',
    value: ''
  }, {
    key: 'thread',
    value: ''
  }, {
    key: 'time',
    value: ''
  }];

  sls.putLogs({
    projectName: options.projectName,
    logStoreName: options.logStoreName,
    logGroup: {
      logs: [{
        time: Math.floor(new Date().getTime() / 1000),
        contents: contents
      }],
      topic: options.topic,
      source: '127.0.0.2'
    }
  }, function (err, data) {

    if (err) {
      console.log('error:', err);
      return;
    }

    console.log('success:', data);

  });
}


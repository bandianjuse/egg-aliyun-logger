'use strict';

const request = require('supertest');
const mm = require('egg-mock');

describe('test/aliyun-logger.test.js', () => {
  let app;
  before(() => {
    app = mm.app({
      baseDir: 'apps/aliyun-logger-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mm.restore);

  it('should GET /', () => {
    return request(app.callback())
      .get('/')
      .expect('hi, aliyunLogger')
      .expect(200);
  });
});

const supertest = require('supertest');
const createServer = require('../../createServer');
const route = require('./../../routers/api/ping');
const HEADERS = require('./../../constants/headers');

const app = require('./../../createServer');

describe('head /ping route', () => {
  test('should return pong inside header', async() => {
    const res = await supertest(app).head('/api/ping');
    expect(res.status).toBe(200);
    expect(res.get(HEADERS.PING)).toBe('pong');
  });
})

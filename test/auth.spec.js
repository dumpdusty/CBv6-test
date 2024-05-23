import request from 'supertest';
import { expect } from 'chai';

describe('AUTHENTICATION', () => {
  describe.only('POSITIVE', () => {
    let res;
    before(async () => {
      res = await request(process.env.BASE_URL)
        .post('user/login')
        .send({ email: process.env.EMAIL, password: process.env.PASSWORD });
    });

    it('verify response status code', async () => {
      expect(res.status).to.eq(200);
    });

    it('verify response body message', async () => {
      expect(res.body.message).to.equal('Auth success');
    });
  });

  describe('NEGATIVE', () => {
    let res;
    before(async() => {
        res = await request(process.env.BASE_URL)
        .post('user/login')
        .send({ email: process.env.INVALID, password: process.env.PASSWORD });
    });
    it('verify response status code', async () => {
      expect(res.status).to.eq(400);
    });

    it('verify response body message', async () => {
      expect(res.body.message).to.eq('Auth failed');
    });

    it('verify response status code', async () => {
      const res = await request(process.env.BASE_URL)
        .post('user/login')
        .send({ email: process.env.EMAIL, password: process.env.INVALID });

      expect(res.status).to.eq(400);
    });

    it('verify response body message', async () => {
      const res = await request(process.env.BASE_URL)
        .post('user/login')
        .send({ email: process.env.EMAIL, password: process.env.INVALID });

      expect(res.body.message).to.eq('Auth failed');
    });
  });
});

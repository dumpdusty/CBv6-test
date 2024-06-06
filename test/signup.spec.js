import { expect } from 'chai';
const chance = require('chance').Chance();
import { signup } from '../helpers/generalHelper';

describe('SIGNUP', () => {
  let res;

  describe('POSITIVE', () => {
    const newEmail = 'user_' + Date.now() + '@pirate.com';

    before(async () => {
      res = await signup(
        chance.first(),
        chance.last(),
        newEmail
      );
    });

    it('verify status code', async () => {
      expect(res.status).to.eq(201);
    });

    it('verify response message', async () => {
      expect(res.body.message).contain('User created');
    });
  });

  describe('NEGATIVE', () => {
    const newEmail = 'user_' + Date.now() + '@pirate.com';

    describe('create user with existing email', () => {
      before(async () => {
        res = await signup(
          chance.first(),
          chance.last(),
          process.env.EMAIL
        );
      });

      it('verify status code', async () => {
        expect(res.status).to.eq(409);
      });

      it('verify response message', async () => {
        expect(res.body.message).contain('exist');
      });
    });

    describe('create user without first name', () => {
      before(async () => {
        res = await signup('', chance.last(), newEmail);
      });

      it('verify status code', async () => {
        expect(res.status).to.eq(404);
      });

      it('verify response message', async () => {
        expect(res.body.message).contain('not created');
      });
    });
  });
});

import { expect } from 'chai';
const chance = require('chance').Chance();
import { register } from '../helpers/generalHelper';
import { signUpBody, newEmail } from '../helpers/constants';

describe('REGISTER', () => {
  let res;
  describe('register POSITIVE', () => {
    before(async () => {
      res = await register(signUpBody);
      // console.log(res.request._data);
    });

    it('verify status code', async () => {
      expect(res.status).to.eq(201);
    });

    it('verify response message', async () => {
      expect(res.body.message).contain('User created');
    });
  });

  describe('register NEGATIVE', () => {
    describe('register with existing email', () => {
      const existingEmailData = { ...signUpBody, email: process.env.EMAIL };
      before(async () => {
        res = await register(existingEmailData);
      });

      it('verify status code', () => {
        expect(res.status).to.eq(409);
      });
    });

    describe('register without first name', () => {
      const noFirstNameData = { ...signUpBody, firstName: '', email: newEmail() };
      before(async () => {
        res = await register(noFirstNameData);
      });
      it('verify status code', () => {
        expect(res.status).to.eq(404);
      });
      it('verify response message', async () => {
        expect(res.body.message).contain('not created');
      });
    });


    describe('register without last name', () => {
      const noLastNameData = { ...signUpBody, lastName: '', email: newEmail() };
      before(async () => {
        res = await register(noLastNameData);
      });
      it('verify status code', () => {
        expect(res.status).to.eq(404);
      });
      it('verify response message', async () => {
        expect(res.body.message).contain('not created');
      });
    });

    describe('register without email', () => {
      const noEmailData = { ...signUpBody, email: ''};
      before(async () => {
        res = await register(noEmailData);
      });
      it('verify status code', () => {
        expect(res.status).to.eq(404);
      });
      it('verify response message', async () => {
        expect(res.body.message).contain('not created');
      });
    });

    describe('register without password', () => {
      const noPasswordData = { ...signUpBody, password: '', email: newEmail() };
      before(async () => {
        res = await register(noPasswordData);
      });
      it('verify status code', () => {
        expect(res.status).to.eq(400);
      });
      it('verify response message', async () => {
        expect(res.body.message).eq('Wrong password format');
      });
    });

  });
});

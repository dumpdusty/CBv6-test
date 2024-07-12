import * as generalHelper from '../helpers/generalHelper';
import request from 'supertest';
const chance = require('chance').Chance();
import { expect } from 'chai';
describe('RESET PASSWORD', () => {
  const email = chance.email();
  const newPassword = 'test' + chance.natural({min:1, max: 20});
  let endPoint, hash, res, userId, resPassword;
  before(async () => {
    //signup new user
    await generalHelper.signup(
      chance.first(),
      chance.last(),
      email,
      process.env.PASSWORD
    );
    //get user id
    userId = (await generalHelper.login(email, process.env.PASSWORD)).body
      .payload.userId;
    //send reset request
    await generalHelper.resetRequest(email);

    endPoint = (
      await generalHelper.emailSearch(email)
    ).body.payload.items[0].message
      .split('\n')[1]
      .split('https://clientbase.pasv.us/v6/')[1];

    // send request to change password
    await request(process.env.BASE_URL).post(endPoint);

    hash = endPoint.split('/').pop();

    resPassword = await generalHelper.changePassword(newPassword, hash, userId);
  });
  describe('POSITIVE TESTS', () => {
    it('verify user should able to reset password', async () => {
      expect(resPassword.body.message).to.eq(
        'Your password has been changed successfully'
      );
    });
    it('verify user should able to login with new password', async () => {
      res = await generalHelper.login(email, newPassword);
      expect(res.body.message).to.eq('Auth success');
    });
  });
  describe('NEGATIVE TESTS', () => {
    it('verify user should not able to reset password with invalid hash', async () => {
      const invalidHash = chance.hash({ length: 10 });
      const resInvalidHash = await generalHelper.changePassword(
        newPassword,
        invalidHash,
        userId
      );
      expect(resInvalidHash.body.message).to.eq('Wrong hash format');
    });
    it('verify user should not able to login with previous password', async () => {
        res =  await generalHelper.login(email, process.env.PASSWORD);
      expect(res.body.message).to.eq('Auth failed');
    });
  });
  after(async () => {
    await generalHelper.deleteUser(userId);
  });
});

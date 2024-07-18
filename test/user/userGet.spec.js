import * as userHelper from '../../helpers/userHelper';
import { expect } from 'chai';

describe('GET USER', () => {
  let resLogin, resGet, userId;

  describe('POSITIVE - Get user by id', () => {
    before(async () => {
      await userHelper.register(userHelper.userData);
      resLogin = await userHelper.login(userHelper.userData.email, userHelper.userData.password);
      userId = resLogin.body.payload.userId;
      resGet = await userHelper.getUser(userId);
    });

      //  Given that the user cannot be deleted this request is noticed
      //  after(async () => {
      //  await userHelper.deleteUser(userId);
      // });

    it('verify status code', async () => {
      expect(resGet.status).to.eq(200);
    });

    it('verify response message', async () => {
      expect(resGet.body.message).to.eq('User found');
    });

    it('verify user email', async () => {
      expect(resGet.body.payload.email).to.eq(userHelper.userData.email);
    });

    it('verify user name', async () => {
      expect(resGet.body.payload.name).to.eq(
        `${userHelper.userData.firstName} ${userHelper.userData.lastName}`
      );
    });

    it('verify user role', async () => {
      expect(resGet.body.payload.roles).to.include('new');
    });
  });

  describe('NEGATIVE - Get user with invalid id', () => {
    before(async () => {
      await userHelper.register(userHelper.userData);
      resLogin = await userHelper.login(userHelper.userData.email, userHelper.userData.password);
      userId = resLogin.body.payload.userId;
      const invalidUserId = userId + '1';
      resGet = await userHelper.getUser(invalidUserId);
    });

    it('verify status code', async () => {
      expect(resGet.status).to.eq(400);
    });

    it('verify response message', async () => {
      expect(resGet.body.message).to.eq('User get by ID. Error');
    });
  });
  
  describe('NEGATIVE - Get user without authorization', () => {
    before(async () => {
      await userHelper.register(userHelper.userData);
      resLogin = await userHelper.login(userHelper.userData.email, userHelper.userData.password);
      userId = resLogin.body.payload.userId;
      resGet = await userHelper.getUserNoAuth(userId);
    });

    it('verify status code', async () => {
      expect(resGet.status).to.eq(400);
    });

    it('verify response message', async () => {
      expect(resGet.body.message).to.eq('Auth failed');
    });
  });
});

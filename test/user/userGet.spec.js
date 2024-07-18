import { log } from 'handlebars';
import * as userHelper from '../../helpers/userHelper';
import { expect } from 'chai';

describe('GET USER', () => {
  let resLogin, resGet, userId, resDelete, resGetAfterDelete;

  describe('POSITIVE - Get user by id', () => {
    before(async () => {
      await userHelper.register(userHelper.userData);
      resLogin = await userHelper.login(userHelper.userData.email, userHelper.userData.password);
      userId = resLogin.body.payload.userId;
      resGet = await userHelper.getUser(userId);

      // Notice: The user cannot be deleted. This deleting shows a bug
      resDelete = await userHelper.deleteUser(userId);
      resGetAfterDelete = await userHelper.getUser(userId);
    });

    // The test shows that the user is deleted. An attempt to get a user by id.
    it('verify message when get user after delete', async () => {
      expect(resGetAfterDelete.body.message).to.eq('No User for provided id');
    });

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

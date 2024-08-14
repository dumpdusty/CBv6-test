import { expect } from 'chai';
import * as user from '../../helpers/userHelper';
import * as constants from '../../helpers/constants';

describe.only('UPDATE USER', () => {
  let resUpdateUser, resGetUser, resGetUpdatedUser, userID;
  before(async () => {
    await user.register(user.userData);
    userID = await constants.userId();
    resGetUser = await user.getUser(userID);
  });

  describe('POSITIVE - Update user', () => {
    before(async () => {
      resUpdateUser = await user.updateUser(userID, user.userUpdateData);
      resGetUpdatedUser = await user.getUser(userID);
    });

    it('verify status code', async () => {
      expect(resUpdateUser.status).to.eq(200);
    });

    it('verify response message', async () => {
      expect(resUpdateUser.body.message).to.eq('User updated');
    });

    it('verify user new first name not equal to previous', async () => {
      expect(resGetUpdatedUser.body.payload.firstName).not.to.eq(resGetUser.body.payload.firstName);
    });

    it('verify user new last name not equal to previous', async () => {
        expect(resGetUpdatedUser.body.payload.lastName).not.to.eq(resGetUser.body.payload.lastName);
      });

    it('verify user new email not equal to previous', async () => {
      expect(resGetUpdatedUser.body.payload.email).not.to.eq(resGetUser.body.payload.email);
    });

    it('verify user first name to equal user first new name', async () => {
      expect(resGetUpdatedUser.body.payload.firstName).to.eq(user.userUpdateData.firstName);
    });

    it('verify user last name to equal user last new name', async () => {
        expect(resGetUpdatedUser.body.payload.lastName).to.eq(user.userUpdateData.lastName);
    });

    it('verify user email to equal user new email', async () => {
      expect(resGetUpdatedUser.body.payload.email).to.eq(user.userUpdateData.email);
    });

  });

  describe('NEGATIVE', () => {
    describe('NEGATIVE - Update user with empty first name', () => {
      before(async () => {
        resUpdateUser = await user.updateUser(userID, { ...user.userUpdateData, firstName: '' });
        resGetUpdatedUser = await user.getUser(userID);
      });

      it('verify status code', async () => {
        expect(resUpdateUser.status).to.eq(400);
      });

      it('verify response message', async () => {
        expect(resUpdateUser.body.message).to.eq('User update error');
      });

      it('verify error message', async () => {
        expect(resUpdateUser.body.payload.message).to.eq('Validation failed: firstName: Path `firstName` is required.');
      });

      it('verify user name not to equal empty', async () => {
        expect(resGetUpdatedUser.body.payload.userName).not.to.eq('');
      });

    });

    describe('NEGATIVE - Update user with empty last name', () => {
        before(async () => {
          resUpdateUser = await user.updateUser(userID, { ...user.userUpdateData, lastName: '' });
          resGetUpdatedUser = await user.getUser(userID);
        });
  
        it('verify status code', async () => {
          expect(resUpdateUser.status).to.eq(400);
        });
  
        it('verify response message', async () => {
          expect(resUpdateUser.body.message).to.eq('User update error');
        });

        it('verify error message', async () => {
            expect(resUpdateUser.body.payload.message).to.eq('Validation failed: lastName: Path `lastName` is required.');
        });
  
        it('verify user name not to equal empty', async () => {
          expect(resGetUpdatedUser.body.payload.userName).not.to.eq('');
        });
  
      });

    describe('NEGATIVE - Update user with empty user email', () => {
      before(async () => {
        resUpdateUser = await user.updateUser(userID, { ...user.userUpdateData, email: '' });
        resGetUpdatedUser = await user.getUser(userID);
      });

      it('verify status code', async () => {
        expect(resUpdateUser.status).to.eq(400);
      });

      it('verify response message', async () => {
        expect(resUpdateUser.body.message).to.eq('User update error');
      });

      it('verify error message', async () => {
        expect(resUpdateUser.body.payload.message).to.eq('Validation failed: email: Path `email` is required.');
      });

      it('verify user email not to equal empty', async () => {
        expect(resGetUpdatedUser.body.payload.email).not.to.eq('');
      });

    });

    describe('NEGATIVE - Update user with invalid user id', () => {
      before(async () => {
        const invalidUserId = userID + '1';
        resUpdateUser = await user.updateUser(invalidUserId, user.userUpdateData);
      });

      it('verify status code', async () => {
        expect(resUpdateUser.status).to.eq(400);
      });

      it('verify response message', async () => {
        expect(resUpdateUser.body.message).to.eq('User update error');
      });

    });

    describe.skip('NEGATIVE - Update user without user id', () => {
      before(async () => {
        resUpdateUser = await user.updateUser('', user.userUpdateData);
      });

      it('verify status code', async () => {
        expect(resUpdateUser.status).to.eq(404);
      });

      it('verify response message', async () => {
        expect(resUpdateUser.body.message).to.eq('API not found');
      });

    });

    describe('NEGATIVE - Update user without authorization', () => {
      before(async () => {
        resUpdateUser = await user.updateUser(userID, user.userUpdateData, 'NO_TOKEN');
      });

      it('verify status code', async () => {
        expect(resUpdateUser.status).to.eq(400);
      });

      it('verify response message', async () => {
        expect(resUpdateUser.body.message).to.eq('Auth failed');
      });

    });
  });
});

import { expect } from 'chai';
import * as companyHelper from '../../helpers/companyHelper';
import * as userHelper from '../../helpers/userHelper';

const constants = require('../../helpers/constants');

describe('GET COMPANY BY ID', () => {
  let resLoginUser, userId, resGetUser, companyId, companyEmail, companyName, resGetCompany, invalidCompanyId;

  describe('POSITIVE - Get company by id', () => {
    before(async () => {
      await userHelper.register(userHelper.userData);
      resLoginUser = await userHelper.login(userHelper.userData.email, userHelper.userData.password);
      userId = resLoginUser.body.payload.userId;
      resGetUser = await userHelper.getUser(userId);
      // resGetUser = await userHelper.getUser(await constants.userId());  // it's like from Oleg :)

      companyId = resGetUser.body.payload.companyAccount._id;
      companyName = resGetUser.body.payload.companyAccount.companyName;
      companyEmail = resGetUser.body.payload.companyAccount.email;

      resGetCompany = await companyHelper.getCompany(companyId);
    });

    it('verify status code', async () => {
      expect(resGetCompany.status).to.eq(200);
    });

    it('verify response message', async () => {
      expect(resGetCompany.body.message).to.eq('Company Account get by id OK');
    });

    it('verify company name', async () => {
      expect(resGetCompany.body.payload.companyName).to.eq(companyName);
    });

    it('verify company email', async () => {
      expect(resGetCompany.body.payload.email).to.eq(companyEmail);
    });
  });

  describe('NEGATIVE - Get company with invalid company id', () => {
    before(async () => {
      await userHelper.register(userHelper.userData);
      resLoginUser = await userHelper.login(userHelper.userData.email, userHelper.userData.password);
      userId = resLoginUser.body.payload.userId;
      resGetUser = await userHelper.getUser(userId);

      invalidCompanyId = resGetUser.body.payload.companyAccount._id + '1';
      companyName = resGetUser.body.payload.companyAccount.companyName;
      companyEmail = resGetUser.body.payload.companyAccount.email;

      resGetCompany = await companyHelper.getCompany(invalidCompanyId);
    });

    it('verify status code', async () => {
      expect(resGetCompany.status).to.eq(400);
    });

    it('verify response message', async () => {
      expect(resGetCompany.body.message).to.eq('Company Account get error');
    });

    it('verify company name', async () => {
      expect(resGetCompany.body.payload.companyName).to.eq(undefined);
    });

    it('verify company email', async () => {
      expect(resGetCompany.body.payload.email).to.eq(undefined);
    });

    describe('NEGATIVE - Get company without authorization', () => {
      before(async () => {
        await userHelper.register(userHelper.userData);
        resLoginUser = await userHelper.login(userHelper.userData.email, userHelper.userData.password);
        userId = resLoginUser.body.payload.userId;
        resGetUser = await userHelper.getUser(userId);

        companyId = resGetUser.body.payload.companyAccount._id;
        companyName = resGetUser.body.payload.companyAccount.companyName;
        companyEmail = resGetUser.body.payload.companyAccount.email;

        resGetCompany = await companyHelper.getCompanyNoAuth(companyId);
      });

      it('verify status code', async () => {
        expect(resGetCompany.status).to.eq(400);
      });

      it('verify response message', async () => {
        expect(resGetCompany.body.message).to.eq('Auth failed');
      });

      it('verify company name', async () => {
        expect(resGetCompany.body.payload.companyName).to.eq(undefined);
      });

      it('verify company email', async () => {
        expect(resGetCompany.body.payload.email).to.eq(undefined);
      });
    });
  });
});

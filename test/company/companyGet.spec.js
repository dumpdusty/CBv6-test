import { expect } from 'chai';
import * as user from '../../helpers/userHelper';
import * as company from '../../helpers/companyHelper';
import * as constants from '../../helpers/constants';

describe('GET COMPANY BY ID', () => {
  let resGetUser, resGetCompany, companyEmail, companyName;
  before(async () => {
    await user.register(user.userData);
    resGetUser = await user.getUser(await constants.userId());

    companyName = resGetUser.body.payload.companyAccount.companyName;
    companyEmail = resGetUser.body.payload.companyAccount.email;
  })

  describe('POSITIVE - Get company by id', () => {
    before(async () => {
      resGetCompany = await company.getCompany(await constants.companyId());
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

  describe('NEGATIVE', () => {
    describe('NEGATIVE - Get company with invalid company id', () => {
      before(async () => {
        const invalidCompanyId = await constants.companyId() + '1';

        resGetCompany = await company.getCompany(invalidCompanyId);
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
    });

    describe('NEGATIVE - Get company without company id', () => {
        before(async () => {
          resGetCompany = await company.getCompany('');
        });
  
        it('verify status code', async () => {
          expect(resGetCompany.status).to.eq(400);
        });
  
        it('verify response message', async () => {
          expect(resGetCompany.body.message).to.eq('Permission denied');
        });
  
        it('verify company name', async () => {
          expect(resGetCompany.body.payload.companyName).to.eq(undefined);
        });
  
        it('verify company email', async () => {
          expect(resGetCompany.body.payload.email).to.eq(undefined);
        });
      });

    describe('NEGATIVE - Get company without authorization', () => {
      before(async () => {
        resGetCompany = await company.getCompany(await constants.companyId(), 'NO_TOKEN');
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

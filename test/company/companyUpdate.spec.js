import { expect } from 'chai';
import * as user from '../../helpers/userHelper';
import * as company from '../../helpers/companyHelper';
import * as constants from '../../helpers/constants';

describe('UPDATE COMPANY', () => {
  let resUpdateCompany, resGetCompany, resGetUpdatedCompany;
  before(async () => {
    await user.register(user.userData);
    resGetCompany = await company.getCompany(await constants.companyId());
  })

  describe('POSITIVE - Update company', () => {
    before(async () => {
      resUpdateCompany = await company.updateCompany(await constants.companyId(), company.companyData);
      resGetUpdatedCompany = await company.getCompany(await constants.companyId());
    });

    it('verify status code', async () => {
      expect(resUpdateCompany.status).to.eq(200);
    });

    it('verify response message', async () => {
      expect(resUpdateCompany.body.message).to.eq('Company Account updated');
    });

    it('verify company name', async () => {
      expect(resGetCompany.body.payload.companyName).not.to.eq(resGetUpdatedCompany.body.payload.companyName);
    });

    it('verify company email', async () => {
      expect(resGetCompany.body.payload.companyName).not.to.eq(resGetUpdatedCompany.body.payload.email);
    });
  });

  describe('NEGATIVE', () => {
    describe('NEGATIVE - Update company with invalid company id', () => {
      before(async () => {
        const invalidCompanyId = await constants.companyId() + '1';
        resUpdateCompany = await company.updateCompany(invalidCompanyId, company.companyData);
      });

      it('verify status code', async () => {
        expect(resUpdateCompany.status).to.eq(400);
      });

      it('verify response message', async () => {
        expect(resUpdateCompany.body.message).to.eq('Company Account update error');
      });
    });

    describe('NEGATIVE - Update company without company id', () => {
        before(async () => {
          resUpdateCompany = await company.updateCompany('', company.companyData);
        });
  
        it('verify status code', async () => {
          expect(resUpdateCompany.status).to.eq(404);
        });
  
        it('verify response message', async () => {
          expect(resUpdateCompany.body.message).to.eq('API not found');
        });
      });

    describe('NEGATIVE - Update company without authorization', () => {
      before(async () => {
        resUpdateCompany = await company.updateCompany(await constants.companyId(), company.companyData, 'NO_TOKEN');
      });

      it('verify status code', async () => {
        expect(resUpdateCompany.status).to.eq(400);
      });

      it('verify response message', async () => {
        expect(resUpdateCompany.body.message).to.eq('Auth failed');
      });
    });
  });
});

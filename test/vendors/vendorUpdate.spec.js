const chance = require('chance').Chance();
import { expect } from 'chai';
import * as vendorHelper from '../../helpers/vendorHelper';

describe('UPDATE VENDOR', () => {
  let id, res, resUpdate, resGet, resGetUpdate;
  describe('POSITIVE', () => {
    before(async () => {
      res = await vendorHelper.createVendor(vendorHelper.vendorData);
      id = res.body.payload;

      resGet = await vendorHelper.getVendor(id);

      resUpdate = await vendorHelper.updateVendor(id, {
        ...vendorHelper.vendorData,
        name: 'new name',
        phone: 'new phone',
        email: 'new email',
        description: 'new description',
      });

      resGetUpdate = await vendorHelper.getVendor(id);
    });
    after(async () => {
      await vendorHelper.deleteVendor(id);
    });

    it('verify status code after vendor updating', () => {
      expect(resUpdate.status).to.equal(200);
    });
    it('verify message after vendor updating', () => {
      expect(resUpdate.body.message).to.equal('Vendor updated');
    });
    it('verify name after vendor updating', () => {
      expect(resGetUpdate.body.payload.name).to.not.equal(
        resGet.body.payload.name
      );
    });
    it('verify phone after vendor updating', () => {
      expect(resGetUpdate.body.payload.phone).to.not.equal(
        resGet.body.payload.phone
      );
    });
    it('verify email after vendor updating', () => {
      expect(resGetUpdate.body.payload.email).to.not.equal(
        resGet.body.payload.email
      );
    });
  });

  describe('NEGATIVE - UPDATE WITH OUT REQUIRED DATA: NAME', () => {
    before(async () => {
      res = await vendorHelper.createVendor(vendorHelper.vendorData);
      id = res.body.payload;

      resUpdate = await vendorHelper.updateVendor(id, {
        ...vendorHelper.vendorData,
        name: '',
        phone: chance.phone(),
        email: chance.email(),
        description: chance.sentence(),
      });
    });
    after(async () => {
        await vendorHelper.deleteVendor(id);
      });

    it('verify status code after vendor updating', () => {
      expect(resUpdate.status).to.equal(400);
    });
    it('verify message after vendor updating', () => {
      expect(resUpdate.body.message).to.equal('Vendor update error');
    });
  });
  describe.skip('NEGATIVE - UPDATE WITH INVALID DATA: PHONE', () => {
    before(async () => {
      res = await vendorHelper.createVendor(vendorHelper.vendorData);
      id = res.body.payload;

      resUpdate = await vendorHelper.updateVendor(id, {
        ...vendorHelper.vendorData,
        name: chance.name(),
        phone: '??????????????------------invalid phone--------------??????????????',
        email: chance.email(),
        description: chance.sentence(),
      });  
    });
    after(async () => {
        await vendorHelper.deleteVendor(id);
      });

    it('verify status code after vendor updating', () => {
      expect(resUpdate.status).to.equal(400);
    });
    it('verify message after vendor updating', () => {
      expect(resUpdate.body.message).to.equal('Vendor update error');
    });
  });
});

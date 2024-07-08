import { expect } from 'chai';
import * as vendorHelper from '../../helpers/vendorHelper';

describe('GET VENDOR BY ID', () => {
  let res, resGet;
  let vendorsList = [];
  after(async () => {
    // const vendorsList = ((await vendorHelper.getAllVendors()).body.payload.items)
    for (let i = 0; i < vendorsList.length; i++) {
      await vendorHelper.deleteVendor(vendorsList[i]);
    }
  });

  describe('POSITIVE - Get vendor by id', () => {
    before(async () => {
      res = await vendorHelper.createVendor(vendorHelper.vendorData)
      vendorsList.push(res.body.payload);
      const vendorId = res.body.payload;
      resGet = await vendorHelper.getVendor(vendorId);
    });

    it('verify status code', async () => {
      expect(resGet.status).to.eq(200);
    });
    it('verify response message', async () => {
      expect(resGet.body.message).to.eq('Get Vendor by id ok');
    });
  });

  describe('NEGATIVE - Get vendor with invalid id', () => {
    before(async () => {
      res = await vendorHelper.createVendor(vendorHelper.vendorData)
      vendorsList.push(res.body.payload);
      const invalidVendorId = res.body.payload + 'invalid';
      resGet = await vendorHelper.getVendor(invalidVendorId);
    });

    it('verify status code', async () => {
      expect(resGet.status).to.eq(400);
    });
    it('verify response message', async () => {
      expect(resGet.body.message).to.eq('Vendor get error');
    });
  });
});

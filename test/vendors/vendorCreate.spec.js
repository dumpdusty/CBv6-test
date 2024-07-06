const chance = require('chance').Chance();
import { expect } from 'chai';
import * as vendorHelper from '../../helpers/vendorHelper';

describe('VENDOR', () => {
  let res;
  let vendorsList = [];
  after(async () => {
    // const vendorsList = ((await vendorHelper.getAllVendors()).body.payload.items)
    for (let i = 0; i < vendorsList.length; i++) {
      await vendorHelper.deleteVendor(vendorsList[i]);
    }
  });
  describe('POSITIVE', () => {
    describe('Create vendor with all data', () => {
      before(async () => {
        res = await vendorHelper.createVendor(vendorHelper.vendorData);
        vendorsList.push(res.body.payload);
      });
     
      it('verify status code', async () => {
        expect(res.statusCode).to.eq(200);
      });

      it('verify response message', async () => {
        expect(res.body.message).eq('Vendor created');
      });

      it('verify response has a payload', async () => {
        expect(res.body.payload).to.not.be.empty;
        expect(res.body.payload).to.be.a('string');
      });
    });

    describe('Create vendor with required data only', () => {
      before(async () => {
        res = await vendorHelper.createVendor({...vendorHelper.vendorData, 
          name: chance.name(), 
          phone: '', 
          email: '',
          description: ''});
        vendorsList.push(res.body.payload);
        // console.log(res.request._data);
      });

      it('verify status code', async () => {
        expect(res.statusCode).to.eq(200);
      });

      it('verify response message', async () => {
        expect(res.body.message).to.eq('Vendor created');
      });

      it('verify response has a payload', async () => {
        expect(res.body.payload).to.not.be.empty;
        expect(res.body.payload).to.be.a('string');
      });
    });
  });

  describe('NEGATIVE', () => {
    let res;
    describe('Create vendor with out required data: name', () => {
      before(async () => {
        res = await vendorHelper.createVendor({...vendorHelper.vendorData, name: ''});
      });

      it('verify status code', async () => {
        expect(res.statusCode).to.eq(400);
      });

      it('verify response message', async () => {
        expect(res.body.message).to.eq('Vendor create error');
      });
    });
  });
});

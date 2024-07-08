const chance = require('chance').Chance();
import { expect } from 'chai';
import * as vendorHelper from '../../helpers/vendorHelper';

describe('GET ALL VENDORS', () => {
    let res;
    describe('POSITIVE', () => {
        before(async() => {
            await vendorHelper.createVendor(vendorHelper.vendorData)
            res = await vendorHelper.getAllVendors()
        });
        after(async() => {
            await vendorHelper.deleteVendor(res.body.payload.items[0]._id)
        });

        it('verify response status', () => {
            expect(res.statusCode).eq(200);
          });
      
          it('verify response message', () => {
            expect(res.body.message).eq('VendorSearch ok');
          });
      
          it('verify response contains array', () => {
            expect(res.body.payload.items).to.be.a('array');
          });
      
          it('verify response array has at least one element', () => {
            expect(res.body.payload.items.length).to.be.above(0);
          });
    });

    describe('NEGATIVE', () => {
      describe('Get vendors without token', () => {
        before(async () => {
          await vendorHelper.createVendor();
          res = await vendorHelper.getAllVendors('');
        });
  
        it('verify response status', () => {
          expect(res.statusCode).eq(400);
        });
  
        it('verify response message', () => {
          expect(res.body.message).eq('Auth failed');
        });
      });
    });
});
const chance = require('chance').Chance();
import { expect } from 'chai';
import * as vendorHelper from '../../helpers/vendorHelper';

describe('DELETE VENDOR', () => {
    let res;
    describe('POSITIVE: DELETE VENDOR BY ID', () => {
        before(async() => {

        const vendorId = (await vendorHelper.createVendor(vendorHelper.vendorData)).body.payload

        res = await vendorHelper.deleteVendor(vendorId)
        });

        it('verify status code', async () => {
            expect(res.status).to.eq(200);
        });
        it('verify response message', async () => {
            expect(res.body.message).to.eq('Vendor deleted');
        })
    });
    describe('NEGATIVE: DELETE VENDOR WITH INVALID ID', () => {
        before(async() => {

        const inavalidVendorId = (await vendorHelper.createVendor(vendorHelper.vendorData)).body.payload + 'invalid'
        
        res = await vendorHelper.deleteVendor(inavalidVendorId)
        });

        it('verify status code', async () => {
            expect(res.status).to.eq(400);    
        });

        it('verify response message', async () => {
            expect(res.body.message).to.eq('Vendor delete error');
        })
    });
    describe('NEGATIVE: DELETE VENDOR WITHOUT ID', () => {
        before(async() => {

        const VendorId = (await vendorHelper.createVendor(vendorHelper.vendorData)).body.payload
        
        res = await vendorHelper.deleteVendor()
        });

        it('verify status code', async () => {
            expect(res.status).to.eq(400);
        });

        it('verify response message', async () => {
            expect(res.body.message).to.eq('Vendor delete error');
        })
    });
});
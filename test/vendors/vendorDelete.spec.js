const chance = require('chance').Chance();
import { expect } from 'chai';
import * as vendorHelper from '../../helpers/vendorHelper';

describe('DELETE VENDOR', () => {
    let res;
    describe('delete vendor POSITIVE', () => {
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
});
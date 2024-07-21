import * as constants from '../../helpers/constants'
import * as serviceHelper from '../../helpers/serviceHelper'
import * as vendorHelper from '../../helpers/vendorHelper'
import {expect} from 'chai'
const chance = require('chance').Chance();
describe('A user should get an information about particular service', () => {

    let resService, resServiceWithoutToken, resServiceWithInvalidId;
    before(async () => {
        resService = await serviceHelper.getByIdService(await constants.serviceId(), process.env.TOKEN)
    });
    after(async () => {
        await vendorHelper.deleteVendor(resService.body.payload.vendor['_id']);
        await serviceHelper.deleteService(resService.body.payload['_id']);
    });
    describe('POSITIVE TESTS', () => {
      
        it('verify response status code', () => {
            expect(resService.statusCode).to.eq(200)
        });
        it('verify response message', () => {
            expect(resService.body.message).to.eq('Get Service by id ok')
        });
        it('verify type of response message', () => {
            expect(resService.body.message).to.be.a('string')
        });
        it('verify type of response payload', () => {
            expect(resService.body.payload).to.be.an('object')
        });
        it('verify response status message', () => {
            expect(resService.res.statusMessage).to.eq('OK')
        });
        it('verify response payload has vendor', () => {
            expect(resService.body.payload).to.have.any.keys('_id', 'name', 'clientPrice', 'vendorPrice');
        })
    });
    describe('NEGATIVE TESTS WITH INVALID ID', () => {

        before(async () => {
            resServiceWithInvalidId = await serviceHelper.getByIdService(chance.fbid(), process.env.TOKEN)
        });
        it('verify status code', () => {
            expect(resServiceWithInvalidId.statusCode).to.equal(400)
        });
        it('verify response message', () => {
            expect(resServiceWithInvalidId.body.message).to.eq('Service get error')
        });
        it('verify response status message', () => {
            expect(resServiceWithInvalidId.res.statusMessage).to.eq('Bad Request')
        });
    });
    describe('NEGATIVE TESTS W/O TOKEN', () => {

        before(async () => {
            resServiceWithoutToken = await serviceHelper.getByIdService(resService.body.payload, '')
        });
        it('verify status code', () => {
            expect(resServiceWithoutToken.statusCode).to.equal(400)
        });
        it('verify response message', () => {
            expect(resServiceWithoutToken.body.message).to.eq('Auth failed')
        });
        it('verify response status message', () => {
            expect(resServiceWithoutToken.res.statusMessage).to.eq('Bad Request')
        });
    });
});
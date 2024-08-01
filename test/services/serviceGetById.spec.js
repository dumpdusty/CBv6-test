import * as constants from '../../helpers/constants';
import * as serviceHelper from '../../helpers/serviceHelper';
import * as vendorHelper from '../../helpers/vendorHelper';
import { expect } from 'chai';
const chance = require('chance').Chance();
describe('A user should get an information about particular service', () => {
  let res, resService, vendorId;
  before(async () => {
    res = await serviceHelper.getServiceById(await constants.serviceId(),process.env.TOKEN);
    vendorId = res.body.payload.vendor['_id'];
  });
  after(async () => {
    await vendorHelper.deleteVendor(vendorId);
  });
  describe('POSITIVE TESTS', () => {
    it('verify response status code', () => {
      expect(res.statusCode).to.eq(200);
    });
    it('verify response message', () => {
      expect(res.body.message).to.eq('Get Service by id ok');
    });
    it('verify type of response message', () => {
      expect(res.body.message).to.be.a('string');
    });
    it('verify type of response payload', () => {
      expect(res.body.payload).to.be.an('object');
    });
    it('verify response status message', () => {
      expect(res.res.statusMessage).to.eq('OK');
    });
    it('verify response payload has keys', () => {
      expect(res.body.payload).to.have.all.keys(
        '_id',
        'name',
        'clientPrice',
        'vendorPrice',
        'vendor',
        'owner',
        'companyAccount',
        'createdAt',
        'updatedAt',
      );
    });
  });
  describe('NEGATIVE TESTS WITH INVALID ID', () => {
    before(async () => {
      resService = await serviceHelper.getServiceById(chance.fbid(),process.env.TOKEN);
    });
    it('verify status code', () => {
      expect(resService.statusCode).to.equal(400);
    });
    it('verify response message', () => {
      expect(resService.body.message).to.eq('Service get error');
    });
    it('verify response status message', () => {
      expect(resService.res.statusMessage).to.eq('Bad Request');
    });
  });
  describe('NEGATIVE TESTS W/O TOKEN', () => {
    before(async () => {
      res = await serviceHelper.getServiceById(res.body.payload['_id'],'');
    });
    it('verify status code', () => {
      expect(res.statusCode).to.equal(400);
    });
    it('verify response message', () => {
      expect(res.body.message).to.eq('Auth failed');
    });
    it('verify response status message', () => {
      expect(res.res.statusMessage).to.eq('Bad Request');
    });
  });
  describe('NEGATIVE TESTS WITH DELETED SERVICE', () => {
    before(async () => {
      await serviceHelper.deleteService(res.req.path.split('/')[3]);
      resService = await serviceHelper.getServiceById(res.req.path.split('/')[3], process.env.TOKEN);
    });
    it('verify response message after removing the service', () => {
      expect(resService.body.message).to.equal('No service for provided id');
    });
    it('verify response status code', () => {
        expect(resService.status).to.equal(404);
    });
    it('verify response status message', () => {
        expect(resService.res.statusMessage).to.eq('Not Found');
    });
  });
});

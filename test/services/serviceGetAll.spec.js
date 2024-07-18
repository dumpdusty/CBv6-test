import * as serviceHelper from '../../helpers/serviceHelper';
import * as vendorHelper from '../../helpers/vendorHelper';
import { expect } from 'chai';

describe('A user should get a list of services', () => {
  let res, serviceId, vendorId;
  before(async () => {
    vendorId = (await vendorHelper.createVendor(vendorHelper.vendorData)).body.payload;
    serviceId = (await serviceHelper.createService(serviceHelper.serviceData(vendorId))).body.payload;
    res = await serviceHelper.getAllServices(process.env.TOKEN);
  });
  after(async() => {
    await serviceHelper.deleteService(serviceId)
    await vendorHelper.deleteVendor(vendorId)
  });
  describe('POSITIVE TESTS', () => {
    it('verify response status code ', async () => {
      expect(res.statusCode).to.equal(200);
    });
    it('verify response message', async () => {
      expect(res.body.message).to.equal('Service Search ok');
    });
    it('verify response message type', async () => {
      expect(res.body.message).to.be.a('string');
    });
    it('verify a list of services is not empty after creation', () => {
      expect(res.body.payload.items).to.not.be.empty;
    });
    it("verify response type of services' list", () => {
      expect(res.body.payload.items).to.be.an('array');
    });
  });
  describe('NEGATIVE TESTS', () => {
    before(async () => {
      res = await serviceHelper.getAllServices('');
    });
    it('verify response status code w/o token', async () => {
      expect(res.statusCode).to.equal(400);
    });
    it('verify response message w/o token', async () => {
      expect(res.body.message).to.equal('Auth failed');
    });
    it('verify response message type w/o token', async () => {
      expect(res.body.message).to.be.a('string');
    });
  });
});

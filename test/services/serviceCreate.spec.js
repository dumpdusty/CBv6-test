const chance = require('chance').Chance();
import { expect } from 'chai';
import {
  createVendor,
  deleteVendor,
  vendorData,
} from '../../helpers/vendorHelper';
import * as Service from '../../helpers/serviceHelper';

describe('SERVICE', () => {
  let res;
  let servicesList = [];
  let vendorId;
  before(async () => {
    res = await createVendor(vendorData);
    vendorId = res.body.payload;
    //console.log('vendor created ', vendorId);
  });
  after(async () => {
    for (let i = 0; i < servicesList.length; i++) {
      await Service.deleteService(servicesList[i]);
    }
    await deleteVendor(vendorId);
  });
  describe('POSITIVE', () => {
    describe('Create service with all data', () => {
      before(async () => {
        const data = Service.randomServiceData(vendorId);
        //console.log(data);
        res = await Service.createService(data);
        servicesList.push(res.body.payload);
        //console.log('service created ', res.body);
      });

      it('verify status code', async () => {
        expect(res.statusCode).to.eq(200);
      });

      it('verify response message', async () => {
        expect(res.body.message).eq('Service created');
      });

      it('verify response has a payload', async () => {
        expect(res.body.payload).to.not.be.empty;
        expect(res.body.payload).to.be.a('string');
      });
    });

    describe('Create service with required data only', () => {
      before(async () => {
        const data = Service.randomServiceData(vendorId);

        res = await Service.createService({
          ...data,
          description: '',
        });
        servicesList.push(res.body.payload);
      });

      it('verify status code', async () => {
        expect(res.statusCode).to.eq(200);
      });

      it('verify response message', async () => {
        expect(res.body.message).to.eq('Service created');
      });

      it('verify response has a payload', async () => {
        expect(res.body.payload).to.not.be.empty;
        expect(res.body.payload).to.be.a('string');
      });
    });
  });

  describe('NEGATIVE', () => {
    let res;
    describe('Create service without required data: name', () => {
      before(async () => {
        res = await Service.createService({
          ...Service.randomServiceData(vendorId),
          name: '',
        });
      });

      it('verify status code', async () => {
        expect(res.statusCode).to.eq(400);
      });

      it('verify response message', async () => {
        expect(res.body.message).to.eq('Service create error');
      });
    });
  });
});

import { expect } from 'chai';
import * as serviceHelper from '../../helpers/serviceHelper';
import * as vendorHelper from '../../helpers/vendorHelper';

describe('SERVICE UPDATE', () => {
  let service, vendorId, updateService, updatedData, getService, getUpdService;
  before(async () => {
    vendorId = (await vendorHelper.createVendor(vendorHelper.vendorData)).body.payload;
    updatedData = { ...serviceHelper.serviceData(vendorId), name: 'Updated name', clientPrice: 0, vendorPrice: 0 };
    service = await serviceHelper.createService(serviceHelper.serviceData(vendorId));
  });
  after(async () => {
    await vendorHelper.deleteVendor(vendorId);
    await serviceHelper.deleteService(service);
  });

  describe('SERVICE UPDATE POSITIVE', () => {
    before(async () => {
      getService = await serviceHelper.getServiceById(service.body.payload, process.env.TOKEN);
      updateService = await serviceHelper.updateServiceById(service.body.payload, updatedData, process.env.TOKEN);
      getUpdService = await serviceHelper.getServiceById(service.body.payload, process.env.TOKEN);
      console.log(getUpdService.body.payload.name)
    });

    it('verify status code for update request is 200', () => {
      expect(updateService.statusCode).to.eq(200);
    });

    it('verify update response message is - Service updated', () => {
      expect(updateService.body.message).to.eq('Service updated');
    });

    it('verify updated service name ', () => {
      expect(getUpdService.body.payload.name).to.eq('Updated name');
    });

    it('verify updated service success is true', () => {
      expect(updateService.body.success).to.eq(true);
    });

    it('verify old service name not eq updated one', () => {
      expect(getService.body.payload.name).to.not.eq('Updated name');
    });

    it('verify clientPrice for updated service ', () => {
      expect(getUpdService.body.payload.clientPrice).to.eq(0);
    });

    it('verify old clientPrice is not eq updated clientPrice ', () => {
      expect(getService.body.payload.clientPrice).to.not.eq(0);
    });

    it('verify vendorPrice for updated service ', () => {
      expect(getUpdService.body.payload.vendorPrice).to.eq(0);
    });

    it('verify old vendorPrice is not eq updated vendorPrice ', () => {
      expect(getService.body.payload.vendorPrice).to.not.eq(0);
    });
  });

  describe('SERVICE UPDATE NEGATIVE', () => {
    before(async () => {
      getService = await serviceHelper.getServiceById(service.body.payload, process.env.TOKEN);
    });

    describe('SERVICE UPDATE WITHOUT REQUIRED NAME FIELD', () => {
      before(async () => {
        updateService = await serviceHelper.updateServiceById(service.body.payload, {
          ...serviceHelper.serviceData(vendorId),
          name: '',
        }, process.env.TOKEN);
      });

      it('verify status code for update request is 400', () => {
        expect(updateService.statusCode).to.eq(400);
      });

      it('verify update response message is - Service update error', () => {
        expect(updateService.body.message).to.eq('Service update error');
      });

      it('verify updated service success is false', () => {
        expect(updateService.body.success).to.eq(false);
      });

      it('can`t update service without required name field', () => {
        expect(getService.body.payload.name).to.not.eq('');
      });
    });

    describe('SERVICE UPDATE WITHOUT VENDOR ID', () => {
      before(async () => {
        updateService = await serviceHelper.updateServiceById(service.body.payload, serviceHelper.serviceData(''), process.env.TOKEN);
      });

      it('verify status code for update request is 400', () => {
        expect(updateService.statusCode).to.eq(400);
      });

      it('verify update response message is - Service update error', () => {
        expect(updateService.body.message).to.eq('Service update error');
      });

      it('verify updated service success is false', () => {
        expect(updateService.body.success).to.eq(false);
      });
    });

    describe('SERVICE UPDATE WITHOUT REQUIRED CLIENT PRICE FIELD', () => {
      before(async () => {
        updateService = await serviceHelper.updateServiceById(service.body.payload, {
          ...serviceHelper.serviceData(vendorId),
          clientPrice: '',
        }, process.env.TOKEN);
      });

      it('verify status code for update request is 400', () => {
        expect(updateService.statusCode).to.eq(400);
      });

      it('verify update response message is - Service update error', () => {
        expect(updateService.body.message).to.eq('Service update error');
      });

      it('verify updated service success is false', () => {
        expect(updateService.body.success).to.eq(false);
      });

      it('can`t update service without required clientPrice field', () => {
        expect(getService.body.payload.clientPrice, process.env.TOKEN).to.not.eq('');
      });
    });

    describe('SERVICE UPDATE WITHOUT REQUIRED VENDOR PRICE FIELD', () => {
      before(async () => {
        updateService = await serviceHelper.updateServiceById(service.body.payload, {
          ...serviceHelper.serviceData(vendorId),
          vendorPrice: '',
        }, process.env.TOKEN);
      });

      it('verify status code for update request is 400', () => {
        expect(updateService.statusCode).to.eq(400);
      });

      it('verify update response message is - Service update error', () => {
        expect(updateService.body.message).to.eq('Service update error');
      });

      it('verify updated service success is false', () => {
        expect(updateService.body.success).to.eq(false);
      });

      it('can`t update service without required vendorPrice field', () => {
        expect(getService.body.payload.vendorPrice).to.not.eq('');
      });
    });

    describe('SERVICE UPDATE WITHOUT AUTHORIZATION', () => {
      before(async () => {
        updateService = await serviceHelper.updateServiceById(service.body.payload, {
          ...serviceHelper.serviceData(vendorId),
          vendorPrice: '',
        }, '');
      });

      it('verify status code for update request is 400', () => {
        expect(updateService.statusCode).to.eq(400);
      });

      it('verify update response message is - Auth failed', () => {
        expect(updateService.body.message).to.eq('Auth failed');
      });

      it('verify updated service success is false', () => {
        expect(updateService.body.success).to.eq(false);
      });

      it('can`t update service without required vendorPrice field', () => {
        expect(getService.body.payload.vendorPrice).to.not.eq('');
      });
    });
  });
});

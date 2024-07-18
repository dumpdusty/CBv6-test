const chance = require('chance').Chance();
import { expect } from 'chai';
import * as clientHelper from '../../helpers/clientHelper';
import * as vendorHelper from '../../helpers/vendorHelper';
import * as serviceHelper from '../../helpers/serviceHelper'
import * as orderHelper from '../../helpers/orderHelper'

describe('CREATE ORDER', () => {
  let resClient, clientId, resService, serviceData, serviceId, resVendor, vendorId, resOrder, getOrder
  console.log(serviceId);
  before( async () =>{
    resClient = await clientHelper.createClient(clientHelper.clientData)
    clientId = resClient.body.payload

    resVendor = await vendorHelper.createVendor(vendorHelper.vendorData)
    vendorId = resVendor.body.payload

    serviceData = serviceHelper.serviceData(vendorId)
    resService = await serviceHelper.createService(serviceData)
    serviceId = resService.body.payload
  })

  after(async() =>{
      await clientHelper.deleteClient(clientId);
      await vendorHelper.deleteVendor(vendorId);
      await serviceHelper.deleteService(serviceId);
      await orderHelper.deleteOrder(resOrder.body.payload)
  })

  describe('CREATE ORDER POSITIVE', () => {
    before(async () =>{
      resOrder = await orderHelper.createOrder(orderHelper.orderData(clientId, serviceId))
      getOrder = await orderHelper.getOrder(resOrder.body.payload)
})
    it('verify status code', async () => {
      expect(resOrder.statusCode).to.eq(200);
    });

    it('verify response message', async () => {
      expect(resOrder.body.message).to.eq('Order created');
    });

    it('verify order has a payload', async () => {
      expect(resOrder.body.payload).not.to.be.empty;
      expect(resOrder.body.payload).to.be.a('string');
    });

    it('verify if order creation - success', async () => {
      expect(resOrder.body.success).to.eq(true);
    });

    it('verify if order exists in Data Base', async () => {
      expect(getOrder.body.message).to.eq('Get Order by id ok');
    });
  })

  describe('CREATE ORDER NEGATIVE', () => {
    describe('CANT CREATE ORDER WITHOUT CLIENT ID', () => {
      before(async () =>{
        resOrder = await orderHelper.createOrder(orderHelper.orderData('', serviceId))
        getOrder = await orderHelper.getOrder(resOrder.body.payload)
      })

      it('verify status code', async () => {
        expect(resOrder.statusCode).to.eq(400);
      });

      it('verify response message', async () => {
        expect(resOrder.body.message).to.eq('Order create error');
      });

      it('verify if order creation - false', async () => {
        expect(resOrder.body.success).to.eq(false);
      });

      it('verify if order does not exist in Data Base', async () => {
        expect(getOrder.body.message).to.eq('No order for provided id');
      });
     })

    describe('CANT CREATE ORDER WITHOUT SERVICE ID', () => {
      before(async () =>{
        resOrder = await orderHelper.createOrder(orderHelper.orderData(clientId, ''))
        getOrder = await orderHelper.getOrder(resOrder.body.payload)
      })
      it('verify status code', async () => {
        expect(resOrder.statusCode).to.eq(400);
      });

      it('verify response message', async () => {
        expect(resOrder.body.message).to.eq('Order create error');
      });

      it('verify if order creation - false', async () => {
        expect(resOrder.body.success).to.eq(false);
      });

      it('verify if order does not exist in Data Base', async () => {
        expect(getOrder.body.message).to.eq('No order for provided id');
      });
    })
  })
})
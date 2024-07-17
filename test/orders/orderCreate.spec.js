const chance = require('chance').Chance();
import { expect } from 'chai';
import * as clientHelper from '../../helpers/clientHelper';
import * as vendorHelper from '../../helpers/vendorHelper';
import * as serviceHelper from '../../helpers/serviceHelper'
import * as orderHelper from '../../helpers/orderHelper'

describe('CREATE ORDER', () => {
  let resClient, clientId, clientList = [], resService, serviceData, serviceId, serviceList = [], resVendor, vendorId, vendorList = [], resOrder, getOrder

  before( async () =>{
    resClient = await clientHelper.createClient(clientHelper.clientData)
    clientId = resClient.body.payload
    clientList.push(clientId)

    resVendor = await vendorHelper.createVendor(vendorHelper.vendorData)
    vendorId = resVendor.body.payload
    vendorList.push(vendorId)

    serviceData = serviceHelper.serviceData(vendorId)
    resService = await serviceHelper.createService(serviceData)
    serviceId = resService.body.payload
    serviceList.push(serviceId)

    resOrder = await orderHelper.createOrder(orderHelper.orderData(clientId, serviceId))
    getOrder = await orderHelper.getOrder(resOrder.body.payload)
  })


  after(async() =>{

    for (let i = 0; i < clientList.length; i++) {
      await clientHelper.deleteClient(clientList[i]);
    }
    for (let i = 0; i < vendorList.length; i++) {
      await vendorHelper.deleteVendor(vendorList[i]);
    }
    for (let i = 0; i < serviceList.length; i++) {
      await serviceHelper.deleteService(serviceList[i]);
    }
    await orderHelper.deleteOrder(resOrder.body.payload)

  })

  describe('CREATE ORDER POSITIVE', () => {

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

     })
    // describe('CREATE ORDER NEGATIVE', () => {
    //
    // })
    // describe('CREATE ORDER NEGATIVE', () => {
    //
    // })
  })
})
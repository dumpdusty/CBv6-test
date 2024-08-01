import { expect } from 'chai';
import * as orderHelper from '../../helpers/orderHelper';
import * as clientHelper from '../../helpers/clientHelper';
import * as vendorHelper from '../../helpers/vendorHelper';
import * as serviceHelper from '../../helpers/serviceHelper'

describe('GET ORDER BY ID', () =>{
    let orderId, orderList = [], getOrder, deletedOrder, clientId, vendorId, serviceId
  before(async() =>{
    clientId = (await clientHelper.createClient(clientHelper.clientData)).body.payload;
    vendorId = (await vendorHelper.createVendor(vendorHelper.vendorData)).body.payload
    serviceId = (await serviceHelper.createService(vendorId)).body.payload;
  })
  after(async () =>{
    await vendorHelper.deleteVendor(vendorId);
    await clientHelper.deleteClient(clientId);
    await serviceHelper.deleteService(serviceId);
    for(let i = 0; i < orderList; i++){
      await orderHelper.deleteOrder(orderList[i])
    }
  })
  describe('GET ORDER BY ID - POSITIVE', () =>{
    before(async() =>{
      orderId = (await orderHelper.createOrder(orderHelper.orderData(clientId, serviceId))).body.payload
      orderList.push(orderId)
      getOrder = await orderHelper.getOrder(orderId)
    })

    it('verify response status', () => {
      expect(getOrder.statusCode).to.eq(200)
    })

    it('verify response message', () => {
      expect(getOrder.body.message).to.eq('Get Order by id ok')
    })

    it('verify response success - true', () => {
      expect(getOrder.body.success).to.eq(true)
    })

    it('verify response content type', () => {
      expect(getOrder.headers['content-type']).to.include('application/json')
    })

    it('verify response body structure', () => {
      expect(getOrder.body).to.have.all.keys('payload', 'message', 'success', 'fail', 'silent');
    })

    it('verify returned order Id matches created one', () => {
      expect(getOrder.body.payload._id).to.eq(orderId)
    })
  })
  describe('GET ORDER BY ID - NEGATIVE', () =>{
    describe('GET ORDER BY ID - WITHOUT ID', () =>{
      before(async() =>{
        orderId = (await orderHelper.createOrder(orderHelper.orderData(clientId, serviceId))).body.payload
        orderList.push(orderId)
        getOrder = await orderHelper.getOrder('')
      })

      it('verify response status', () => {
        expect(getOrder.statusCode).to.eq(404)
      })

      it('verify response message', () => {
        expect(getOrder.body.message).to.eq( 'API not found')
      })

      it('verify response success - false', () => {
        expect(getOrder.body.success).to.eq(false)
      })

      it('verify response body structure', () => {
        expect(getOrder.body).to.have.all.keys( 'message', 'success', 'fail', 'silent');
      })
    })
    describe('GET ORDER BY ID - WITH INVALID ID', () =>{
      before(async() =>{
        orderId = (await orderHelper.createOrder(orderHelper.orderData(clientId, serviceId))).body.payload
        orderList.push(orderId)
        getOrder = await orderHelper.getOrder(orderId + "+++INVALID+++")
      })

      it('verify response status', () => {
        expect(getOrder.statusCode).to.eq(404)
      })

      it('verify response message', () => {
        expect(getOrder.body.message).to.eq( 'API not found')
      })

      it('verify response success - false', () => {
        expect(getOrder.body.success).to.eq(false)
      })

      it('verify response body structure', () => {
        expect(getOrder.body).to.have.all.keys( 'message', 'success', 'fail', 'silent');
      })
    })
    describe('GET ORDER BY ID - WITH NON-EXISTING ORDER ID', () =>{
      before(async() =>{
        orderId = (await orderHelper.createOrder(orderHelper.orderData(clientId, serviceId))).body.payload
        deletedOrder = await orderHelper.deleteOrder(orderId)
        getOrder = await orderHelper.getOrder(orderId)
      })

      it('verify response status', () => {
        expect(getOrder.statusCode).to.eq(404)
      })

      it('verify response message', () => {
        expect(getOrder.body.message).to.eq( 'No order for provided id')
      })

      it('verify response success - false', () => {
        expect(getOrder.body.success).to.eq(false)
      })

      it('verify response body structure', () => {
        expect(getOrder.body).to.have.all.keys( 'message', 'success', 'fail', 'silent');
      })
    })
  })
})
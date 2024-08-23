import { expect } from 'chai';
import * as orderHelper from '../../helpers/orderHelper';
import * as clientHelper from '../../helpers/clientHelper';
import * as vendorHelper from '../../helpers/vendorHelper';
import * as serviceHelper from '../../helpers/serviceHelper'

describe('ORDER GET ALL', ()=>{
  let order, orderList = [], clientId, vendorId, serviceId, resGetAll
  before(async()=>{
    clientId = (await clientHelper.createClient(clientHelper.clientData)).body.payload;
    vendorId = (await vendorHelper.createVendor(vendorHelper.vendorData)).body.payload
    serviceId = (await serviceHelper.createService(vendorId)).body.payload;
    for(let i = 0; i < 15; i++){
      order = await orderHelper.createOrder(orderHelper.orderData(clientId, serviceId))
      orderList.push(order.body.payload)
    }
  })
  after(async ()=>{
    await vendorHelper.deleteVendor(vendorId);
    await clientHelper.deleteClient(clientId);
    await serviceHelper.deleteService(serviceId);
    for(let i = 0; i < orderList; i++){
      await orderHelper.deleteOrder(orderList[i])
    }
  })

  describe('ORDER GET ALL POSITIVE', ()=>{
    before(async()=>{
      resGetAll = await orderHelper.orderGetAll(process.env.TOKEN)
    })

    it('verify response status', () => {
      expect(resGetAll.statusCode).to.eq(200)
    })

    it('verify response message', () => {
      expect(resGetAll.body.message).to.eq('OrderSearch ok')
    })

    it('verify response contains array', () => {
      expect(resGetAll.body.payload.items).to.be.a('array');
    });

    it('verify response array has at least one element', () => {
      expect(resGetAll.body.payload.items.length).to.be.above(0);
    });
  })

  describe('ORDER GET ALL NEGATIVE', ()=>{
    describe('Get orders without token', () => {
      before(async()=>{
        resGetAll = await orderHelper.orderGetAll(null)
      })
      it('verify response status', () => {
        expect(resGetAll.statusCode).eq(400);
      });

      it('verify response message', () => {
        expect(resGetAll.body.message).eq('Auth failed');
      });

      it('verify error response contains the expected structure', () => {
        expect(resGetAll.body).to.have.all.keys('success', 'message', 'fail', 'silent', 'payload');
      });
    })

    describe('Get orders with invalid token', () => {
      before(async()=>{
        resGetAll = await orderHelper.orderGetAll('+++++INVALID+++++')
      })
      it('verify response status', () => {
        expect(resGetAll.statusCode).eq(400);
      });

      it('verify response message', () => {
        console.log(resGetAll.body);
        expect(resGetAll.body.message).eq('Auth failed');
      });

      it('verify error response contains the expected structure', () => {
        expect(resGetAll.body).to.have.all.keys('success', 'message', 'fail', 'silent', 'payload');
      });
    })
  })
})
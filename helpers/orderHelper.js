import request from 'supertest';

const chance = require('chance').Chance();

export function orderData(clientId, serviceId){
  return {
    clientPrice: chance.integer({ min: 0}),
    clientPaid: chance.integer({ min: 0}),
    client: clientId,
    service: serviceId,
    vendorPrice: chance.integer({ min: 0}),
    vendorPaid: chance.integer({ min: 0})
  }
}


export function createOrder(data){
  return request(process.env.BASE_URL)
    .post('order')
    .set('Authorization', process.env.TOKEN)
    .send(data)
}

export function getOrder(id){
  return request(process.env.BASE_URL)
    .get('order/' + id)
    .set('Authorization', process.env.TOKEN)

}

export function deleteOrder(id){
  return request(process.env.BASE_URL)
    .delete('order/' + id)
    .set('Authorization', process.env.TOKEN)
}
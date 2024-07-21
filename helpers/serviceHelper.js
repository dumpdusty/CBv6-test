import request from 'supertest';
const chance = require('chance').Chance();

export function serviceData (vendorId) {
  return {
    clientPrice: chance.integer({ min: 0}),
    name: chance.name(),
    vendor: vendorId,
    vendorPrice: chance.integer({ min: 0}),
  }
}

export function createService(data) {
  return request(process.env.BASE_URL)
    .post('service')
    .set('Authorization', process.env.TOKEN)
    .send(data);
}

export function getByIdService(serviceId, token) {
  return request(process.env.BASE_URL)
   .get('service/' + serviceId)
   .set('Authorization', token);
}

export function getAllServices(token) {
  return request(process.env.BASE_URL)
    .post('service/search')
    .set('Authorization', token);
}

export function deleteService(id){
  return request(process.env.BASE_URL)
    .delete('service/' + id)
    .set('Authorization', process.env.TOKEN)
}

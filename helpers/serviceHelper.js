import request from 'supertest';
const chance = require('chance').Chance();

export function serviceData (vendorId) {
  return {
    clientPrice: chance.integer({ min: 10, max: 800 }),
    name: chance.name(),
    vendor: vendorId,
    vendorPrice: chance.integer({ min: 10, max: 800 }),
  }
}

export function createService(data) {
  return request(process.env.BASE_URL)
    .post('service')
    .set('Authorization', process.env.TOKEN)
    .send(data);
}


export function deleteService(id){
  return request(process.env.BASE_URL)
    .delete('service/' + id)
    .set('Authorization', process.env.TOKEN)
}

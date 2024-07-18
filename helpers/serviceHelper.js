const chance = require('chance').Chance();
import request from 'supertest';
import 'dotenv/config';

export function serviceData(vendorId) {
  return {
    name: chance.name(),
    vendor: vendorId,
    clientPrice: chance.integer({min: 0}),
    vendorPrice: chance.integer({min: 0}),
  };
};
export function createService(data) {
  return request(process.env.BASE_URL)
    .post('service')
    .set('Authorization', process.env.TOKEN)
    .send(data);
}

export function getAllServices(token) {
  return request(process.env.BASE_URL)
    .post('service/search')
    .set('Authorization', token);
}

export function deleteService(id){
    return request(process.env.BASE_URL)
     .delete(`service/${id}`)
     .set('Authorization', process.env.TOKEN);
}
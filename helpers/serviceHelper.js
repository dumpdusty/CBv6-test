const chance = require('chance').Chance();
import request from 'supertest';
import 'dotenv/config';
import * as constants from './constants';

export const serviceData = async() => {
  return {
    name: chance.sentence({ words: 2 }),
    vendor: await constants.vendorId(),
    clientPrice: chance.prime(),
    vendorPrice: chance.prime(),
    description: chance.sentence({ words: 5 }),
  };
};
export function createService(serviceData) {
  return request(process.env.BASE_URL)
    .post('service')
    .set('Authorization', process.env.TOKEN)
    .send(serviceData);
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
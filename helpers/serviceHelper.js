import request from 'supertest';
const chance = require('chance').Chance();

export function randomServiceData(vendorId = '') {
  const price = chance.integer({ min: 50, max: 10000 });
  return {
    name: chance.name(),
    vendor: vendorId,
    vendorPrice: price,
    clientPrice: price * 2,
    description: chance.sentence(),
  };
}

export function createService(data) {
  return request(process.env.BASE_URL)
    .post('service')
    .set('Authorization', process.env.TOKEN)
    .send(data);
}

export function getService(id) {
  return request(process.env.BASE_URL)
    .get('service/' + id)
    .set('Authorization', process.env.TOKEN);
}

export function getAllServices(token = process.env.TOKEN) {
  return request(process.env.BASE_URL)
    .post('service/search')
    .set('Authorization', token)
    .send({ limit: 50 });
}

export function deleteService(id) {
  return request(process.env.BASE_URL)
    .delete('service/' + id)
    .set('Authorization', process.env.TOKEN);
}

export function updateService(id, data) {
  return request(process.env.BASE_URL)
    .patch(`service/${id}`)
    .set('Authorization', process.env.TOKEN)
    .send(data);
}

import request from 'supertest';
const chance = require('chance').Chance();

export const companyData = {
  companyName: chance.company(),
  email: chance.email(),
};

export function getCompany(companyId, token = process.env.TOKEN) {
  return request(process.env.BASE_URL)
    .get(`company/${companyId}`)
    .set('Authorization', token);
}

export function updateCompany(companyId, companyData, token = process.env.TOKEN) {
  return request(process.env.BASE_URL)
    .patch(`company/${companyId}`)
    .set('Authorization', token)
    .send(companyData);
}
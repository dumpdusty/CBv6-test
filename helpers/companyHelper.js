import request from 'supertest';
const chance = require('chance').Chance();

export const companyData = {
  companyName: chance.company(),
  email: chance.email(),
};

export function getCompany(companyId) {
  return request(process.env.BASE_URL)
    .get(`company/${companyId}`)
    .set('Authorization', process.env.TOKEN);
}

export function updateCompany(companyId, companyData) {
  return request(process.env.BASE_URL)
    .patch(`company/${companyId}`)
    .set('Authorization', process.env.TOKEN)
    .send(companyData);
}

export function getCompanyNoAuth(companyId) {
    return request(process.env.BASE_URL)
      .get(`company/${companyId}`)
  }
import request from 'supertest';
const chance = require('chance').Chance();

export function createClient(name, phone, email='', description=''){
    return request(process.env.BASE_URL)
        .post('client')
        .set('Authorization', process.env.TOKEN)
        .send({
          name,
          phone,
          email,
          description,
        });
}
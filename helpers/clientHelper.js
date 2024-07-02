import request from 'supertest';
const chance = require('chance').Chance();

export function createClient(name=chance.name(), phone=chance.phone(), email='', description=''){
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

export function getAllClients(token = process.env.TOKEN){
    return request(process.env.BASE_URL)
    .post('client/search')
    .set('Authorization', token)
    .send({limit: 50})
}

export function deleteClient(id){
    return request(process.env.BASE_URL)
    .delete('client/' + id)
    .set('Authorization', process.env.TOKEN)
}
import request from 'supertest';
const chance = require('chance').Chance();


export const clientData = {
    name: chance.name(),
    phone: chance.phone(),
    email: chance.email()
};

export function createClient(clientData) {
    return request(process.env.BASE_URL)
        .post('client')
        .set('Authorization', process.env.TOKEN)
        .send(clientData);
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

export function getClient(id){
    return request(process.env.BASE_URL)
    .get('client/' + id)
    .set('Authorization', process.env.TOKEN)
}
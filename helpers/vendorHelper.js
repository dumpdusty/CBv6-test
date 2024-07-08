import request from 'supertest';
const chance = require('chance').Chance();

export const vendorData = {
    name: chance.name(),
    phone: chance.phone(),
    email: chance.email(),
    description: chance.sentence(),
};

export function createVendor(vendorData) {
    return request(process.env.BASE_URL)
        .post('vendor')
        .set('Authorization', process.env.TOKEN)
        .send(vendorData);
}

export function getVendor(id){
    return request(process.env.BASE_URL)
    .get('vendor/' + id)
    .set('Authorization', process.env.TOKEN)
}

export function getAllVendors(token = process.env.TOKEN){
    return request(process.env.BASE_URL)
    .post('vendor/search')
    .set('Authorization', token)
    .send({limit: 50})
}

export function deleteVendor(id){
    return request(process.env.BASE_URL)
    .delete('vendor/' + id)
    .set('Authorization', process.env.TOKEN)
}

export function updateVendor(id, data) {
    return request(process.env.BASE_URL)
    .patch(`vendor/${id}`).set('Authorization', process.env.TOKEN).send(data)
}
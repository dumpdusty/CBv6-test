import request from 'supertest';
const chance = require('chance').Chance();

export function create(name, phone, email='', description=''){
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

export function getAll(){
    return request(process.env.BASE_URL)
    .post('client/search')
    .set('Authorization', process.env.TOKEN)
    .send({limit: 20})
}

export function deleteSingle(id){
    return request(process.env.BASE_URL)
    .delete('client/' + id)
    .set('Authorization', process.env.TOKEN)
}
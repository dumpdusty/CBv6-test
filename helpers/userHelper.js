import request from 'supertest';
const chance = require('chance').Chance();

export const newEmail = () => {
    return 'user_' + Date.now() + '@pirate.com';
  };
  
  export const userData = {
    firstName: chance.first(),
    lastName: chance.last(),
    email: newEmail(),
    password: '12345',
  };

export function register(data) {
    return request(process.env.BASE_URL).post('user').send(data);
  }

export function login(email, password) {
    return request(process.env.BASE_URL)
      .post('user/login')
      .send({ email, password });
  }

  export function getUser(userId){
    return request(process.env.BASE_URL)
    .get(`user/${userId}`).set('Authorization', process.env.TOKEN)
  }

export function deleteUser(userId){
    return request(process.env.BASE_URL)
    .delete(`user/${userId}`).set('Authorization', process.env.TOKEN)
  }

  export function getUserNoAuth(userId){
    return request(process.env.BASE_URL)
    .get(`user/${userId}`)
  }
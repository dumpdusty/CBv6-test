import request from 'supertest';
const chance = require('chance').Chance();

const newEmail = 'user_' + Date.now() + '@pirate.com';

export function login(email, password) {
  return request(process.env.BASE_URL)
    .post('user/login')
    .send({ email, password });
}

export function signup(
  firstName,
  lastName,
  email,
  password = process.env.PASSWORD
) {
  return request(process.env.BASE_URL).post('user').send({
    firstName: firstName,
    lastName: lastName,
    email,
    password,
  });
}

export function register(data) {
  return request(process.env.BASE_URL).post('user').send(data);
}

export function emailSearch(email) {
  return request('https://clientbase-server.herokuapp.com')
    .post('/email/search')
    .send({ email });
}

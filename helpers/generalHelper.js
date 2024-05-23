import request from 'supertest'

export function login(email, password){
    return request(process.env.BASE_URL)
    .post('user/login')
    .send({ email: email, password: password });
}





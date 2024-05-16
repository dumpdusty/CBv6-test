import request from 'supertest';
import { expect } from 'chai';


describe('AUTHENTICATION', () => {
    it('login with valid credentials', async() => {
       const res = await request('https://clientbase-server.herokuapp.com/v6/')
        .post('user/login')
        .send({email: 'jacksparrow@pirate.com', password: 'Pirate666!'})

       expect(res.status).to.eq(200)

       expect(res.body.message).to.equal('Auth success')
    });
});

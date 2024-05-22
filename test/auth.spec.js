import request from 'supertest';
import { expect } from 'chai';
import 'dotenv/config'


describe('AUTHENTICATION', () => {
    it('login with valid credentials', async() => {
       const res = await request(process.env.BASE_URL)
        .post('user/login')
        .send({email: process.env.EMAIL, password: process.env.PASSWORD})

       expect(res.status).to.eq(200)
    });

    it('login with valid credentials', async() => {
        const res = await request(process.env.BASE_URL)
         .post('user/login')
         .send({email: process.env.EMAIL, password: process.env.PASSWORD})
 
        expect(res.body.message).to.equal('Auth success')
     });

    it('login with invalid email', async() => {
        const res = await request(process.env.BASE_URL)
        .post('user/login')
        .send({email: process.env.INVALID, password: process.env.PASSWORD})

       expect(res.status).to.eq(400)
    });

    it('login with invalid email', async() => {
        const res = await request(process.env.BASE_URL)
        .post('user/login')
        .send({email: process.env.INVALID, password: process.env.PASSWORD})

       expect(res.body.message).to.eq('Auth failed')
    });

    it('login with invalid password', async() => {
        const res = await request(process.env.BASE_URL)
        .post('user/login')
        .send({email: process.env.EMAIL, password: process.env.INVALID})

       expect(res.status).to.eq(400)
    });
    
    it('login with invalid password', async() => {
        const res = await request(process.env.BASE_URL)
        .post('user/login')
        .send({email: process.env.EMAIL, password: process.env.INVALID})

       expect(res.body.message).to.eq('Auth failed')
    });

});

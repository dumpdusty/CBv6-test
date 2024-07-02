
import * as generalHelper from '../helpers/generalHelper';
import { expect } from 'chai';
import request from 'supertest'

describe('verify email trim on signup', () => {
  let res;
  const newEmail = '  user' + Date.now() + '@pirate.com ';
  const trimmedEmail = newEmail.trim();

  before(async () => {
    await generalHelper.signup('Jack', 'Sparrow', newEmail, process.env.PASSWORD);

    res = await generalHelper.login(trimmedEmail, process.env.PASSWORD);
  });

  it('verify response code', async () => {
    expect(res.status).to.eq(200);
  });

  it('verify response message', async () => {
    expect(res.body.message).to.eq('Auth success');
  });
});



/*
1. signup new user
2. find email
3. confirm email
4. login
*/
describe('email confirmation', () => {
    let res, str, endPoint
    const newEmail = 'pirate' + Date.now() + '@pirate.com';
    it('role changed to verified', async() => {

        // signup call
        await generalHelper.signup('Jack', 'Sparrow', newEmail, process.env.PASSWORD);

        // first login
        res = await generalHelper.login(newEmail, process.env.PASSWORD)

        // console.log(`Role before email confirmation - ${res.body.payload.user.roles}`);
        
        // console.log(`Actions before email confirmation - ${res.body.payload.acl}`);


        //email search call
        str = await generalHelper.emailSearch(newEmail)

        // extract endpoint from email message
        endPoint = str.body.payload.items[0].message.split('\n')[4].split('https://clientbase.us')[1]

        // confirm email
       await request('https://clientbase-server-edu-dae6cac55393.herokuapp.com').get(endPoint).send()


        // login with confirmed email
        res = await generalHelper.login(newEmail, process.env.PASSWORD)

        // console.log(`Role after email confirmation - ${res.body.payload.user.roles}`);

        // console.log(`Actions after email confirmation - ${res.body.payload.acl}`);

        expect(res.body.payload.user.roles).to.include('verified')
        
    });
});
import request from 'supertest';
const chance = require('chance').Chance();
import { expect } from 'chai';
import * as Client from '../../helpers/clientHelper';

describe('GET ALL CLIENTS', () => {
    let res;
    describe('get all clients POSITIVE', () => {
        before(async() => {
            await Client.create()
            res = await Client.getAll()
        });

        it('verify response status', () => {
            expect(res.statusCode).eq(200);
          });
      
          it('verify response message', () => {
            expect(res.body.message).eq('ClientSearch ok');
          });
      
          it('verify response contains array', () => {
            expect(res.body.payload.items).to.be.a('array');
          });
      
          it('verify response array has at least one element', () => {
            expect(res.body.payload.items.length).to.be.above(0);
          });
    });
});
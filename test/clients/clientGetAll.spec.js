import request from 'supertest';
const chance = require('chance').Chance();
import { expect } from 'chai';
import * as clientHelper from '../../helpers/clientHelper';

describe('GET ALL CLIENTS', () => {
    let res;
    describe('get all clients POSITIVE', () => {
        before(async() => {
            await clientHelper.createClient()
            res = await clientHelper.getAllClients()
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

    describe('get all clients NEGATIVE', () => {
      describe('get clients without token', () => {
        before(async () => {
          await clientHelper.createClient();
          res = await clientHelper.getAllClients('');
        });
  
        it('verify response status', () => {
          expect(res.statusCode).eq(400);
        });
  
        it('verify response message', () => {
          expect(res.body.message).eq('Auth failed');
        });
      });
    });
});
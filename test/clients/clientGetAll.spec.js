import { expect } from 'chai';
import * as clientHelper from '../../helpers/clientHelper';

describe('GET ALL CLIENTS', () => {
    let res, resGetAll;
    let clientsList = [];

    after(async () => {
      for (let i = 0; i < clientsList.length; i++) {
        await clientHelper.deleteClient(clientsList[i]);
      }
    });

    describe('get all clients POSITIVE', () => {
        before(async() => {
            res = await clientHelper.createClient(clientHelper.clientData)
            clientsList.push(res.body.payload);
            resGetAll = await clientHelper.getAllClients()
        });

        it('verify response status', () => {
            expect(resGetAll.statusCode).eq(200);
          });
      
          it('verify response message', () => {
            expect(resGetAll.body.message).eq('ClientSearch ok');
          });
      
          it('verify response contains array', () => {
            expect(resGetAll.body.payload.items).to.be.a('array');
          });
      
          it('verify response array has at least one element', () => {
            expect(resGetAll.body.payload.items.length).to.be.above(0);
          });
    });

    describe('get all clients NEGATIVE', () => {
      describe('get clients without token', () => {
        before(async () => {
          res = await clientHelper.createClient(clientHelper.clientData);
          clientsList.push(res.body.payload);
          resGetAll = await clientHelper.getAllClients('');
        });
  
        it('verify response status', () => {
          expect(resGetAll.statusCode).eq(400);
        });
  
        it('verify response message', () => {
          expect(resGetAll.body.message).eq('Auth failed');
        });
      });
    });
});
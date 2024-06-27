import request from 'supertest';
const chance = require('chance').Chance();
import { expect } from 'chai';
import { createClient } from '../../helpers/clientHelper';

describe('Create client POSITIVE', () => {
  let res;

  describe('Create client with all data', () => {
    before(async () => {
      res = await createClient(chance.name(), chance.phone(), chance.email(), chance.sentence());
    });

    it('verify status code', async () => {
      expect(res.statusCode).to.eq(200);
    });

    it('verify response message', async () => {
      expect(res.body.message).to.eq('Client created');
    });

    it('verify response has a payload', async () => {
      expect(res.body.payload).to.not.be.empty;
      expect(res.body.payload).to.be.a('string');
    });
  });

  describe('Create client with required data only', () => {
    before(async () => {
        res = await createClient(chance.name(), chance.phone());
      });

      it('verify status code', async () => {
        expect(res.statusCode).to.eq(200);
      });

      it('verify response message', async () => {
        expect(res.body.message).to.eq('Client created');
      });
  
      it('verify response has a payload', async () => {
        expect(res.body.payload).to.not.be.empty;
        expect(res.body.payload).to.be.a('string');
      });
  
  });
});

describe('Create client NEGATIVE', () => {
    let res;
    describe('create client w/o name', () => {

        before(async () => {
            res = await createClient('', chance.phone());
          });

          it('verify status code', async () => {
            expect(res.statusCode).to.eq(400);
          });
    
          it('verify response message', async () => {
            expect(res.body.message).to.eq('Client create error');
          });
    });

    
    describe.skip('create client w/o phone', () => {

        before(async () => {
            res = await createClient(chance.name(), '');
          });

          it('verify status code', async () => {
            expect(res.statusCode).to.eq(400);
          });
    
          it('verify response message', async () => {
            expect(res.body.message).to.eq('Client create error');
          });
    });


});
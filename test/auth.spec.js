import { expect } from 'chai';
import { login } from '../helpers/generalHelper';
import 'dotenv/config'

describe('AUTHENTICATION', () => {
    let res;
  describe('POSITIVE', () => {
 
    before(async () => {
      res = await login(process.env.EMAIL, process.env.PASSWORD);
    });

    it('verify response status code', async () => {
      expect(res.status).to.eq(200);
    });

    it('verify response body message', async () => {
      expect(res.body.message).to.equal('Auth success');
    });
  });

  describe('NEGATIVE', () => {

    describe('login with invalid email', () => {

      before(async () => {
        res = await login('invalid@test.com', process.env.PASSWORD);
      });

      it('verify response status code', async () => {
        expect(res.status).to.eq(400);
      });

      it('verify response body message', async () => {
        expect(res.body.message).to.eq('Auth failed');
      });
    });

    describe('login with invalid password', () => {
        
        before(async () => {
          res = await login(process.env.EMAIL, 'Invalid123');
        });
  
      it('verify response status code', async () => {
        expect(res.status).to.eq(400);
      });

      it('verify response body message', async () => {
        expect(res.body.message).to.eq('Auth failed');
      });
    });
  });
});

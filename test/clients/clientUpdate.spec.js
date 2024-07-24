import { expect } from 'chai';
const chance = require('chance').Chance();
import * as clientHelper from '../../helpers/clientHelper';

describe('UPDATE CLIENT', () => {
  let resClientCreate,
    idClient,
    updatedClient,
    getClient,
    getUpdClient;

  before(async() =>{
    resClientCreate = await clientHelper.createClient(clientHelper.clientData);
    idClient = resClientCreate.body.payload;
  })

  after(async() => {
    await clientHelper.deleteClient(idClient)
  })


  describe('UPDATE CLIENT POSITIVE', () => {
    before(async () => {
      getClient = await clientHelper.getClientById(idClient);
      updatedClient = await clientHelper.updateClient( idClient,{...clientHelper.clientData, name: 'UpdatedName', phone: '1258556547', email: 'testupd@gmail.com'});
      getUpdClient = await clientHelper.getClientById(idClient);
    });

    it('verify status code for update request is 200', () => {
      expect(updatedClient.statusCode).to.eq(200);
    });

    it('verify update response message is "Client updated"', () => {
      expect(updatedClient.body.message).to.eq('Client updated');
    });

    it('verify name field is updated', () => {
      expect(getClient.body.payload.name).to.not.eq(getUpdClient.body.payload.name);
    });

    it('verify phone field is updated', () => {
      expect(getClient.body.payload.phone).to.not.eq(getUpdClient.body.payload.phone);
    });

    it('verify name email is updated', () => {
      expect(getClient.body.payload.email).to.not.eq(getUpdClient.body.payload.email);
    });

    it('verify updated client id is a string', () => {
      expect(typeof getClient.body.payload._id).to.eq('string');
    });

  })


  describe('UPDATE CLIENT NEGATIVE', () =>{
    describe('UPDATE CLIENT WITHOUT REQUIRED NAME FIELD', () =>{
      before(async () => {
        getClient = await clientHelper.getClientById(idClient);
        updatedClient = await clientHelper.updateClient( idClient,{...clientHelper.clientData, name:'',phone: '1258556547',email: 'testupd@gmail.com'});
        getUpdClient = await clientHelper.getClientById(idClient);
      });

      it('verify status code for update request is 400', () => {
        expect(updatedClient.statusCode).to.eq(400);
      });

      it('verify update response message is "Client update error"', () => {
        expect(updatedClient.body.message).to.eq('Client update error');
      });

      it('verify name field is not updated', () => {
        expect(getClient.body.payload.name).to.not.eq('');
      });

      it('verify updated client id is a string', () => {
        expect(typeof getClient.body.payload._id).to.eq('string');
      });
    });

    describe.skip('UPDATE CLIENT WITHOUT REQUIRED PHONE FIELD', () =>{
      before(async () => {
        getClient = await clientHelper.getClientById(idClient);
        updatedClient = await clientHelper.updateClient( idClient,{...clientHelper.clientData, name:'UpdatedName',phone: '', email: 'testupd@gmail.com'} );
        getUpdClient = await clientHelper.getClientById(idClient);
      });

      it('verify status code for update request is 400', () => {
        expect(updatedClient.statusCode).to.eq(400);
      });

      it('verify update response message is "Client update error"', () => {
        expect(updatedClient.body.message).to.eq('Client update error');
      });

      it('verify phone field is not updated', () => {
        expect(getClient.body.payload.phone).to.not.eq('');
      });

      it('verify updated client id is a string', () => {
        expect(typeof getClient.body.payload._id).to.eq('string');
      });
    });
  });
});

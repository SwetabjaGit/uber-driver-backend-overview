/* global chai, server, expect */

import { Driver, BankAccount }from '../app/models/index';

let driverTest = { name: 'teste', vehicle: 'Mercedes 1113' };
let locationTest = { lat: "-15.9468726", lng: "-50.1523773" };
let bankAccountData = {
	driver_name: "teste",
	bank_account: {
		name: "teste",
		routing_number: "123456789",
		account_number: "0185546",
		tax_information: "Tax0"
	}
};

after(done => {
  Driver.destroy({ where: { name: driverTest.name } });
  BankAccount.destroy({ where: { driver_id: 1 } });
  
  done();
});

describe('Routes /api/v1/driver/*', () => {
  it('1st Driver register', done => {
    chai.request(server)
      .post('/api/v1/driver/register')
      .send(driverTest)
      .end((err, res) => {
        driverTest = res.body.data;
        expect(res.body.message).to.be.a('string');
        expect(res.body.data).to.be.a('Object');
        done(err);
      });
  });

  it('2nd Set driver location', done => {
    chai.request(server)
      .post('api/v1/driver/set-location')
      .send({ id: driverTest.id, ...locationTest })
      .end((err, res) => {
        expect(res.body.lat, 'number');
        expect(res.body.lng, 'number');
        done(err);
      });
  });

  it('3rd Get driver location', done => {
    chai.request(server)
      .get('api/v1/driver/get-location')
      .end((err, res) => {
        expect(res.body.lat, 'number');
        expect(res.body.lng, 'number');
        done(err);
      });
  });

  it('4th Add driver bank account', done => {
    chai.request(server)
      .post('api/v1/driver/bank/add-account')
      .send(bankAccountData)
      .end((err, res) => {
        expect(res.body.bank_account, 'Object');
        done(err);
      });
  });
});
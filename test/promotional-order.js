/* global chai, server, expect */
import { Promotional, Order }from '../app/models/index';

let orderTest = {
  plate: { name: "teste", price: 3 },
  chief: { name: "teste", location: "Sítio do Pica Pau Amarelo" },
  driver: { name: "teste", vehicle: "Ford Ka" },
  destiny: "Av.Copacabana",
  code: "9999"
};

after(done => {
  Order.destroy({ where: { plate_name: orderTest.plate.name } });
  
  done();
});

let promotionalTest = {
	code: "9999",
	isPercent: true,
	discount: 10,
	expirationDate: "09/10/2019",
	isActive: true
}

after(done => {
  Promotional.destroy({ where: { code: promotionalTest.code } });

  done();
});

describe('Routes /api/v1/driver/promotional-code/*', () => {
  it('5th Create PromotionalCode', (done) => {
    chai.request(server)
      .post('/api/v1/promotional-code/create')
      .send(promotionalTest)
      .end((err, res) => {
        expect(res.body.message).to.be.a('string');
        done(err);
      });
  });

  it('6th Validate Promotional Code', (done) => {
    chai.request(server)
      .post('/api/v1/promotional-code/create')
      .send({ code: promotionalTest.code })
      .end((err, res) => {
        expect(res.body.message).to.be.a('string');
        done(err);
      });
  });
  describe('Routes /api/v1/order/*', () => {
    it('7th Order register', done => {
      chai.request(server)
        .post('/api/v1/order/create')
        .send(orderTest)
        .end((err, res) => {
          console.log(res.body)
          done(err);
        });
    });
  });
});
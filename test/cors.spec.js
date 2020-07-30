/*global chai, chaiHttp, server, expect*/
chai.use(chaiHttp);

describe('Cors middleware', () => {
  it('It should return 200', () => {
    chai.request(server)
      .options('/api/v1/')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
      });
  });
});
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./server.js'); 

chai.use(chaiHttp);
const expect = chai.expect;

describe('Product Catalog Service', () => {
  it('should create a new product', (done) => {
    chai
      .request(app)
      .post('/products')
      .send({ name: 'Laptop', price: 1000 })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should get all products', (done) => {
    chai
      .request(app)
      .get('/products')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });
});

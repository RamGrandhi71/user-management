const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../index');

chai.use(chaiHttp);

describe('User Management API Tests', function () {
  // Test the GET / endpoint
  describe('GET /', function () {
    it('should return a welcome message', function (done) {
      chai.request(app)
        .get('/')
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.text).to.equal('Welcome To User Management Backend');
          done();
        });
    });
  });

  // Test the POST /register endpoint
  describe('POST /register', function () {
    it('should register a new user', function (done) {
      chai.request(app)
        .post('/register')
        .send({
          name: 'Test User',
          username: 'testuser',
          age: 30,
          email: 'test@example.com',
          phone: '1234567890',
          password: 'test123'
        })
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal('User Test User Created Successfully');
          done();
        });
    });
  });

  // Test the POST /authenticate endpoint
  describe('POST /authenticate', function () {
    it('should authenticate a user', function (done) {
      chai.request(app)
        .post('/authenticate')
        .send({
          username: 'testuser',
          password: 'test123'
        })
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal('Authorized');
          done();
        });
    });
  });

  // Test the PUT /updateuser endpoint
  describe('PUT /updateuser', function () {
    it('should update user information', function (done) {
      chai.request(app)
        .put('/updateuser')
        .send({
          username: 'testuser',
          name: 'Updated Test User',
          age: 35,
          email: 'updatedtest@example.com',
          phone: '9876543210',
          password: 'newpassword'
        })
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal('User Updated Successfully');
          done();
        });
    });
  });

  // Test the DELETE /deleteuser endpoint
  describe('DELETE /deleteuser', function () {
    it('should delete a user', function (done) {
      chai.request(app)
        .delete('/deleteuser')
        .send({
          username: 'testuser'
        })
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal('User Deleted Successfully');
          done();
        });
    });
  });
});

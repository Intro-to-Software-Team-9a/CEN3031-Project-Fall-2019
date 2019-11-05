const sinon = require('sinon');
const assert = require('assert');
const accounts = require('../../controllers/accounts.server.controller');

function mockRequest() {
  return {
    body: { email: 'test@gmail.com', password: 'test' },
  };
};

function mockResponse() {
  return {
    status: sinon.spy(),
    send: sinon.spy(),
  }
}



describe('Accounts Controller', () => {
  describe('createAccount', () => {
    it('should return 400 if req.body.email not provided', async () => {
      const req = mockRequest();
      const res = mockResponse();
      await accounts.createAccount(req, res);
      assert.ok(res.status.calledWith(400));
    });
  })
});

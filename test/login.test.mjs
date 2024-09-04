import request from 'supertest';
// import app from '../app.mjs';
import { server } from '../app.mjs';
import { expect } from 'chai';

describe('POST /api/auth/login', () => {
  it('should return 200 and success message for valid credentials', async () => {
    const response = await request(server)
      .post('/api/auth/login')
      .send({ email: 'rakibattaridib@gmail.com', password: '123456' });

    expect(response.statusCode).to.equal(200); // Use .equal for comparison
    expect(response.body).to.have.property('success', true); // Use .have.property for property checks
  });

  it('should return 401 for invalid credentials', async () => {
    const response = await request(server)
      .post('/api/auth/login')
      .send({ email: 'rakibattaridib@gmail.com', password: 'wrongpassword' });

    expect(response.statusCode).to.equal(401); // Use .equal for comparison
    expect(response.body).to.have.property('error', 'Invalid email or password'); // Use .have.property for property checks
  });
});

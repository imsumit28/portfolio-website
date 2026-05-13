const request = require('supertest');
const app = require('../app');

const mockSave = jest.fn();

jest.mock('../models/Contact', () =>
  jest.fn().mockImplementation((payload) => ({
    ...payload,
    save: mockSave
  }))
);

const Contact = require('../models/Contact');

describe('Contact validation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSave.mockResolvedValue({});
    delete process.env.WEB3FORMS_ACCESS_KEY;
  });

  it('rejects missing payload fields', async () => {
    const res = await request(app).post('/api/contact').send({
      name: '   ',
      email: '',
      message: ''
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/required/i);
    expect(Contact).not.toHaveBeenCalled();
  });

  it('rejects invalid email', async () => {
    const res = await request(app).post('/api/contact').send({
      name: 'Sumit',
      email: 'invalid',
      message: 'Hello'
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/invalid email/i);
  });

  it('accepts valid payload and stores normalized values', async () => {
    const res = await request(app).post('/api/contact').send({
      name: '  Sumit Kumar  ',
      email: '  SUMIT@EXAMPLE.COM  ',
      message: '  Looking forward to connecting.  '
    });

    expect(res.statusCode).toBe(201);
    expect(Contact).toHaveBeenCalledWith({
      name: 'Sumit Kumar',
      email: 'sumit@example.com',
      message: 'Looking forward to connecting.'
    });
    expect(mockSave).toHaveBeenCalled();
  });
});

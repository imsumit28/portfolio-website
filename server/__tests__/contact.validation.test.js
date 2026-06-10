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
    global.fetch = jest.fn();
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

  it('stores valid payload and reports missing email configuration', async () => {
    const res = await request(app).post('/api/contact').send({
      name: '  Sumit Kumar  ',
      email: '  SUMIT@EXAMPLE.COM  ',
      message: '  Looking forward to connecting.  '
    });

    expect(res.statusCode).toBe(202);
    expect(res.body.message).toMatch(/not configured/i);
    expect(Contact).toHaveBeenCalledWith({
      name: 'Sumit Kumar',
      email: 'sumit@example.com',
      message: 'Looking forward to connecting.'
    });
    expect(mockSave).toHaveBeenCalled();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('sends notification when Web3Forms is configured', async () => {
    process.env.WEB3FORMS_ACCESS_KEY = 'test-access-key';
    global.fetch.mockResolvedValue({ ok: true });

    const res = await request(app).post('/api/contact').send({
      name: 'Sumit Kumar',
      email: 'sumit@example.com',
      message: 'Looking forward to connecting.'
    });

    expect(res.statusCode).toBe(201);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.web3forms.com/submit',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
          Accept: 'application/json'
        })
      })
    );
  });
});

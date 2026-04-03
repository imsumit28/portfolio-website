const http = require('http');

const data = JSON.stringify({
  name: 'Ironman',
  email: 'test@example.com',
  message: 'hey'
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/contact',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`);
  res.on('data', d => {
    process.stdout.write(d);
  });
});

req.on('error', error => {
  console.error('Error:', error.message);
});

req.write(data);
req.end();

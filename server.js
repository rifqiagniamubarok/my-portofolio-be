var http = require('http');
var app = require('./app'); // Import app.js

var server = http.createServer(app); // Gunakan app.js sebagai handler server

const PORT = process.env.PORT || 3330;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

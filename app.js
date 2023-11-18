require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const routes = require('./routes');

const whitelist = ['http://localhost:3000', 'http://localhost:3340', 'https://rifqiagniamubarok.com'];

// var whitelist = ['http://example1.com', 'http://example2.com']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, '/public')));

app.use('/check', (req, res) => {
  res.send('<p>COBA</p>');
});

app.use('/api/v1', routes);

const PORT = process.env.PORT || 3330;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

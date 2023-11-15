require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const routes = require('./routes');

const port = process.env.PORT || 3330;
const allowOrigins = ['http://localhost:3000', 'http://localhost:3340', 'https://rifqiagniamubarok.com'];

app.use(
  cors({
    origin: allowOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/check', (req, res) => {
  res.send('<p>OKKK</p>');
});

app.use('/api/v1', routes);

const PORT = process.env.PORT || 3330;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

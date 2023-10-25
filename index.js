require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3330;
const routes = require('./routes');

app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/api/v1', routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const express = require('express');
const bodyParser = require('body-parser');

require('./db');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3001, () => {
  console.log('listening on port 3001');
});

const express = require('express');
const sequelize = require('./db');
const app = express();

sequelize();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3001, () => {
  console.log('listening on port 3001');
});

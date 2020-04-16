const Sequelize = require('sequelize');

const sequelize = new Sequelize('colony_management', null, null, {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;

const cageResolvers = require('./cage');
const userResolvers = require('./user');

module.exports = {
  ...cageResolvers,
  ...userResolvers,
};

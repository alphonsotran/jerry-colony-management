const faker = require('faker');
const User = require('../../db/models').User;

const userData = async (props = {}) => {
  const defaultUserProps = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    passwordHash: 'password',
  };

  return Object.assign({}, defaultUserProps, props);
};

module.exports = async function (props = {}) {
  return User.create(await userData(props));
};

const faker = require('faker');
const resolvers = require('../../../graphql/resolvers/user');

describe('User Resolvers', () => {
  test('creates a new user', async () => {
    const args = {
      userInput: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        passwordHash: 'password',
      },
    };

    const newUser = await resolvers.createUser(args);

    expect.assertions(3);
    expect(newUser.firstName).toEqual(args.userInput.firstName);
    expect(newUser.lastName).toEqual(args.userInput.lastName);
    expect(newUser.email).toEqual(args.userInput.email);
  });

  test('returns null for password when creating new user', async () => {
    const args = {
      userInput: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        passwordHash: 'password',
      },
    };

    const newUser = await resolvers.createUser(args);

    expect.assertions(1);
    expect(newUser.passwordHash).toBeNull();
  });
});

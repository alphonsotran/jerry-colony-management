const resolvers = require('../../../graphql/resolvers/cage');
const Cage = require('../../../db/models').Cage;
const User = require('../../../db/models').User;

describe('Cage Resolvers', () => {
  test('creates a new cage', async () => {
    const user = await User.create({
      firstName: 'John',
      lastName: 'Smith',
      email: 'JohnSmith@yahoo.com',
      passwordHash: 'password',
    });
    const cage = await Cage.create({
      genotype: 'C56',
      cageNumber: '2345632',
      userId: user.dataValues.id,
    });

    expect.assertions(1);
    expect(cage.dataValues.genotype).toEqual('C56');
    Cage.sequelize.close();
    User.sequelize.close();
  });
});

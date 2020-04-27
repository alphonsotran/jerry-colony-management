const resolvers = require('../../../graphql/resolvers/cage');
const userFactory = require('../../factories/user');
const Cage = require('../../../db/models').Cage;

let user;
beforeEach(async () => (user = await userFactory()));

describe('Cage Resolvers', () => {
  test('creates a new cage', async () => {
    const cage = await Cage.create({
      genotype: 'C56',
      cageNumber: '2345632',
      userId: user.dataValues.id,
    });

    expect.assertions(1);
    expect(cage.dataValues.genotype).toEqual('C56');
  });
});

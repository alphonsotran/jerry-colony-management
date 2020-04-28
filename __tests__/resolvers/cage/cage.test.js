const resolvers = require('../../../graphql/resolvers/cage');
const userFactory = require('../../factories/user');
const Cage = require('../../../db/models').Cage;

let user;
beforeEach(async () => (user = await userFactory()));

describe('Cage Resolvers', () => {
  test('creates a new cage', async () => {
    const args = {
      cageInput: {
        genotype: 'C56',
        cageNumber: '2345632',
        userId: user.dataValues.id,
      },
    };

    const newCage = await resolvers.createCage(args);

    expect.assertions(1);
    expect(newCage.dataValues.genotype).toEqual('C56');
  });
});

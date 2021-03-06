const Cage = require('../../../db/models').Cage;
const User = require('../../../db/models').User;

const user = async (userID) => {
  try {
    const user = await User.findOne({ where: { id: userID } });
    return { ...user.dataValues, passwordHash: null, cages: user.getCages() };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  cages: async () => {
    try {
      const cages = await Cage.findAll();
      return cages.map((cage) => {
        return {
          ...cage.dataValues,
          supervisor: user(cage.dataValues.userId),
        };
      });
    } catch (err) {
      console.log('Unable to fetch cages: ', err);
      throw err;
    }
  },
  createCage: async (args) => {
    try {
      return await Cage.create({
        genotype: args.cageInput.genotype,
        cageNumber: args.cageInput.cageNumber,
        userId: 1,
      });
    } catch (err) {
      console.log('Unable to create cages: ', err);
      throw err;
    }
  },
};

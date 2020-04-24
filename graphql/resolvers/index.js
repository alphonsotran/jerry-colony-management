const bcrypt = require('bcrypt');
const Cage = require('../../db/models').Cage;
const User = require('../../db/models').User;

const user = async (userID) => {
  try {
    const user = await User.findOne({ where: { id: userID } });
    return { ...user.dataValues, passwordHash: null, cages: user.getCages() };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  cages: () => {
    return Cage.findAll()
      .then((cages) => {
        return cages.map((cage) => {
          return {
            ...cage.dataValues,
            supervisor: user(cage.dataValues.userId),
          };
        });
      })
      .catch((err) => {
        console.log('Unable to fetch cages: ', err);
        throw err;
      });
  },
  createCage: (args) => {
    return Cage.create({
      genotype: args.cageInput.genotype,
      cageNumber: args.cageInput.cageNumber,
      userId: 1,
    })
      .then((cage) => cage)
      .catch((err) => {
        console.log('Unable to create cages: ', err);
        throw err;
      });
  },
  createUser: (args) => {
    return User.findOne({ where: { email: args.userInput.email } })
      .then((user) => {
        if (user) {
          throw new Error('User already exists.');
        }
        return bcrypt.hash(args.userInput.passwordHash, 12);
      })
      .then((hashedPassword) =>
        User.create({
          firstName: args.userInput.firstName,
          lastName: args.userInput.lastName,
          email: args.userInput.email,
          passwordHash: hashedPassword,
        }).then((user) => {
          return { ...user.dataValues, passwordHash: null };
        }),
      )
      .catch((err) => {
        console.log('Unable to create user: ', err);
        throw err;
      });
  },
};

const bcrypt = require('bcrypt');
const User = require('../../../db/models').User;

module.exports = {
  createUser: async (args) => {
    try {
      const currentUser = await User.findOne({
        where: { email: args.userInput.email },
      });
      if (currentUser) {
        throw new Error('User already exists.');
      }
      const hashedPassword = await bcrypt.hash(args.userInput.passwordHash, 12);
      const newUser = await User.create({
        firstName: args.userInput.firstName,
        lastName: args.userInput.lastName,
        email: args.userInput.email,
        passwordHash: hashedPassword,
      });
      return { ...newUser.dataValues, passwordHash: null };
    } catch (err) {
      console.log('Unable to create user: ', err);
      throw err;
    }
  },
};

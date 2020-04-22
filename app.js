const express = require('express');
const bodyParser = require('body-parser');
const graphQlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const bcrypt = require('bcrypt');
const Cage = require('./db/models').Cage;
const User = require('./db/models').User;

const app = express();

const user = (userID) => {
  return User.findOne({ where: { id: userID } })
    .then((user) => {
      return { ...user.dataValues, passwordHash: null, cages: user.getCages() };
    })
    .catch((err) => {
      throw err;
    });
};

app.use(bodyParser.json());

app.use(
  '/graphql',
  graphQlHttp({
    schema: buildSchema(`
      type Cage {
        id: ID!
        genotype: String!
        cageNumber: String!
        supervisor: User!
      }

      type User {
        id: ID!
        firstName: String!
        lastName: String!
        email: String!
        passwordHash: String
        cages: [Cage!]!
      }

      input CageInput {
        genotype: String!
        cageNumber: String!
      }

      input UserInput {
        firstName: String!
        lastName: String!
        email: String!
        passwordHash: String!
      }

      type RootQuery {
        cages: [Cage!]!
      }

      type RootMutation {
        createCage(cageInput: CageInput): Cage
        createUser(userInput: UserInput): User
      }

      schema {
        query: RootQuery
        mutation: RootMutation
      }
    `),
    rootValue: {
      cages: () => {
        return Cage.findAll()
          .then((resp) => resp)
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
    },
  }),
);


app.listen(3001, () => {
  console.log('listening on port 3001');
});

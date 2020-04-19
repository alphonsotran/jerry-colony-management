const express = require('express');
const bodyParser = require('body-parser');
const graphQlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const Cage = require('./db/models').Cage;

const app = express();

app.use(bodyParser.json());

app.use(
  '/graphql',
  graphQlHttp({
    schema: buildSchema(`
      type Cage {
        id: ID!
        genotype: String!
        cageNumber: String!
      }


      input CageInput {
        genotype: String!
        cageNumber: String!
      }


      type RootQuery {
        cages: [Cage!]!
      }

      type RootMutation {
        createCage(cageInput: CageInput): Cage
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
        })
          .then((resp) => resp)
          .catch((err) => {
            console.log('Unable to create cages: ', err);
            throw err;
          });
      },
    },
  }),
);


app.listen(3001, () => {
  console.log('listening on port 3001');
});

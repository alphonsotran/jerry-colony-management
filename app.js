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

      type RootQuery {
        cages: [Cage!]!
      }

    rootValue: {
      cages: () => {
        return Cage.findAll()
          .then((resp) => resp)
          .catch((err) => {
            console.log('Unable to fetch cages: ', err);
            throw err;
          });
      },
    },
  }),
);


app.listen(3001, () => {
  console.log('listening on port 3001');
});

const express = require('express');
const bodyParser = require('body-parser');
const graphQlHttp = require('express-graphql');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');

const app = express();

app.use(bodyParser.json());

app.use(
  '/graphql',
  graphQlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
  }),
);

app.listen(3001, () => {
  console.log('listening on port 3001');
});

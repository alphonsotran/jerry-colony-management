const { buildSchema } = require('graphql');

module.exports = buildSchema(`
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
`);

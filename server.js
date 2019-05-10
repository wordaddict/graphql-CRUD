const express = require('express');
const {
  graphqlExpress,
  graphiqlExpress,
} = require('graphql-server-express');
const bodyParser = require('body-parser');

const schema = require('./src/schema');

const PORT = 8080;
const server = express();
const app = express();

server.use('/graphql', bodyParser.json(), graphqlExpress({
  schema
}));

server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));

server.listen(PORT);
console.log('GraphQL API Server up and running at localhost:' + PORT);
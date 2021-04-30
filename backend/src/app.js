const express = require('express');
const graphqlHttp = require('express-graphql').graphqlHTTP;
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');

const app = express();

app.use(express.json());

app.use('/graphql',
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
)

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.7bfyu.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
).then(() => {
    app.listen(3333, () => {
      console.log('Server started on port 3333.')
    });
  }).catch(err => {
    console.log(err);
  })

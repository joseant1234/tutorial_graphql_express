const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const { ApolloServer } = require('apollo-server-express');
// const { makeExecutableSchema } = require('graphql-tools');
const { merge } = require('lodash');

const courseTypeDefs = require('./types/course.types');
const courseResolvers = require('./resolvers/course.resolvers');
const userTypeDefs = require('./types/user.types');
const userResolvers = require('./resolvers/user.resolvers');
const auth = require('./libs/auth');

mongoose.connect('mongodb://localhost/graphql_db', { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

const typeDefs = `
    type Alert {
        message: String
    }

    type Query {
        _: Boolean
    }

    type Mutation {
        _: Boolean
    }
`;

const resolver = {};

// const schema = makeExecutableSchema({
//     typeDefs: [typeDefs, courseTypeDefs, userTypeDefs],
//     resolvers: merge(resolver, courseResolvers, userResolvers)
// });

// el contexto lo q permite compartir informacion entre las operaciones de graphql
const server = new ApolloServer({
    typeDefs: [typeDefs, courseTypeDefs, userTypeDefs],
    resolvers: merge(resolver, courseResolvers, userResolvers),
    context: auth,
})

// app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));
// endpoint a donde se envia las peticiones a procesar
// app.use("/graphiql", graphiqlExpress({ endpointURL: '/graphql' }));

server.applyMiddleware({ app });

app.listen(8080, () => {
    console.log('Server initialized');
});

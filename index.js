const express = require('express');
const { GraphQLSchema, GraphQLObjectType, GraphQLString, graphql } = require('graphql');

const app = express();

// definir el schema
// la funcion resolve indica como se debe responder cuando se solicite la prop message
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      message: {
        type: GraphQLString,
        resolve(){
          return "Hola"
        }
      }
    }
  })
});

app.get('/', function(req, res){
  // la funcion graphql permite realizar consultas al schema
  graphql(schema, ` { message } `).then(r => res.json(r)).catch(res.json);
})

app.listen(8080, function(){
  console.log('Run server');
});

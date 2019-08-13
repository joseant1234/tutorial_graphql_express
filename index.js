const express = require('express');
const { GraphQLSchema, GraphQLObject, GraphQLString } = require('graphql');

const app = express();

// definir el schema
// la funcion resolve indica como se debe responder cuando se solicite la prop message
const schema = new GraphQLSchema({
  query: new GraphQLObject({
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
})

app.get('/', function(req, res){
  res.send('Hola');
})

app.listen(8080, function(){
  console.log('Run server');
})

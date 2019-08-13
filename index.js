const express = require('express');
const { GraphQLSchema, GraphQLObjectType, GraphQLString, graphql, GraphQLInt } = require('graphql');

const app = express();

const courseType = new GraphQLObjectType({
  name: 'Course',
  fields: {
    title: { type: GraphQLString },
    views: { type: GraphQLInt }
  }
});

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
      },
      course: {
        type: courseType,
        resolve() {
          return { title: 'Course of GraphQL', views: 1850 };
        }
      }
    }
  })
});

app.get('/', function(req, res){
  // la funcion graphql permite realizar consultas al schema
  graphql(schema, ` { message, course{ title } } `).then(r => res.json(r)).catch(res.json);
})

app.listen(8080, function(){
  console.log('Run server');
});

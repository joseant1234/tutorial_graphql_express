const express = require('express');
// hay 2 formas de definir el schema, una es con objetos (como esta en index.js) y la ota manera es con el buildSchema
const { buildSchema } = require('graphql');

const app = express();

// el tipo ID de graphql hace referencia a un identificador ùnico, validando en una misma lista no halla varios objetos q tengan el mismo id
// el signo ! hace referencia a q esos campos son obligatorios
// el tipo Query son las consultas q se van hacer al servidor de graphql
const schema = buildSchema(`
  type Course {
    id: ID!
    title: String!
    views: Int
  }

  type Query {
    getCourses: [Course]
  }
`);

app.get('', function(req, res) {
  res.send('Hola')
});

app.listen(8080, function() {
  console.log('RUN SERVER');
});

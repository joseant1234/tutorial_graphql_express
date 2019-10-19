const express = require('express');
// hay 2 formas de definir el schema, una es con objetos (como esta en index.js) y la ota manera es con el buildSchema
const { buildSchema } = require('graphql');

const graphqlHTTP = require('express-graphql');

const courses = require('./courses');

const app = express();

// el tipo ID de graphql hace referencia a un identificador ùnico, validando en una misma lista no halla varios objetos q tengan el mismo id
// el signo ! hace referencia a q esos campos son obligatorios
// el tipo Query son las consultas q se van hacer al servidor de graphql
// schema definition language
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

// tiene q tener el mismo nombre de la consulta en el tipo query para poder realizar bien los resolve
const root = {
  getCourses(){
    return courses;
  }
}

app.get('', function(req, res) {
  res.json(courses);
});

// graphiql es una interfaz gráfica para poder realizar consultas de graphql al servidor de graphql
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
}));

app.listen(8080, function() {
  console.log('RUN SERVER');
});

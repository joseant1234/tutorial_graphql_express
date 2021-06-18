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
// paréntesis se colocan en la query si tienen algun argumento
const schema = buildSchema(`
  type Course {
    id: ID!
    title: String!
    views: Int
  }

  type Query {
    getCourses: [Course]
    getCourse(id: ID!): Course
  }

  type Mutation {
    addCourse(title: String!, views: Int): Course
    updateCourse(id: ID!, title: String!, views: Int): Course
  }
`);

// tiene q tener el mismo nombre de la consulta en el tipo query para poder resolver
const root = {
  getCourses(){
    return courses;
  },
  getCourse({id}){
    console.log(id);
    return courses.find((course)=> id == course.id);
  },
  addCourse({title, views}) {
    const id = String(courses.length + 1);
    const course = { id, title, views };
    courses.push(course);
    return course;
  },
  updateCourse({id, title, views}) {
    const courseIndex = courses.findIndex(course => course.id === id);
    const course = courses[courseIndex];
    const newCourse = Object.assign(course, { title, views });
    courses[courseIndex] = newCourse;
    return newCourse;
  }
}

app.get('', function(req, res) {
  res.json(courses);
});

// graphiql es una interfaz gráfica para poder realizar consultas de graphql al servidor de graphql
// como no se indica la forma de resolver, es permitido pasar un rootValue con funciones q sean iguales q las de las consultas
// el proposito del rootValue es de servir como valor inicial a la resolución de cualquier consulta en graphql
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
}));

app.listen(8080, function() {
  console.log('RUN SERVER');
});

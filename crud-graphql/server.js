const express = require('express');
// hay 2 formas de definir el schema, una es con objetos (como esta en index.js) y la ota manera es con el buildSchema
const { buildSchema } = require('graphql');

const graphqlHTTP = require('express-graphql');

let courses = require('./courses');

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

  type Alert {
    message: String
  }

  input CourseInput {
    title: String!
    views: Int
  }

  type Query {
    getCourses(page: Int, limit: Int = 1): [Course]
    getCourse(id: ID!): Course
  }

  type Mutation {
    addCourse(input: CourseInput): Course
    updateCourse(id: ID!, input: CourseInput): Course
    deleteCourse(id: ID!): Alert
  }
`);

// tiene q tener el mismo nombre de la consulta en el tipo query para poder resolver
const root = {
  getCourses({page, limit}){
    if (page) {
      // si comienza en 0 la página
      // return courses.slice(page * limit, (page + 1) * limit)
      // si comienza en 1 la página
      return courses.slice((page - 1) * limit, (page) * limit)
    }
    return courses;
  },
  getCourse({id}){
    console.log(id);
    return courses.find((course)=> id == course.id);
  },
  addCourse({input}) {
    // const { title, views } = input;
    const id = String(courses.length + 1);
    const course = { id, ...input };
    courses.push(course);
    return course;
  },
  updateCourse({id, input}) {
    const { title, views } = input;
    const courseIndex = courses.findIndex(course => course.id === id);
    const course = courses[courseIndex];
    const newCourse = Object.assign(course, { title, views });
    courses[courseIndex] = newCourse;
    return newCourse;
  },
  deleteCourse({id}) {
    courses = courses.filter(course => course.id !== id);
    return {
      message: 'The course was deleted',
    }
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

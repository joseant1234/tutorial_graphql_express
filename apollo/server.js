const { ApolloServer } = require('apollo-server');
const { makeExecutableSchema } = require('graphql-tools');

const courses = require('./courses');

const typeDefs =  `
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
`;

// obtener el schema
// el primer parámetro del query es valor que resolvió el resolver padre, si no hay parent es el rootValue (valores iniciales)
// el segundo parámetro es el valor que se envía al query
// el tercer parámetro es un contexto para el resolver

const resolvers = {
    Query: {
        getCourses(obj, { page, limit }) {
            if (page) {
                return courses.slice((page - 1) * limit, (page) * limit)
            }
            return courses;
        },
        getCourse(obj, { id }) {
            return courses.find((course)=> id == course.id);
        },
    },
    Mutation: {
        addCourse(obj, { input }) {
            const id = String(courses.length + 1);
            const course = { id, ...input };
            courses.push(course);
            return course;
        },
        updateCourse(obj, { id, input }) {
            const { title, views } = input;
            const courseIndex = courses.findIndex(course => course.id === id);
            const course = courses[courseIndex];
            const newCourse = Object.assign(course, { title, views });
            courses[courseIndex] = newCourse;
            return newCourse;
        },
        deleteCourse(obj, { id }) {
            courses = courses.filter(course => course.id !== id);
            return {
                message: 'The course was deleted',
            };
        },
    }
}
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
})

const server = new ApolloServer({
    schema
});

server.listen().then(({url}) => {
    console.log(`Servidor initialized in ${url}`);
});

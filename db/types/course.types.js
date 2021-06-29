// se use el extend para evitar el problema de que solo puede haber un tipo query, ....
// con el extend se puede modularizar los tipos
module.exports = `
    type Course {
        id: ID!
        title: String!
        views: Int
        user: User
    }

    input CourseInput {
        title: String
        views: Int
    }

    extend type Query {
        getCourses(page: Int, limit: Int = 1): [Course]
        getCourse(id: ID!): Course
    }

    extend type Mutation {
        addCourse(input: CourseInput, user: ID!): Course
        updateCourse(id: ID!, input: CourseInput): Course
        deleteCourse(id: ID!): Alert
    }
`;

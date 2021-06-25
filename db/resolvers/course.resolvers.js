const Course = require('../models/course');

module.exports = {
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
        async addCourse(obj, { input }) {
            const course = new Course(input);
            await course.save();
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

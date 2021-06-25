const Course = require('../models/course');

module.exports = {
    Query: {
        async getCourses(obj, { page, limit }) {
            const courses = await Course.find();
            return courses;
        },
        async getCourse(obj, { id }) {
            const course = await Course.findById(id);
            return course;
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

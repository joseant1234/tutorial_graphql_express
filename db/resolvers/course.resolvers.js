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
        async updateCourse(obj, { id, input }) {
            const course = await Course.findByIdAndUpdate(id, input);
            return course;
        },
        async deleteCourse(obj, { id }) {
            course = await Course.deleteOne({ _id: id });
            return {
                message: 'The course was deleted',
            };
        },
    }
}

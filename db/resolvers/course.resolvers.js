const Course = require('../models/course');
const User = require('../models/user');

module.exports = {
    Query: {
        async getCourses(obj, { page, limit }) {
            // el metodo populate ('nombreRelación')
            // lo q hace es reemplazar el campo user con solo el id que hace referencia al documento por el documento al q esta referenciado
            let courses = Course.find().populate('user');
            if (page) {
                courses = courses.limit(limit).skip((page - 1) * limit);
            }
            return await courses;
        },
        async getCourse(obj, { id }) {
            const course = await Course.findById(id);
            return course;
        },
    },
    Mutation: {
        async addCourse(obj, { input, user }) {
            const userFound = await User.findById(user);
            const course = new Course({ ...input, user });
            await course.save();
            userFound.courses.push(course);
            await userFound.save();
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

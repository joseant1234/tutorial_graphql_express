const courses = [];

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

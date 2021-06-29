const User = require('../models/user');
const Course = require('../models/course');

// la prop 'User' hace referencia al User type. Se intenta resolver la estructura User
// se puede agregar resolvers por subcampos (como courses).
// courses hace referencia a la propiedad en user type
module.exports = {
    Query: {
        async getUsers() {
            return await User.find().populate('courses');
        },
        async getUser(obj, { id }) {
            return await User.findById(id);
        },
    },
    Mutation: {
        async signUp(obj, { input }) {
            const user = new User(input);
            await user.save();
            return user;
        }
    },
    User: {
        async courses(u) {
            // el parámetro 'u' es de la resolución del padre. El primer objeto es lo q resolvió el padre
            // en la estructura User, el padre del subcampo courses es User, por tanto se obtiene lo q resolvió con sus propiedades como (id, email, hashedPassword, ...)
            return await Course.find({ user: u.id })
        }
    }
}

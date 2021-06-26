const mongoose = require('mongoose');

// la prop ObjectId indica q ese campo es el indentificador en un documento que está en otro colección (user)
const courseSchema = new mongoose.Schema({
    title: String,
    views: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
});

module.exports = mongoose.model('Course', courseSchema);

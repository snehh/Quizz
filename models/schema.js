const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    username: {
        type: String, 
        unique: true,
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    date: {
        type: String, 
        default: new Date()
    },
    correct: {
        type: Number,
        default: 0
    },
    wrong: {
        type: Number,
        default: 0
    },
    quizno: {
        type: Number,
        default: 0
    }
});

const AdminQuizSchema = new mongoose.Schema({
    category: {
        type: String
    },
    name: String,
    template: [{
        difficulty: {
            type: String,
            default: "easy"
        },
        question: [{
            q: {
                type: String
            },
            a: {
                type: [String]
            },
            correct: {
                type: String
            }
        }]

    }],
    
})

const UserQuizSchema = new mongoose.Schema({
    title: String,
    createdBy: String,
    tags: [String],
    createdOn:{
        type: String, 
        default: new Date()
    },
    questions: [{
        q: String,
        a1: String,
        a2: String,
        a3: String,
        a4: String,
        correct: String
    }]
})

const TagsSchema = new mongoose.Schema({
    tagname: String
})

const User = mongoose.model('User', UserSchema);
const AdminQuiz = mongoose.model('AdminQuiz', AdminQuizSchema);
const UserQuiz = mongoose.model('UserQuiz', UserQuizSchema)
const Tags = mongoose.model('Tags', TagsSchema)

module.exports = {
    User,
    AdminQuiz,
    UserQuiz,
    Tags
}
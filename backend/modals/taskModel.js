const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    },

    completed: {
        type: Boolean,
        default:false
    },

    project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "project"
    },
    
    createdAt: {
        type: Date,
       default:Date.now
    }
});

const Task = mongoose.model('task', TaskSchema)

module.exports = Task;
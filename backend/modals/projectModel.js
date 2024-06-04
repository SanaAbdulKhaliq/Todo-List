const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        requierd: true
    },
    
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        requierd: true
    },

    color: {
        type: String,
        required: true
    },
    
    createdAt: {
        type: Date,
       default:Date.now
    },

    completed: {
        type: Boolean,
        default:false
    }
})

const Project = mongoose.model('project', ProjectSchema)

module.exports = Project;
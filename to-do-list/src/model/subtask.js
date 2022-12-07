const mongoose = require('mongoose')

const subtaskSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true,
        trim : true
    },
    isComplete:{
        type : Boolean,
        default : false
    },
    task:{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'Task'
    }
}, {timestamps : true})

const Subtask = mongoose.model('Subtask', subtaskSchema)

module.exports = Subtask
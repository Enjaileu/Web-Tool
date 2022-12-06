const mongoose = require('mongoose')
const validator = require('validator')

const taskSchema = mongoose.Schema({
    name:{
        type : String,
        required : true,
        trim : true
    },
    description:{
        type : String,
        trim : true,
        default : ""
    },
    nbSubTask:{
        type : Number,
        default : 0
    },
    percentAchieved:{
        type : Number,
        default : 0
    },
    isComplete:{
        type : Boolean,
        default : false
    },
    owner:{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    }
}, {timestamps : true})

const Task = mongoose.model('Task', taskSchema)
module.exports = Task
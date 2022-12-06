const mongoose = require('mongoose')
const validator = require('validator')

const Task = mongoose.model('Task',{
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
    }
})

module.exports = Task
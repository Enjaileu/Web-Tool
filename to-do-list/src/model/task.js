const mongoose = require('mongoose')

const Task = mongoose.model('Task',{
    name:{
        type : String,
        required : true
    },
    nbSubtask:{
        type : Number,
        validate(value){
            if(value < 0){
                throw new Error('nbSubtask has to be strictly positive')
            }
        }
    },
    percentAchieved:{
        type : Number,
        validate(value){
            if(value < 0 && value > 100){
                throw new Error('percentAchieved has to be between 0 and 100')
            }
        }  
    },
    isComplete:{
        type : Boolean
    }
})

module.exports = Task
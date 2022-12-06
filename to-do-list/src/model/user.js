const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true,
        trim : true
    },
    mail : {
        type : String,
        required : true,
        trim : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email adress is not valid')
            }
        }
    },
    passeword : {
        type : String,
        required : true
    }
}, {timestamps : true})
/*
userSchema.virtual('tasks', {
    ref: 'Task',
    localField : '_id',
    foreignField : 'owner'
})*/

const User = mongoose.model('User', userSchema)

module.exports = User
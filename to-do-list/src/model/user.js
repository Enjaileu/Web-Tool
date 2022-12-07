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
        required : true,
        validate(value){
            if(value.lenght < 8){
                throw new Error('Your passeword need to be at least 8 characters long')
            }
        }
    }
}, {timestamps : true})

const User = mongoose.model('User', userSchema)

module.exports = User
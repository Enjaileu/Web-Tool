const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User',{
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
})

module.exports = User
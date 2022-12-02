const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User',{
    name:{
        type : String,
        required : true
    },
    mail:{
        type : String,
        required : true,
        validate(value){
            if(validator.isEmail(value) == false){
                throw new Error('mail is not formate like a mail adress')
            }
        }    
    },
    passeword:{
        type:String,
        required : true,
        validate(value){
            if(value.length < 8){
                throw new Error("The passeword must be at least 8 characters long.")
            }
        }
    }
})

module.exports = User
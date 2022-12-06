const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/to-do-list',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

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

const user = User({
    name : "Angèle",
    mail : "a.ngele@mail.fr",
    passeword : "motdepasse"
})

user.save().then(()=>{
    console.log(user)
}).catch((error)=>{
    console.log(error)
})
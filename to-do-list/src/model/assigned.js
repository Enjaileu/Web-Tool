const mongoose = require('mongoose')

const assignedSchema = mongoose.Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    task:{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'Task'
    }
}, {timestamps : true})

const Assigned = mongoose.model('Assigned', assignedSchema)
module.exports = Assigned
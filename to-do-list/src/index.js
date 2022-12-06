const express = require('express')
require('../db/mongoose')
const app = express();
const port = process.envPORT || 3000

app.use(express.json())

// ROUTES
const userRouter = require('./routes/user')
app.use(userRouter)
const taskRouter = require('./routes/task')
app.use(taskRouter)

// SCHEMA
/*
const Task = require('./model/task')
const testT2U = async()=>{
    const task = await Task.findById('638f4eef894c0debbb52f6ef')
    await task.populate('owner')
    console.log(task.owner)
}
//testT2U()

const User = require('./model/user')
const testU2T = async ()=>{
    const user = User.findById('638f1335e82dd554f3e6632c')
    await user.populate('tasks')
    console.log(user.tasks)
}
testU2T()*/

// LISTEN
app.listen(port, ()=>{
    console.log('Server is up on port ' + port)
})
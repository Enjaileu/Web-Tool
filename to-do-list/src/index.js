const express = require('express')
const User = require('./model/user')
const Task = require('./model/task')

const app = express()
const port = process.env.PORT || 3000

const userRouter = require('./routes/user')
app.use(userRouter)
const taskRouter = require('./routes/task')
app.use(taskRouter)

/// SERVER
app.listen(port, ()=>{
    console.log("Server is up on port" + port)
})
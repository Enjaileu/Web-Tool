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

// LISTEN
app.listen(port, ()=>{
    console.log('Server is up on port ' + port)
})
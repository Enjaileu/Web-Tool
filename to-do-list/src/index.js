const express = require('express')
require('../db/mongoose')
const User = require('./model/user')
const Task = require('./model/task')

const app = express();
const port = process.envPORT || 3000

app.use(express.json())

// USER
app.post('/users', (req, res)=>{
    const user =  User(req.body)
    user.save().then(()=>{
        res.status(202).send(user)
    }).catch((error)=>{
        res.status(400).send(error)
    })
})

// TASK
app.post('/tasks', (req, res)=>{
    const task =  Task(req.body)
    task.save().then(()=>{
        res.status(202).send(task)
    }).catch((error)=>{
        res.status(400).send(error)
    })
})

app.listen(port, ()=>{
    console.log('Server is up on port ' + port)
})
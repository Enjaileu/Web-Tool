const express = require('express')
require('../db/mongoose')
const User = require('./model/user')
const Task = require('./model/task')

const app = express();
const port = process.envPORT || 3000

app.use(express.json())

// USER
app.post('/users', async (req, res)=>{
    const user =  User(req.body)
    try{
        await user.save()
        res.status(202).send(user)
    }catch(error){
        res.status(400).send(error)
    }
})

app.get('/users', async (req, res)=>{
    try{
        const users = await User.find({})
        res.status(200).send(users)
    }catch(error){
        res.status(500).send(error)
    }
})

app.get('/users/:id', async(req, res)=>{
    const _id = req.params.id
    try{
        const user = await User.findById(_id)
        if(!user){
            return res.status(404).send()
        }
        res.status(200).send(user)
    }catch(error){
        res.status(500).send(error)
    }
})

// TASK
app.post('/tasks', async (req, res)=>{
    const task =  Task(req.body)
    try{
        await task.save()
        res.status(202).send(task)
    }catch(error){
        res.status(400).send(error)
    }
})

app.get('/tasks', async (req, res)=>{
    try{
        const tasks = await Task.find({})
        res.status(200).send(tasks)
    }catch(error){
        res.status(500).send(error)
    }
})

app.listen(port, ()=>{
    console.log('Server is up on port ' + port)
})
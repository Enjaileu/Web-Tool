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

app.patch('/users/:id', async(req, res)=>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
        if(!user){
            return res.status(404).send("User not found")
        }
        res.send(user)
    }catch(error){
        res.status(400).send(error)
    }
})

app.delete('/users/:id', async(req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(404).send("User not found")
        }
        res.send(user)
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

app.get('/tasks/:id', async(req, res)=>{
    const _id = req.params.id
    try{
        const task = await Task.findById(_id)
        if(!task){
            return res.status(404).send()
        }
        res.status(200).send(task)
    }catch(error){
        res.status(500).send(error)
    }
})

app.patch('/tasks/:id', async(req, res)=>{
    try{
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
        if(!task){
            return res.status(404).send("User not found")
        }
        res.send(task)
    }catch(error){
        res.status(400).send(error)
    }
})

app.delete('/tasks/:id', async(req,res)=>{
    try{
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task){
            return res.status(404).send("Task not found")
        }
        res.send(task)
    }catch(error){
        res.status(500).send(error)
    }
})

// LISTEN

app.listen(port, ()=>{
    console.log('Server is up on port ' + port)
})
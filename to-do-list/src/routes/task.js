const express = require('express')
const router = new express.Router()
const Task = require('../model/task')


// TASK
router.post('/tasks', async (req, res)=>{
    const task =  Task(req.body)
    try{
        await task.save()
        res.status(202).send(task)
    }catch(error){
        res.status(400).send(error)
    }
})

router.get('/tasks', async (req, res)=>{
    try{
        const completedQuery = req.query.isCompleted
        console.log(completedQuery)
        let tasks = []
        if(completedQuery){
            tasks = await Task.find({isComplete : completedQuery})
        }else{
            tasks = await Task.find({})
        }
        res.status(200).send(tasks)
    }catch(error){
        res.status(500).send(error)
    }
})

router.get('/tasks/:id', async(req, res)=>{
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

router.patch('/tasks/:id', async(req, res)=>{
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

router.delete('/tasks/:id', async(req,res)=>{
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


module.exports = router
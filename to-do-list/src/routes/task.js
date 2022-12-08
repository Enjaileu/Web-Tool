const express = require('express')
const router = new express.Router()
const Task = require('../model/task')
const Assigned = require('../model/assigned')


// Create a task assigned to the id user
router.post('/tasks/:id', async (req, res)=>{
    const task =  Task(req.body)
    try{
        // save task
        await task.save()
        // create document in database "assigneds"
        t_id = task._id
        const assigned = Assigned({user:req.params.id, task:t_id})
        await assigned.save()
        res.status(202).send(task)
    }catch(error){
        res.status(400).send(error)
    }
})

// get all the documents in database "tasks"
// if query "user", we get all te tasks assigned to the user
router.get('/tasks', async (req, res)=>{
    try{
        const user_id = req.query.user
        let tasks = []
        if(user_id){
            const assigned = await Assigned.find({user : user_id})
            for(let counter = 0; counter < assigned.length; counter++){
                const assigned = assigned[counter]
                await assigned.populate('task')
                tasks[counter] = assigned.task
            }
        }else{
            tasks = await Task.find({})
        }
        res.status(200).send(tasks)
    }catch(error){
        res.status(500).send(error)
    }
})

// get a document by id in database "tasks"
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

// modify a document by id in database "tasks"
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

// a user (id in req.body) want to be removed from a task(id in route)
// if the User is the only one assigned to this Task : the Task is deleted and the document in database "assigneds" associated is deleted too
// if there are other User assigned to this Task : the document associated in database "assigneds" is delete but not the Task
router.delete('/tasks/:id', async(req,res)=>{
    const user_id = req.body.user
    const assigned = await Assigned.find({task:req.params.id})
    try{
        // if there are other User assigned to the Task 
        if(assigned.length > 1){
            // delete document in database "assigneds"
            const task = await Assigned.findOneAndDelete({$and : [{user:user_id}, {task:req.params.id}]})
            if(!task){
                return res.status(404).send("Task not found")
            }
            return res.status(202).send(task)
        }
        // if the User is the only one assigned to the Task 
        else{
            // delete document in database "assigneds"
            const assigned = await Assigned.findOneAndDelete({$and : [{user:user_id}, {task:req.params.id}]})
            if(!assigned){
                return res.status(404).send("This task is not assigned to this user")
            }else{
                // delete document in database "taks"
                const task = await Task.findByIdAndDelete(req.params.id)
                if(!task){
                    return res.status(404).send("Task not found")
                }
            }
            return res.status(202).send()
        }
    }catch(error){
        res.status(500).send(error)
    }
})


module.exports = router
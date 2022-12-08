const express = require('express')
const router = new express.Router()
const Subtask = require('../model/subtask')
const Task = require('../model/task')

// ROUTES

// Create a document in database "subtasks"
// :id -> task id, error 404 if the task doesn't exist
// update the task associated accordingly
router.post('/subtasks/:id', async (req, res)=>{
    task_id = req.params.id
    try{
        // find the task
        const task = await Task.findById(task_id)
        // if the task doesn't exist
        if(!task){
            return res.status(404).send("Task not found")
        }

        // if the task exist
        // create subtask
        const infos = req.body
        infos.task = task_id
        const subtask = Subtask(infos)
        await subtask.save()
        // update Task
        updateTask(task, 1)
        // send response
        res.status(202).send(subtask)
    }catch(error){
        res.status(500).send(error)
    }
})

// get all the documents in database "subtasks"
// if query "task", get all the subtasks assigned to the task
router.get('/subtasks', async (req, res)=>{
    try{
        const task_id = req.query.task
        console.log(task_id)
        let subs = []
        if(task_id){
            subs = await Subtask.find({task:task_id})
        }else{
            subs = await Subtask.find({})
        }
        res.status(202).send(subs)
    }catch(error){
        res.status(500).send(error)
    }
})

// Delete a document in database "substasks"
// :id -> substask id
// update the task associated accordingly
router.delete('/subtasks/:id', async (req, res) =>{
    const _id = req.params.id
    try{
        const sub = await Subtask.findByIdAndDelete(_id)
        // if substask doesn't exist
        if(!sub){
            return res.status(404).send("Subtask not found")
        }
        // if substask exist
        // update task
        const task = await Task.findById(sub.task)
        updateTask(task, -1)
        //send response
        res.status(202).send(sub)

    }catch(error){
        res.status(500).send(error)
    }
})

// FUNCTION
async function updateTask(task, count){
    // new nbSubtask
    const newNb = task.nbSubTask + count
    // new percentAchieved
    const subtasks = await Subtask.find({task:task._id})
    let complete = 0
    for(let counter = 0; counter < subtasks.length; counter++){
        if(subtasks[counter].isComplete == true){
            complete++
        }
    }
    const percent = complete/newNb * 100

    //update
    await Task.updateOne({_id:task._id, percentAchieved:percent}, {nbSubTask:newNb})
}

module.exports = router
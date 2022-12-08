const express = require('express')
const router = new express.Router()
const Subtask = require('../model/subtask')
const Task = require('../model/task')

// Create a document in database "subtasks"
// :id -> task id, error 404 if the task doesn't exist
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
        const infos = req.body
        infos.task = task_id
        const subtask = Subtask(infos)
        await subtask.save()
        res.status(202).send(subtask)
    }catch(error){
        res.status(500).send(error)
    }
})

module.exports = router
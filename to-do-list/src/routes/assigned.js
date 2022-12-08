const express = require('express')
const router = new express.Router()
const Assigned = require('../model/assigned')
const User = require('../model/user')
const Task = require('../model/task')

// assigns a user to a task -> create a new document in database "assigneds"
router.post('/assigned', async (req, res)=>{
    // verify if user and task exist
    const user = User.findById(req.body.user)
    if(!user){
        return res.status(404).send("User not found")
    }
    const task = Task.findById(req.body.task)
    if(!task){
        return res.status(404).send('Task not found')
    }
    // create assigned
    const assigned =  Assigned(req.body)
    try{
        const assignedTest = await Assigned.find({$and: [{user:req.body.user}, {task:req.body.task}]})
        if(assignedTest.length != 0){
            return res.status(420).send("This user is already assigned to this task")
        }
        await assigned.save()
        res.status(202).send(assigned)
    }catch(error){
        res.status(400).send(error)
    }
})

module.exports = router

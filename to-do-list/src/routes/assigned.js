const express = require('express')
const router = new express.Router()
const Assigned = require('../model/assigned')
const User = require('../model/user')
const Task = require('../model/task')

// assigned a user to a task -> create a new document in database "assigneds"
router.post('/assigned', async (req, res)=>{
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

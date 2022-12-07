const express = require('express')
const router = new express.Router()
const Subtask = require('../model/subtask')
const Task = require('../model/task')

router.post('/subtasks/:id', async (req, res)=>{
    try{
        const infos = req.body
        infos.task = req.params.id
        const subtask = Subtask(infos)
        await subtask.save()
        res.status(202).send(subtask)
    }catch(error){
        res.status(500).send(error)
    }
})

module.exports = router
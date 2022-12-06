const express = require('express')
const router = new express.Router()
const User = require('../model/user')

router.post('/users', async (req, res)=>{
    const user =  User(req.body)
    try{
        await user.save()
        res.status(202).send(user)
    }catch(error){
        res.status(400).send(error)
    }
})

router.get('/users', async (req, res)=>{
    try{
        const users = await User.find({})
        res.status(200).send(users)
    }catch(error){
        res.status(500).send(error)
    }
})

router.get('/users/:id', async(req, res)=>{
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

router.patch('/users/:id', async(req, res)=>{
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

router.delete('/users/:id', async(req,res)=>{
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

module.exports = router
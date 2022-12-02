const express = require('express')
const router = new express.Router()
const User = require('../model/user')
const validator = require('validator')

router.use(express.json())

/// USERS
router.post('/users', async (req, res)=>{
    const infos = req.body
    if(infos.passeword.length < 8){
        res.status(400).send("Your passeword need to be at least 8 characters long.")
    }
    else if(!validator.isEmail(infos.mail)){
        res.status(400).send("Mail adress is wrong.")
    }
    const test = User.find({mail:infos.mail})

    const user = User(req.body)
    try{
        await user.save()
        res.status(202).send(user)
    }catch(error){
        res.status(400).send(error)
    }
})

router.get('/users', async (req,res)=>{
    try{
        const users = await User.find({})
        res.status(200).send(users)
    }catch(error){
        res.status(500).send(error)
    }
})

router.get('/users/:id', async (req,res)=>{
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

router.patch('/users/:id', async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name", "mail", "password"]
    const isValid = updates.every(update=> allowedUpdates.includes(update))
    if(!isValid){
        res.status(400).send("Key to update are not allowed")
    }

    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
        if(!user){
            return res.status(404).send()
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
            return res.status(404).send()
        }
        res.send(user)
    }catch(error){
        res.status(500).send()
    }
})

module.exports = router
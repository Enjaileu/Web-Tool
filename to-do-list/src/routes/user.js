const express = require('express')
const router = new express.Router()
const User = require('../model/user')

// create a document user in database "users"
// return error if mail already exist in the database "user" -> it means the user already exists
router.post('/users', async (req, res)=>{
    const user =  User(req.body)
    try{
        const userTry = await User.find({mail : user.mail})
        if(userTry.length == 0){
            await user.save()
            return res.status(202).send(user)
        }
        res.status(420).send("mail already exist")
    }catch(error){
        res.status(400).send(error)
    }
})

// get the list of documents in database "users"
router.get('/users', async (req, res)=>{
    try{
        const users = await User.find({})
        res.status(200).send(users)
    }catch(error){
        res.status(500).send(error)
    }
})

// get a document by id in database "users"
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

// modify a document by id in database "users"
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

// delete a document by id in database "users"
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
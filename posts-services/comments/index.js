const express = require('express')
const bodyParser = require('body-parser')
const { randomByte } = require('crypto')
const cors = require('cors') // to make back-end discuss together with bug
const axios = require('axios')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extented: true}))
app.use(cors())

const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res)=>{
    res.send(commentsByPostId[req.params.id]||[])
})

app.post('/post/:id/comments', (req,res)=>{
    const commentId = randomBytes(4).toString('hex')
    const {content} = req.body

    const comments = commentsByPostIds[req.params.id]||[]
    comments.push({id:commentId, content})
    commentsByPostIds[req.params.id] = comments
    res.status(201).send(comments)
})

app.listen(4001, ()=>{
    console.log('Comments server listening on 4001')
})
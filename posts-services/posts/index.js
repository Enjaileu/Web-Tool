const express = require('express')
const bodyParser = require('body-parser')
const { randomByte } = require('crypto')
const cors = require('cors') // to make back-end discuss together with bug
const axios = require('axios')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extented: true}))
app.use(cors())

const posts = {}

app.get('/post', (req, res) => {
    res.send(posts)
})

app.post('/posts', (req, res)=>{
    const id = randomBytes(4).toString('hex')
    const {title} = req.body

    posts[id] = {id, title}

    res.status(201).send(post[id])
})

app.listen(4000, ()=>{
    console.log('Post server listening on 4000')
})

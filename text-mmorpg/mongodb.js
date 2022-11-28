const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'text-mmorpg'

MongoClient.connect(connectionURL, {useNewUrlParser:true}, (error, client)=>{
    if(error){
        return console.log('Unable to connect to database')
    }
    console.log("Connected to MongoDb")
    const db = client.db(databaseName)
    /*db.collection('avatars').insertMany([
        {
            name:"Angèle",
            level:23,
            acceptPvp:true
        },
        {
            name:"Pierre",
            level:20,
            acceptPvp:true
        },
        {
            name:"Marilou",
            level:15,
            acceptPvp:false
        }
    ])*/
    //db.collection('avatars').find({acceptPvp:true}).toArray((error, avatars)=>{console.log(avatars)})
    db.collection('avatars').find({acceptPvp:true}).countDocuments((error,count)=>{console.log(count)})
})
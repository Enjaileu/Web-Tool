const yargs = require('yargs')
const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'to-do-list'
let currentUser = null

yargs.command(
    'createUser', 
    "Create a new user in the database",
    {
        name : {describe : "User name", demandOption: true, type:'string'},
        mail : {describe : "User mail", demandOption: true, type:'string'},
        passeword : {describe : "User passeword", demandOption: true, type:'string'}
    },

    (argv)=>{
        MongoClient.connect(connectionURL, {useNewUrlParser:true}, (error, client)=>
        {
            if(error){
                return console.log('Unable to connect to database')
            }
            const db = client.db(databaseName)
            db.collection('User').find({mail:argv.mail}).toArray((error, user)=>{
                if(user){
                    console.log("A user already exists with this email address")
                }
                else{
                    db.collection("User").insertOne({
                        name : argv.name,
                        mail : argv.mail,
                        passeword : argv.passeword
                    })
                }
            })
        })
    }
);

yargs.command(
    'connect', 
    "Log in to the app as an user",
    {
        mail : {describe : "User mail", demandOption: true, type:'string'},
        passeword : {describe : "User passeword", demandOption: true, type:'string'}
    },
    (argv)=>{
        MongoClient.connect(connectionURL, {useNewUrlParser:true}, (error, client)=>
        {
            if(error){
                return console.log('Unable to connect to database')
            }
            if(currentUser){
                console.log("Wrong mail adress or password")
            }
            const db = client.db(databaseName)
            db.collection('User').find({mail:argv.mail, passeword:argv.passeword}).toArray((error, user)=>{
                if(user){
                    currentUser = user[0]
                    return console.log("You are log as " + currentUser.name)
                }
            })
        })
    }
)

yargs.command(
    "create-task",
    "Create a new task",
    {
        name : {describe : "Task name", demandOption: true, type:"string"}
    },
    (argv)=>{
        MongoClient.connect(connectionURL, {useNewUrlParser:true}, (error, client)=>{
            if(error){
                return console.log('Unable to connect to database')
            }
            db.collection("Task").insertOne({
                name : argv.name,
                isComplete : false,
                nbSubstask : 0,
                percentAchieved : 0
            })
            // assigned??
        })
    }
)

yargs.parse()
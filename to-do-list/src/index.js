const express = require('express')
require('../db/mongoose')
const app = express();
const port = process.envPORT || 3000

app.use(express.json())

// EXPLAIN APP
/*
- Users can be created and deleted
- A User can create a Task
- A User can create a Subtask to a Task
- A User can assigned another User to a Task
- A User can get the Tasks list it is assigned to
- A User can get the Subtasks list of a Task it is assigned to
- A User can set as complete a Task it is assign to if this task has no Subtask
- A User can set as complete a Subtask of a Task it is assigned to
*/

// ROUTES
const userRouter = require('./routes/user')
app.use(userRouter)
const taskRouter = require('./routes/task')
app.use(taskRouter)
const subtaskRouter = require('./routes/subtask')
app.use(subtaskRouter)
const assignedRouter = require('./routes/assigned')
app.use(assignedRouter)

// LISTEN
app.listen(port, ()=>{
    console.log('Server is up on port ' + port)
})
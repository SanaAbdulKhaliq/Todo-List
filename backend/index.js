const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config();


const app = express();
app.use(cors())
app.use(express.json());



const TaskRoute = require('./routes/TaskRoute');
const ProjectRoute = require('./routes/ProjectRoute')
const UserRoute = require ('./routes/UserRoute')

const Task = require('./modals/taskModel');
const Project = require('./modals/projectModel')
const User = require('./modals/userModel')

app.use('/task', TaskRoute);
app.use('/project', ProjectRoute)
app.use('/user', UserRoute);

//mongodb://localhost:27017/

mongoose.connect('mongodb://127.0.0.1:27017/TodoList')
.then(async() => {
    console.log('MongoDB is connected');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });


app.listen(3000, () => {
    console.log('Server is listening on port 3000');
})
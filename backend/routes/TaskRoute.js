const express = require('express');
const router = express.Router();

const Task = require('../modals/taskModel');

router.get('/task', async(req, res) => {
    try{
        // console.log(req.query);
        const task = await Task.find({user: req.query.userId});
        res.json(task);
    } catch(err) {
        res.status(500).json({message:err.message});
    }
    // res.send('getting all the tasks')
});

router.post('/task/date', async (req, res) => {
    try {
        console.log("-->>", req.body.date);
        // Assuming req.body.date is in the format 'YYYY-MM-DD'
        const date = new Date(req.body.date);
        // Find tasks where the date matches the specified date
        const task = await Task.find({ date: date.toISOString().split('T')[0] });
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/create_task', async(req, res) => {
  
    try{
        const { title, description, date, project_id, userId } = req.body;
        console.log(req?.body)
        const task = new Task({ title, description, date, project_id, user: userId });
        await task.save();
        res.status(201).json({task:task}); 
    } catch(err){
        console.log(err)
        res.status(500).json({ message:err.message })
    }
    // res.send('posting the task')
});

router.get('/task/:id', async(req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/task/get_all_by_project_id/:project_id', async(req, res) => {
    try {
        const task = await Task.find({ project_id: req.params.project_id });
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.patch('/task/:id', async(req, res) => {
    try {
        console.log(req?.body);
        const task = await Task.findByIdAndUpdate(req.params.id,{...req?.body});
        return res.status(200).json({message: 'Updated'})
    } catch (err) {
        console.log(err);
        res.status(500).json({message: err.message})
    }
});

router.delete('/task/:id', async(req, res) => {
    try{
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task){
            return res.status(404).json({message: 'Task not found'})
        }
        res.json(task)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
});

router.put('/task/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, { ...req.body });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router
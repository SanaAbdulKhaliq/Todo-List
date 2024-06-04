const express = require('express');
const router = express.Router();

const Project = require('../modals/projectModel');
const auth = require('../middleware/auth');

router.get('/project', async(req, res) => {
    try{
        // console.log(req.query)
        const project = await Project.find({user: req.query.userId});
        res.json(project)
    } catch (err) {
        console.log(err);
        res.status(500).json({message:err.message})
    }
});

router.post('/create_project', async(req, res) => {
    try{
        const { name, description, color, userId } = req.body;
        console.log(req?.body);
        const project = new Project({ name , description, color, user: userId });
        await project.save();
        res.status(201).json({project:project}); 
    } catch(err){
        console.log(err)
        res.status(500).json({ message:err.message })
    }
});

router.get('/project/:id', async(req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(project);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.patch('/project/:id', async(req, res) => {
    try{
        const project = await Project.findByIdAndUpdate(req.params.id,{...req?.body});
        if(!project){
            return res.status(404).json({message: 'Project not found'})
        }
        res.json(project)
    } catch (err) {
        res.status(500).json({message:err.message});
    }
});

router.delete('/project/:id', async(req, res) => {
    try{
        const project = await Project.findByIdAndDelete(req.params.id);
        if(!project){
            return res.status(404).json({message: 'Project not found'})
        }
        res.json(project)
    } catch (err) {
        res.status(500).json({message:err.message});
    }
})

module.exports = router;
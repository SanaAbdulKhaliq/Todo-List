const express = require('express')
const router = express.Router();
const {hashedPassword, hashPassword, comparePassword} = require('../helper/auth')
const jwt = require('jsonwebtoken');

const User = require('../modals/userModel');

router.get('/user', async(req, res) => {
    // console.log('----');
    try{
        const user = await User.find();
        res.json(user);
    } catch(err) {
        res.status(500).json({message:err.message});
    }

    // res.send('getting all the tasks')
});

router.post('/signup', async(req, res) => {
    // console.log('----');

    try{
        const {name, email, password} = req.body;

        //Check if name was entered
        if(!name){
            return res.json({
                error: 'name is required'
            })
        }

        //check if password is good
        if(!password || password.length < 6){
            return res.json({
                error: 'Password is required and it should be at least 6 characters'
            })
        }

        //check if email is already exists
        const exists = await User.findOne({email});
        if(exists){
            return res.json({
                error: 'Email is already taken'
            })
        }

        const hashedPassword = await hashPassword(password);

        //creating the user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })
        return res.json(user)
    } catch (error) {
        console.log(error);
    }

    // res.json('posting the user')
})

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;

        //check if the user exists
        const user = await User.findOne({email})
        if(!user){
            return res.json({
                error: 'No user found'
            })
        }

        //check if the password matches
        const match = await comparePassword(password, user.password)
        if(match){
            jwt.sign({email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err, token) => {
                if (err) throw err;
                console.log("token",token)

                res.cookie('token', token).json({user:user,token:token})
            })
        }
        if(!match){
            res.json({
                error: 'Password do not match'
            })
        }
    } catch (error) {
        console.log(error);
        res.json({error: 'something went wrong'})
    }
})

//logout
router.post('/logout', (req, res) => {
    res.clearCookie('token', { path: '/logout' });
    res.status(200).json({ message: 'Logged out successfully' });
});
module.exports = router
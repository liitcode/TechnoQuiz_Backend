const router = require('express').Router();
const User = require('../models/user');
const {registerValidation,loginValidation} = require('./validation');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/register',async (req,res) => {
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send({message : error.details[0].message});

    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send({ message : 'Email already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt);

    const user = new User({
        name : req.body.name,
        email : req.body.email,
        password : hashPassword
    });
    try{
        const savedUser = await user.save();
        res.send({user : user._id,message:'Registeration Successful'}); 
    }catch(err){
        res.status(400).send({message : err});
    }
});

router.post('/login', async (req,res)=>{
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send({message : error.details[0].message});

    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send({message : 'Incorrect email/password'}); 

    const validPass = await bcrypt.compare(req.body.password,user.password);
    if(!validPass) return res.status(400).send({message : 'Incorrect password/email'});

    const token = jwt.sign({id: user._id},process.env.TOKEN_SECRET);
    const data = {username : user.name, isPremium : user.isPremium, score : user.score,message: 'Login Successful',authtoken: token}
    res.header('auth-token',token).send(data);
})



module.exports = router;
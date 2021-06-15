const mongo = require('../../database/config');
const router = require('express').Router();
const User = require('../../models/user')
const {registerValidation,loginValidation} = require('./validation');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/register',async (req,res) => {
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt);

    const user = new User({
        name : req.body.name,
        email : req.body.email,
        password : hashPassword
    });
    try{
        const savedUser = await user.save();
        res.send({user : user._id}); 
    }catch(err){
        res.status(400).send(err);
    }
});



//add messages here for login,registeration
// eslint-disable-next-line consistent-return
router.post('/login', async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('Incorrect email/password'); 

    const validPass = await bcrypt.compare(req.body.password,user.password);
    if(!validPass) return res.status(400).send('Incorrect password/email');

    const token = jwt.sign({id: user._id},process.env.AUTH_TOKEN_SECRET);
    const data = {username : user.name, isPremium : user.isPremium, score : user.score}
    res.header('auth-token',token).send(token);
})
module.exports = router;
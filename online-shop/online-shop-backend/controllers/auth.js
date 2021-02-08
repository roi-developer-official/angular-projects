const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')


exports.signin = async (req,res,next)=>{

    const isExists = await User.findOne({email: req.body.email});
    if(isExists){
        const error = new Error('user already exists')
        error.code = 401;
        return next(error)
    }
    const hashed = await bcrypt.hash(req.body.password, 12);
    const user =  await new User({email: req.body.email,password: hashed}).save()
    if(!user){
        const error = new Error('somthing went wrong')
        error.code = 500;
        return next(error)
    }   
    res.status(200).json({message: 'signin successfully'})
}


exports.login = async (req,res,next)=>{
    
    const user = await User.findOne({email: req.body.email});
    if(!user){
        const error = new Error('wrong email or password')
        error.code = 401;
        return next(error)
    }
    const isEqual = await bcrypt.compare(req.body.password, user.password)
    if(!isEqual){
        const error = new Error('wrong email or password')
        error.code = 401; 
        return next(error)
    }
    let isAdmin = false;
    if(req.body.email === 'test@test.com')
        isAdmin = true;

    const token = jwt.sign({
        userId : user._id,
        email: user.email,
        isAdmin
    }, 'secret')
    res.status(200).json({message: 'login -successfully', token,'admin': isAdmin})
   
}


exports.isAdmin = (req,res,next)=>{

    let isAdmin = false;
    const token = req.header("Authorization")
    if(!token){
        return res.status(200);
    }
    const isAuth = jwt.verify(token, 'secret');
    if(!isAuth){
       return res.status(200);
    }
    const decoded = jwt.decode(token)
    if(decoded.isAdmin){
       isAdmin = true;
    }
    res.status(200).json({email: decoded.email, isAdmin})
}
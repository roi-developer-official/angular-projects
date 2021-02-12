const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')


exports.signin = async (req,res,next)=>{

    const isExists = await User.findOne({email: req.body.email});
    if(isExists){
        const error = new Error('אימייל כבר קיים במערכת')
        error.code = 401;
        return next(error)
    }
    const hashed = await bcrypt.hash(req.body.password, 12);
    const user =  await new User({email: req.body.email,password: hashed,name:req.body.name}).save()
    if(!user){
        const error = new Error('אופס! משהו השתבש')
        error.code = 500;
        return next(error)
    }   
    res.status(200).json({message: 'signin successfully'})
}

exports.login = async (req,res,next)=>{
    const user = await User.findOne({email: req.body.email});
    if(!user){
        const error = new Error('שם משתמש או סיסמא לא נכונים')
        error.code = 401;
        return next(error)
    }
    const isEqual = await bcrypt.compare(req.body.password, user.password)
    if(!isEqual){
        const error = new Error('שם משתמש או סיסמא לא נכונים')
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
    },'secret', {expiresIn : '1h'})
    res.status(200).json({message: 'login -successfully', token,admin: isAdmin, expiresIn: 60 * 60})
}


exports.autoLogin = async (req,res,next)=>{

    const token = req.header("Authorization")
    if(!token){
        return res.status(200).json({state: 'un-0'})
    }
    jwt.verify(token, 'secret',
    function(err,decoded){
        if(err){
            const error = new Error(err.message)
            error.code = 401;
            return next(error)
        }
        isAdmin = decoded.isAdmin;
        email = decoded.email
        res.status(200).json({email: email, isAdmin})
    });

}


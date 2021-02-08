const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{
    const token = req.headers["Authorization"];
    if(!token){
        const error = new Error('Un Authorized')
        error.code = 401;
        return next(error)
    }
    const isAuth = jwt.verify(token, 'secret');
    if(!isAuth){
        const error = new Error('Un Authorized')
        error.code = 401;
        return next(error)
    }
    next();
}
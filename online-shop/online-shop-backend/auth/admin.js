const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{
    const token = req.header("Authorization")
    if(!token){
        const error = new Error('UnAuthorized')
        error.code = 401;
        throw error;
    }
    const isAuth = jwt.verify(token, 'secret');
    if(!isAuth){
        const error = new Error('Un Authorized')
        error.code = 401;
        throw error;
    }
    const decoded = jwt.decode(token)
    if(decoded.isAdmin){
       return next()
    }

}
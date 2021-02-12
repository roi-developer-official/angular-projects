const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{
    const token = req.header("Authorization")
    if(!token){
        const error = new Error('Un Authorized')
        error.code = 401;
        return next(error)
    }
    jwt.verify(token, 'secret',
    function(err){
        if(err){
            const error = new Error(err.message)
            error.code = 401;
            return next(error)
        }
    });
    next();
}

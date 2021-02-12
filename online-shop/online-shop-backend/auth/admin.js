const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{
    const token = req.header("Authorization")
    if(!token){
        const error = new Error('UnAuthorized')
        error.code = 401;
        throw error;
    }

    jwt.verify(token, 'secret',
    (err,decoded)=>{
        if(err){
            console.log(err.message);
            const error = new Error(err.message)
            error.code = 401;
            return next(error)
        }
        if(decoded.isAdmin){
            next();
        }
    });


}
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const productRoute = require('./routes/products')
const multer = require('multer')
const path= require('path')
const app = express();
const authRoute = require('./routes/auth')
const {v4: uuid} = require('uuid')

app.use(bodyParser.json())

const fileStorage = multer.diskStorage({
    destination: (req,file,cb)=>{
      
        cb(null,'images')
    },
    filename: (req,file,cb)=>{
        cb(null, uuid())
    }
})

const fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'image/jpg' || file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpeg'){
        cb(null,true)
    }else{
        cb(null,false)
    }
}

app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use('/products', productRoute)
app.use('/auth', authRoute)


app.use((error,req,res,next)=>{
    const status = error.code || 500
    const message = error.message;
    res.status(status).json({message: message})
})

mongoose.connect('mongodb+srv://me:etnVVOw1DRG6akJV@cluster0.hj96h.mongodb.net/shop?retryWrites=true&w=majority')
.then(()=>{
    console.log('connected');
    app.listen(3000)
}).catch(err=>{
    throw err;
})




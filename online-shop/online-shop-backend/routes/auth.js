const express = require('express')
const authControl = require('../controllers/auth')
const router = express.Router()
const {body} = require('express-validator')

router.post('/signup',[
    body('email').isEmail(),
    body('password').isAlphanumeric().isLength({min: 5})
], authControl.signin)

router.post('/login',[
    body('email').isEmail(),
    body('password').isAlphanumeric().isLength({min: 5})
], authControl.login)

router.post('/autologin', authControl.autoLogin)

module.exports = router


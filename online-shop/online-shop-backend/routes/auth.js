const express = require('express')
const authControl = require('../controllers/auth')
const router = express.Router()
const isAdmin = require('../auth/admin')


router.post('/signup', authControl.signin)

router.post('/login', authControl.login)

router.post('/isadmin', authControl.isAdmin)

module.exports = router


const express = require('express')
const router = express.Router();
const {body} = require('express-validator')
const ordersController = require('../controllers/orders')
const isAuth = require('../auth/auth')

router.post('/make',
[
    body('phone').notEmpty().isLength({min: 9}).isNumeric(),
    body('address').notEmpty().isLength({min:5}).isAlphanumeric(),
    body('products').notEmpty(),
    body('totalPrice').notEmpty().isNumeric()
]
,isAuth, ordersController.makeOrder)

router.get('/getorders', isAuth, ordersController.getOrders)

module.exports = router;
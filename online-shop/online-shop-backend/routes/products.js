const express = require('express')
const shopController = require('../controllers/shop')
const router = express.Router()
const isAuth  = require('../auth/auth')
const isAdmin = require('../auth/admin')

router.get('/allproducts', shopController.getAllProducts)

router.get('/admin-products', isAdmin, shopController.getAdminProducts);

router.post('/add-product',isAdmin, shopController.addProduct)

router.get('/home', shopController.getHomeProducts)

router.get('/single/:prodId', isAdmin, shopController.getSinglProd)

router.post('/edit-product',isAdmin, shopController.editProduct)

router.delete('/delete-product/:prodId', isAdmin, shopController.deleteProduct)

module.exports = router;
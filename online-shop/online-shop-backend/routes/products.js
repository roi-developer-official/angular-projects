const express = require('express')
const shopController = require('../controllers/shop')
const router = express.Router()
const {body,param} = require('express-validator')
const isAdmin = require('../auth/admin')

router.get('/allproducts', shopController.getAllProducts)

router.get('/admin-products', isAdmin, shopController.getAdminProducts);

router.post('/add-product',
[
    body('title').notEmpty(),
    body('name').notEmpty(),
    body('description').notEmpty().isAlphanumeric(),
    body('price').isNumeric().notEmpty(),
    body('categories').notEmpty(),
    body('homeProd').notEmpty()
    
], isAdmin, shopController.addProduct)

router.get('/home', shopController.getHomeProducts)

router.post('/edit-product',[
    body('title').notEmpty(),
    body('name').notEmpty(),
    body('description').notEmpty().isAlphanumeric(),
    body('price').isNumeric().notEmpty(),
    body('categories').notEmpty(),
    body('homeProd').notEmpty()
],isAdmin, shopController.editProduct)

router.delete('/delete-product/:prodId',[
    param('prodId').notEmpty()
] 
,isAdmin, shopController.deleteProduct)

module.exports = router;
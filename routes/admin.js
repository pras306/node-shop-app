const path = require('path');
const express = require('express');

const rootDir = require('../util/path');
const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/add-product', adminController.getAddProducts);

router.post('/add-product', adminController.postAddProducts);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);

router.get('/products', adminController.getProducts);

module.exports = router;

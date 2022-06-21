const Product = require('../models/productModel');

exports.getAddProducts = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        isEdit: false,
        product: null
    });
};

exports.postAddProducts = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const products = new Product(null, title, imageUrl, price, description);
    products.save();
    res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
    const prodId = req.params.productId;
    const isEdit = req.query.isEdit === 'true';
    Product.getById(prodId, (product) => {
        res.render('admin/add-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            product: product,
            isEdit: isEdit
        });
    });
};

exports.postEditProduct = (req, res, next) => {
    const id = req.body.productId;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(id, title, imageUrl, price, description);
    product.save();
    res.redirect('/admin/products');
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId);
    res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', {
            products: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'         
        });
    });
};
const Product = require('../models/productModel');
const Cart = require('../models/cartModel');

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'Products List',
            path: '/products'
          });
    });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.getById(prodId, product => {
        res.render('shop/product-detail', {
            path: '/products',
            pageTitle: product.title,
            product: product
        });
    });
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/index', {
            prods: products,
            path: '/',
            pageTitle: 'Shop Home'
        });
    });
};

exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            let cartProducts = [];
            for(let product of cart.products) {
                let cartProductData = products.find(p => p.id === product.id);
                cartProductData = { ...cartProductData, qty: product.qty };
                cartProducts.push(cartProductData);
            }
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: cartProducts,
                totalPrice: cart.totalPrice
            });
        });
    });
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    const prodPrice = req.body.productPrice;
    Cart.addProduct(prodId, prodPrice);
    res.redirect('/cart');
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const prodPrice = req.body.productPrice;
    Cart.deleteProduct(prodId, prodPrice);
    res.redirect('/cart');
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    });
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders'
    });
};
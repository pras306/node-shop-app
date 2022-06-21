const fs = require('fs');
const path = require('path');

const filePath = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');

module.exports = class Cart {
    static addProduct(prodId, prodPrice) {
        fs.readFile(filePath, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if(!err) {
                cart = JSON.parse(fileContent);                
            }
            let existingProductId=  cart.products.findIndex(prod => prod.id === prodId);
            let existingProduct = cart.products.find(prod => prod.id === prodId);

            if(existingProduct) {
                let updatedProduct = { ...existingProduct };
                updatedProduct.qty += 1;
                cart.products[existingProductId] = updatedProduct;
            } else {
                let newProduct = { id: prodId, qty: 1 };
                cart.products = [...cart.products, newProduct];
            }

            cart.totalPrice = (parseFloat(cart.totalPrice) + parseFloat(prodPrice)).toFixed(2);
            fs.writeFile(filePath, JSON.stringify(cart), (err) => {
                console.log(err);
            });
        });
    }

    static getCart(cb) {
        fs.readFile(filePath, (err, fileContent) => {
            if(err) {
                cb(null);
            } else {
                cb(JSON.parse(fileContent));
            }
        });
    }

    static deleteProduct(id, prodPrice) {
        fs.readFile(filePath, (err, fileContent) => {
            if(err) {
                return;
            } else {
                let cart = JSON.parse(fileContent);
                const updatedCart = { ...cart };
                let cartProducts = [...updatedCart.products];
                let product = cartProducts.find(p => p.id === id);
                if(!product) {
                    return;
                }
                let prodQty = parseInt(product.qty);

                cartProducts = cartProducts.filter(prod => prod.id !== id);
                cart.totalPrice = (parseFloat(cart.totalPrice) - (parseFloat(prodPrice) * prodQty)).toFixed(2);
                cart = { ...cart, products: cartProducts };

                fs.writeFile(filePath, JSON.stringify(cart), err => {
                    console.log(err);
                });
            }
        });
    }
};
const fs = require('fs');
const path = require('path');

const Cart = require('./cartModel');
const filePath = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

const getProductsFromFile = (cb) => {
    fs.readFile(filePath, (err, fileData) => {
        if(err) {
            cb([]);
        } else {
            cb(JSON.parse(fileData));
        } 
    });
}

module.exports = class Product {
    constructor(id, title, imageUrl, price, description) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save() {
        getProductsFromFile(products => {
            if(this.id) {
                const existingProductIndex = products.findIndex(p => p.id === this.id);
                const updatedProducts = [...products] ;
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(filePath, JSON.stringify(updatedProducts), err => {
                    console.log(err);
                })
            } else {
                this.id = Math.random();
                products.push(this);
                fs.writeFile(filePath, JSON.stringify(products), err => {
                    console.log(err);
                });
            }
        });
    }

    static deleteById(id) {
        getProductsFromFile(products => {
            const updatedProducts = products.filter(product => product.id !== id);
            fs.writeFile(filePath, JSON.stringify(updatedProducts), err => {
                console.log(err);
                if(!err) {
                    let product = products.find(p => p.id === id);
                    Cart.deleteProduct(product.id, product.price);
                }
            });
        });
    }

    static fetchAll(cb) {
        // return products;
        getProductsFromFile(cb);
    }

    static getById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        });
    }
}
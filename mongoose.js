const mongoose = require('mongoose');

const Products = require('./models/product');

const createProduct = async (req, res, next) => {
    const createdProduct = new Products({
        name: req.body.name,
        price: req.body.price
    });
};

exports.createProduct = createProduct;
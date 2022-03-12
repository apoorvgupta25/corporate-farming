const Product = require('../models/product')
const _ = require('lodash')

exports.getProductById = (req, res, next, id) => {

    Product.findById(id).populate("farmer", "_id name").exec((err, prod) => {
        if(err){
            return res.status(400).json({
                error: "Product not found in db"
            });
        }
        req.product = prod;
        next();
    });
};

exports.createProduct = (req, res) => {

    const product = new Product(req.body);
    product.farmer = req.profile._id;

    const {
        title, description, farmer, cropName, cropSubType, price, paymentBeforeharvest, minimumOrderQuantity,
        maximumOrderQuantity, harvestMonth, deliveryMonth
    } = product;

    console.log(product);

    if(!title || !description || !cropName || !cropSubType || !price || !paymentBeforeharvest  ||
        !minimumOrderQuantity || !maximumOrderQuantity || !harvestMonth || !deliveryMonth){
            return res.status(400).json({
                error: "Please Include all fields"
            });
    }

    product.save((err, product) => {
        if(err){
            return res.status(400).json({
                error: "Not able to save the Product in db"
            });
        }
        res.json(product);
    });
};

exports.getProduct = (req, res) => {
    return res.json(req.product);
};

exports.getAllProducts = (req, res) => {
    Product.find().populate("farmer", "_id name").exec((err, products) => {
        if(err){
            return res.status(400).json({
                error: "No Product Found"
            });
        }
        res.json(products);
    });
};

exports.updateProduct = (req, res) => {

    let product = req.product;
    product = _.extend(product, req.body)

    product.save((err, updatedProduct) => {
        if(err){
            return res.status(400).json({
                error: "Not able to update Product in db"
            });
        }
        res.json(updatedProduct);
    });
};

exports.removeProduct = (req, res) => {
    const product = req.product;

    product.remove((err, deletedProduct) => {
        if(err){
            return res.status(400).json({
                error: "Not able to delete Product"
            });
        }
        res.json({
            message: `Product Deleted ${deletedProduct.title}`
        });
    });
};

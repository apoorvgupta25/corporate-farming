const Contract = require('../models/contract')

const _ = require('lodash')

exports.addContract = (req, res) => {
 
    const contract = new Contract(req.body);
    console.log(contract);
    const {
      farmer, corporate, duration, product, isProd, status, document
    } = contract;

    if(!farmer || !corporate || !duration || !product || !isProd || !status  ||
        !document){
            return res.status(400).json({
                error: "Please Include all fields"
            });
    }

    contract.save((err, contract) => {
        if(err){
            return res.status(400).json({
                error: "Not able to save the Contract in db"
            });
        }
        res.json(contract);
    });
}


exports.getContractById = (req, res, next, id) => {

    Contract.findById(id).exec((err, cont) => {
        if(err){
            return res.status(400).json({
                error: "Contract not found in db"
            });
        }
        req.contract = cont;
        next();
    });
};

exports.getContract = (req, res) => {
    return res.json(req.contract);
};

exports.getAllContracts = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 1000000;
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';

    Contract.find()
        .sort([[sortBy, 'descending']])
        .limit(limit)
        .exec((err, contracts) => {
            if(err){
                return res.status(400).json({
                    error: "No Contracts Found"
                });
            }
            res.json(contracts);
    });
};

exports.updateContract = (req, res) => {

    let contract = req.contract;
    console.log(contract);
    console.log("-----------------");
    contract = _.extend(contract, req.body)
    console.log(contract);
    contract.save((err, updatedContract) => {
        if(err){
            return res.status(400).json({
                error: "Not able to update Contract in db"
            });
        }
        res.json(updatedContract);
    });
};

exports.removeContract = (req, res) => {
    const contract = req.contract;

    contract.remove((err, deletedContract) => {
        if(err){
            return res.status(400).json({
                error: "Not able to delete Contract"
            });
        }
        res.json({
            message: `Contract Deleted ${deletedContract.product}`
        });
    });
};

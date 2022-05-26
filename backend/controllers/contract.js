const Contract = require('../models/contract')
const _ = require('lodash')
const fs = require('fs');
const formidable = require('formidable')

exports.addContract = (req, res) => {

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if(err){
            return res.status(400).json({
                error: "Problem with File"
            });
        }

        const { farmer, corporate, duration, product, isProd, status, contract_document } = fields

        if(!farmer || !corporate || !duration || !product || !isProd){
            return res.status(400).json({
                error: "Please Include all fields"
            });
        }

        const contract = new Contract(fields);
        if(file.contract_document){
            if(file.contract_document.size > 3000000){
                return res.status(400).json({
                  error: "File size too big!"
                });
            }

            contract.contract_document.data = fs.readFileSync(file.contract_document.filepath);
            contract.contract_document.contentType = file.contract_document.mimetype;
        }


        contract.save((err, contract) => {
            if(err){
                return res.status(400).json({
                    error: "Not able to save the Contract in db"
                });
            }
            res.json(contract);
        });
    })
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
    req.contract.contract_document = undefined;
    return res.json(req.contract);
};

exports.documents = (req, res, next) => {
    if(req.contract.contract_document.data){
        res.set("Content-Type", req.contract.contract_document.contentType);
        return res.send(req.contract.contract_document.data)
    }
    next();
}

exports.getAllContracts = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 1000000;
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';

    Contract.find()
        .select("-contract_document")
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

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        console.log(fields);

        let contract = req.contract;
        const p_id = contract._id;
        let new_contract = new Contract(fields);
        let id_contract = new Contract({'_id': p_id});

        // removing default
        id_contract['status'] = undefined;
        id_contract['reason'] = undefined;

        _.merge(contract, new_contract);
        _.merge(contract, id_contract);

        Contract.find({ '_id':p_id }).deleteOne().exec();

        contract.save((err, contract) => {
            if(err){
                return res.status(400).json({
                    error: `${err} Not able to save Land in DB`
                });
            }
            res.json(contract);
        });
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

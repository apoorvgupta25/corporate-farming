const Land = require('../models/land')
const _ = require('lodash')
const formidable = require('formidable')
const fs = require('fs');

exports.getLandById = (req, res, next, id) => {

    Land.findById(id).populate("farmer", "_id name").exec((err, lnd) => {
        if(err){
            return res.status(400).json({
                error: "Land not found in db"
            });
        }
        req.land = lnd;
        next();
    });
};

exports.addLand = (req, res) => {

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if(err){
            return res.status(400).json({
                error: "Problem with Image"
            });
        }

        const {title, description, bondTime, rainfall} = fields;

        const exactAmount = fields['expectedProfit.exactAmount']
        const percentage = fields['expectedProfit.percentage']
        const nitrogen = fields['soil.nitrogen']
        const phosphorous = fields['soil.phosphorous']
        const potassium = fields['soil.potassium']
        const ph = fields['soil.ph']
        const location = fields['landProperties.location']
        const city = fields['landProperties.city']
        const state = fields['landProperties.state']
        const totalArea = fields['landProperties.totalArea']

        if(!title || !description || !bondTime || !rainfall || !percentage || !exactAmount  ||
            !nitrogen || !phosphorous || !potassium || !ph || !location || !city || !state || !totalArea){
                return res.status(400).json({
                    error: "Please Include all fields"
                });
        }

        let land = new Land(fields);
        land.farmer = req.profile._id;

        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                  error: "File size too big!"
                });
            }

            land.photo.data = fs.readFileSync(file.photo.filepath);
            land.photo.contentType = file.photo.type;
        }

        land.save((err, lnd) => {
            if(err){
                return res.status(400).json({
                    error: "Not able to save Land in DB"
                });
            }
            res.json(lnd);
        });
    });
};

exports.getLand = (req, res) => {
    req.land.photo = undefined;
    return res.json(req.land);
};

exports.getAllLands = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 1000000;
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';

    Land.find()
        .select("-photo")
        .populate("farmer", "_id name")
        .sort([[sortBy, 'descending']])
        .limit(limit)
        .exec((err, lands) => {
            if(err){
                return res.status(400).json({
                    error: "No Product Found"
                });
            }
            res.json(lands);
    });
};

exports.updateLand = (req, res) => {

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if(err){
            return res.status(400).json({
                error: "Problem with Image"
            });
        }

        let land = req.land;
        const p_id = land._id;
        let new_land = new Land(fields);
        let id_land = new Land({'_id': p_id});

        _.merge(land, new_land);
        _.merge(land, id_land);

        Land.find({ '_id':p_id }).deleteOne().exec();

        //checking size 2MB
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                  error: "File size too big!"
                });
            }

            land.photo.data = fs.readFileSync(file.photo.filepath);
            land.photo.contentType = file.photo.type;
        }

        land.save((err, lnd) => {
            if(err){
                return res.status(400).json({
                    error: `${err} Not able to save Land in DB`
                });
            }
            res.json(lnd);
        });
    });

};

exports.photo = (req, res, next) => {
    if(req.land.photo.data){
        res.set("Content-Type", req.land.photo.contentType);
        return res.send(req.land.photo.data)
    }
    next();
};


exports.removeLand = (req, res) => {
    const land = req.land;

    land.remove((err, deletedLand) => {
        if(err){
            return res.status(400).json({
                error: "Not able to delete Land"
            });
        }
        res.json({
            message: `Land Deleted ${deletedLand.title}`
        });
    });
};

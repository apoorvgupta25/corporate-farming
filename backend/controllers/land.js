const Land = require('../models/land')
const _ = require('lodash')
const formidable = require('formidable')
const fs = require('fs');

exports.getLandById = (req, res, next, id) => {

    Land.findById(id).populate("farmer", "_id name email contact").exec((err, lnd) => {
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

        const location = fields['landProperties.location']
        const state = fields['landProperties.state']
        const district = fields['landProperties.district']
        const taluka = fields['landProperties.taluka']
        const village = fields['landProperties.village']
        const survey = fields['landProperties.survey']
        const totalArea = fields['landProperties.totalArea']

        if(!title) return res.status(400).json({ error: "Please Add Title" });
        if(!description) return res.status(400).json({ error: "Please Add Description" });
        if(!bondTime) return res.status(400).json({ error: "Please Add Bond Time" });
        if(!percentage) return res.status(400).json({ error: "Please Add Percentage of Land Price" });
        if(!exactAmount) return res.status(400).json({ error: "Please Add Leasing Price" });
        if(!location) return res.status(400).json({ error: "Please Add location" });
        if(!state) return res.status(400).json({ error: "Please Add state" });
        if(!district) return res.status(400).json({ error: "Please Add district" });
        if(!taluka) return res.status(400).json({ error: "Please Add taluka" });
        if(!village) return res.status(400).json({ error: "Please Add village" });
        if(!survey) return res.status(400).json({ error: "Please Add survey" });
        if(!totalArea) return res.status(400).json({ error: "Please Add totalArea" });


        let land = new Land(fields);
        land.farmer = req.profile._id;

        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                  error: "Image size too big!"
                });
            }

            land.photo.data = fs.readFileSync(file.photo.filepath);
            land.photo.contentType = file.photo.mimetype;
        }

        if(file.landPDF){
            if(file.landPDF.size > 3000000){
                return res.status(400).json({
                  error: "File size too big!"
                });
            }

            land.landPDF.data = fs.readFileSync(file.landPDF.filepath);
            land.landPDF.contentType = file.landPDF.mimetype;
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
    req.land.landPDF = undefined;
    return res.json(req.land);
};

exports.getAllLands = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 1000000;
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';

    Land.find({verification: 'Verified'})
        .select("-photo -landPDF")
        .populate("farmer", "_id name email contact")
        .sort([[sortBy, 'descending']])
        .limit(limit)
        .exec((err, lands) => {
            if(err){
                return res.status(400).json({
                    error: "No Land Found"
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
                  error: "Image size too big!"
                });
            }

            land.photo.data = fs.readFileSync(file.photo.filepath);
            land.photo.contentType = file.photo.mimetype;
        }

        if(file.landPDF){
            if(file.landPDF.size > 3000000){
                return res.status(400).json({
                  error: "File size too big!"
                });
            }

            land.landPDF.data = fs.readFileSync(file.landPDF.filepath);
            land.landPDF.contentType = file.landPDF.mimetype;
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

exports.landPDF = (req, res, next) => {
    if(req.land.landPDF.data){
        res.set("Content-Type", req.land.landPDF.contentType);
        return res.send(req.land.landPDF.data)
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


exports.getAdminLands = (req, res) => {
    let filterBy = req.query.filterBy ? req.query.filterBy : 'Verified';

    Land.find({verification: filterBy})
        .select("-photo -landPDF")
        .populate("farmer", "_id name email contact")
        .exec((err, lands) => {
            if(err){
                return res.status(400).json({
                    error: "No Land Found"
                });
            }
            res.json(lands);
    });
}


exports.getVerificationEnums = (req, res) => {
    res.json(Land.schema.path("verification").enumValues);
}

exports.updateVerification = (req, res) => {
    Land.updateOne(
        {_id: req.body.landId},
        {$set: {verification: req.body.verification}},
        (err, updatedLand) => {
            if(err){
                return res.status(400).json({
                    error: err
                });
            }
            res.json(updatedLand);
        }
    )
}

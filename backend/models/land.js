const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const landSchema = new mongoose.Schema(
  {
    title: { type: String, },
    description: { type: String, },
    photo: {
      data: Buffer,
      contentType: String,
    },
    farmer: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    landProperties: {
       location: String,
       state: String,
       city: String,
       totalArea: Number,
    },
    bondTime: String,
    soil: {
      nitrogen: Number,
      phosphorous: Number,
      potassium: Number,
      ph: Number,
    },
    expectedProfit: {
      percentage: Number,
      exactAmount: Number,
    },
    rainfall: Number,

  },
  { timestamps: true }
);


module.exports = mongoose.model("lands", landSchema);

/*
{
    "title":"Title2",
    "description":"description2",
    "landProperties": {
        "location": "Thane",
        "state": "Maharashtra",
        "city":"Mumbai",
        "totalArea":67
    },
    "bondTime":"6 months",
    "soil":{
      "nitrogen": 50,
      "phosphorous": 10,
      "potassium": 25,
      "ph": 8
    },
    "expectedProfit":{
      "percentage": 25,
      "exactAmount": 1500
    },
    "rainfall":180
}

*/

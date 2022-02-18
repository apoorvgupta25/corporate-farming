const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    farmer: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    cropName: String,
    cropSubType: String,
    price: Number,
    paymentbeforeharvest: Number,
    minimumOrderQuantity: Number,
    maximumOrderQuantity: Number,
    HarvestMonth: String,
    DeliveryMonth: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("products", productSchema);

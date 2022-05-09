const mongoose = require("mongoose");

const contractSchema = new mongoose.Schema(
  {
    contract_document: {
        data: Buffer,
        contentType: String,
    },
    farmer: {
      type: String,
    },
    corporate: {
      type: String,
    },
    duration: {
      type: String,
    },
    product: {
        type: String,
    },
    isProd: {
        type: String,
    },
    status: {
        type: String,
        default: "proposed",
        enum: ["proposed", "accepted", "rejected"]
    },
    reason: {
        type: String,
        default: "",
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("contract", contractSchema);

const mongoose = require("mongoose");

const Toll = mongoose.Schema({
  vehicleregnum: {
    type: String,
    required: true,
  },
  tollamt: {
    type: String,
    required: true,
  },
  vehicleid: {
    type: String,
    required: true,
  },
  createdon: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Toll", Toll);

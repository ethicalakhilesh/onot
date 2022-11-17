const mongoose = require("mongoose");

const Vehicle = mongoose.Schema({
  ownername: {
    type: String,
    required: true,
  },
  vehicleregnum: {
    type: String,
    required: true,
  },
  ownerid: {
    type: String,
    required: true,
  },
  createdon: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Vehicle", Vehicle);

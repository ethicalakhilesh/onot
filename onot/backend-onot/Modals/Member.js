const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const NewMember = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  usrid: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userrole: {
    type: String,
    required: true,
    default: "MEMBER",
  },
  createdon: {
    type: Date,
    default: Date.now,
  },
});

NewMember.statics.hashPassword = function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
};

NewMember.methods.isValid = function (hashedpassword) {
  return bcrypt.compareSync(hashedpassword, this.password);
};

module.exports = mongoose.model("Member", NewMember);

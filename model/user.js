const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    unique: true,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  isRole: {
    type: Number,
    required: true, // market = 2 // user = 3
  },
  address: {
    type: String,
    required: function () {
      return this["isRole"] == 3;
    },
  },
  numberAccount: {
    type: Number,
    required: function () {
      return this["isRole"] == 2;
    },
  },
  IBAN: {
    type: Number,
    required: function () {
      return this["isRole"] == 2;
    },
  },
  ownersCard: {
    type: String,
    required: function () {
      return this["isRole"] == 2;
    },
  },
  commercialRegister: {
    type: String,
    required: function () {
      return this["isRole"] == 2;
    },
  },
  taxCertificate: {
    type: String,
    required: function () {
      return this["isRole"] == 2;
    },
  },
  menu: {
    type: String,
    required: function () {
      return this["isRole"] == 2;
    },
  },
  logo: {
    type: String,
    required: function () {
      return this["isRole"] == 2;
    },
  },
  cover: {
    type: String,
    required: function () {
      return this["isRole"] == 2;
    },
  },
  description: {
    type: String,
    required: function () {
      return this["isRole"] == 2;
    },
  },
  cart: [
    {
      type: Schema.Types.ObjectId,
      ref: "Cart",
    },
  ],
  product: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

const User = mongoose.model("User", UserSchema);
module.exports = User;

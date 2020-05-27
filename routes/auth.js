const express = require("express");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../model/user");
const auth = require("../middleware/auth");
const IsAdmin = require("../middleware/adminRole");

/* ------------the route for get all users-------------- */
router.get("/getAllUsers", async (req, res) => {
  const Users = await User.find({ isRole: 3 });
  res.send(Users);
});

/* ------------the route for get all markets-------------- */
router.get("/getAllMarkets", async (req, res) => {
  const Users = await User.find({ isRole: 2 });
  res.send(Users);
});

/* ------------the route for get Alphabetical markets-------------- */
router.get("/getAlphabeticalMarkets", async (req, res) => {
  const Users = await User.find({ isRole: 2 })
    .sort({ username: 1 })
    .select({ username: 1, logo: 1 });
  res.send(Users);
});

/* ------------the route for specific users by id-------------- */
router.get("/getSpecificUser/:id", async (req, res) => {
  const Users = await User.findById(req.params.id)
    .populate("cart")
    .select({ cart: 1 });
  res.send(Users);
});

router.get("/getSpecificMarket/:id", async (req, res) => {
  const Users = await User.findById(req.params.id).populate("product");
  res.send(Users);
});

/* ------------the route for register user-------------- */
router.post("/authUser", async (req, res) => {
  try {
    /* start validation by joi library */
    const schema = {
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      password: Joi.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
    };
    const result = Joi.validate(req.body, schema);
    if (result.error) {
      return res.status(400).send(result.error.details[0].message);
    }
    /* end validation by joi library */

    /* Make sure it is correct email and passsword*/
    let user = await User.findOne({ email: req.body.email }); //email
    if (!user) return res.status(400).send("Invalid Email");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user["password"]
    ); //password
    if (!validPassword) return res.status(400).send("Invalid Password");

    //token
    const token = jwt.sign(
      { _id: user._id, isRole: user["isRole"] },
      "jwtPrivateKey"
    );
    console.log(user["isRole"]);
    res.send({ user, token });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/user/:id", [auth, IsAdmin], async (req, res) => {
  try {
    const SpecificUser = await User.findByIdAndDelete(req.params.id);
    if (!SpecificUser) return res.status(404).send("Not find this user");
    return res.send({
      sccess: true,
      message: "User Removed",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;

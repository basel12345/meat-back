const express = require("express");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();
const multer = require("multer");
const User = require("../model/user");
const IsMarket = require("../middleware/marketRole");

/* ------------start Multer-------------- */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

/* start filter type file */
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
/* end filter type file */

/* start upload file */
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});
/* end upload file */
/* ------------end Multer-------------- */

/* ------------the route for get all users-------------- */
router.get("/getAllUsers", async (req, res) => {
  const Users = await User.find().populate("cart");
  res.send(Users);
});

/* ------------the route for specific users by id-------------- */
router.get("/getSpecificUser/:id", async (req, res) => {
  const Users = await User.findById(req.params.id);
  res.send(Users);
});

/* ------------the route for register user-------------- */
var cpUpload = upload.fields([
  { name: "ownersCard", maxCount: 1 },
  { name: "commercialRegister", maxCount: 1 },
  { name: "taxCertificate", maxCount: 1 },
  { name: "menu", maxCount: 1 },
  { name: "logo", maxCount: 1 },
  { name: "cover", maxCount: 1 },
]);
router.post("/registerUser", cpUpload, async (req, res) => {
  try {
    /* start validation by joi library */
    const schema = {
      username: Joi.string().min(3).required(),
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      password: Joi.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
      confirmPassword: Joi.any()
        .valid(Joi.ref("password"))
        .required()
        .options({ language: { any: { allowOnly: "must match password" } } }),
      isRole: Joi.number().required(),
      address: Joi.string().required(),
    };
    const result = Joi.validate(req.body, schema);
    if (result.error) {
      return res.status(400).send(result.error.details[0].message);
    }
    /* end validation by joi library */

    /* Make sure it is correct email*/
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered");

    user = await new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      isRole: req.body.isRole,
      address: req.body.address,
    });

    /*----------Encrypt------------*/
    const salt = await bcrypt.genSalt(10);
    user["password"] = await bcrypt.hash(user["password"], salt);

    /*-----------token----------*/
    const token = jwt.sign(
      { _id: user._id, isRole: user["isRole"] },
      "jwtPrivateKey"
    );
    await user.save((err, user) => {
      if (err) {
        return res.send({
          status: false,
          message: err.message,
        });
      }
      return res.header("x-auth-token", token).send({
        status: true,
        message: "user register",
        user,
      });
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/* ------------the route for register market-------------- */
router.post("/registerMarket", cpUpload, async (req, res) => {
  try {
    /* start validation by joi library */
    const schema = {
      username: Joi.string().min(3).required(),
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      password: Joi.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
      confirmPassword: Joi.any()
        .valid(Joi.ref("password"))
        .required()
        .options({ language: { any: { allowOnly: "must match password" } } }),
      isRole: Joi.number().required(),
      numberAccount: Joi.number().required(),
      IBAN: Joi.number().required(),
      description: Joi.string().required(),
    };
    const result = Joi.validate(req.body, schema);
    if (result.error) {
      return res.status(400).send(result.error.details[0].message);
    }
    /* end validation by joi library */

    /* Make sure it is correct email*/
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered");
    user = await new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      isRole: req.body.isRole,
      numberAccount: req.body.numberAccount,
      IBAN: req.body.IBAN,
      ownersCard: req.files["ownersCard"][0].path,
      commercialRegister: req.files["commercialRegister"][0].path,
      taxCertificate: req.files["taxCertificate"][0].path,
      menu: req.files["menu"][0].path,
      logo: req.files["logo"][0].path,
      cover: req.files["cover"][0].path,
      description: req.body.description,
    });

    /*----------Encrypt------------*/
    const salt = await bcrypt.genSalt(10);
    user["password"] = await bcrypt.hash(user["password"], salt);

    /*-----------token----------*/
    const token = jwt.sign(
      { _id: user._id, isRole: user["isRole"] },
      "jwtPrivateKey"
    );
    await user.save((err, user) => {
      if (err) {
        return res.send({
          status: false,
          message: err.message,
        });
      }
      return res.header("x-auth-token", token).send({
        status: true,
        message: "user register",
        user,
        token,
      });
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});
module.exports = router;

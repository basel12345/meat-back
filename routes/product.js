const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require("joi");
const multer = require("multer");
const Products = require("../model/product");
const User = require("../model/user");
const auth = require("../middleware/auth");
const IsMarket = require("../middleware/marketRole");
const IsAdmin = require("../middleware/adminRole");

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

/* ------------the route for get all products and markets-------------- */
router.get("/getAllProduct", async (req, res) => {
  try {
    const products = await Products.find().populate("market", "logo");
    res.send(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/* the route for get all products for specific type */

/* -------------start the route for get all products Which kind of chicks--------------- */
router.get("/getAllChickens", async (req, res) => {
  try {
    const products = await Products.find({ type: "chicken" }).populate(
      "market",
      "logo"
    );
    res.send(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Alphabetical
router.get("/getAlphabeticalChickens", async (req, res) => {
  try {
    const products = await Products.find({ type: "chicken" })
      .populate("market", "logo")
      .sort({ name: 1 });
    res.send(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
/* -------------end the route for get all products Which kind of chicks--------------- */

/* -------------start the route for get all products Which kind of meats--------------- */
router.get("/getAllMeats", async (req, res) => {
  try {
    const products = await Products.find({ type: "meat" }).populate(
      "market",
      "logo"
    );
    res.send(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Alphabetical
router.get("/getAlphabeticalMeats", async (req, res) => {
  try {
    const products = await Products.find({ type: "meat" })
      .populate("market", "logo")
      .sort({ name: 1 });
    res.send(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// sheep meats
router.get("/getSheepMeats", async (req, res) => {
  try {
    const products = await Products.find({ type: "meat", meatType: "غنم" })
      .populate("market", "logo")
      .sort({ name: 1 });
    res.send(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// bovine meats
router.get("/getBovineMeats", async (req, res) => {
  try {
    const products = await Products.find({ type: "meat", meatType: "بقري" })
      .populate("market", "logo")
      .sort({ name: 1 });
    res.send(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/* -------------end the route for get all products Which kind of meats--------------- */

/* -------------start the route for get all products Which kind of admirals--------------- */
router.get("/getAllAdmirals", async (req, res) => {
  try {
    const products = await Products.find({ type: "admirals" }).populate(
      "market",
      "logo"
    );
    res.send(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Alphabetical
router.get("/getAlphabeticalAdmirals", async (req, res) => {
  try {
    const products = await Products.find({ type: "admirals" })
      .populate("market", "logo")
      .sort({ name: 1 });
    res.send(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/* -------------end the route for get all products Which kind of admirals--------------- */

/* ------------the route for specific product by id-------------- */
router.get("/getSpecificProduct/:id", async (req, res) => {
  try {
    const SpecificProduct = await Products.findById(req.params.id).select({
      name: 1,
      price: 1,
      image: 1,
      type: 1,
      meatType: 1,
      weight: 1,
      description: 1,
    });
    if (!SpecificProduct) return res.status(404).send("Not find this product");
    res.send(SpecificProduct);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/* ------------the route for adding Product-------------- */
router.post(
  "/addProduct/:userId",
  [auth, IsMarket],
  upload.single("image"),
  async (req, res) => {
    try {
      /* search user for id */
      const user = await User.findById(req.params.userId);
      if (!user) return res.status(404).send("Not find this product");
      /* start validation by joi library */
      const schema = {
        name: Joi.string().min(0).required(),
        price: Joi.number().min(0).required(),
        weight: Joi.string().min(0).required(),
        type: Joi.string().min(0).required(),
        description: Joi.string().min(0).required(),
        meatType: Joi.string(),
        //   image: Joi.required(),
      };
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        return res.send({
          status: false,
          message: result.error.details[0].message,
        });
      }
      /* end validation by joi library */

      const newProduct = await new Products({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        image: req.file.path,
        weight: req.body.weight,
        type: req.body.type,
        description: req.body.description,
        meatType: req.body.meatType,
      });

      newProduct["market"].push(user);
      await newProduct.save((err, product) => {
        if (err) {
          console.log(err);
          return res.send({
            status: false,
            message: err.message,
          });
        }
        res.send({
          status: true,
          message: "Product saved",
          product,
        });
      });
      user["product"].push(newProduct);
      await user.save();
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

/* ------------the route for update Product by id-------------- */
router.put("/UpdateProduct/:id", [auth, IsMarket], async (req, res) => {
  console.log(req.body);
  try {
    /* start validation by joi library */
    const schema = {
      name: Joi.string().min(0).required(),
      price: Joi.number().min(0).required(),
      weight: Joi.string().min(0).required(),
      type: Joi.string().min(0).required(),
      description: Joi.string().min(0).required(),
      meatType: Joi.string(),
    };
    const result = Joi.validate(req.body, schema);
    if (result.error)
      return res.status(400).send(result.error.details[0].message);
    /* end validation by joi library */

    const product = await Products.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        price: req.body.price,
        weight: req.body.weight,
        type: req.body.type,
        description: req.body.description,
        meatType: req.body.meatType,
      },
      { new: true }
    );
    if (!product) return res.status(404).send("Not find this product");
    await product.save((err, product) => {
      if (err) {
        console.log(err);
        return res.send({
          status: false,
          message: err.message,
        });
      }
      res.send({
        status: true,
        message: "Product saved",
        product,
      });
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/* ------------the route for deleting Product by id-------------- */
router.delete("/deleteProduct/:id", auth, async (req, res) => {
  try {
    const SpecificProduct = await Products.findByIdAndDelete(req.params.id);
    if (!SpecificProduct) return res.status(404).send("Not find this product");
    return res.send({
      sccess: true,
      message: "Product Removed",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;

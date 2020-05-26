const express = require("express");
const router = express.Router();
const Products = require("../model/product");
const User = require("../model/user");

/* ------------the route for search-------------- */
router.get("/", async (req, res) => {
  try {
    const products = await Products.find({ name: req.query.name });
    const market = await User.find({ username: req.query.name });
    res.send({ products, market });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;

const express = require("express");
const Joi = require("joi");
const router = express.Router();
const Cart = require("../model/cart");
const User = require("../model/user");

/* the route for get all Cart */
router.get("/getAllCart", async (req, res) => {
  const cart = await Cart.find();
  res.send(cart);
});

/* the route for adding Cart by user id */
router.post("/addCart/:userId", async (req, res) => {
  try {
    /* search user for id */
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).send("Not find this product");

    /* start validation by joi library */
    const schema = {
      name: Joi.string().required(),
      price: Joi.number().required(),
      weight: Joi.number().required(),
      image: Joi.string().required(),
    };
    const result = Joi.validate(req.body, schema);
    if (result.error) res.status(400).send(result.error.details[0].message);
    /* end validation by joi library */

    const newCart = await new Cart({
      name: req.body.name,
      price: req.body.price,
      weight: req.body.weight,
      image: req.body.image,
    });

    newCart.save((err, cart) => {
      if (err) {
        return res.send({
          status: false,
          message: err.message,
        });
      }
      return res.send({
        status: true,
        message: "Cart saved",
        cart,
      });
    });
    user["cart"].push(newCart);
    await user.save();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/* ------------the route for deleting Cart by id-------------- */
router.delete("/deleteCart/:id", async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);
    if (!cart) return res.status(404).send("Not find this cart");
    return res.send({
      sccess: true,
      message: "Cart Removed",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const products = require("./routes/product");
const user = require("./routes/user");
const auth = require("./routes/auth");
const cart = require("./routes/cart");
const search = require("./routes/search");

mongoose
  .connect(
    "mongodb+srv://basel:basel@cluster0-ogd68.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connect with mongoDB with successfully"))
  .catch((err) => console.log(err));

const app = express();

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
// app.use("/uploads", express.static(__dirname + "/uploads"));

app.use("/products", products);
app.use("/user", user);
app.use("/auth", auth);
app.use("/cart", cart);
app.use("/search", search);
app.use(express.static(path.join(__dirname, "./dist/angular-army")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/dist/angular-army/index.html"));
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`http://localhost:${port}`));

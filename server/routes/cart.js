const {
  addToCart,
  remFromCart,
  getFromCart,
  buyFromCart,
} = require("../controllers/cart");
const Router = require("express").Router();
const auth = require("../middleware/auth");

// Add game to card
Router.post("/addtocart", auth, addToCart);

// Remove game from card
Router.post("/remfromcart", auth, remFromCart);

// Get game from card
Router.get("/getfromcart", auth, getFromCart);

// Buy game from card
Router.post("/buyfromcart", auth, buyFromCart);

module.exports = Router;

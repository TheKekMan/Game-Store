const {
  getUserDetails,
  changePassword,
  addToCart,
  remFromCart,
  getFromCart,
  buyFromCart
} = require('../controllers/user')
const Router = require('express').Router()
const auth = require('../middleware/auth');


// Update password
Router.post('/update/password', changePassword)

// Get user details
Router.get('/', auth, getUserDetails)

// Add game to card
Router.post('/addtocart', auth, addToCart)

// Remove game from card
Router.post('/remfromcart', auth, remFromCart)

// Get game from card
Router.get('/addtocart', auth, getFromCart)

// Buy game from card
Router.post('/buyfromcart', auth, buyFromCart)

module.exports = Router

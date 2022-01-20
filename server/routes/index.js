const Router = require('express').Router()
const GamesRouter = require('./games')
const UserRouter = require('./user')
const AuthRouter = require('./auth')
const authUser = require('../Services/Auth')
const auth = require('../middleware/auth');

Router.use('/games', GamesRouter)

Router.use('/user', UserRouter)

Router.use('/auth', AuthRouter)

module.exports = Router

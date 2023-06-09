const router = require('express').Router()
const authController = require('../controller/authController')
const auth = require('../Middleware/auth')
const adminAuth = require('../Middleware/adminAuth')

router.post(`/auth/register`, authController.register)
router.post(`/auth/login`, authController.login)

router.get(`/auth/logout`, authController.logout)
router.get(`/auth/authToken`, authController.authToken)

router.get(`/auth/currentUser`, auth, authController.currentUser)

module.exports = router
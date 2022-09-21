const express = require("express")
const router = express.Router()

const { verifySignUp } = require("../middleware")
const controller = require("../controllers/auth.controller")

router.post("/auth/signup", [verifySignUp.checkDuplicateUsername], controller.signup)
router.post("/auth/signin", controller.signin)

module.exports = router
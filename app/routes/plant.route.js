const express = require("express")
const router = express.Router()

const { authJwt } = require("../middleware")
const controller = require("../controllers/plant.controller")

router.post("/plant/all", [authJwt.verifyToken], controller.findAll)
router.post("/plant/create", [authJwt.verifyToken], controller.create)

module.exports = router
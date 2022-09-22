const jwt = require("jsonwebtoken")
const config = require("../config/auth.config")
const db = require("../models")
const User = db.user

verifyToken = async (req, res, next) => {
  let token = req.headers['x-access-token']

  if (!token){
    return res.status(403).send({
      message: "No token provided!"
    })
  }

  try {
    let decoded = jwt.verify(token, config.secret)
  } catch (error) {
    return res.status(401).send({
      message: "Unauthorized!"
    })
  }
  next()
}

const authJwt = {
  verifyToken: verifyToken
}

module.exports = authJwt
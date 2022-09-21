const db = require("../models")
const config = require("../config/auth.config")
const User = db.user

const Op = db.Sequelize.Op

var jwt = require("jsonwebtoken")
var bcrypt = require("bcryptjs")

exports.signup = async (req, res) => {
  try {
    // Save user to database
    await User.create({
      fullname: req.body.fullname,
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 2)
    })

    res.send({ message: "User was registered successfully!" })
  } catch (error) {
    res.send(500).send({ message: error.message })
  }
}

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username
      }
    })

    if (!user) {
      return res.status(404).send({ message: "User not found!" })
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password)

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid password!"
      })
    }

    var token = jwt.sign({ id: user.id }, config.secret)

    return res.status(200).send({
      id: user.id,
      fullname: user.fullname,
      accessToken: token
    })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}
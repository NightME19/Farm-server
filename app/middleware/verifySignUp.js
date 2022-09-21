const db = require("../models")
const User = db.user

checkDuplicateUsername = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      username: req.body.username
    }
  })

  if (user) {
    return res.status(400).send({
      message: "Failed! Username is already in use!"
    })

    
  }

  next()
}

const verifySignUp = {
  checkDuplicateUsername: checkDuplicateUsername
}

module.exports = verifySignUp
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    fullname: {
      type: Sequelize.STRING
    },
    username: {
      type: Sequelize.STRING,
      unique: true
    },
    password: {
      type: Sequelize.STRING
    },
  })

  User.associate = models => {
    User.hasMany(models.Plant, {
      ondDelete: "cascade"
    })
  }

  return User
}
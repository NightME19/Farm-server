const config = require("../config/db.config")

const Sequelize = require("sequelize")
// const sequelize = new Sequelize(
//   config.DB,
//   config.USER,
//   config.PASSWORD,
//   {
//     host: config.HOST,
//     dialect: config.dialect,
//     operatorsAliases: false,

//     pool: {
//       max: config.pool.max,
//       min: config.pool.min,
//       acquire: config.pool.acquire,
//       idle: config.pool.idle
//     }
//   }
// )
const sequelize = new Sequelize("sqlite::memory:")
const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = require("./user.model")(sequelize, Sequelize)
db.plant = require("./plant.model")(sequelize, Sequelize)

db.user.hasMany(db.plant, {
  ondDelete: "cascade"
})
db.plant.belongsTo(db.user, {
  onDelete: "cascade"
})

module.exports = db
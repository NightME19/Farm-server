const auth = require("./auth.route")
const plant = require("./plant.route")

module.exports = (app) => {
  app.use("/api/v1", auth)
  app.use("/api/v1", plant)
}
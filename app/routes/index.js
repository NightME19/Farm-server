const auth = require("./auth.route")

module.exports = (app) => {
  app.use("/api/v1", auth)
}
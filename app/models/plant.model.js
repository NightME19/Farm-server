module.exports = (sequelize, Sequelize) => {
  const Plant = sequelize.define("plants", {
    name: {
      type: Sequelize.STRING
    }
  })
  return Plant
}
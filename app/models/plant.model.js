module.exports = (sequelize, Sequelize) => {
  const Plant = sequelize.define("plants", {
    name: {
      type: Sequelize.STRING
    }
  })

  Plant.associate = models => {
    Plant.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      },
      onDelete: "cascade"
    })
  }

  return Plant
}
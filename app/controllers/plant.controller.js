const db = require("../models")
const Plant = db.plant

exports.create = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can be empty!"
    })
  }
  try {
    const plant = await Plant.create({name: req.body.name, userId: req.body.userId})
    res.send(plant)
  } catch (error) {
    res.status(500).send({message: error.message || "Some error occurred while creating the plant."})
  }
}

exports.findAll = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can be empty!"
    })
  }
  try {
    const plants = await Plant.findAll({where: {userId: req.userId}})
    res.send(plants)
  } catch (error) {
    res.status(500).send({message: error.message || "Some error occurred while creating the plant."})
  }
}
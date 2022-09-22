const express = require("express")
const cors = require("cors")
const db = require("./app/models")

const app = express()
var corsOption = {
  origin: "http://localhost:8081"
}

// app.use(cors(corsOption))
app.use(cors())
// parse requests of content-type -> application/json
app.use(express.json())
// parse requests of content-type -> application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  )
  next()
})

require("./app/routes")(app)

app.get("/", (req, res) => {
  res.send({message: "hello"})
})

const bcrypt = require("bcryptjs")
const { user } = require("./app/models")
async function initial(){
  const User = db.user
  const user = await User.create({
    fullname: "test name",
    username: "test",
    password: bcrypt.hashSync("test", 2)
  })
  db.plant.create({
    name: "Plant 1",
    userId: user.id
  })
}

const PORT = process.env.PORT || 8080

db.sequelize.sync({ force: true }).then(async () => {
  console.log('Drop and resync DB');
  await initial()
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  })
})

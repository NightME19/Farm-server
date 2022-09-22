const express = require("express")
const cors = require("cors")
const db = require("./app/models")

const app = express()
var corsOption = {
  origin: "http://localhost:8080"
}

app.use(cors(corsOption))

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

app.get("/", () => {
  res.send({message: "hello"})
})

function initial(){
  User = db.user

  User.create({
    fullname: "test name",
    username: "testUsername",
    password: "testPassword"
  })
}

const PORT = process.env.PORT || 8080

db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and resync DB');
  initial()
  app.listen((PORT, () => {
    console.log(`Server is runnig on port ${PORT}.`);
  }))
})
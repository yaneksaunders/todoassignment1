const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const basicAuth = require('express-basic-auth')

const app = express();
app.use(express.json());

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

/*
app.use(basicAuth({
  users: { 'admin': 'pass@word1' }, 
}))*/

// specify content type
//app.use(logger("dev"));
app.use(bodyParser.json());

// encode url for security measure
app.use(express.urlencoded({ extended: false }));


const db = require("./models");


// set up routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the app." });
});


require("./routes/todo.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;



db.sequelize.sync(/*{ force: true }*/).then(() => {
//  console.log("Drop and re-sync db.");
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
module.exports = app;
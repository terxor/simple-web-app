require("dotenv").config();
const express = require("express");
const app = express();
const middleware = require("./modules/middleware");
const session = require('express-session');
const db = require("./modules/db");
const passport = require("passport");
const strategy = require("./modules/auth_strat")

db.connect();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({extended: false}));

app.use(session({
  secret: "teamxv3",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
strategy(passport);

app.use(require("./routes/index.js"));
app.use(require("./routes/user.js"));
app.use(require("./routes/notes.js"));

app.use(middleware.logErrors);
app.use(middleware.handleErrors);

app.listen(process.env.PORT, () => {
  console.log(`Started on port ${process.env.PORT}!`)
});
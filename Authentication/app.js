require("dotenv").config();
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const errorController = require("./controllers/error");
const User = require("./models/user");
// const csrf = require('csurf');
const flash = require('connect-flash');

const app = express();
const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: "sessions",
});
// const csrfProtection = csrf();
app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const { ADMIN_API_PREFIX } = require("./constants/routesConstants");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
    // name: 'myCustomSessionName'
  })
);
// app.use(csrfProtection);
app.use(flash())

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  // res.locals.csrfToken = req.csrfToken();
  next();
})

app.use(ADMIN_API_PREFIX.ADMIN_API, adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    console.log("connected");
    app.listen(process.env.PORT);
  })
  .catch((err) => {
    console.log(err);
  });

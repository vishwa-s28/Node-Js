const User = require("../models/user");
const { BASE_URL } = require("../constants/routesConstants");
exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  User.findById("6773de89f7099445f59234c9")
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      res.redirect(BASE_URL.URL);
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }
    res.clearCookie("connect.sid");
    res.redirect(BASE_URL.URL);
  });
};

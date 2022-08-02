const mongoose = require("mongoose");
const { User } = require("../models");

module.exports.register = (req, res, next) => {
    res.render("auth/register");
};

module.exports.doRegister = (req, res, next) => {
  function renderWithErrors(errors) {
    res.status(400).render("auth/register", {
      user: req.body,
      errors,
    });
  }

  const { email } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        renderWithErrors({ email: "Email already exists" });
        
      } else {
        return User.create(req.body).then((user) => {
          // sendRegistrationEmail(user);
          res.redirect("/events");
          // res.redirect("/login?confirm=true");
        });
      }
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        renderWithErrors(error.errors);
      } else {
        next(error);
      }
    });
};
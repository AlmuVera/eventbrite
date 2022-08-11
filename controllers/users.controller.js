const { User, Event } = require("../models");

module.exports.list = (req, res, next) => {
   // console.log(req)
  // User.findById(req.params.id)
  Event.find({author: req.user._id})
    .populate("author")
    .then((events) => {
        if (events) {
        res.render("users/list", { events });
      } else {
        res.redirect("/events");
      }
    })
    .catch((err) => next(err));
};
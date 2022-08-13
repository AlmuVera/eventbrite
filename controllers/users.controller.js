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

//esto me da el numero de id del ticket
module.exports.tickets = (req, res, next) => {
   User.findById(res.locals.currentUser)
   .populate("tickets")
    .then((user) => {
        if(user.tickets){
            // console.log(user.tickets)
            res.render("users/tickets", { user });
            console.log(user.tickets)
        } else {
            console.log("this user doesn't have tickets yet")
            res.redirect("/events");
        }
    })
    .catch((err) => next(err));
 };





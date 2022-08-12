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

//  module.exports.tickets = (req, res, next) => {
//     User.findById(res.locals.currentUser)
//      .populate('tickets')
//      .then((event) => {
//          if(event.tickets){
//              // console.log(user.tickets)
//              res.render("users/tickets", { event });
//              console.log(event.tickets)
//          } else {
//              console.log("this user doesn't have tickets yet")
//              res.redirect("/events");
//          }
//      })
//      .catch((err) => next(err));
//   };

// module.exports.tickets = (req, res, next) => {
//    User.findById(res.locals.currentUser._id)
//      .populate("tickets")
//      .then((tickets) => {
//         console.log(tickets)
//          if (tickets) {
//          res.render("users/tickets", { tickets });
//        } else {
//          res.redirect("/events");
//        }
//      })
//      .catch((err) => next(err));
//  };


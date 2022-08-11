const mongoose = require("mongoose");
const { Event } = require("../models");

module.exports.list = (req, res, next) => {
  Event.find()
    .populate("author")
    .then((events) => {
      res.render("events/list", { events });
    })
    .catch((error) => next(error));
};

module.exports.detail = (req, res, next) => {
    Event.findById(req.params.id)
        .then((event) => res.render("events/detail", { event }))
        .catch((error) => next(error))
};

module.exports.new = (req, res, next) => {
    res.render("events/new");
};

module.exports.create = (req, res, next) => {
  const event = {
    ...req.body,
    author: req.user.id,
  };
    
    // return res.json(req.body)

    Event.create(event)
        .then((event) => res.redirect("/events"))
        .catch((error) => {
            if (error instanceof mongoose.Error.ValidationError) {
                console.error(error);
                res.render("events/new", { errors: error.errors, event });
              } else {
                next(error);
              }
            });
};
 

module.exports.delete = (req, res, next) => {
  Event.findById(req.params.id)
    .populate("author")
    .then((event) => {
     console.log(res.locals.currentUser)
     console.log(event.author)

      if(res.locals.currentUser._id.equals(event.author._id)){
        console.log("event")
        Event.findByIdAndRemove(req.params.id)
      .then(() => console.log("yuhuuuuuuuuu"))
      }
      res.redirect("/users/list")}
    )
    .catch((error) => next(error));
};


// res.locals.currentUser = user;
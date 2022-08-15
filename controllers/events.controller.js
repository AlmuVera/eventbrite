const mongoose = require("mongoose");
const { User, Event } = require("../models");

module.exports.list = (req, res, next) => {
  Event.find()
    .populate("author")
    .then((events) => {
      res.render("events/list", { events });
    })
    .catch((error) => next(error));
};

module.exports.detail = (req, res, next) => {
  let eventIsOwner;
  Event.findById(req.params.id)
    .populate("author")
    .then((eventdata) => {
      if (res.locals.currentUser.equals(eventdata.author._id)) {
        eventIsOwner = true;
      }
      return eventdata;
    })
    .then((event) => res.render("events/detail", { event, eventIsOwner }))
    .catch((error) => next(error));
};

module.exports.new = (req, res, next) => {
  res.render("events/new");
};

module.exports.create = (req, res, next) => {
  const event = {
    ...req.body,
    author: req.user.id,
  };

  if (req.file) {
    event.image = req.file.path;
    //el path viene de cloudinary
  } else {
    event.image =
      "https://www.telemadrid.es/2019/05/23/programas/madrid-trabaja/eventbrite_2124397588_7022681_1300x731.png";
  }
  console.log(req.file);

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

module.exports.update = (req, res, next) => {
  let eventIsOwner;
  Event.findById(req.params.id)
    .populate("author")
    .then((eventdata) => {
      if (res.locals.currentUser.equals(eventdata.author._id)) {
        eventIsOwner = true;
      }
      return eventdata;
    })
    .then((event) => {
      console.log(event);
      res.render("events/update", { event, eventIsOwner });
    })
    .catch((error) => next(error));
};

module.exports.doUpdate = (req, res, next) => {
  let eventIsOwner;
  Event.findById(req.params.id)
    .populate("author")
    .then((eventdata) => {
      if (res.locals.currentUser.equals(eventdata.author._id)) {
        eventIsOwner = true;
      }
      return eventdata;
    })
    .then((event) => {
      Event.findOneAndUpdate(
        { _id: req.params.id },
        {
          title: req.body.title,
          description: req.body.description,
          price: req.body.price,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          location: req.body.location,
          availability: req.body.availability,
        },
        { new: true }
      ).then((event) => {
        console.log(event);
        res.render("users/list", { event, eventIsOwner });
      });
    })
    .catch((error) => next(error));
};

module.exports.delete = (req, res, next) => {
  Event.findById(req.params.id)
    .populate("author")
    .then((event) => {
      if (res.locals.currentUser._id.equals(event.author._id)) {
        Event.findByIdAndRemove(req.params.id).then(() =>
          console.log("evento borrado")
        );
      }
      res.redirect("/users/list");
      
    })
    .catch((error) => next(error));
};
//tickets of the currentUser: users have tickets
module.exports.buyticket = (req, res, next) => {
  User.updateOne(
    { _id: res.locals.currentUser._id },
    { $addToSet: { tickets: req.params.id } }
  )
    .then((result) => {
      // console.log(`result of operation: ${result}`)
      res.render("users/tickets");
    })
    .catch((error) => next(error));
};
//revisar esto:

module.exports.buyticketconfirmation = (req, res, next) => {
  Event.findById(req.params.id)
    .then((event) => res.render("events/buyticket", { event }))
    .catch((error) => next(error));
};

// res.locals.currentUser = user;

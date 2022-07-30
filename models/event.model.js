
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {
    type: String,
    required: "El título es obligatorio",
    minLength: [5, "El título debe tener al menos 5 caracteres"],
  },
//   author: {
//     type: Schema.Types.ObjectId,
//     required: true,
//     ref: "User",
//   },
  description: {
    type: String,
    required: "El título es obligatorio",
    minLength: [10, "La descripción debe tener al menos 10 caracteres"],
  },
  image: {
    type: String,
    default: "https://play-lh.googleusercontent.com/OQ41QAbOAeAuXT4_BUlGcxs_lZOGxJ1L19uLOkvvf2gMfo6sfRkBxIMB7IbaCXEws55D",
    validate: {
      validator: function (image) {
        try {
          new URL(image);
          return true;
        } catch (error) {
          return false;
        }
      },
      message: (image) => `URL no válida`,
    },
  },
  date:{},
  location:{
    type: String,
  },

});

eventSchema.pre("validate", function (next) {
    this.image = this.image || undefined;
    next();
  });

const Event = mongoose.model("Event", eventSchema);

module.exports = Event




//         date: String,
//         location: String,
//         city: String,
//         price: Number,
//         organizer: String,
//         ticketStatus: String, //sold out or available   
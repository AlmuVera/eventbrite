//requiero Event  para que funcione el virtual
// const Event = require('./event.model')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const PW_PATTERN = /^.{8,}$/
const WORK_FACTOR = 10;

const userSchema = new Schema({
    name: {
        type: String,
        required: "El nombre de usuario es necesario",
        // unique:true,
        maxLength: [15, "Máximo 15 caracteres"],
        trim: true,
      },
      email: {
        type: String,
        required: "Introduce una dirección de correo electrónico válida.",
        unique: true,
        trim: true,
        lowercase: true,
        match: [EMAIL_PATTERN, "Correo electrónico no valido"],
      },
      password: {
        type: String,
        required: "La contraseña debe tener un mínimo de 8 caracteres",
        match: [PW_PATTERN, "La contraseña debe tener un mínimo de 8 caracteres"],
      },
      tickets: [{
        type: Schema.Types.ObjectId,
        ref: "Event",
      }],
     
 }
)
//para almacenar el password hasheado:
userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt
      .hash(this.password, WORK_FACTOR)
      .then((hash) => {
        this.password = hash;
        next();
      })
      .catch((error) => next(error));
  } else {
    next();
  }
});


userSchema.methods.checkPassword = function (passwordToCheck) {
  return bcrypt.compare(passwordToCheck, this.password);
};

// userSchema.virtual("tickets", {
//   ref: "Event",
//   localField: "_id", // on user model
//   foreignField: "author", // on event model
//   justOne: false,
// });


const User = mongoose.model("User", userSchema);
module.exports = User;
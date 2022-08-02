const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const PW_PATTERN = /^.{6,}$/
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
        required: "Es necesario introducir un email",
        unique: true,
        trim: true,
        lowercase: true,
        match: [EMAIL_PATTERN, "email no valido"],
      },
      password: {
        type: String,
        required: "La contraseña es necesaria",
        match: [PW_PATTERN, "Password necesita al menos 6 caracteres"],
      },
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

const User = mongoose.model("User", userSchema);
module.exports = User;
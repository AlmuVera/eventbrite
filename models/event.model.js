
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {
    type: String,
    required: "El título es obligatorio",
    minLength: [5, "El título debe tener al menos 5 caracteres"],
    uppercase: true,
  },
  image: {
    type: String,
    default: "https://www.telemadrid.es/2019/05/23/programas/madrid-trabaja/eventbrite_2124397588_7022681_1300x731.png",
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
  author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
  description: {
    type: String,
    required: "El título es obligatorio",
    minLength: [10, "La descripción debe tener al menos 10 caracteres"],
  },

  price:{
    type: Number,
    min: 0,
    required: ""
  },
  date:{ 
    type: Date, 
    default: Date.now 
  },
  location: {
    type: {
        type: String,
        enum: ["Point"],
        //required: true
    },
    coordinates: {
        type: [Number],
        //required: true,
    }
},




    //settear hora del evento:
//   start:{
//       type: Date,
//       required:"Elige una fecha para el evento",
//   },
//   end:{
//       type: Date,
//       required:"Elige una fecha para el evento"

//   },

//   organizer: String,(el mismo que el user que crea el evento)

//  

//   ticketStatus: String, //sold out or available  
 
});

eventSchema.pre("validate", function (next) {
    this.image = this.image || undefined;
    next();
  });

const Event = mongoose.model("Event", eventSchema);

module.exports = Event







  
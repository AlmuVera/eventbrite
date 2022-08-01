const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/eventbrite")
  .then(() => console.info("connected DB"))
  .catch((error) => console.error("error DB", error));
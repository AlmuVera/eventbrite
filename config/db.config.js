const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.info("connected DB"))
  .catch((error) => console.error("error DB", error));
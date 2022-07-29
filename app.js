const express = require("express");
const app = express();

app.set("views", __dirname + "/views")
app.set("view engine", "hbs")

//app.use(logger("dev"))
app.use(express.static(`${__dirname}/public`))
//para que la web recoja el body de las peticiones post:
app.use(express.urlencoded({ extended: false }))

// Router configuration
const routes = require("./config/routes.config.js");
app.use("/", routes);


require("./config/db.config")
require("./config/hbs.config")

app.listen(3000, () => console.log('on port 3000'))
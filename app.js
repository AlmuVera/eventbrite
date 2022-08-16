require('dotenv').config();
const express = require("express");
const logger = require("morgan");//DUDA: why we installed morgan?
const createError = require("http-errors");
const app = express();

require("./config/db.config")
require("./config/hbs.config")

app.set("views", __dirname + "/views")
app.set("view engine", "hbs")

//app.use(logger("dev"))
app.use(express.static(`${__dirname}/public`))
//para que la web recoja el body de las peticiones post:
app.use(express.urlencoded({ extended: false }))

//agregar aqui middelware para que la app lea cookies de session:
const { session, loadUser} = require("./config/session.config");
app.use(session);
app.use(loadUser);


app.use((req, res, next) => {
    //necesito esto ?
    // const path = req.path;
    // res.locals.title = path;
    // antes de day 3 modulo2 week 6 buscar en todo list
    //
    res.locals.googleApiKey = process.env.GOOGLE_API_KEY;
    res.locals.query = req.query //hace que la info de la query de los GET quede disponible en un subobjeto que se llama query para todas las vistas
    
    next();
})

// Router configuration
const routes = require("./config/routes.config");
app.use("/", routes);


// Error handling 404
app.use((req, res, next) => {
    next(createError(404, "Page not found"));
});
  
// Error handling 500
app.use((error, req, res, next) => {
    console.error(error);
    const message = error.message;
    const metadata = app.get("env") === "development" ? error : {};
    const status = error.status || 500;
    res.status(status).render(`errors/500`, { message, metadata });
});

app.listen(3000, () => console.log('on port 3000'))
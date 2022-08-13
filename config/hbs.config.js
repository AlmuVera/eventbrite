const hbs = require("hbs");
let addZero = (el) => ((el.toString().length == 1) ? '0' : '') + el.toString();

hbs.registerPartials(__dirname + "/../views/partials");

hbs.registerHelper("prettyDate", (date) => date?.toDateString());
hbs.registerHelper("prettyMonth", (date) => date?.getMonth()+1);
hbs.registerHelper("prettyDay", (date) => date?.getDate());
hbs.registerHelper("prettyHour", (date) => date?.getHours());
hbs.registerHelper("prettyMinutes", (date) => date?.getMinutes());
hbs.registerHelper("prettyYear", (date) => date?.getFullYear());
hbs.registerHelper("prettyZero", (date) => addZero(date.getMonth()+1));
hbs.registerHelper("prettyZeroHours", (date) => addZero(date.getHours()));
hbs.registerHelper("prettyZeroMinutes", (date) => addZero(date.getMinutes()));

hbs.registerHelper("lowerCase", (title) => title?.toLowerCase());


//Para crear opcion de si el precio es 0 aparezca que es gratis y usarlo en detalle y en lista.how to do it?

// hbs.registerHelper("isFree", function (event, options){
//     if (event.price === 0){
//         //quiero que salte el if
//         options.fn(this)
//     }else{
//         //quiero que salte el else
//         options.inverse(this)
//     }
// });


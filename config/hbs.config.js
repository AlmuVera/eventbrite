const hbs = require("hbs");

hbs.registerPartials(__dirname + "/../views/partials");

hbs.registerHelper("prettyDate", (date) => date?.toDateString());
hbs.registerHelper("prettyMonth", (date) => date?.getMonth()+1);
hbs.registerHelper("prettyDay", (date) => date?.getDate());
hbs.registerHelper("prettyTime", (date) => date?.toTimeString()());

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
//esto es pa borrar:
/* <form action="/events/{{event.id}}/buyticket" method="post">
    <button class="btn btn-primary " type="submit">Registrar</button>
</form> */
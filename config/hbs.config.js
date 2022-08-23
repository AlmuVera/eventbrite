const hbs = require("hbs");
hbs.registerPartials(__dirname + "/../views/partials");

let addZero = (el) => (el.toString().length == 1 ? "0" : "") + el.toString();

hbs.registerHelper("prettyDate", (date) => date?.toDateString());
// hbs.registerHelper("prettyMonth", (date) => date?.getMonth() + 1);
hbs.registerHelper("prettyMonth", (date) => date?.toLocaleString('default', { month: 'short' }));
hbs.registerHelper("prettyDay", (date) => date?.getDate());
hbs.registerHelper("prettyHour", (date) => date?.getHours());
hbs.registerHelper("prettyMinutes", (date) => date?.getMinutes());
hbs.registerHelper("prettyYear", (date) => date?.getFullYear());
hbs.registerHelper("prettyZero", (date) => addZero(date.getMonth() + 1));
hbs.registerHelper("prettyZeroHours", (date) => addZero(date.getHours()));
hbs.registerHelper("prettyZeroMinutes", (date) => addZero(date.getMinutes()));

hbs.registerHelper("lowerCase", (title) => title?.toLowerCase());

//mapa con todos los markers
hbs.registerHelper("markers", function (events) {
 
  const markers = events.reduce((markers, event) => {
    if (event.location?.coordinates) {
      const [lng, lat] = event.location?.coordinates;
      markers.push({ lng, lat, title: event.title });
    }
    return markers;
  }, []);
  return new hbs.SafeString(
    `<script>const gMarkers = ${JSON.stringify(markers)}</script>`
  );
});


hbs.registerHelper("marker", function (event) {
  const [ lng, lat ]  = event.location?.coordinates;
  const {title} = event;
  const marker = [{ title, lng, lat }];

  return new hbs.SafeString(
      `<script>const gMarkers = ${JSON.stringify(marker)}</script>`
    );
});

//I use it to add link to the map 
hbs.registerHelper("hasLocation", function (event, options) {
  if (event.location?.coordinates) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});







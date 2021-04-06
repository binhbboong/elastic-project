const routesShp = require('./routes_shakespeare');
const routesPrd = require('./routes_product');
const routesMon = require('./routes_monitoring');
const routesCovid = require('./routes_covid');


module.exports = (app) => {
  // Elasticsearch API
  routesShp(app);
  routesPrd(app);
  routesMon(app);
  routesCovid(app);
};

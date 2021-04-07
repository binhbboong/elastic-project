const CovidController = require('../controllers/covid_controller');

module.exports = (app) => {
  app.post('/api/covid/search', CovidController.search);
  app.post('/api/covid/top', CovidController.topCountries);
  app.get('/api/covid/list-countries', CovidController.listCountries);
  app.post('/api/covid/countries-by-date', CovidController.detail);
};
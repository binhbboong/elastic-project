const CovidController = require('../controllers/covid_controller');

module.exports = (app) => {
  app.post('/api/covid/search', CovidController.search);
};
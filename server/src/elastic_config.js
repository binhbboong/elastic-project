const elasticsearch = require('elasticsearch');

const esclient = new elasticsearch.Client({
  host: 'http://elastic:TKM6eNr2l5zXNM1pcYpk@139.177.188.110:9200/',
  // host: 'http://localhost:9200',
  log: 'info'
});

module.exports = esclient;

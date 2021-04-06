const esclient = require('../elastic_config');
const bodybuilder = require('bodybuilder');

const index = 'test2';
const type = '_doc';

module.exports = {
    search(req, res, next) {
        const { query } = req.body;
        console.log("🚀 ~ file: product_controller.js ~ line 76 ~ search ~ query", query)

        esclient.search({
            index,
            type,
            body: {
                query: {
                    match: {
                        countryRegion: query.countryRegion,
                    }     
                }
            }
        }).then((data) => {
            res.send(data.hits.hits);
        }).catch(next);
    },

    topCountries(req, res, next) {
        const { query } = req.body;
        var { field, startDate, endDate } = query
        
        startDate = Date.parse(startDate)
        startTime = new Date(startDate).toISOString()
        extendedStartTime = new Date(startDate - 24 * 60 * 60 * 1000).toISOString()
        endDate = Date.parse(endDate) 
        endTime = new Date(endDate).toISOString()
        extendedEndTime = new Date(endDate + 24 * 60 * 60 * 1000).toISOString()
        //console.log(startTime, endTime)

        esclient.search({
            index,
            type,
            body: {
                query: {
                    bool: {
                        must: [
                            {
                                range: {
                                    "@timestamp": {
                                        gte: extendedStartTime,
                                        lte: extendedEndTime,
                                    }
                                }
                            }
                        ]
                    }

                },
                aggs: {
                    perDay: {
                        date_histogram: {
                            field: '@timestamp',
                            interval: '1d'
                        },
                        aggs: {
                            groupByField: {
                                terms: {
                                    field: 'countryRegion',
                                    size: 10000,
                                },
                                aggs: {
                                    sumField: {
                                        sum: {
                                            field: field,
                                        }
                                    }
                                }
                            }
                        }
                    },

                },
                size: 0,
                _source: false
            }
        }).then((data) => {
            const allBuckets = data.aggregations.perDay.buckets
            var startData = {}, result = {}
            for (const idx in allBuckets) {
                item = allBuckets[idx]
                if (item['key_as_string'] === extendedStartTime) {
                    for (const c_idx in item.groupByField.buckets) {
                        const country = item.groupByField.buckets[c_idx]
                        startData[country.key] = country.sumField.value
                    }
                } else if (item['key_as_string'] === endTime) {
                    for (const c_idx in item.groupByField.buckets) {
                        const country = item.groupByField.buckets[c_idx]
                        if (country.key in startData) {
                            result[country.key] = country.sumField.value - startData[country.key]
                        } else {
                            result[country.key] = country.sumField.value
                        }
                    }
                }
            }

            result = Object.keys(result).map(function(key) {
                return {name: key, value: result[key]}
            })
            result.sort((a, b) => (a.value > b.value) ? 1 : -1).reverse()

            res.send(result.slice(0, 10));
        }).catch(next);
    },

    listCountries(req, res, next) {
        esclient.search({
            index,
            type,
            body: {
                query: {
                    match_all: {},
                },
                aggs : {
                    countries : {
                        terms : { field : "countryRegion",  "size" : 500 }
                    }
                },
                size: 0,
            }
        }).then((data) => {
            const buckets = data.aggregations.countries.buckets
            result = Object.keys(buckets).map(function(key) {
                return buckets[key].key
            })
            res.send(result);
        }).catch(next);
    },

    

};

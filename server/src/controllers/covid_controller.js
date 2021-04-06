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
    }
};

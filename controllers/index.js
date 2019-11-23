const path = require('path');
const dbCurrency = require('../models/dbCurrency');
const dbSettings = require('../models/dbSettings');

module.exports.getPage = async function (req, res) {
    const currency = await dbCurrency
        .gets()
        .catch((err) => {
            res
                .status(400)
                .json({ err: err.message });
        })

    const settings = await dbSettings
        .gets()
        .catch((err) => {
            res
                .status(400)
                .json({ err: err.message });
        })

    res.render('index', { currency, settings });
}

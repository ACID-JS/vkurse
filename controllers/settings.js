const db = require('../models/dbSettings');

module.exports.getSettings = function (req, res) {
    db
        .gets()
        .then((results) => {
            res.json(results);
        })
        .catch((err) => {
            res
                .status(400)
                .json({ err: err.message });
        })
};

module.exports.editSettings = function (req, res) {
    db
        .edit(req.body)
        .then((results) => {
            res
                .status(201)
                .json(results);
        })
        .catch((err) => {
            res
                .status(400)
                .json({ err: err.message });
        })
};
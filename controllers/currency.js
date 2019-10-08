const db = require('../models/db');

module.exports.getCurrency = function (req, res) {
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

module.exports.addCurrency = function (req, res) {
  db
    .add(req.body)
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

const db = require('../models/dbCurrency');

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

module.exports.deleteCurrencies = function (req, res) {
    db
        .delete(req.body)
        .then((results) => {
        console.log('results',results)
            res
                .status(200)
                .json({ message:results });
        })
        .catch((err) => {
            console.log('err',err)
            res
                .status(400)
                .json({ err: err.message });
        })
};

module.exports.editCurrency = function (req, res) {
    console.log(req.body);
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
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let currencySchema = new Schema({
  name: {
    type: String,
    required: [
      true, 'Укажите название валюты'
    ],
    unique: true,
    index: true,
  },
  courseBuy: {
    type: Number
  },
  courseSail: {
    type: Number
  },
});

const Currency = mongoose.model('currency', currencySchema);

module.exports = Currency;

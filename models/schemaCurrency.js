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
  description: {
    type: String,
    trim: true,
    maxLength: 300,
    default: null,
  },
});

const Currency = mongoose.model('currency', currencySchema);

module.exports = Currency;

const mongoose = require('mongoose');
const Currency = require('./schema');


const isNotValid = data => {
  let isName = !!data.name;
  let isCourseBuy = !!data.courseBuy;
  let isCourseSail = !!data.courseSail;

  return !isName || !isCourseBuy || !isCourseSail;
};


module.exports.gets = function () {
  return Currency.find()
};

module.exports.add = function (data) {
  if (isNotValid(data)) {
    return Promise.reject('Data format is not correct');
  }
  let newCurrency = new Currency({
    name: data.name,
    courseBuy: parseFloat(data.courseBuy),
    courseSail: parseFloat(data.courseSail),
  });

  return newCurrency.save()
};

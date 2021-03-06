const mongoose = require('mongoose');
const Currency = require('./schemaCurrency');


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
    courseBuy: data.courseBuy,
    courseSail: data.courseSail,
  });

  return newCurrency.save()
};


module.exports.edit = async function ({ name, ...restData}) {
    try {
        const currency = await Currency.findOneAndUpdate({ name }, { ...restData, updatedAt: Date.now() }, { new: true })

        return currency
    } catch(e) {
        return Promise.reject('Data format is not correct');
    }

};


module.exports.delete = async function ({ names }) {

  if(!names || !names.length) {
      return Promise.reject('Data format is not correct');
  }

  try {
      await Currency.deleteMany({ name: { $in: names}})

      return Promise.resolve('Currencies was successfully removed');
  } catch(e) {
      return Promise.reject('Data format is not correct');
  }

}


const mongoose = require('mongoose');
const Settings = require('./schemaSettings');

module.exports.gets = function () {
    return Settings.findOne();
};

module.exports.edit = async function (data) {
    try {
        const setting = await Settings.findOneAndUpdate({ }, { ...data }, { new: true })

        return setting
    } catch(e) {
        return Promise.reject('Data format is not correct');
    }

};

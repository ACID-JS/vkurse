let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let settingsSchema = new Schema({
    address: {
        type: String
    },
    location: {
        type: String
    },
    workTime: {
        type: String
    },
    wordDays: {
        type: String
    },
    phones: [String]
});

const Settings = mongoose.model('settings', settingsSchema);

module.exports = Settings;

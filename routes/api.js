const express = require('express');
const router = express.Router();
const ctrlCurrency = require('../controllers/currency');
const ctrlSettings = require('../controllers/settings');

router.get('/currency', ctrlCurrency.getCurrency);

router.post('/currency', ctrlCurrency.addCurrency);

router.delete('/currency', ctrlCurrency.deleteCurrencies);

router.patch('/currency', ctrlCurrency.editCurrency);


router.get('/settings', ctrlSettings.getSettings);

router.patch('/settings', ctrlSettings.editSettings);


module.exports = router;

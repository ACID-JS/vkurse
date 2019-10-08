const express = require('express');
const router = express.Router();
const ctrlCurrency = require('../controllers/currency');

router.get('/currency', ctrlCurrency.getCurrency);

router.post('/currency', ctrlCurrency.addCurrency);


module.exports = router;

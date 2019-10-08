const path = require('path');

module.exports.getPage = function (req, res) {
  res.render('index', { text: 'ПРИВЕТ VKURSE.DP.UA' });
}

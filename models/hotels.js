var db = require('../config/db');

var Hotels = db.Model.extend({
  tableName: 'hotels'
});

module.exports = Hotels;

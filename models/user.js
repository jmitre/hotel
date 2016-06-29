var db = require('../config/db');

var User = db.Model.extend({
  tableName: 'user'
});

module.exports = User;

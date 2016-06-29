exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', function (table) {
    table.increments(); // set up Primary Key ID field
    table.string('email');
    table.string('password');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user')
};

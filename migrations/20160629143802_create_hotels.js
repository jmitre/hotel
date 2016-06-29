exports.up = function(knex, Promise) {
  return knex.schema.createTable('hotels', function (table) {
    table.increments(); // set up Primary Key ID field
    table.string('name');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('hotels')
};

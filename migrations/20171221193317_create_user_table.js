
exports.up = function(knex, Promise) {
  return knex.schema.table('recipe', function (table) {
    table.integer('likes_count');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('recipe', function(table) {
    table.dropColumn('likes_count');
  });
};

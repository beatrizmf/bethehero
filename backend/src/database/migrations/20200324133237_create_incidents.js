exports.up = knex =>
  knex.schema.createTable('incidents', table => {
    table.increments();

    table.string('title');
    table.string('description').notNullable();
    table.decimal('value').notNullable();

    table.string('ong_id').notNullable();
    table.foreign('ong_id').references('id').inTable('ongs');
  });

exports.down = knex => knex.schema.dropTable('incidents');

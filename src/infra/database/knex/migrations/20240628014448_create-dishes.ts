import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('dishes', (table) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid())
    table.text('name').notNullable()
    table.text('description').notNullable()
    table.uuid('image_id').unique().notNullable()
    table.integer('price_in_cents').notNullable()

    table
      .uuid('category_id')
      .notNullable()
      .references('id')
      .inTable('categories')

    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('dishes')
}

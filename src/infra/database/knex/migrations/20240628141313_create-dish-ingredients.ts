import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('dish_ingredients', (table) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid())
    table.uuid('dish_id').notNullable().references('id').inTable('dishes')
    table.unique(['dish_id', 'ingredient_id'])

    table
      .uuid('ingredient_id')
      .notNullable()
      .references('id')
      .inTable('ingredients')

    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('dish_ingredients')
}

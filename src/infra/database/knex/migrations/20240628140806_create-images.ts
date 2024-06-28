import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('images', (table) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid())
    table.string('title').notNullable()
    table.string('url').notNullable()

    table.uuid('dish_id').unique().nullable().references('id').inTable('dishes')

    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('images')
}

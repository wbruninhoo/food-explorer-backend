import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid())
    table.text('name').notNullable()
    table.text('email').unique().notNullable()
    table.text('password_hash').notNullable()

    table
      .enum('role', ['admin', 'customer'], {
        useNative: true,
        enumName: 'roles',
      })
      .notNullable()
      .defaultTo('customer')

    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users')
}

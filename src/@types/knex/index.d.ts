// eslint-disable-next-line
import { Knex } from 'knex'
import { KnexCategory } from './knex-category'
import { KnexDish } from './knex-dish'
import { KnexUser } from './knex-user'

declare module 'knex/types/tables' {
  export interface Tables {
    categories: KnexCategory
    dishes: KnexDish
    users: KnexUser
  }
}

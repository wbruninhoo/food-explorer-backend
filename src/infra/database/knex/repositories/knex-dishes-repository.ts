import { DishesRepository } from '@/domain/dish/application/repositories/dishes-repository'
import { Remover } from '@/domain/dish/application/storage/remover'
import { Dish } from '@/domain/dish/enterprise/entities/dish'

import { knex } from '../knex'
import { KnexDishMapper } from '../mappers/knex-dish-mapper'

export class KnexDishesRepository implements DishesRepository {
  constructor(private remover: Remover) {}

  async create(dish: Dish): Promise<void> {
    const data = KnexDishMapper.toKnex(dish)

    await knex('dishes').insert(data)
  }

  async save(dish: Dish): Promise<void> {
    const data = KnexDishMapper.toKnex(dish)
    await knex('dishes').where('id', dish.id).update(data)
  }

  async delete(dish: Dish): Promise<void> {
    await this.remover.remove(dish.imageUrl)
    await knex('dishes').where('id', dish.id).del()
  }

  async findById(id: string): Promise<Dish | null> {
    const dish = await knex('dishes').where('id', id).first()

    if (!dish) {
      return null
    }

    return KnexDishMapper.toDomain(dish)
  }

  async findManyByQuery(query: string, page: number): Promise<Dish[]> {
    const limit = 20
    const offset = (page - 1) * limit

    let sql = `SELECT * FROM dishes WHERE `
    if (query.trim() !== '') {
      sql += `name LIKE '%${query}%' OR ingredients LIKE '%${query}%'`
    } else {
      sql += '1=1'
    }

    sql += ` LIMIT ${limit} OFFSET ${offset}`

    const results = await knex.raw(sql)

    const dishes: Dish[] = results.rows.map(KnexDishMapper.toDomain)

    return dishes
  }
}

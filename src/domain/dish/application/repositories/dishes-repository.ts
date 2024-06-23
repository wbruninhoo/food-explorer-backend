import { Dish } from '../../enterprise/entities/dish'

export interface DishesRepository {
  create(dish: Dish): Promise<void>
  save(dish: Dish): Promise<void>
  delete(dish: Dish): Promise<void>
  findById(id: string): Promise<Dish | null>
  findManyByQuery(query: string): Promise<Dish[] | []>
}

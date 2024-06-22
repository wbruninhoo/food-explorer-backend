import { Dish } from '../../enterprise/entities/dish'

export interface DishesRepository {
  findById(id: string): Promise<Dish | null>
  save(dish: Dish): Promise<void>
  create(dish: Dish): Promise<void>
  delete(dish: Dish): Promise<void>
}

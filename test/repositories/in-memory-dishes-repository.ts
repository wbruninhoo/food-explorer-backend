import { DishesRepository } from '@/domain/dish/application/repositories/dishes-repository'
import { Dish } from '@/domain/dish/enterprise/entities/dish'

import { InMemoryDishImagesRepository } from './in-memory-dish-images-repository'

export class InMemoryDishesRepository implements DishesRepository {
  public items: Dish[] = []

  constructor(private dishImagesRepository: InMemoryDishImagesRepository) {}

  async findById(id: string): Promise<Dish | null> {
    const dish = this.items.find((item) => item.id.toString() === id)

    return dish || null
  }

  async findManyByQuery(query: string): Promise<Dish[] | []> {
    const dishes =
      this.items
        .filter(
          (item) =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.ingredients.some((ingredient) =>
              ingredient.toLowerCase().includes(query.toLowerCase()),
            ),
        )
        .sort((a, b) => {
          return b.createdAt.getTime() - a.createdAt.getTime()
        }) || []

    return dishes
  }

  async save(dish: Dish): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === dish.id)

    this.items[itemIndex] = dish
  }

  async create(dish: Dish): Promise<void> {
    this.items.push(dish)
  }

  async delete(dish: Dish): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === dish.id)

    if (itemIndex >= 0) {
      this.items.splice(itemIndex, 1)
      await this.dishImagesRepository.deleteByDishId(dish.id.toString())
    }
  }
}

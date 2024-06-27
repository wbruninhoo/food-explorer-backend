import { DishesRepository } from '@/domain/dish/application/repositories/dishes-repository'
import { Dish } from '@/domain/dish/enterprise/entities/dish'

export class InMemoryDishesRepository implements DishesRepository {
  public items: Dish[] = []

  async findById(id: string): Promise<Dish | null> {
    const dish = this.items.find((item) => item.id.toString() === id)

    return dish || null
  }

  async findManyByQuery(query: string, page: number) {
    return this.items
      .filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.ingredients.some((ingredient) =>
            ingredient.toLowerCase().includes(query.toLowerCase()),
          ),
      )
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)
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
    }
  }
}

import { KnexDish } from '@/@types/knex/knex-dish'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Dish } from '@/domain/dish/enterprise/entities/dish'

export class KnexDishMapper {
  static toDomain(raw: KnexDish): Dish {
    return Dish.create(
      {
        categoryId: new UniqueEntityID(raw.category_id),
        name: raw.name,
        description: raw.description,
        ingredients: raw.ingredients,
        imageUrl: raw.image_url,
        priceInCents: raw.price_in_cents,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toKnex(dish: Dish): KnexDish {
    return {
      id: dish.id.toString(),
      category_id: dish.categoryId.toString(),
      name: dish.name,
      description: dish.description,
      ingredients: dish.ingredients,
      image_url: dish.imageUrl,
      price_in_cents: dish.priceInCents,
      created_at: dish.createdAt,
      updated_at: dish.updatedAt,
    }
  }
}

import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface DishProps {
  dishId?: UniqueEntityID
  imageUrl: string
  imageId: UniqueEntityID
  categoryId: UniqueEntityID
  name: string
  description: string
  priceInCents: number
  ingredients: string[]
  createdAt: Date
  updatedAt?: Date
}

export class Dish extends Entity<DishProps> {
  get dishId() {
    return this.props.dishId
  }

  get imageUrl() {
    return this.props.imageUrl
  }

  get imageId() {
    return this.props.imageId
  }

  get categoryId() {
    return this.props.categoryId
  }

  get name() {
    return this.props.name
  }

  get description() {
    return this.props.description
  }

  get priceInCents() {
    return this.props.priceInCents
  }

  get ingredients() {
    return this.props.ingredients
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: Optional<DishProps, 'createdAt'>, id?: UniqueEntityID) {
    const dish = new Dish(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return dish
  }
}

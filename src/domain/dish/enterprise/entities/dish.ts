import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface DishProps {
  dishId?: UniqueEntityID
  imageUrl: string
  categoryId: UniqueEntityID
  name: string
  description: string
  priceInCents: number
  ingredients: string[]
  createdAt: Date
  updatedAt?: Date | null
}

export class Dish extends Entity<DishProps> {
  get dishId() {
    return this.props.dishId
  }

  get imageUrl() {
    return this.props.imageUrl
  }

  set imageUrl(value: string) {
    this.props.imageUrl = value
    this.touch()
  }

  get categoryId() {
    return this.props.categoryId
  }

  get name() {
    return this.props.name
  }

  set name(value: string) {
    this.props.name = value
    this.touch()
  }

  get description() {
    return this.props.description
  }

  set description(value: string) {
    this.props.description = value
    this.touch()
  }

  get priceInCents() {
    return this.props.priceInCents
  }

  set priceInCents(value: number) {
    this.props.priceInCents = value
    this.touch()
  }

  get ingredients() {
    return this.props.ingredients
  }

  set ingredients(value: string[]) {
    this.props.ingredients = value
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
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

import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface DishImageProps {
  title: string
  url: string
  dishId: UniqueEntityID
}

export class DishImage extends Entity<DishImageProps> {
  get title() {
    return this.props.title
  }

  get url() {
    return this.props.url
  }

  get dishId() {
    return this.props.dishId
  }

  static create(props: DishImageProps, id?: UniqueEntityID) {
    const dishImage = new DishImage(
      {
        ...props,
      },
      id,
    )

    return dishImage
  }
}

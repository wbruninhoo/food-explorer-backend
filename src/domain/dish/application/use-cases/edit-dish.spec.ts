import { makeCategory } from 'test/factories/make-category'
import { makeDish } from 'test/factories/make-dish'
import { makeDishImage } from 'test/factories/make-dish-image'
import { InMemoryCategoriesRepository } from 'test/repositories/in-memory-categories-repository'
import { InMemoryDishImagesRepository } from 'test/repositories/in-memory-dish-images-repository'
import { InMemoryDishesRepository } from 'test/repositories/in-memory-dishes-repository'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { EditDishUseCase } from './edit-dish'

let inMemoryCategoriesRepository: InMemoryCategoriesRepository
let inMemoryDishImagesRepository: InMemoryDishImagesRepository
let inMemoryDishesRepository: InMemoryDishesRepository

let sut: EditDishUseCase

describe('Edit Dish', () => {
  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository()
    inMemoryDishImagesRepository = new InMemoryDishImagesRepository()
    inMemoryDishesRepository = new InMemoryDishesRepository(
      inMemoryDishImagesRepository,
    )

    sut = new EditDishUseCase(inMemoryDishesRepository)
  })

  it('should be able to edit a dish', async () => {
    const dishId = 'dish-1'

    const category = makeCategory()
    inMemoryCategoriesRepository.items.push(category)

    const dishImage = makeDishImage({
      dishId: new UniqueEntityID(dishId),
    })

    inMemoryDishImagesRepository.items.push(dishImage)

    const dish = makeDish({})
    console.log(dish)

    inMemoryDishesRepository.items.push(dish)

    const result = await sut.execute({
      dishId: dish.id.toString(),
      categoryId: 'category-2',
      imageId: 'image-2',
      imageUrl: 'https://exemple.com',
      ingredients: ['batata', 'mussarela'],
      name: 'Salada Ravanello',
      description:
        'Rabanetes, folhas verdes e molho agridoce salpicados com gergelim.',
      priceInCents: 1000,
    })

    console.log(result.value)

    expect(result.isRight()).toBe(true)
    expect(inMemoryDishesRepository.items[0]).toEqual(
      expect.objectContaining({
        name: 'Salada Ravanello',
        description:
          'Rabanetes, folhas verdes e molho agridoce salpicados com gergelim.',
        priceInCents: 1000,
      }),
    )
    expect(inMemoryDishesRepository.items[0].ingredients).toHaveLength(2)
  })
})

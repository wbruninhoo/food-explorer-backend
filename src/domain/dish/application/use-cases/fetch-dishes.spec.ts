import { makeCategory } from 'test/factories/make-category'
import { makeDish } from 'test/factories/make-dish'
import { makeDishImage } from 'test/factories/make-dish-image'
import { InMemoryCategoriesRepository } from 'test/repositories/in-memory-categories-repository'
import { InMemoryDishImagesRepository } from 'test/repositories/in-memory-dish-images-repository'
import { InMemoryDishesRepository } from 'test/repositories/in-memory-dishes-repository'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { FetchDishesUseCase } from './fetch-dishes'

let inMemoryCategoriesRepository: InMemoryCategoriesRepository
let inMemoryDishImagesRepository: InMemoryDishImagesRepository
let inMemoryDishesRepository: InMemoryDishesRepository

let sut: FetchDishesUseCase

describe('Fetch Dishes', () => {
  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository()
    inMemoryDishImagesRepository = new InMemoryDishImagesRepository()
    inMemoryDishesRepository = new InMemoryDishesRepository()
    sut = new FetchDishesUseCase(inMemoryDishesRepository)
  })

  it('should be able to fetch dishes', async () => {
    const dishId1 = 'dish-1'
    const dishId2 = 'dish-2'
    const dishId3 = 'dish-3'

    const category = makeCategory()
    inMemoryCategoriesRepository.items.push(category)

    const dishImage1 = makeDishImage({
      dishId: new UniqueEntityID(dishId1),
    })

    const dishImage2 = makeDishImage({
      dishId: new UniqueEntityID(dishId2),
    })

    const dishImage3 = makeDishImage({
      dishId: new UniqueEntityID(dishId3),
    })

    inMemoryDishImagesRepository.items.push(dishImage1, dishImage2, dishImage3)

    const dish1 = makeDish(
      {
        categoryId: category.id,
        imageId: dishImage1.id,
        imageUrl: dishImage1.url,
        name: 'Moqueca Capixaba',
        ingredients: ['Peixe fresco', 'Leite de coco', 'Azeite de dendê'],
      },
      new UniqueEntityID(dishId1),
    )

    const dish2 = makeDish(
      {
        categoryId: category.id,
        imageId: dishImage2.id,
        imageUrl: dishImage2.url,
        name: 'Frango Xacré',
        ingredients: ['Peito de frango cortado em cubos', 'Tucupi', 'Urucum'],
      },
      new UniqueEntityID(dishId2),
    )

    const dish3 = makeDish(
      {
        categoryId: category.id,
        imageId: dishImage3.id,
        imageUrl: dishImage3.url,
        name: 'Ravioli de Abóbora',
        ingredients: [
          'Massa fresca para ravioli',
          'Abóbora cozida e amassada',
          'Queijo ricotta',
        ],
      },
      new UniqueEntityID(dishId3),
    )

    inMemoryDishesRepository.items.push(dish1, dish2, dish3)

    const result = await sut.execute({ query: '' })

    expect(result.isRight()).toBe(true)
    expect(result.value?.dishes).toHaveLength(3)
  })

  it('should be able to fetch dishes by query', async () => {
    const dishId1 = 'dish-1'
    const dishId2 = 'dish-2'
    const dishId3 = 'dish-3'

    const category = makeCategory()
    inMemoryCategoriesRepository.items.push(category)

    const dishImage1 = makeDishImage({
      dishId: new UniqueEntityID(dishId1),
    })

    const dishImage2 = makeDishImage({
      dishId: new UniqueEntityID(dishId2),
    })

    const dishImage3 = makeDishImage({
      dishId: new UniqueEntityID(dishId3),
    })

    inMemoryDishImagesRepository.items.push(dishImage1, dishImage2, dishImage3)

    const dish1 = makeDish(
      {
        categoryId: category.id,
        imageId: dishImage1.id,
        imageUrl: dishImage1.url,
        name: 'Moqueca Capixaba',
        ingredients: ['Peixe fresco', 'Leite de coco', 'Azeite de dendê'],
      },
      new UniqueEntityID(dishId1),
    )

    const dish2 = makeDish(
      {
        categoryId: category.id,
        imageId: dishImage2.id,
        imageUrl: dishImage2.url,
        name: 'Frango Xacré',
        ingredients: ['Peito de frango cortado em cubos', 'Tucupi', 'Urucum'],
      },
      new UniqueEntityID(dishId2),
    )

    const dish3 = makeDish(
      {
        categoryId: category.id,
        imageId: dishImage3.id,
        imageUrl: dishImage3.url,
        name: 'Ravioli de Abóbora',
        ingredients: [
          'Massa fresca para ravioli',
          'Abóbora cozida e amassada',
          'Queijo ricotta',
        ],
      },
      new UniqueEntityID(dishId3),
    )

    inMemoryDishesRepository.items.push(dish1, dish2, dish3)

    const result = await sut.execute({ query: 'peito' })

    expect(result.isRight()).toBe(true)
    expect(result.value?.dishes).toHaveLength(1)
  })
})

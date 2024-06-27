import { container } from 'tsyringe'

import { AdminsRepository } from '@/domain/account/application/repositories/admins-repository'
import { CustomersRepository } from '@/domain/account/application/repositories/customers-repository'
import { UsersRepository } from '@/domain/account/application/repositories/users-repository'
import { CategoriesRepository } from '@/domain/dish/application/repositories/categories-repository'
import { DishesRepository } from '@/domain/dish/application/repositories/dishes-repository'
import { KnexAdminsRepository } from '@/infra/database/knex/repositories/knex-admins-repository'
import { KnexCategoriesRepository } from '@/infra/database/knex/repositories/knex-categories-repository'
import { KnexCustomersRepository } from '@/infra/database/knex/repositories/knex-customers-repository'
import { KnexDishesRepository } from '@/infra/database/knex/repositories/knex-dishes-repository'
import { KnexUsersRepository } from '@/infra/database/knex/repositories/knex-users-repository'

container.registerSingleton<AdminsRepository>(
  'AdminsRepository',
  KnexAdminsRepository,
)

container.registerSingleton<CustomersRepository>(
  'CustomersRepository',
  KnexCustomersRepository,
)

container.registerSingleton<CategoriesRepository>(
  'CategoriesRepository',
  KnexCategoriesRepository,
)

container.registerSingleton<DishesRepository>(
  'DishesRepository',
  KnexDishesRepository,
)

container.registerSingleton<UsersRepository>(
  'UsersRepository',
  KnexUsersRepository,
)

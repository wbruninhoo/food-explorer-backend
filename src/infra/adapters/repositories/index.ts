import { container } from 'tsyringe'

import { AdminsRepository } from '@/domain/account/application/repositories/admins-repository'
import { CustomersRepository } from '@/domain/account/application/repositories/customers-repository'
import { UsersRepository } from '@/domain/account/application/repositories/users-repository'
import { KnexAdminsRepository } from '@/infra/database/knex/repositories/knex-admins-repository'
import { KnexCustomersRepository } from '@/infra/database/knex/repositories/knex-customers-repository'
import { KnexUsersRepository } from '@/infra/database/knex/repositories/knex-users-repository'

container.registerSingleton<AdminsRepository>(
  'AdminsRepository',
  KnexAdminsRepository,
)

container.registerSingleton<CustomersRepository>(
  'CustomersRepository',
  KnexCustomersRepository,
)

container.registerSingleton<UsersRepository>(
  'UsersRepository',
  KnexUsersRepository,
)

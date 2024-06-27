import { Knex } from 'knex'

import { env } from '@/infra/env'

export const config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: env.DATABASE_URL,
  },
  migrations: {
    extension: 'ts',
    directory: './src/infra/database/knex/migrations',
  },
  useNullAsDefault: true,
}

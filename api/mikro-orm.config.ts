import { defineConfig } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';

export default defineConfig({
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  password: 'cover_password',
  dbName: 'cover_db',
  user: 'cover_user',
  host: 'postgres',
  forceUtcTimezone: true,
  extensions: [Migrator],
});

import { DataSource, DataSourceOptions } from 'typeorm';
import { CONFIG_PRIV } from "../config/config";

export const dataSource = new DataSource({
  type: CONFIG_PRIV.db.DB_TYPE,
  host: CONFIG_PRIV.db.DB_HOST,
  port: CONFIG_PRIV.db.DB_PORT,
  username: CONFIG_PRIV.db.DB_USER_NAME,
  password: CONFIG_PRIV.db.DB_PASSWORD,
  database: CONFIG_PRIV.db.DB_DATABASE_NAME,
  entities: ['dist//**/**.entity{.ts,.js}'],
  bigNumberStrings: false,
  logging: true,
  synchronize: true,
  // migrations:["dist/migration/*.js"],
  // cli:{
  //   migrationsDir:"migration"
  // }
} as DataSourceOptions)

export const databaseProviders = [
  {
    provide: ' Dynamic_Module',
    useFactory:  () => {
      return dataSource.initialize();
      }
  },
];



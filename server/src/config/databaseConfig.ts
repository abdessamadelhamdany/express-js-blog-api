import { MySQL } from '../interfaces';

const jsEntities = ['out/src/modules/**/models/*.js'];
const tsEntities = ['src/modules/**/models/*.ts'];

export const databaseConfig = (): MySQL => ({
  type: process.env.DB_CONNECTION === 'mysql' ? 'mysql' : 'mariadb',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  synchronize: true,
  logging: false,
  entities: process.env.NODE_ENV === 'production' ? jsEntities : tsEntities,
});

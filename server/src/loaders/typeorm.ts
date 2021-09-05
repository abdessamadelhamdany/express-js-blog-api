import { MySQL } from '@/src/interfaces/Database';
import { createConnection, Connection } from 'typeorm';

const startDatabase = async (databaseConfig: MySQL) => {
  const connection: Connection = await createConnection(databaseConfig);
  return connection;
};

export default startDatabase;

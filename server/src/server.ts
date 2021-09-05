require('dotenv').config();
import 'reflect-metadata';
import App from './app';
import { databaseConfig } from './config';
import startDatabase from './loaders/typeorm';

(async () => {
  try {
    await startDatabase(databaseConfig());
    console.log('Database connected successfully.');

    const app = new App();
    const port = parseInt(process.env.PORT, 10) || 3000;

    app.defaultApp.listen(port, (err?: any) => {
      if (err) {
        throw err;
      }

      console.log(`Server listening on http://localhost:${port}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

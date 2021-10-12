import fs from 'fs';
import path from 'path';
import { IRoute } from 'src/interfaces';
import DocsInterfaces from './docs.interfaces';

const service = {
  getAllApiDocs(): DocsInterfaces.IDocs {
    const docsRoutes: DocsInterfaces.IDocsRoute = {};

    const moduleDirs = fs.readdirSync(path.join(__dirname, '..'), { encoding: 'utf8' }).filter((file) => {
      const filePath = path.join(__dirname, '..', file);
      return fs.lstatSync(filePath).isDirectory();
    });

    moduleDirs.forEach((module) => {
      const moduleRoutes: IRoute[] = require(path.join(__dirname, '..', `${module}/${module}.routes`)).default;

      docsRoutes[module] = [];

      moduleRoutes.forEach((route) => {
        docsRoutes[module].push(route);
      });
    });

    return {
      docsRoutes,
    };
  },
};

export default service;

import fs from 'fs';
import path from 'path';
import express from 'express';
import { IRoute } from '../interfaces';

export default {
  getRoutes: (): IRoute[] => {
    const routes: IRoute[] = [];

    const moduleDirs = fs.readdirSync(__dirname, { encoding: 'utf8' }).filter((file) => {
      const filePath = path.join(__dirname, file);
      return fs.lstatSync(filePath).isDirectory();
    });

    const globalMiddlewares: { [key: string]: express.Handler } = require(`../middlewares`).default;

    moduleDirs.forEach((module) => {
      const moduleRoutes: IRoute[] = require(`./${module}/${module}.routes`).default;
      const moduleActions: { [key: string]: express.Handler } = require(`./${module}/${module}.actions`).default;
      const moduleMiddlewares: { [key: string]: express.Handler } =
        require(`./${module}/${module}.middlewares`).default;

      if (typeof moduleRoutes === 'undefined') {
        throw `File "${module}.routes.ts" was not found or is not a module.`;
      }

      if (typeof moduleActions === 'undefined') {
        throw `File "${module}.actions.ts" was not found or is not a module.`;
      }

      moduleRoutes.forEach((moduleRoute) => {
        const route = { ...moduleRoute };

        if (typeof route.action === 'string') {
          if (typeof moduleActions[route.action] === 'undefined') {
            throw `Action "${route.action}" was not found on "${module}.actions.ts" file.`;
          }

          route.action = moduleActions[route.action];
        }

        route.middlewares.forEach((middleware, index) => {
          if (typeof middleware == 'string') {
            if (middleware.startsWith('global::')) {
              const middlewareKey = middleware.replace('global::', '');

              if (typeof globalMiddlewares[middlewareKey] === 'undefined') {
                throw `Middleware "${middleware}" is not defined, found on "${module}::${route.name || route.path}".`;
              }

              route.middlewares[index] = globalMiddlewares[middlewareKey];
              return;
            }

            if (typeof moduleMiddlewares[middleware] === 'undefined') {
              throw `Middleware "${middleware}" is not defined, found on "${module}::${route.name || route.path}".`;
            }

            route.middlewares[index] = moduleMiddlewares[middleware];
          }
        });

        routes.push(route);
      });
    });

    return routes;
  },
};

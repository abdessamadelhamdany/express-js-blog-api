import fs from 'fs';
import express from 'express';

const middlewares: { [key: string]: express.Handler } = {};

const middlewareFiles = fs.readdirSync(__dirname, { encoding: 'utf8' }).filter((file) => {
  return /.middleware.(js|ts)$/i.test(file);
});

middlewareFiles.forEach((middlewareFile) => {
  const middleware: express.Handler = require(`./${middlewareFile}`).default;
  const middlewareKey = middlewareFile.replace(/.middleware.(js|ts)$/i, '');
  middlewares[middlewareKey] = middleware;
});

export default middlewares;

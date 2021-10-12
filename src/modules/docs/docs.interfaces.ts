import express from 'express';
import { IRoute } from 'src/interfaces';

namespace DocsInterfaces {
  export type IDocsRoute = { [key: string]: IRoute[] };

  export interface IDocs {
    docsRoutes: IDocsRoute;
  }

  export interface IDocsActions {
    index: express.Handler;
  }
}

export default DocsInterfaces;

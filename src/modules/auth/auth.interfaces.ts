import express from 'express';

namespace AuthInterfaces {
  export interface LoginParams {
    username: string;
    password: string;
  }

  export interface IAuthActions {
    login: express.Handler;
    register: express.Handler;
  }
}

export default AuthInterfaces;

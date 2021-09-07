import express from 'express';

export interface LoginParams {
  username: string;
  password: string;
}

export interface IAuthActions {
  login: express.Handler;
}

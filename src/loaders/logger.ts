import { Debugger } from 'debug';
import colors from 'colors';
import * as dateFn from 'date-fns';

const debug: Debugger = require('debug')('APP');

export default {
  info: (...args: any[]) => {
    const now = new Date();
    const timestamp = dateFn.format(now, 'HH:MM:ss');
    console.log(colors.green('[INFO]'), colors.bold(colors.grey(timestamp)), ...args);
  },

  warn: (...args: any[]) => {
    const now = new Date();
    const timestamp = dateFn.format(now, 'HH:MM:ss');
    console.log(colors.yellow('[WARN]'), colors.bold(colors.grey(timestamp)), ...args);
  },

  debug(...args: any[]) {
    debug(colors.magenta('[DEBUG]'), ...args);
  },

  error: (...args: any[]) => {
    const now = new Date();
    const timestamp = dateFn.format(now, 'HH:MM:ss');
    console.log(colors.red('[ERROR]'), colors.bold(colors.grey(timestamp)), ...args);
  },
};

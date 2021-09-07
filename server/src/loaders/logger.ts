import { Debugger } from 'debug';
import colors from 'colors';
import dateFormat from 'dateformat';

const debug: Debugger = require('debug')('APP');

export default {
  info: (message: any) => {
    const now = new Date();
    const timestamp = dateFormat(now, 'HH:MM:ss');
    console.log(colors.green('[INFO]'), colors.bold(colors.grey(timestamp)), message);
  },

  warn: (message: any) => {
    const now = new Date();
    const timestamp = dateFormat(now, 'HH:MM:ss');
    console.log(colors.yellow('[WARN]'), colors.bold(colors.grey(timestamp)), message);
  },

  debug(message) {
    debug(colors.magenta('[DEBUG]'), message);
  },

  error: (message: any) => {
    const now = new Date();
    const timestamp = dateFormat(now, 'HH:MM:ss');
    console.log(colors.red('[ERROR]'), colors.bold(colors.grey(timestamp)), message);
  },
};

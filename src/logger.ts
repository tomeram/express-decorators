import debug from 'debug';

const log = debug('decorators');

export const logger = {
	info: (...args: any[]) => console.log(...args),
	debug: (msg: any, ...args: any[]) => log(msg, ...args)
};

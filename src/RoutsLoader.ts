import {Router} from 'express';
import {getControllerPath , getEndpointPath, getBodyParam, getPathParams} from './decorators';
import {logger} from './logger';
import {HttpError} from './errors/HttpError';

type Route = {
	method: string,
	path: string,
	handler: string
};

const routes: Route[] = [];

export function loadRoutes(app, ctrl): void {
	const router = Router();
	const ctrlPath = getControllerPath(ctrl.constructor);
	const proto = ctrl.constructor.prototype;
	const props = Object.getOwnPropertyNames(proto);
	
	for (let prop of props) {
		
		if (typeof proto[prop] === 'function' && prop !== 'constructor') {
			const bodyParam = getBodyParam(proto, prop);
			const pathParams = getPathParams(proto, prop);
			const methodRoute = getEndpointPath(ctrl, prop);

			if (methodRoute.method == null) continue;

			logger.debug('prop:', prop, 'path:', getEndpointPath(ctrl, prop));

			routes.push({
				method: methodRoute.method.toUpperCase(),
				path: ctrlPath + methodRoute.path,
				handler: ctrl.constructor.name + '.' + prop
			});

			router[methodRoute.method](methodRoute.path, async (req, res, next) => {
				const params = [];

				if (bodyParam != null) params[bodyParam] = req.body;
				if (pathParams != null) {
					for (const param of Object.keys(pathParams)) {
						params[pathParams[param]] = req.params[param];
					}
				}

				try {
					const result = await ctrl[prop](...params);
					res.send(result);

					logger.info(`${new Date().toUTCString()} ${methodRoute.method.toUpperCase()} ${ctrlPath + methodRoute.path} returned 200`);
				} catch (error) {
					if (error instanceof HttpError) {
						logger.info(`${new Date().toUTCString()} ${methodRoute.method.toUpperCase()} ${ctrlPath + methodRoute.path} returned ${error.status}`);
					} else {
						logger.info(`${new Date().toUTCString()} ${methodRoute.method.toUpperCase()} ${ctrlPath + methodRoute.path} returned 500`);
					}

					return next(error);
				}
			});
		}
	}

	app.use(ctrlPath, router);
}

export function printRoutes() {
	console.table(routes);
}

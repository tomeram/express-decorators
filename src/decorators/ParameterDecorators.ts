const bodySym = 'body';
const pathSym = 'path';

export function Body(target: Object, propertyKey: string | symbol, parameterIndex: number) {
	Reflect.defineMetadata(bodySym, parameterIndex, target, propertyKey);
}

export function PathParam(name: string): ParameterDecorator {
	return (target: Object, propertyKey: string | symbol, parameterIndex: number) => {
		const pathParams = Reflect.getOwnMetadata(pathSym, target, propertyKey) ?? {};
		pathParams[name] = parameterIndex;

		Reflect.defineMetadata(pathSym, pathParams, target, propertyKey);
	}
}

export function getBodyParam(target: any, propertyName: string): number {
	return Reflect.getOwnMetadata(bodySym, target, propertyName);
}

export function getPathParams(target: any, propertyName: string): number {
	return Reflect.getOwnMetadata(pathSym, target, propertyName);
}

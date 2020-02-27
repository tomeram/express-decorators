import 'reflect-metadata';

const pathSym = 'path';
const methodSym = 'method';

export enum HttpMethod {
	GET = 'get',
	POST = 'post',
	PUT = 'put',
	DELETE = 'delete'
}

type PathTypes = string | RegExp | Array<string | RegExp>;

export type MethodPath = {
	path: PathTypes,
	method: HttpMethod
};

export function Get(path: PathTypes = '') {
	return (target: any, key: string | symbol, descriptor: PropertyDescriptor) => {
		Reflect.defineMetadata(pathSym, path, descriptor.value);
		Reflect.defineMetadata(methodSym, HttpMethod.GET, descriptor.value);

		return descriptor;
	};
}

export function Post(path: PathTypes = '') {
	return (target: any, key: string|symbol, descriptor: PropertyDescriptor) => {
		Reflect.defineMetadata(pathSym, path, descriptor.value);
		Reflect.defineMetadata(methodSym, HttpMethod.POST, descriptor.value);

		return descriptor;
	};
}

export function Put(path: PathTypes = '') {
	return (target: any, key: string|symbol, descriptor: PropertyDescriptor) => {
		Reflect.defineMetadata(pathSym, path, descriptor.value);
		Reflect.defineMetadata(methodSym, HttpMethod.PUT, descriptor.value);

		return descriptor;
	};
}

export function Delete(path: PathTypes = '') {
	return (target: any, key: string|symbol, descriptor: PropertyDescriptor) => {
		Reflect.defineMetadata(pathSym, path, descriptor.value);
		Reflect.defineMetadata(methodSym, HttpMethod.DELETE, descriptor.value);

		return descriptor;
	};
}

export function getEndpointPath(target: any, propertyKey: string): MethodPath {
	return {
		path: Reflect.getMetadata(pathSym, target[propertyKey]),
		method: Reflect.getMetadata(methodSym, target[propertyKey])
	};
}

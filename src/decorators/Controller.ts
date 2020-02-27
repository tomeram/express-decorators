const pathSym = 'path';

export function Controller(path: string = '') {
  return (target: new() => any) => Reflect.defineMetadata(pathSym, path, target);
}

export function getControllerPath(target: any): string {
	return Reflect.getMetadata(pathSym, target);
}

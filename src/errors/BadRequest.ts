import {HttpError} from './HttpError';

export class BadRequest extends HttpError {
	constructor(message: string) {
		super(message, 400);
	}
}

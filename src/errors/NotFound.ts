import {HttpError} from './HttpError';

export class NotFound extends HttpError {
	constructor(message: string) {
		super(message, 404);
	}
}

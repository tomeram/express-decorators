export class HttpError extends Error {
	constructor(message: string, private readonly status: number) {
		super(message);
	}
}

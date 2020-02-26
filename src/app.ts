import express from 'express';
import bodyParser from 'body-parser';
import {PostsRouter} from './PostsRoutes';
import {NotFound} from './errors';

const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(bodyParser.json());

app.use('/posts', PostsRouter);

// Not found middleware
app.use((req, _res, next) => {
	next(new NotFound(`path ${req.path} does not match any existing path`));
});

// Error middleware
app.use((err, _req, res, _next) => {
	if (err == null) {
		err = new Error();
	}

	if (err.status == null) {
		err.status = 500;
	}

	res.status(err.status).send({
		status: err.status,
		message: err.message
	});
});

app.listen(PORT, () => {
	console.log('server started on port', PORT);
});

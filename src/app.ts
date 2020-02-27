import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import {NotFound} from './errors';
import {PostsCtrl} from './controllers/PostsCtrl';
import {loadRoutes, printRoutes} from './RoutsLoader';
import {logger} from './logger';

const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(bodyParser.json());

const postsCtrl = new PostsCtrl();
loadRoutes(app, postsCtrl);
printRoutes();

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
	logger.info('server started on port', PORT);
});

import {Router} from 'express';
import {Post} from './models/Post';
import {getAll as getAllPosts, createPost, getPostById, deletePostById} from './services/PostsService';
import {BadRequest, Conflict, NotFound} from './errors';

export const PostsRouter = Router();

PostsRouter.get('/', (req, res, next) => {
	res.send(getAllPosts());
});

PostsRouter.get('/:post_id', (req, res, next) => {
	const id = req.params.post_id;
	const post = getPostById(Number(id));

	if (post == null) {
		return next(new NotFound(`Post ${id} does not exist`));
	}

	res.send(post);
});

PostsRouter.post('/', (req, res, next) => {
	const post: Post = req.body;

	if (post == null) {
		return next(new BadRequest('No post was supplied'));
	} else if (post.body == null) {
		return next(new BadRequest('Post is missing required field, body'));
	} else if (post.id != null && getPostById(post.id) != null) {
		return next(new Conflict(`Post with id ${post.id} already exists`))
	}

	res.status(201).send(createPost(post));
});

PostsRouter.delete('/:post_id', (req, res, next) => {
	const id = Number(req.params.post_id);
	const post = getPostById(id);

	if (post == null) {
		return next(new NotFound(`Post ${id} does not exist`));
	}

	deletePostById(id);

	res.status(204).send();
});

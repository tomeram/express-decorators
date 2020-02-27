import {Controller, Get, Post, Delete, PathParam, Body} from '../decorators';
import * as postsService from '../services/PostsService';
import {NotFound, BadRequest, Conflict} from '../errors';
import {PostDto} from '../models/PostDto';

@Controller('/posts')
export class PostsCtrl {
	@Get()
	getAllPosts() {
		return postsService.getAll();
	}

	@Get('/:post_id')
	getPostByID(@PathParam('post_id') postID: string) {
		const post = postsService.getPostById(Number(postID));

		if (post == null) {
			throw new NotFound(`Post ${postID} does not exist`);
		}

		return post;
	}

	@Post()
	createPost(@Body post: PostDto) {
		if (post == null) {
			throw new BadRequest('No post was supplied');
		} else if (post.body == null) {
			throw new BadRequest('Post is missing required field, body');
		} else if (post.id != null && postsService.getPostById(post.id) != null) {
			throw new Conflict(`Post with id ${post.id} already exists`)
		}
	
		return postsService.createPost(post);
	}

	@Delete('/:post_id')
	deletePost(@PathParam('post_id') postID: string) {
		const id = Number(postID);
		const post = postsService.getPostById(id);

		if (post == null) {
			new NotFound(`Post ${id} does not exist`);
		}

		postsService.deletePostById(id);
	}
}

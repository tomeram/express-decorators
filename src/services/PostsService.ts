import {PostDto} from '../models/PostDto';

type Posts = {[key: string]: PostDto};

let postID = 0;
const posts: Posts = {};

export function createPost(post: PostDto): PostDto {
	if (post.id == null) {
		do {
			post.id = ++postID;
		} while (getPostById(post.id));
	}

	posts[post.id + ''] = post;

	return post;
}

export function getAll(): Posts {
	return posts;
}

export function getPostById(id: number): PostDto {
	return posts[id + ''];
}

export function deletePostById(id: number): void {
	delete posts[id + ''];
}

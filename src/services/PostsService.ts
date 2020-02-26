import {Post} from '../models/Post';

type Posts = {[key: string]: Post};

let postID = 0;
const posts: Posts = {};

export function createPost(post: Post): Post {
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

export function getPostById(id: number): Post {
	return posts[id + ''];
}

export function deletePostById(id: number): void {
	delete posts[id + ''];
}

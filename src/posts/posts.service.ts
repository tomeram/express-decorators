import { Injectable } from '@nestjs/common';
import {PostDto} from './dto/post.dto';

type Posts = {[key: string]: PostDto};

@Injectable()
export class PostsService {
  private readonly posts: Posts = {};
  private postID = 0;

  getAll(): Posts {
    return this.posts;
  }

  getByID(id: number) {
    return this.posts[id + ''];
  }

  create(post: PostDto): PostDto {
    if (post.id == null) {
      do {
        post.id = ++this.postID;
      } while (this.getByID(post.id));
    }
  
    this.posts[post.id + ''] = post;
  
    return post;
  }

  delete(id: number): void {
    delete this.posts[id + ''];
  }
}

import { Controller, Get, Param, HttpException, HttpStatus, Post, Body, Delete, HttpCode } from '@nestjs/common';
import {PostsService} from './posts.service';
import {PostDto} from './dto/post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getAllPosts() {
    return this.postsService.getAll();
  }

  @Get(':post_id')
  getPostByID(@Param('post_id') postID: number): PostDto {
    const post = this.postsService.getByID(postID);

    if (post == null) {
      throw new HttpException(`Post ${postID} does not exist`, HttpStatus.NOT_FOUND);
    }

    return post;
  }

  @Post()
  createPost(@Body() post: PostDto): PostDto {
    return this.postsService.create(post);
  }

  @Delete(':post_id')
  @HttpCode(204)
  deletePostByID(@Param('post_id') postID: number) {
    this.postsService.delete(postID);
  }
}

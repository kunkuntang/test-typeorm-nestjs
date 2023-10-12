import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { Post } from '../post/entities/post.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const { content, post_id } = createCommentDto;
    const newComment = new Comment();
    newComment.content = content;

    const relativePost = await this.postRepository.findOne({
      where: { id: post_id },
    });
    if (relativePost) {
      newComment.post = relativePost;
    }
    return this.commentRepository.save(newComment);
  }

  findAll() {
    return `This action returns all comment`;
  }

  async findOne(id: number) {
    const result = await this.commentRepository.findOne({ where: { id } });
    if (result) {
      return result;
    } else {
      return {
        code: 0,
        data: null,
        message: '记录不存在',
      };
    }
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return this.commentRepository.update(id, updateCommentDto);
  }

  async remove(id: number) {
    const removeComment = await this.commentRepository.findOne({
      where: { id },
    });
    if (removeComment) {
      return this.commentRepository.softRemove(removeComment);
    } else {
      return {
        code: 0,
        data: null,
        message: '已删除',
      };
    }
    // return `This action removes a #${id} comment`;
  }
}

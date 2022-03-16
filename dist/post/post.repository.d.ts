import { Repository } from 'typeorm';
import { Comment } from './entity/comment.entity';
import { HashTag } from './entity/hashtag.entity';
import { Image } from './entity/image.entity';
import { Post } from './entity/post.entity';
export declare class postRepo {
    private post;
    private hashtag;
    private image;
    private comment;
    constructor(post: Repository<Post>, hashtag: Repository<HashTag>, image: Repository<Image>, comment: Repository<Comment>);
    joinUser(): Promise<Post[]>;
    readById(id: string): Promise<Post>;
    readByImage(id: string): Promise<Image>;
    readHashTagById(id: string): Promise<HashTag>;
    joinUserById(id: string): Promise<Post>;
    readComment(id: string): Promise<Comment[]>;
    joinCommentById(id: string): Promise<Post>;
    joinImgById(id: string): Promise<Post>;
    readHashTagByTitle(title: string): Promise<HashTag>;
    create(dto: object): Promise<object & Post>;
    createHashTag(dto: object): Promise<object & HashTag>;
    createImage(dto: object): Promise<object & Image>;
    createComment(dto: object): Promise<object & Comment>;
    update(dto: object): Promise<object & Post>;
    deleteById(id: string): Promise<import("typeorm").DeleteResult>;
    deleteImageById(id: string): Promise<import("typeorm").DeleteResult>;
    readImageIsNull(): Promise<any[]>;
    deleteImageIsNull(): Promise<import("typeorm").DeleteResult>;
}

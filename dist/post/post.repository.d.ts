import { Repository } from 'typeorm';
import { Comment } from './entity/comment.entity';
import { HashTag } from './entity/hashtag.entity';
import { Image } from './entity/image.entity';
import { Post } from './entity/post.entity';
import { SubComment } from './entity/sub_comment.entity';
export declare class postRepo {
    private post;
    private hashtag;
    private image;
    private comment;
    private subComment;
    constructor(post: Repository<Post>, hashtag: Repository<HashTag>, image: Repository<Image>, comment: Repository<Comment>, subComment: Repository<SubComment>);
    joinUser(): Promise<Post[]>;
    readById(id: string): Promise<Post>;
    readCommentById(id: string): Promise<Comment>;
    readByImage(id: string): Promise<Image>;
    readHashTagById(id: string): Promise<HashTag>;
    joinUserById(id: string): Promise<Post>;
    joinUser2ById(id: string): Promise<Post>;
    readComment(id: string): Promise<Comment[]>;
    readSubCommnet(id: string): Promise<SubComment[]>;
    joinCommentById(id: string): Promise<Post>;
    joinCommentAndSubCommentById(id: string): Promise<Comment>;
    joinImgById(id: string): Promise<Post>;
    readHashTagByTitle(title: string): Promise<HashTag>;
    create(dto: object): Promise<object & Post>;
    createHashTag(dto: object): Promise<object & HashTag>;
    createImage(dto: object): Promise<object & Image>;
    createComment(dto: object): Promise<object & Comment>;
    createSubComment(dto: object): Promise<object & SubComment>;
    update(dto: object): Promise<object & Post>;
    deleteById(id: string): Promise<import("typeorm").DeleteResult>;
    deleteCommentById(id: string): Promise<import("typeorm").DeleteResult>;
    deleteImageById(id: string): Promise<import("typeorm").DeleteResult>;
    deleteSubComment(id: string): Promise<import("typeorm").DeleteResult>;
    readImageIsNull(): Promise<any[]>;
    deleteImageIsNull(): Promise<import("typeorm").DeleteResult>;
    likeUp(id: string): Promise<import("typeorm").UpdateResult>;
}

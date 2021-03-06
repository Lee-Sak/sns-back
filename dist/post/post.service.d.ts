/// <reference types="multer" />
import { UserRepo } from 'src/user/user.repository';
import { CreatePostDto } from './dto/create.post.dto';
import { CurrentUser } from './dto/current.user.dto';
import { Image } from './entity/image.entity';
import { Post } from './entity/post.entity';
import { postRepo } from './post.repository';
import { Comment } from './entity/comment.entity';
import { SubComment } from './entity/sub_comment.entity';
export declare class PostService {
    private readonly postRepo;
    private readonly userRepo;
    constructor(postRepo: postRepo, userRepo: UserRepo);
    readAll(): Promise<({
        id: any;
        content: any;
        user_id: any;
        nickname: any;
        sentence: any;
        like: any;
        createdAt: any;
        img_url?: undefined;
    } | {
        id: any;
        content: any;
        user_id: any;
        nickname: any;
        img_url: any;
        sentence: any;
        like: any;
        createdAt: any;
    })[]>;
    readByCol(col: string, val: string): Promise<({
        id: any;
        content: any;
        user_id: any;
        nickname: any;
        sentence: any;
        like: any;
        createdAt: any;
        img_url?: undefined;
    } | {
        id: any;
        content: any;
        user_id: any;
        nickname: any;
        img_url: any;
        sentence: any;
        like: any;
        createdAt: any;
    })[] | "">;
    read(id: string): Promise<{
        id: number;
        content: string;
        user_id: number;
        nickname: string;
        images: Image[];
        sentence: string;
    }>;
    create(files: Array<Express.Multer.File>, currentUser: CurrentUser, body: CreatePostDto): Promise<object & Post>;
    createComment(id: string, comment: string, currentUser: CurrentUser): Promise<object & Post>;
    createSubComment(id: string, sub_comment: string, currentUser: CurrentUser): Promise<object & Comment>;
    readCommnet(id: string, currentUser: CurrentUser): Promise<{
        id: number;
        comment: string;
        nick: string;
        subComment: SubComment[];
        user_id: number;
    }[]>;
    readSubCommnet(id: string, currentUser: CurrentUser): Promise<SubComment[]>;
    update(files: Array<Express.Multer.File>, currentUser: CurrentUser, body: CreatePostDto, id: string, ids: number[]): Promise<object & Post>;
    delete(currentUser: CurrentUser, id: string): Promise<any>;
    deleteComment(currentUser: CurrentUser, id: string): Promise<any>;
    deleteSubComment(currentUser: CurrentUser, id: string): Promise<import("typeorm").DeleteResult>;
    likeUp(id: string): Promise<import("typeorm").UpdateResult>;
}

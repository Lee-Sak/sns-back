/// <reference types="multer" />
import { CreatePostDto } from './dto/create.post.dto';
import { PostService } from './post.service';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
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
        images: import("./entity/image.entity").Image[];
        sentence: string;
    }>;
    create(files: Array<Express.Multer.File>, req: any, body: CreatePostDto): Promise<object & import("./entity/post.entity").Post>;
    createCommnet(id: string, req: any, comment: string): Promise<object & import("./entity/post.entity").Post>;
    createSubComment(id: string, req: any, sub_comment: string): Promise<object & import("./entity/comment.entity").Comment>;
    readSubCommnet(id: string, req: any): Promise<import("./entity/sub_comment.entity").SubComment[]>;
    readCommnet(id: string, req: any): Promise<{
        id: number;
        comment: string;
        nick: string;
        subComment: import("./entity/sub_comment.entity").SubComment[];
        user_id: number;
    }[]>;
    update(files: Array<Express.Multer.File>, req: any, body: CreatePostDto, id: string, ids: string): Promise<object & import("./entity/post.entity").Post>;
    deleteComment(req: any, id: string): Promise<any>;
    deleteSubComment(req: any, id: string): Promise<import("typeorm").DeleteResult>;
    delete(req: any, id: string): Promise<any>;
    likeUp(id: string): Promise<import("typeorm").UpdateResult>;
}

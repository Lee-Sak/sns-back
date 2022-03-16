/// <reference types="multer" />
import { CreatePostDto } from './dto/create.post.dto';
import { PostService } from './post.service';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    readAll(): Promise<({
        id: number;
        content: string;
        user_id: number;
        nickname: string;
        sentence: string;
        img_url?: undefined;
    } | {
        id: number;
        content: string;
        user_id: number;
        nickname: string;
        img_url: string;
        sentence: string;
    })[]>;
    read(id: string): Promise<import("./entity/post.entity").Post>;
    create(files: Array<Express.Multer.File>, req: any, body: CreatePostDto): Promise<object & import("./entity/post.entity").Post>;
    update(files: Array<Express.Multer.File>, req: any, body: CreatePostDto, id: string, ids: string): Promise<object & import("./entity/post.entity").Post>;
    delete(req: any, id: string): Promise<any>;
}

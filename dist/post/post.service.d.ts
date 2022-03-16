/// <reference types="multer" />
import { UserRepo } from 'src/user/user.repository';
import { CreatePostDto } from './dto/create.post.dto';
import { CurrentUser } from './dto/current.user.dto';
import { Post } from './entity/post.entity';
import { postRepo } from './post.repository';
export declare class PostService {
    private readonly postRepo;
    private readonly userRepo;
    constructor(postRepo: postRepo, userRepo: UserRepo);
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
    read(id: string): Promise<Post>;
    create(files: Array<Express.Multer.File>, currentUser: CurrentUser, body: CreatePostDto): Promise<object & Post>;
    update(files: Array<Express.Multer.File>, currentUser: CurrentUser, body: CreatePostDto, id: string, ids: number[]): Promise<object & Post>;
    delete(currentUser: CurrentUser, id: string): Promise<any>;
}

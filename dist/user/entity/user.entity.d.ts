import { Comment } from 'src/post/entity/comment.entity';
import { Post } from 'src/post/entity/post.entity';
export declare class User {
    id: number;
    email: string;
    password: string;
    nickname: string;
    isActive: boolean;
    posts: Post[];
    comments: Comment[];
    users: User[];
    users_1: User[];
}

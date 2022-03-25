import { Comment } from 'src/post/entity/comment.entity';
import { Post } from 'src/post/entity/post.entity';
import { SubComment } from 'src/post/entity/sub_comment.entity';
export declare class User {
    id: number;
    email: string;
    password: string;
    nickname: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    posts: Post[];
    comments: Comment[];
    sub_comments: SubComment[];
    users: User[];
    users_1: User[];
}

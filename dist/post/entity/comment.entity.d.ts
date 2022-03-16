import { User } from 'src/user/entity/user.entity';
import { Post } from './post.entity';
export declare class Comment {
    id: number;
    comment: string;
    user: User;
    post: Post;
}

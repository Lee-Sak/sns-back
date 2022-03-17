import { User } from 'src/user/entity/user.entity';
import { Post } from './post.entity';
import { SubComment } from './sub_comment.entity';
export declare class Comment {
    id: number;
    comment: string;
    user: User;
    post: Post;
    subComment: SubComment[];
}

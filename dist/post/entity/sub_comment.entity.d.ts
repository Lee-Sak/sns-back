import { User } from 'src/user/entity/user.entity';
import { Comment } from './comment.entity';
export declare class SubComment {
    id: number;
    sub_comment: string;
    comment: Comment;
    user: User;
}

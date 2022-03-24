import { User } from 'src/user/entity/user.entity';
import { Comment } from './comment.entity';
import { HashTag } from './hashtag.entity';
import { Image } from './image.entity';
export declare class Post {
    id: number;
    content: string;
    sentence: string;
    like: number;
    user: User;
    hashtags: HashTag[];
    images: Image[];
    comments: Comment[];
}

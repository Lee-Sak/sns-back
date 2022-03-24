import { CreateUserDto } from './dto/create.user.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    readAll(req: any): Promise<import("./entity/user.entity").User[]>;
    readByEmail(email: string): Promise<import("./entity/user.entity").User>;
    follow(id: string, req: any): Promise<object & import("./entity/user.entity").User>;
    readToken(id: string): Promise<{
        token: string;
    }>;
    readFollowing(req: any): Promise<{
        me: {
            id: number;
            nickname: string;
        };
        followings: {
            id: number;
            nickname: string;
        }[];
    }>;
    readFollower(req: any): Promise<{
        me: {
            id: number;
            nickname: string;
        };
        followers: {
            id: number;
            nickname: string;
        }[];
    }>;
    read(id: string, req: any): Promise<{
        id: number;
        email: string;
        nickname: string;
    }>;
    create(body: CreateUserDto): Promise<any>;
    login(body: LoginDto): Promise<{
        token: string;
    }>;
    unfollow(id: string, req: any): Promise<object & import("./entity/user.entity").User>;
    update(id: string, body: UpdateUserDto, req: any): Promise<any>;
    updatePassword(id: string, body: UpdateUserDto, req: any): Promise<import("typeorm").UpdateResult>;
    updateNick(id: string, body: UpdateUserDto, req: any): Promise<import("typeorm").UpdateResult>;
    delete(id: string, req: any): Promise<any>;
    returnJwt(req: any): Promise<{
        id: number;
    }>;
}

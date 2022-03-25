import { CreateUserDto } from './dto/create.user.dto';
import { UserRepo } from './user.repository';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { CurrentUser } from 'src/post/dto/current.user.dto';
import { User } from './entity/user.entity';
import { UpdateUserDto } from './dto/update.user.dto';
export declare class UserService {
    private readonly userRepo;
    private readonly jwtService;
    constructor(userRepo: UserRepo, jwtService: JwtService);
    readAll(): Promise<User[]>;
    readByEmail(email: string): Promise<User>;
    read(id: string, currentUser: CurrentUser): Promise<{
        id: number;
        email: string;
        nickname: string;
    }>;
    readFollowing(id: string): Promise<{
        me: {
            id: number;
            nickname: string;
        };
        followings: {
            id: number;
            nickname: string;
        }[];
    }>;
    readFollower(id: string): Promise<{
        me: {
            id: number;
            nickname: string;
        };
        followers: {
            id: number;
            nickname: string;
        }[];
    }>;
    create(body: CreateUserDto): Promise<any>;
    login(body: LoginDto, ip: string): Promise<{
        token: string;
    }>;
    refreshToken(id: string): Promise<{
        token: string;
    }>;
    updatePassword(id: string, body: UpdateUserDto, currentUser: CurrentUser): Promise<import("typeorm").UpdateResult>;
    follow(id: string, currentUser: CurrentUser): Promise<object & User>;
    unfollow(id: string, currentUser: CurrentUser): Promise<object & User>;
    update(id: string, body: UpdateUserDto, currentUser: CurrentUser): Promise<any>;
    updateNick(id: string, body: UpdateUserDto, currentUser: CurrentUser): Promise<import("typeorm").UpdateResult>;
    delete(id: string, currentUser: CurrentUser): Promise<any>;
    returnJwt(jwt: any): Promise<{
        id: number;
    }>;
}

import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
export declare class UserRepo {
    private user;
    constructor(user: Repository<User>);
    readAll(): Promise<User[]>;
    readById(id: string): Promise<User>;
    readByEmail(email: string): Promise<User>;
    readByIdAboutFollowing(id: string): Promise<User>;
    readByIdAboutFollower(id: string): Promise<User>;
    create(body: object): Promise<import("typeorm").InsertResult>;
    createFollow(dto: object): Promise<object & User>;
    update(id: string, body: object): Promise<import("typeorm").UpdateResult>;
    updateByNick(id: string, nickname: string): Promise<import("typeorm").UpdateResult>;
    deleteById(id: string): Promise<import("typeorm").DeleteResult>;
}

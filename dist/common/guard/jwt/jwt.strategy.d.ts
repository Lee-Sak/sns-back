import { Strategy } from 'passport-jwt';
import { UserRepo } from 'src/user/user.repository';
import { Payload } from './jwt.payload';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userRepo;
    constructor(userRepo: UserRepo);
    validate(payload: Payload): Promise<{
        id: string;
        nickname: string;
    }>;
}
export {};

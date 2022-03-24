"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("./user.repository");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const current_user_dto_1 = require("../post/dto/current.user.dto");
let UserService = class UserService {
    constructor(userRepo, jwtService) {
        this.userRepo = userRepo;
        this.jwtService = jwtService;
    }
    async readAll() {
        return await this.userRepo.readAll();
    }
    async readByEmail(email) {
        return await this.userRepo.readByEmail(email);
    }
    async read(id, currentUser) {
        if (id !== currentUser.id)
            throw new common_1.HttpException('Forbidden', 403);
        const data = await this.userRepo.readById(id);
        if (data) {
            const { id, email, nickname } = data;
            return { id, email, nickname };
        }
    }
    async readFollowing(id) {
        const data = await this.userRepo.readByIdAboutFollowing(id);
        if (!data)
            return null;
        const mapData = data.users.map((e) => {
            return { id: e.id, nickname: e.nickname };
        });
        return {
            me: { id: data.id, nickname: data.nickname },
            followings: mapData,
        };
    }
    async readFollower(id) {
        const data = await this.userRepo.readByIdAboutFollower(id);
        if (!data)
            return null;
        const mapData = data.users_1.map((e) => {
            return { id: e.id, nickname: e.nickname };
        });
        return { me: { id: data.id, nickname: data.nickname }, followers: mapData };
    }
    async create(body) {
        const { email, password, nickname } = body;
        const isUserExist = await this.userRepo.readByEmail(email);
        if (isUserExist) {
            throw new common_1.HttpException('Conflict', 409);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const dto = {
            email,
            password: hashedPassword,
            nickname,
        };
        const isUserCreated = await this.userRepo.create(dto);
        if (isUserCreated.raw.affectedRows < 1) {
            throw new common_1.HttpException('계정 생성 실패!', 503);
        }
        return null;
    }
    async login(body) {
        const { email, password } = body;
        const user = await this.userRepo.readByEmail(email);
        if (!user) {
            throw new common_1.HttpException('존재 하지 않는 아이디 입니다.', 401);
        }
        const isPasswordValidated = await bcrypt.compare(password, user.password);
        if (!isPasswordValidated) {
            throw new common_1.HttpException('비밀번호를 확인해주세요.', 401);
        }
        const payload = {
            id: user.id,
            email: user.email,
            nick: user.nickname,
        };
        return {
            token: 'bearer ' + (await this.jwtService.sign(payload)),
        };
    }
    async refreshToken(id) {
        const user = await this.userRepo.readById(id);
        if (!user) {
            throw new common_1.HttpException('존재 하지 않는 아이디 입니다.', 401);
        }
        const payload = {
            id: user.id,
            email: user.email,
            nick: user.nickname,
        };
        return {
            token: 'bearer ' + (await this.jwtService.sign(payload)),
        };
    }
    async updatePassword(id, body, currentUser) {
        if (currentUser.id !== id)
            throw new common_1.HttpException('Forbidden', 403);
        const { password } = body;
        const hashedPassword = await bcrypt.hash(password, 10);
        return await this.userRepo.update(id, { password: hashedPassword });
    }
    async follow(id, currentUser) {
        console.log(currentUser.id);
        if (id === currentUser.id) {
            throw new common_1.HttpException('자기 자신을 팔로우 할 수 없어요', 503);
        }
        const isFollowExists = await this.userRepo.readByIdAboutFollowing(id);
        const following = await this.userRepo.readById(currentUser.id);
        let follower;
        if (isFollowExists) {
            follower = await this.userRepo.readById(id);
            follower.users = isFollowExists.users.concat([following]);
        }
        else {
            follower = await this.userRepo.readById(id);
            follower.users = [following];
        }
        return await this.userRepo.createFollow(follower);
    }
    async unfollow(id, currentUser) {
        const data = await this.userRepo.readByIdAboutFollower(currentUser.id);
        const data_1 = data.users_1.filter((item) => {
            return item.id.toString() !== id;
        });
        data.users_1 = data_1;
        return await this.userRepo.createFollow(data);
    }
    async update(id, body, currentUser) {
        if (id !== currentUser.id)
            throw new common_1.HttpException('Forbidden', 403);
        const { email, password, nickname } = body;
        console.log(email, nickname);
        let dto;
        const user = await this.userRepo.readById(id);
        if (email) {
            if (user.email !== email) {
                const isUserExist = await this.userRepo.readByEmail(email);
                if (isUserExist) {
                    throw new common_1.HttpException('Conflict', 409);
                }
                dto = {
                    email,
                };
            }
        }
        else {
            dto = {
                nickname,
            };
        }
        const isUserUpdate = await this.userRepo.update(id, dto);
        if (isUserUpdate.affected < 1) {
            throw new common_1.HttpException('Internal Server Error', 500);
        }
        return null;
    }
    async updateNick(id, body, currentUser) {
        if (id !== currentUser.id)
            throw new common_1.HttpException('Forbidden', 403);
        return await this.userRepo.updateByNick(id, body.nickname);
    }
    async delete(id, currentUser) {
        if (id !== currentUser.id)
            throw new common_1.HttpException('Forbidden', 403);
        await this.userRepo.deleteById(id);
        return null;
    }
    async returnJwt(jwt) {
        const account = await this.userRepo.readById(jwt.id);
        return {
            id: account.id,
        };
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepo,
        jwt_1.JwtService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map
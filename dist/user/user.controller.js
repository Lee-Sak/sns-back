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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_dto_1 = require("../common/dto/create.dto");
const delete_dto_1 = require("../common/dto/delete.dto");
const update_dto_1 = require("../common/dto/update.dto");
const jwt_guard_1 = require("../common/guard/jwt/jwt.guard");
const success_interceptor_1 = require("../common/interceptors/success.interceptor");
const create_user_dto_1 = require("./dto/create.user.dto");
const login_dto_1 = require("./dto/login.dto");
const read_all_user_dto_1 = require("./dto/read.all-user.dto");
const read_follower_dto_1 = require("./dto/read.follower.dto");
const read_following_dto_1 = require("./dto/read.following.dto");
const read_user_dto_1 = require("./dto/read.user.dto");
const token_dto_1 = require("./dto/token.dto");
const update_user_dto_1 = require("./dto/update.user.dto");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async readAll(req) {
        return await this.userService.readAll();
    }
    async readByEmail(email) {
        return await this.userService.readByEmail(email);
    }
    async follow(id, req) {
        return await this.userService.follow(id, req.user);
    }
    async readToken(id) {
        return await this.userService.refreshToken(id);
    }
    async readFollowing(req) {
        return await this.userService.readFollowing(req.user.id);
    }
    async readFollower(req) {
        return await this.userService.readFollower(req.user.id);
    }
    async read(id, req) {
        return await this.userService.read(id, req.user);
    }
    async create(body) {
        return await this.userService.create(body);
    }
    async login(body) {
        return await this.userService.login(body);
    }
    async unfollow(id, req) {
        return await this.userService.unfollow(id, req.user);
    }
    async update(id, body, req) {
        return await this.userService.update(id, body, req.user);
    }
    async updatePassword(id, body, req) {
        return await this.userService.updatePassword(id, body, req.user);
    }
    async updateNick(id, body, req) {
        return await this.userService.updateNick(id, body, req.user);
    }
    async delete(id, req) {
        return await this.userService.delete(id, req.user);
    }
    async returnJwt(req) {
        return await this.userService.returnJwt(req.user);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '전체 유저 정보 가져오기' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Read Success',
        type: read_all_user_dto_1.ReadAllUserDto,
    }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)('all'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "readAll", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "readByEmail", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'follow 하기' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Create Success',
        type: create_dto_1.CreateDto,
    }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)(':id/follow'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "follow", null);
__decorate([
    (0, common_1.Get)('token/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "readToken", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'following 목록 가져오기' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Read Success',
        type: read_following_dto_1.ReadFollowingDto,
    }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)('following'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "readFollowing", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'follower 목록 가져오기' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Read Success',
        type: read_follower_dto_1.ReadFollowerDto,
    }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)('follower'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "readFollower", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '내 정보 불러오기' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Read Success',
        type: read_user_dto_1.ReadUserDto,
    }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "read", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '회원가입 하기' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Create Success',
        type: create_dto_1.CreateDto,
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '로그인 하기' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Create Success',
        type: token_dto_1.TokenDto,
    }),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'unfollow 하기' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Update Success',
        type: update_dto_1.UpdateDto,
    }),
    (0, common_1.Put)(':id/unfollow'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "unfollow", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '내 정보 수정하기' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Update Success',
        type: update_dto_1.UpdateDto,
    }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updatePassword", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '닉네임 수정하기' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Update Success',
        type: update_dto_1.UpdateDto,
    }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Put)(':id/nick'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateNick", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '회원 탈퇴 하기' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Delete Success',
        type: delete_dto_1.DeleteDto,
    }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '로그인 한 사용자 정보 가져오기' }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)('jwt'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "returnJwt", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    (0, common_1.UseInterceptors)(success_interceptor_1.SuccessInterceptor),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map
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
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const currentUser_deco_1 = require("../common/decorator/currentUser.deco");
const create_dto_1 = require("../common/dto/create.dto");
const delete_dto_1 = require("../common/dto/delete.dto");
const repository_error_dto_1 = require("../common/dto/repository.error.dto");
const service_error_dto_1 = require("../common/dto/service.error.dto");
const update_dto_1 = require("../common/dto/update.dto");
const jwt_guard_1 = require("../common/guard/jwt/jwt.guard");
const success_interceptor_1 = require("../common/interceptors/success.interceptor");
const multer_options_1 = require("../common/utils/multer.options");
const current_user_dto_1 = require("../user/dto/current.user.dto");
const create_post_dto_1 = require("./dto/create.post.dto");
const read_all_post_dto_1 = require("./dto/read.all-post.dto");
const read_post_dto_1 = require("./dto/read.post.dto");
const post_service_1 = require("./post.service");
let PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    async readAll() {
        return await this.postService.readAll();
    }
    async read(id) {
        return await this.postService.read(id);
    }
    async create(files, req, body) {
        console.log(req.user);
        return await this.postService.create(files, req.user, body);
    }
    async createCommnet(id, req, comment) {
        return await this.postService.createComment(id, comment, req.user);
    }
    async createSubComment(id, req, sub_comment) {
        return await this.postService.createSubComment(id, sub_comment, req.user);
    }
    async readSubCommnet(id, req) {
        return await this.postService.readSubCommnet(id, req.user);
    }
    async readCommnet(id, req) {
        return await this.postService.readCommnet(id, req.user);
    }
    async update(files, req, body, id, ids) {
        let idsArray;
        if (ids) {
            idsArray = ids.split(',').map((e) => {
                return Number(e);
            });
        }
        console.log(idsArray);
        return await this.postService.update(files, req.user, body, id, idsArray);
    }
    async deleteComment(req, id) {
        return await this.postService.deleteComment(req.user, id);
    }
    async deleteSubComment(req, id) {
        return await this.postService.deleteSubComment(req.user, id);
    }
    async delete(req, id) {
        return await this.postService.delete(req.user, id);
    }
    async likeUp(id) {
        return await this.postService.likeUp(id);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '모든 게시물 가져오기' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Read Success',
        type: read_all_post_dto_1.ReadAllPostDto,
    }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostController.prototype, "readAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '특정 게시물 가져오기' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Read Success',
        type: read_post_dto_1.ReadPostDto,
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "read", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '게시물 생성하기' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Create Success',
        type: create_dto_1.CreateDto,
    }),
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 10, (0, multer_options_1.multerOptions)('image'))),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object, create_post_dto_1.CreatePostDto]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/comment'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)('comment')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "createCommnet", null);
__decorate([
    (0, common_1.Post)(':id/subcomment'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)('sub_comment')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "createSubComment", null);
__decorate([
    (0, common_1.Get)(':id/subcomment'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "readSubCommnet", null);
__decorate([
    (0, common_1.Get)(':id/comment'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "readCommnet", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '게시물 수정하기' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Update Success',
        type: update_dto_1.UpdateDto,
    }),
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 10, (0, multer_options_1.multerOptions)('image'))),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Param)('id')),
    __param(4, (0, common_1.Query)('ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object, create_post_dto_1.CreatePostDto, String, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('comment/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "deleteComment", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('comment/subcomment/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "deleteSubComment", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '게시물 삭제하기' }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Delete Success',
        type: delete_dto_1.DeleteDto,
    }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "delete", null);
__decorate([
    (0, common_1.Patch)(':id/like'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "likeUp", null);
PostController = __decorate([
    (0, common_1.Controller)('post'),
    (0, common_1.UseInterceptors)(success_interceptor_1.SuccessInterceptor),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
exports.PostController = PostController;
//# sourceMappingURL=post.controller.js.map
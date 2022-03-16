"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/entity/user.entity");
const user_repository_1 = require("../user/user.repository");
const post_controller_1 = require("./post.controller");
const post_entity_1 = require("./entity/post.entity");
const post_repository_1 = require("./post.repository");
const post_service_1 = require("./post.service");
const hashtag_entity_1 = require("./entity/hashtag.entity");
const image_entity_1 = require("./entity/image.entity");
const comment_entity_1 = require("./entity/comment.entity");
let PostModule = class PostModule {
};
PostModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([post_entity_1.Post, user_entity_1.User, hashtag_entity_1.HashTag, image_entity_1.Image, comment_entity_1.Comment])],
        controllers: [post_controller_1.PostController],
        providers: [post_service_1.PostService, post_repository_1.postRepo, user_repository_1.UserRepo],
    })
], PostModule);
exports.PostModule = PostModule;
//# sourceMappingURL=post.module.js.map
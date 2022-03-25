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
exports.postRepo = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const comment_entity_1 = require("./entity/comment.entity");
const hashtag_entity_1 = require("./entity/hashtag.entity");
const image_entity_1 = require("./entity/image.entity");
const post_entity_1 = require("./entity/post.entity");
const sub_comment_entity_1 = require("./entity/sub_comment.entity");
let postRepo = class postRepo {
    constructor(post, hashtag, image, comment, subComment) {
        this.post = post;
        this.hashtag = hashtag;
        this.image = image;
        this.comment = comment;
        this.subComment = subComment;
    }
    async joinUser() {
        return await this.post.find({
            join: {
                alias: 'post',
                leftJoinAndSelect: {
                    user: 'post.user',
                    image: 'post.images',
                },
            },
            order: {
                id: 'DESC',
            },
        });
    }
    async readById(id) {
        return await this.post.findOne(id);
    }
    async readByContent(val) {
        return await this.post.find({
            join: {
                alias: 'post',
                leftJoinAndSelect: {
                    user: 'post.user',
                    image: 'post.images',
                },
            },
            where: {
                content: (0, typeorm_2.Like)(`%${val}%`),
            },
            order: {
                id: 'DESC',
            },
        });
    }
    async readByIds(ids) {
        return await this.post.find({
            join: {
                alias: 'post',
                leftJoinAndSelect: {
                    user: 'post.user',
                    image: 'post.images',
                },
            },
            where: {
                id: (0, typeorm_2.In)(ids),
            },
            order: {
                id: 'DESC',
            },
        });
    }
    async readByHashTag(val) {
        return await this.hashtag.findOne({
            join: {
                alias: 'hashtag',
                leftJoinAndSelect: {
                    post: 'hashtag.posts',
                },
            },
            where: {
                title: val,
            },
        });
    }
    async readCommentById(id) {
        return await this.comment.findOne(id, {
            join: {
                alias: 'comment_a',
                leftJoinAndSelect: {
                    user: 'comment_a.user',
                },
            },
        });
    }
    async readByImage(id) {
        return await this.image.findOne(id);
    }
    async readHashTagById(id) {
        return await this.hashtag.findOne(id);
    }
    async joinUserById(id) {
        return await this.post.findOne(id, {
            join: {
                alias: 'post',
                leftJoinAndSelect: {
                    user: 'post.user',
                    image: 'post.images',
                },
            },
        });
    }
    async joinUser2ById(id) {
        return await this.post.findOne(id, {
            join: {
                alias: 'post',
                leftJoinAndSelect: {
                    user: 'post.user',
                },
            },
        });
    }
    async readComment(id) {
        return await this.comment.find({
            join: {
                alias: 'comment',
                leftJoinAndSelect: {
                    user: 'comment.user',
                    post: 'comment.post',
                    subComment: 'comment.subComment',
                },
            },
            where: {
                post: {
                    id,
                },
            },
        });
    }
    async readSubCommnet(id) {
        return await this.subComment.find({
            join: {
                alias: 'subComment',
                leftJoinAndSelect: {
                    user: 'subComment.user',
                    comment: 'subComment.comment',
                },
            },
            where: {
                comment: {
                    id,
                },
            },
        });
    }
    async joinCommentById(id) {
        return await this.post.findOne(id, {
            join: {
                alias: 'post',
                leftJoinAndSelect: {
                    comment: 'post.comments',
                },
            },
        });
    }
    async joinCommentAndSubCommentById(id) {
        return await this.comment.findOne(id, {
            join: {
                alias: 'comment_a',
                leftJoinAndSelect: {
                    comment: 'comment_a.subComment',
                },
            },
        });
    }
    async joinImgById(id) {
        return await this.post.findOne(id, {
            join: {
                alias: 'post',
                innerJoinAndSelect: {
                    image: 'post.images',
                },
            },
        });
    }
    async readHashTagByTitle(title) {
        return await this.hashtag.findOne({ title });
    }
    async create(dto) {
        return await this.post.save(dto);
    }
    async createHashTag(dto) {
        return await this.hashtag.save(dto);
    }
    async createImage(dto) {
        return await this.image.save(dto);
    }
    async createComment(dto) {
        return await this.comment.save(dto);
    }
    async createSubComment(dto) {
        return await this.subComment.save(dto);
    }
    async update(dto) {
        return await this.post.save(dto);
    }
    async deleteById(id) {
        return await this.post.delete(id);
    }
    async deleteCommentById(id) {
        return await this.comment.delete(id);
    }
    async deleteImageById(id) {
        return await this.image.delete(id);
    }
    async deleteSubComment(id) {
        return await this.subComment.delete(id);
    }
    async readImageIsNull() {
        return await this.image
            .createQueryBuilder('image')
            .where('postId is null')
            .getRawMany();
    }
    async deleteImageIsNull() {
        return await this.image
            .createQueryBuilder('image')
            .delete()
            .where('postId is NULL')
            .execute();
    }
    async likeUp(id) {
        const { like } = await this.post.findOne(id);
        return await this.post.update(id, {
            like: like + 1,
        });
    }
};
postRepo = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __param(1, (0, typeorm_1.InjectRepository)(hashtag_entity_1.HashTag)),
    __param(2, (0, typeorm_1.InjectRepository)(image_entity_1.Image)),
    __param(3, (0, typeorm_1.InjectRepository)(comment_entity_1.Comment)),
    __param(4, (0, typeorm_1.InjectRepository)(sub_comment_entity_1.SubComment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], postRepo);
exports.postRepo = postRepo;
//# sourceMappingURL=post.repository.js.map
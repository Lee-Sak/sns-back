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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../user/user.repository");
const hashtag_entity_1 = require("./entity/hashtag.entity");
const image_entity_1 = require("./entity/image.entity");
const post_entity_1 = require("./entity/post.entity");
const post_repository_1 = require("./post.repository");
const fs = require("fs");
const comment_entity_1 = require("./entity/comment.entity");
const sub_comment_entity_1 = require("./entity/sub_comment.entity");
const current_user_dto_1 = require("../user/dto/current.user.dto");
const timeTrans_func_1 = require("../common/transformer/timeTrans.func");
let PostService = class PostService {
    constructor(postRepo, userRepo) {
        this.postRepo = postRepo;
        this.userRepo = userRepo;
    }
    async readAll() {
        const data = await this.postRepo.joinUser();
        return (0, timeTrans_func_1.timeTransFunc)(data);
    }
    async readByCol(col, val) {
        let data;
        if (col === 'content') {
            data = await this.postRepo.readByContent(val);
        }
        else {
            const a = await this.postRepo.readByHashTag(val);
            if (a) {
                const ids = a.posts.map((e) => {
                    return e.id;
                });
                data = await this.postRepo.readByIds(ids);
            }
            else {
                return '';
            }
        }
        return (0, timeTrans_func_1.timeTransFunc)(data);
    }
    async read(id) {
        const data = await this.postRepo.joinUserById(id);
        return {
            id: data.id,
            content: data.content,
            user_id: data.user.id,
            nickname: data.user.nickname,
            images: data.images,
            sentence: data.sentence,
        };
    }
    async create(files, currentUser, body) {
        console.log('files:', files);
        const { id, nickname } = currentUser;
        const { content, sentence } = body;
        const imageArray = [];
        for (const e of files) {
            const image = new image_entity_1.Image();
            image.url = `http://${process.env.BACK_HOST}/media/image/${e.filename}`;
            await this.postRepo.createImage(image);
            imageArray.push(image);
        }
        const user = await this.userRepo.readById(id);
        const hashtags = content.match(/#[^\s#]*/g);
        console.log(hashtags);
        const array_ = [];
        if (hashtags && hashtags.length > 0) {
            for (const tag of hashtags) {
                const title = tag.slice(1).toLowerCase();
                const hashTag = await this.postRepo.readHashTagByTitle(title);
                console.log(hashTag);
                if (!hashTag) {
                    const hasht = new hashtag_entity_1.HashTag();
                    hasht.title = title;
                    await this.postRepo.createHashTag(hasht);
                    array_.push(hasht);
                }
                else {
                    array_.push(hashTag);
                }
            }
        }
        const postDto = new post_entity_1.Post();
        postDto.content = content;
        postDto.sentence = sentence;
        postDto.images = imageArray;
        postDto.user = user;
        postDto.hashtags = array_;
        return await this.postRepo.create(postDto);
    }
    async createComment(id, comment, currentUser) {
        const user = await this.userRepo.readById(currentUser.id);
        const commentObj = new comment_entity_1.Comment();
        commentObj.comment = comment;
        commentObj.user = user;
        const commentCreated = await this.postRepo.createComment(commentObj);
        const post = await this.postRepo.joinCommentById(id);
        console.log(post);
        post.comments = [commentCreated, ...post.comments];
        return await this.postRepo.create(post);
    }
    async createSubComment(id, sub_comment, currentUser) {
        const user = await this.userRepo.readById(currentUser.id);
        const subCommenttObj = new sub_comment_entity_1.SubComment();
        subCommenttObj.sub_comment = sub_comment;
        subCommenttObj.user = user;
        const subCommentCreated = await this.postRepo.createSubComment(subCommenttObj);
        const comment = await this.postRepo.joinCommentAndSubCommentById(id);
        console.log(comment);
        comment.subComment = [subCommentCreated, ...comment.subComment];
        return await this.postRepo.createComment(comment);
    }
    async readCommnet(id, currentUser) {
        const a = await this.postRepo.readComment(id);
        console.log(a);
        return a.map((e) => {
            return {
                id: e.id,
                comment: e.comment,
                nick: e.user.nickname,
                subComment: e.subComment,
                user_id: e.user.id,
            };
        });
    }
    async readSubCommnet(id, currentUser) {
        return await this.postRepo.readSubCommnet(id);
    }
    async update(files, currentUser, body, id, ids) {
        console.log('updat service');
        const { content, sentence } = body;
        console.log('content:', content);
        const isExist = await this.postRepo.joinUserById(id);
        const user = await this.userRepo.readById(currentUser.id);
        if (isExist) {
            if (isExist.user.id.toString() === currentUser.id) {
                const postJoinImg = await this.postRepo.joinImgById(id);
                const imageArray = [];
                if (ids) {
                    for (const e of postJoinImg.images) {
                        if (ids.includes(e.id)) {
                            imageArray.push(e);
                        }
                    }
                }
                for (const e of files) {
                    let image;
                    image = new image_entity_1.Image();
                    image.url = `http://${process.env.BACK_HOST}/media/image/${e.filename}`;
                    const imageCreated = await this.postRepo.createImage(image);
                    imageArray.push(imageCreated);
                }
                const hashtags = content.match(/#[^\s#]*/g);
                const array_ = [];
                if (hashtags && hashtags.length > 0) {
                    for (const tag of hashtags) {
                        const title = tag.slice(1).toLowerCase();
                        const hashTag = await this.postRepo.readHashTagByTitle(title);
                        if (!hashTag) {
                            const hasht = new hashtag_entity_1.HashTag();
                            hasht.title = title;
                            const hashtageCreated = await this.postRepo.createHashTag(hasht);
                            array_.push(hashtageCreated);
                        }
                        else {
                            array_.push(hashTag);
                        }
                    }
                }
                const post = await this.postRepo.readById(id);
                post.content = content;
                post.images = imageArray;
                post.user = user;
                post.sentence = sentence;
                post.hashtags = array_;
                const b = await this.postRepo.create(post);
                const nullArray = await this.postRepo.readImageIsNull();
                for (const e of nullArray) {
                    const fileName = e.image_url.split('/')[5];
                    try {
                        fs.unlinkSync(`dist/common/uploads/image/${fileName}`);
                        await this.postRepo.deleteImageIsNull();
                    }
                    catch (error) {
                        if (error.code == 'ENOENT') {
                            console.log(error);
                        }
                    }
                }
                return b;
            }
            else {
                throw new common_1.HttpException('????????? ?????? ????????? ??? ????????????.', 503);
            }
        }
        else {
            throw new common_1.HttpException('???????????? ?????? ????????? ?????????.', 503);
        }
    }
    async delete(currentUser, id) {
        const isExist = await this.postRepo.joinUser2ById(id);
        if (isExist) {
            if (isExist.user.id.toString() === currentUser.id ||
                currentUser.id === '1') {
                await this.postRepo.deleteById(id);
                if (isExist.images) {
                    for (const e of isExist.images) {
                        const fileName = e.url.split('/')[5];
                        try {
                            fs.unlinkSync(`dist/common/uploads/image/${fileName}`);
                        }
                        catch (error) {
                            if (error.code == 'ENOENT') {
                                console.log(error);
                            }
                        }
                    }
                }
            }
            else {
                throw new common_1.HttpException('????????? ?????? ????????? ??? ????????????.', 503);
            }
        }
        else {
            throw new common_1.HttpException('???????????? ?????? ????????? ?????????.', 503);
        }
        return null;
    }
    async deleteComment(currentUser, id) {
        const isExist = await this.postRepo.readCommentById(id);
        if (isExist) {
            if (isExist.user.id.toString() === currentUser.id ||
                currentUser.id === '1') {
                await this.postRepo.deleteCommentById(id);
            }
            else {
                throw new common_1.HttpException('????????? ?????? ????????? ??? ????????????.', 503);
            }
        }
        else {
            throw new common_1.HttpException('???????????? ?????? ????????? ?????????.', 503);
        }
        return null;
    }
    async deleteSubComment(currentUser, id) {
        return await this.postRepo.deleteSubComment(id);
    }
    async likeUp(id) {
        return await this.postRepo.likeUp(id);
    }
};
PostService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [post_repository_1.postRepo,
        user_repository_1.UserRepo])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map
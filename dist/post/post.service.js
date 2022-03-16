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
let PostService = class PostService {
    constructor(postRepo, userRepo) {
        this.postRepo = postRepo;
        this.userRepo = userRepo;
    }
    async readAll() {
        const data = await this.postRepo.joinUser();
        return data.map((e) => {
            if (Array.isArray(e.images) && e.images.length === 0) {
                return {
                    id: e.id,
                    content: e.content,
                    user_id: e.user.id,
                    nickname: e.user.nickname,
                    sentence: e.sentence,
                };
            }
            else {
                return {
                    id: e.id,
                    content: e.content,
                    user_id: e.user.id,
                    nickname: e.user.nickname,
                    img_url: e.images[0].url,
                    sentence: e.sentence,
                };
            }
        });
    }
    async read(id) {
        const data = await this.postRepo.joinUserById(id);
        return {
            id: data.id,
            content: data.content,
            user_id: data.user.id,
            nickname: data.user.nickname,
            images: data.images,
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
                throw new common_1.HttpException('본인의 글만 수정할 수 있습니다.', 503);
            }
        }
        else {
            throw new common_1.HttpException('존재하지 않는 게시글 입니다.', 503);
        }
    }
    async delete(currentUser, id) {
        const isExist = await this.postRepo.joinUserById(id);
        if (isExist) {
            if (isExist.user.id.toString() === currentUser.id ||
                currentUser.id === '1') {
                await this.postRepo.deleteById(id);
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
            else {
                throw new common_1.HttpException('본인의 글만 삭제할 수 있습니다.', 503);
            }
        }
        else {
            throw new common_1.HttpException('존재하지 않는 게시글 입니다.', 503);
        }
        return null;
    }
};
PostService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [post_repository_1.postRepo,
        user_repository_1.UserRepo])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map
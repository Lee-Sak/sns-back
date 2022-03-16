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
exports.HashTag = void 0;
const user_entity_1 = require("../../user/entity/user.entity");
const typeorm_1 = require("typeorm");
const post_entity_1 = require("./post.entity");
let HashTag = class HashTag {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], HashTag.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        nullable: false,
        length: 15,
        unique: true,
    }),
    __metadata("design:type", String)
], HashTag.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => post_entity_1.Post, (post) => post.hashtags, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    }),
    (0, typeorm_1.JoinTable)({
        name: 'hashtag_post',
    }),
    __metadata("design:type", Array)
], HashTag.prototype, "posts", void 0);
HashTag = __decorate([
    (0, typeorm_1.Entity)('hashtag')
], HashTag);
exports.HashTag = HashTag;
//# sourceMappingURL=hashtag.entity.js.map
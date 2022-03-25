"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateToString = exports.timeTransFunc = void 0;
const timeTransFunc = (data) => {
    return data.map((e) => {
        if (Array.isArray(e.images) && e.images.length === 0) {
            return {
                id: e.id,
                content: e.content,
                user_id: e.user.id,
                nickname: e.user.nickname,
                sentence: e.sentence,
                like: e.like,
                createdAt: e.createdAt,
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
                like: e.like,
                createdAt: e.createdAt,
            };
        }
    });
};
exports.timeTransFunc = timeTransFunc;
const dateToString = (value) => {
    return (value.getFullYear() +
        '-' +
        (value.getMonth() + 1) +
        '-' +
        value.getDate() +
        ' ' +
        value.getHours() +
        ':' +
        value.getMinutes() +
        ':' +
        value.getSeconds());
};
exports.dateToString = dateToString;
//# sourceMappingURL=timeTrans.func.js.map
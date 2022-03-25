export declare const timeTransFunc: (data: any[]) => ({
    id: any;
    content: any;
    user_id: any;
    nickname: any;
    sentence: any;
    like: any;
    createdAt: any;
    img_url?: undefined;
} | {
    id: any;
    content: any;
    user_id: any;
    nickname: any;
    img_url: any;
    sentence: any;
    like: any;
    createdAt: any;
})[];
export declare const dateToString: (value: Date) => string;

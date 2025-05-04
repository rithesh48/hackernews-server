"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostById = exports.getPostsFromYesterday = exports.getTopPostsToday = exports.deletePost = exports.getPostsByUser = exports.getAllPosts = exports.createPost = void 0;
const pagination_1 = require("../../extras/pagination");
const prisma_1 = require("../../integrations/prisma");
const posts_types_1 = require("./posts-types");
const createPost = async (parameters) => {
    try {
        if (!parameters.authorId) {
            return posts_types_1.PostStatus.USER_NOT_FOUND;
        }
        const post = await prisma_1.prismaClient.post.create({
            data: {
                title: parameters.title,
                content: parameters.content,
                author: {
                    connect: { id: parameters.authorId },
                },
            },
        });
        return { post };
    }
    catch (error) {
        console.error(error);
        return posts_types_1.PostStatus.POST_CREATION_FAILED;
    }
};
exports.createPost = createPost;
//Get All posts
const getAllPosts = async (parameters) => {
    try {
        const { skip, take } = (0, pagination_1.getPagination)(parameters.page, parameters.limit);
        const posts = await prisma_1.prismaClient.post.findMany({
            orderBy: { createdAt: "desc" },
            skip,
            take,
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                        name: true,
                    },
                },
                Comment: {
                    select: {
                        id: true,
                        content: true,
                        createdAt: true,
                    },
                },
                Like: {
                    select: {
                        id: true,
                        userId: true,
                        createdAt: true,
                    },
                },
            },
        });
        if (!posts || posts.length === 0) {
            throw new Error(posts_types_1.GetPostsError.NO_POSTS_FOUND);
        }
        return { posts };
    }
    catch (error) {
        console.error(error);
        throw new Error(posts_types_1.GetPostsError.UNKNOWN);
    }
};
exports.getAllPosts = getAllPosts;
//Retreive all the post of specific user
const getPostsByUser = async (parameters) => {
    try {
        const { skip, take } = (0, pagination_1.getPagination)(parameters.page, parameters.limit);
        const posts = await prisma_1.prismaClient.post.findMany({
            where: {
                userId: parameters.userId,
            },
            orderBy: { createdAt: "desc" },
            skip,
            take: take,
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                    },
                },
            },
        });
        if (!posts || posts.length === 0) {
            throw new Error(posts_types_1.GetPostsError.NO_POSTS_FOUND);
        }
        return { posts };
    }
    catch (error) {
        console.error(error);
        throw new Error(posts_types_1.GetPostsError.UNKNOWN);
    }
};
exports.getPostsByUser = getPostsByUser;
//Delete post
const deletePost = async (params) => {
    try {
        // Check if the post belongs to the user
        const post = await prisma_1.prismaClient.post.findUnique({
            where: { id: params.postId },
        });
        if (!post) {
            return posts_types_1.DeletePostError.POST_NOT_FOUND;
        }
        if (post.userId !== params.userId) {
            return posts_types_1.DeletePostError.UNAUTHORIZED;
        }
        await prisma_1.prismaClient.post.delete({
            where: { id: params.postId },
        });
        return posts_types_1.DeletePostError.DELETE_SUCCESS;
    }
    catch (error) {
        console.error(error);
        return posts_types_1.DeletePostError.DELETE_FAILED;
    }
};
exports.deletePost = deletePost;
const date_fns_1 = require("date-fns");
const getTopPostsToday = async ({ page, limit, }) => {
    const todayStart = (0, date_fns_1.startOfDay)(new Date());
    const todayEnd = (0, date_fns_1.endOfDay)(new Date());
    const skip = (page - 1) * limit;
    return await prisma_1.prismaClient.post.findMany({
        where: {
            createdAt: {
                gte: todayStart,
                lte: todayEnd,
            },
        },
        orderBy: {
            createdAt: "desc",
        },
        skip,
        take: limit,
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    username: true,
                },
            },
        },
    });
};
exports.getTopPostsToday = getTopPostsToday;
const getPostsFromYesterday = async ({ page, limit, }) => {
    const yesterdayStart = (0, date_fns_1.startOfDay)((0, date_fns_1.subDays)(new Date(), 1));
    const yesterdayEnd = (0, date_fns_1.endOfDay)((0, date_fns_1.subDays)(new Date(), 1));
    const skip = (page - 1) * limit;
    return await prisma_1.prismaClient.post.findMany({
        where: {
            createdAt: {
                gte: yesterdayStart,
                lte: yesterdayEnd,
            },
        },
        orderBy: {
            createdAt: "desc",
        },
        skip,
        take: limit,
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    username: true,
                },
            },
        },
    });
};
exports.getPostsFromYesterday = getPostsFromYesterday;
const getPostById = async (postId) => {
    const post = await prisma_1.prismaClient.post.findUnique({
        where: { id: postId },
        include: {
            author: { select: { id: true, username: true } },
            Comment: {
                select: {
                    id: true,
                    content: true,
                    createdAt: true,
                    user: { select: { username: true } },
                    post: {
                        select: {
                            id: true,
                            content: true,
                            title: true,
                            createdAt: true,
                        }
                    },
                },
                orderBy: { createdAt: "desc" },
            },
        },
    });
    if (!post) {
        throw new Error("Post not found");
    }
    return post;
};
exports.getPostById = getPostById;

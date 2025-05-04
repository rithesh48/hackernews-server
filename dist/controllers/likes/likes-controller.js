"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLike = exports.deleteLikeOnPost = exports.getLikesOnPost = void 0;
const pagination_1 = require("../../extras/pagination");
const prisma_1 = require("../../integrations/prisma");
const likes_types_1 = require("./likes-types");
const getLikesOnPost = async (params) => {
    try {
        const { skip, take } = (0, pagination_1.getPagination)(params.page, params.limit);
        const post = await prisma_1.prismaClient.post.findUnique({
            where: { id: params.postId },
        });
        if (!post) {
            return { status: likes_types_1.LikeStatus.POST_NOT_FOUND };
        }
        const likes = await prisma_1.prismaClient.like.findMany({
            where: { postId: params.postId },
            orderBy: { createdAt: "desc" },
            skip,
            take,
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
        if (likes.length === 0) {
            return { status: likes_types_1.LikeStatus.NO_LIKES_FOUND };
        }
        return {
            status: "SUCCESS",
            likes: likes.map((like) => ({
                id: like.id,
                createdAt: like.createdAt,
                user: {
                    id: like.user.id,
                    name: like.user.name,
                },
            })),
        };
    }
    catch (error) {
        console.error("Error fetching likes:", error);
        return { status: likes_types_1.LikeStatus.UNKNOWN };
    }
};
exports.getLikesOnPost = getLikesOnPost;
const deleteLikeOnPost = async (params) => {
    try {
        const like = await prisma_1.prismaClient.like.findFirst({
            where: {
                postId: params.postId,
                userId: params.userId,
            },
        });
        if (!like) {
            return { status: likes_types_1.LikeStatus.LIKE_NOT_FOUND };
        }
        await prisma_1.prismaClient.like.delete({
            where: {
                id: like.id,
            },
        });
        return { status: likes_types_1.LikeStatus.LIKE_DELETED };
    }
    catch (error) {
        console.error(error);
        return { status: likes_types_1.LikeStatus.UNKNOWN };
    }
};
exports.deleteLikeOnPost = deleteLikeOnPost;
const createLike = async (params) => {
    try {
        const post = await prisma_1.prismaClient.post.findUnique({
            where: { id: params.postId },
        });
        if (!post) {
            return { status: likes_types_1.LikeStatus.POST_NOT_FOUND };
        }
        const existingLike = await prisma_1.prismaClient.like.findFirst({
            where: {
                postId: params.postId,
                userId: params.userId,
            },
        });
        if (existingLike) {
            return { status: likes_types_1.LikeStatus.ALREADY_LIKED };
        }
        await prisma_1.prismaClient.like.create({
            data: {
                postId: params.postId,
                userId: params.userId,
            },
        });
        return { status: likes_types_1.LikeStatus.LIKE_ADDED };
    }
    catch (error) {
        console.error("Error creating like:", error);
        return { status: likes_types_1.LikeStatus.UNKNOWN };
    }
};
exports.createLike = createLike;

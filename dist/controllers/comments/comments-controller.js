"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateComment = exports.deleteComment = exports.getAllComments = exports.createComment = void 0;
const pagination_1 = require("../../extras/pagination");
const prisma_1 = require("../../integrations/prisma");
const comments_types_1 = require("./comments-types");
const createComment = async (params) => {
    try {
        const existPostId = await prisma_1.prismaClient.post.findUnique({
            where: { id: params.postId },
        });
        if (!existPostId) {
            throw new Error(comments_types_1.CommentStatus.POST_NOT_FOUND);
        }
        const result = await prisma_1.prismaClient.comment.create({
            data: {
                content: params.content,
                post: { connect: { id: params.postId } },
                user: { connect: { id: params.userId } },
            },
        });
        return { comment: result };
    }
    catch (error) {
        console.error("Error creating comment:", error);
        throw new Error(comments_types_1.CommentStatus.COMMENT_CREATION_FAILED);
    }
};
exports.createComment = createComment;
// Get all comments for a post (reverse chronological order, paginated)
const getAllComments = async (params) => {
    try {
        const { skip, take } = (0, pagination_1.getPagination)(params.page, params.limit);
        const comments = await prisma_1.prismaClient.comment.findMany({
            where: { postId: params.postId }, // Filter by postId
            orderBy: { createdAt: "desc" }, // Reverse chronological order
            skip,
            take,
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                    },
                },
            },
        });
        if (!comments || comments.length === 0) {
            return { comments: [] };
        }
        return { comments };
    }
    catch (error) {
        console.error("Error fetching comments:", error);
        throw new Error(comments_types_1.CommentStatus.UNKNOWN);
    }
};
exports.getAllComments = getAllComments;
const deleteComment = async (params) => {
    try {
        const comment = await prisma_1.prismaClient.comment.findUnique({
            where: { id: params.commentId },
        });
        if (!comment) {
            return comments_types_1.CommentStatus.COMMENT_NOT_FOUND;
        }
        await prisma_1.prismaClient.comment.delete({ where: { id: params.commentId } });
        return comments_types_1.CommentStatus.DELETE_SUCCESS;
    }
    catch (error) {
        console.error("Error deleting comment:", error);
        return comments_types_1.CommentStatus.UNKNOWN;
    }
};
exports.deleteComment = deleteComment;
//update comment controller
const updateComment = async (params) => {
    try {
        const comment = await prisma_1.prismaClient.comment.findUnique({
            where: { id: params.commentId },
        });
        if (!comment) {
            return comments_types_1.CommentStatus.COMMENT_NOT_FOUND;
        }
        await prisma_1.prismaClient.comment.update({
            where: { id: params.commentId },
            data: { content: params.content },
        });
        return comments_types_1.CommentStatus.UPDATE_SUCCESS;
    }
    catch (error) {
        console.error("Error updating comment:", error);
        return comments_types_1.CommentStatus.UNKNOWN;
    }
};
exports.updateComment = updateComment;

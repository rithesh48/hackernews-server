"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUsers = exports.GetMe = void 0;
const pagination_1 = require("../../extras/pagination");
const prisma_1 = require("../../integrations/prisma");
const users_types_1 = require("./users-types");
const GetMe = async (parameters) => {
    try {
        const user = await prisma_1.prismaClient.user.findUnique({
            where: { id: parameters.userId },
            select: {
                id: true,
                name: true,
                username: true,
                createdAt: true,
                updatedAt: true,
                email: true,
                emailVerified: true,
                image: true,
                posts: {
                    select: {
                        id: true,
                        title: true,
                        content: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
                Comment: {
                    select: {
                        id: true,
                        content: true,
                        createdAt: true,
                        postId: true,
                    },
                },
                Like: {
                    select: {
                        id: true,
                        createdAt: true,
                        postId: true,
                    },
                },
            },
        });
        if (!user) {
            throw users_types_1.GetMeError.USER_NOT_FOUND;
        }
        return { user };
    }
    catch (e) {
        console.error(e);
        throw users_types_1.GetMeError.UNKNOWN;
    }
};
exports.GetMe = GetMe;
const GetUsers = async (parameter) => {
    try {
        const { skip, take } = (0, pagination_1.getPagination)(parameter.page, parameter.limit);
        const users = await prisma_1.prismaClient.user.findMany({
            orderBy: { name: "asc" },
            skip,
            take,
            select: {
                id: true,
                name: true,
                username: true,
                createdAt: true,
                updatedAt: true,
                email: true,
                emailVerified: true,
                image: true,
            },
        });
        if (!users || users.length === 0) {
            throw users_types_1.GetAllUsersError.NO_USERS_FOUND;
        }
        return { users };
    }
    catch (e) {
        console.error(e);
        throw users_types_1.GetAllUsersError.UNKNOWN;
    }
};
exports.GetUsers = GetUsers;

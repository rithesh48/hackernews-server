"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRoutes = void 0;
const hono_1 = require("hono");
const session_middleware_1 = require("../../routes/middlewares/session-middleware");
const post_controller_1 = require("./post-controller");
const posts_types_1 = require("./posts-types");
exports.postsRoutes = new hono_1.Hono();
exports.postsRoutes.post("/", session_middleware_1.sessionMiddleware, async (context) => {
    try {
        const user = context.get("user"); //From sessionMiddleware
        if (!user?.id) {
            return context.json({ error: "Unauthorized" }, 401);
        }
        const { title, content } = await context.req.json();
        if (!title || !content) {
            return context.json({ error: "Title and Content are required" }, 400);
        }
        const result = await (0, post_controller_1.createPost)({
            title,
            content,
            authorId: user.id,
        });
        if (result === posts_types_1.PostStatus.USER_NOT_FOUND) {
            return context.json({ error: "User not found" }, 404);
        }
        if (result === posts_types_1.PostStatus.POST_CREATION_FAILED) {
            return context.json({ error: "Post creation failed" }, 500);
        }
        return context.json(result, 201);
    }
    catch (error) {
        console.error(error);
        return context.json({ error: "Server error" }, 500);
    }
});
// GET /posts - Paginated, reverse chronological
exports.postsRoutes.get("/", async (context) => {
    try {
        const page = parseInt(context.req.query("page") || "1", 10);
        const limit = parseInt(context.req.query("limit") || "2", 10);
        const result = await (0, post_controller_1.getAllPosts)({ page, limit });
        if (!result) {
            return context.json({ error: "Users not found" }, 404);
        }
        return context.json(result, 200);
    }
    catch (error) {
        if (error === posts_types_1.GetPostsError.NO_POSTS_FOUND) {
            return context.json({ error: "No posts found" }, 404);
        }
        console.error(error);
        return context.json({ error: "Server error" }, 500);
    }
});
// Get all posts in reverse chronological order of the current user
exports.postsRoutes.get("/me", session_middleware_1.sessionMiddleware, async (context) => {
    try {
        const user = context.get("user");
        const page = parseInt(context.req.query("page") || "1", 10);
        const limit = parseInt(context.req.query("limit") || "2", 10);
        const result = await (0, post_controller_1.getPostsByUser)({ userId: user.id, page, limit });
        if (!result) {
            return context.json({ error: "No posts found" }, 404);
        }
        return context.json(result, 200);
    }
    catch (error) {
        console.error(error);
        return context.json({ error: "Server error" }, 500);
    }
});
// Delete by userId
exports.postsRoutes.delete(":postId", session_middleware_1.sessionMiddleware, async (context) => {
    try {
        const user = context.get("user");
        const postId = context.req.param("postId");
        if (!user?.id) {
            return context.json({ error: "Unauthorized" }, 401);
        }
        const result = await (0, post_controller_1.deletePost)({ postId, userId: user.id });
        if (result === posts_types_1.DeletePostError.POST_NOT_FOUND) {
            return context.json({ error: "Post not found" }, 404);
        }
        if (result === posts_types_1.DeletePostError.UNAUTHORIZED) {
            return context.json({ error: "You are not authorized to delete this post" }, 403);
        }
        if (result === posts_types_1.DeletePostError.DELETE_FAILED) {
            return context.json({ error: "Failed to delete post" }, 500);
        }
        return context.json({ message: "Post deleted successfully" }, 200);
    }
    catch (error) {
        console.error(error);
        return context.json({ error: "Server error" }, 500);
    }
});
exports.postsRoutes.get("/new", async (context) => {
    try {
        const page = parseInt(context.req.query("page") || "1", 10);
        const limit = parseInt(context.req.query("limit") || "5", 10);
        const posts = await (0, post_controller_1.getTopPostsToday)({ page, limit });
        if (!posts || posts.length === 0) {
            return context.json({ error: "No posts found" }, 404);
        }
        return context.json({ posts }, 200);
    }
    catch (error) {
        console.error(error);
        return context.json({ error: "Server error" }, 500);
    }
});
exports.postsRoutes.get("/past", async (context) => {
    try {
        const page = parseInt(context.req.query("page") || "1", 10);
        const limit = parseInt(context.req.query("limit") || "5", 10);
        const posts = await (0, post_controller_1.getPostsFromYesterday)({ page, limit });
        if (!posts || posts.length === 0) {
            return context.json({ error: "No posts found" }, 404);
        }
        return context.json({ posts }, 200);
    }
    catch (error) {
        console.error(error);
        return context.json({ error: "Server error" }, 500);
    }
});
exports.postsRoutes.get("/:postId", async (c) => {
    try {
        const postId = c.req.param("postId");
        const post = await (0, post_controller_1.getPostById)(postId);
        if (!post) {
            return c.json({ error: "Post not found" }, 404);
        }
        return c.json({ post }, 200);
    }
    catch (error) {
        return c.json({ error: "Post not found" }, 404);
    }
});

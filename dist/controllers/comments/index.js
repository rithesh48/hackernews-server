"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRoutes = void 0;
const hono_1 = require("hono");
const session_middleware_1 = require("../../routes/middlewares/session-middleware");
const comments_controller_1 = require("./comments-controller");
const comments_types_1 = require("./comments-types");
exports.commentRoutes = new hono_1.Hono();
exports.commentRoutes.post("/on/:postId", session_middleware_1.sessionMiddleware, async (c) => {
    try {
        const postId = c.req.param("postId");
        const userId = c.get("user").id; // Get user ID from session
        const { content } = await c.req.json();
        const result = await (0, comments_controller_1.createComment)({ content, postId, userId });
        return c.json(result);
    }
    catch (error) {
        if (error === comments_types_1.CommentStatus.POST_NOT_FOUND) {
            return c.json({ message: "Post not found" }, 404);
        }
        if (error === comments_types_1.CommentStatus.COMMENT_CREATION_FAILED) {
            return c.json({ message: "Comment creation failed" }, 500);
        }
        return c.json({ message: "Unknown error" }, 500);
    }
});
// Get all comments for a post
exports.commentRoutes.get("/on/:postId", async (c) => {
    const postId = c.req.param("postId");
    const page = Number(c.req.query("page")) || 1;
    const limit = Number(c.req.query("limit")) || 10;
    try {
        const result = await (0, comments_controller_1.getAllComments)({ postId, page, limit });
        return c.json({ status: "SUCCESS", comments: result.comments }, 200);
    }
    catch (error) {
        return c.json({ status: error }, 404);
    }
});
// Delete a comment
exports.commentRoutes.delete("/:commentId", session_middleware_1.sessionMiddleware, async (c) => {
    const commentId = c.req.param("commentId");
    const userId = c.get("user").id;
    try {
        const result = await (0, comments_controller_1.deleteComment)({ commentId, userId });
        return c.json({ status: result }, 200);
    }
    catch (error) {
        return c.json({ status: error }, 403);
    }
});
// Update a comment
exports.commentRoutes.patch("/:commentId", session_middleware_1.sessionMiddleware, async (c) => {
    const commentId = c.req.param("commentId");
    const userId = c.get("user").id;
    const { content } = await c.req.json();
    try {
        const result = await (0, comments_controller_1.updateComment)({ commentId, userId, content });
        return c.json({ status: result }, 200);
    }
    catch (error) {
        return c.json({ status: error }, 403);
    }
});

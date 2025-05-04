"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allRoutes = void 0;
const hono_1 = require("hono");
const logger_1 = require("hono/logger");
const session_middleware_1 = require("./middlewares/session-middleware");
const cors_1 = require("hono/cors");
const users_1 = require("../controllers/users");
const posts_1 = require("../controllers/posts");
const likes_1 = require("../controllers/likes");
const comments_1 = require("../controllers/comments");
exports.allRoutes = new hono_1.Hono();
exports.allRoutes.use("*", (0, cors_1.cors)({
    origin: "https://hackernews-www-y93o.vercel.app", // ✅ Only allow your frontend
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
}));
// Global logger
exports.allRoutes.use((0, logger_1.logger)());
// Route groups
//allRoutes.route("/auth", authenticationRoutes);
exports.allRoutes.route("/users", users_1.usersRoutes);
exports.allRoutes.route("/posts", posts_1.postsRoutes);
exports.allRoutes.route("/likes", likes_1.likeRoutes);
exports.allRoutes.route("/comments", comments_1.commentRoutes);
exports.allRoutes.route("/api/auth", session_middleware_1.authRoute);

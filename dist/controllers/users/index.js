"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoutes = void 0;
const hono_1 = require("hono");
const users_controller_1 = require("./users-controller");
const users_types_1 = require("../../controllers/users/users-types");
const session_middleware_1 = require("../../routes/middlewares/session-middleware");
exports.usersRoutes = new hono_1.Hono();
exports.usersRoutes.get("/me", session_middleware_1.sessionMiddleware, async (context) => {
    try {
        const sessionUser = context.get("user"); // pulled from sessionMiddleware
        if (!sessionUser?.id) {
            return context.json({ error: "User not found in session" }, 401);
        }
        const result = await (0, users_controller_1.GetMe)({ userId: sessionUser.id });
        return context.json(result, 200);
    }
    catch (error) {
        if (error === users_types_1.GetMeError.USER_NOT_FOUND) {
            return context.json({ error: "User not found" }, 404);
        }
        console.error("GetMe error:", error);
        return context.json({ error: "Unknown error" }, 500);
    }
});
exports.usersRoutes.get("/", session_middleware_1.sessionMiddleware, async (context) => {
    try {
        const page = parseInt(context.req.query("page") || "1", 10);
        const limit = parseInt(context.req.query("limit") || "2", 10);
        const result = await (0, users_controller_1.GetUsers)({ page, limit });
        if (!result) {
            return context.json({ error: "Users not found" }, 404);
        }
        return context.json(result, 200);
    }
    catch (error) {
        if (error === users_types_1.GetAllUsersError.NO_USERS_FOUND) {
            return context.json({ error: "Users not found" }, 404);
        }
        if (error === users_types_1.GetAllUsersError.UNKNOWN) {
            return context.json({ error: "Unknown error" }, 500);
        }
    }
});
exports.usersRoutes.get("/profile/:userId", async (context) => {
    try {
        const userId = context.req.param("userId"); // Use param() method instead of params
        const result = await (0, users_controller_1.GetMe)({ userId });
        if (!result) {
            return context.json({ error: "User not found" }, 404);
        }
        return context.json(result, 200);
    }
    catch (error) {
        console.error("Error fetching user profile:", error);
        return context.json({ error: "Failed to fetch user profile" }, 500);
    }
});

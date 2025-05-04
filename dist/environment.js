"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = exports.betterAuthSecret = exports.webClientUrl = exports.serverUrl = exports.directUrl = exports.databaseUrl = exports.jwtSecretKey = void 0;
// Example environment configuration
exports.jwtSecretKey = process.env.JWT_SECRET_KEY || process.exit(1);
const env = {
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: process.env.PORT || 3000,
};
exports.env = env;
exports.databaseUrl = process.env.DATABASE_URL || process.exit(1);
exports.directUrl = process.env.DIRECT_URL || process.exit(1);
exports.serverUrl = process.env.SERVER_URL || process.exit(1);
exports.webClientUrl = process.env.WEB_CLIENT_URL || process.exit(1);
exports.betterAuthSecret = process.env.BETTER_AUTH_SECRET || process.exit(1);

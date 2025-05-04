"use strict";
// routes/swagger-routes.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerRoutes = void 0;
const hono_1 = require("hono");
const swagger_ui_1 = require("@hono/swagger-ui");
const openapi_1 = require("./middlewares/openapi");
exports.swaggerRoutes = new hono_1.Hono();
exports.swaggerRoutes.get("/", (0, swagger_ui_1.swaggerUI)({ url: "/ui/swagger.json" }));
// ✅ Raw OpenAPI JSON served at /ui/swagger.json
exports.swaggerRoutes.get("/swagger.json", (c) => c.json(openapi_1.openapi));

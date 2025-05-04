"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config"); // Load .env first
const node_server_1 = require("@hono/node-server");
const routes_1 = require("./routes");
// Get PORT from environment variable (required by Azure)
const port = parseInt(process.env.PORT || "3000", 10);
(0, node_server_1.serve)({
    fetch: routes_1.allRoutes.fetch,
    port: port,
}, (info) => {
    console.log(`🚀 SERVER RUNNING ON PORT ${info.port}`);
});

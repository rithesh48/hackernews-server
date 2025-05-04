"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config"); // Load .env first
const node_server_1 = require("@hono/node-server");
const routes_1 = require("./routes");
(0, node_server_1.serve)(routes_1.allRoutes, (info) => {
    console.log(`🚀 SERVER RUNNING ON PORT ${info.port}`);
});

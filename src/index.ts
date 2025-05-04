import "dotenv/config"; // Load .env first
import { serve } from "@hono/node-server";
import { allRoutes } from "./routes";

// Get PORT from environment variable (required by Azure)
const port = parseInt(process.env.PORT || "3000", 10);

serve(
  {
    fetch: allRoutes.fetch,
    port: port,
  },
  (info) => {
    console.log(`🚀 SERVER RUNNING ON PORT ${info.port}`);
  }
);

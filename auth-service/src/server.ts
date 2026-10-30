import { createApp } from "./app/app.js";
import { connectDatabase } from "./config/database.js";
import { env } from "./config/env.js";
import logger from "./config/logger.js";

let app = createApp();

async function startServer(){
    await connectDatabase();

    app.listen(env.PORT,() => {
        logger.info({PORT:env.PORT},"server running on port")
    })
}

startServer()
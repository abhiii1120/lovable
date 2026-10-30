import { createApp } from "./app/app";
import { connectDatabase } from "./config/database";
import { env } from "./config/env";
import logger from "./config/logger";

let app = createApp();

async function startServer(){
    await connectDatabase();

    app.listen(env.PORT,() => {
        logger.info({PORT:env.PORT},"server running on port")
    })
}

startServer()
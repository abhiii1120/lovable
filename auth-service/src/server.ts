import { createApp } from "./app/app.js";
import { connectDatabase } from "./config/database.js";
import { env } from "./config/env.js";
import logger from "./config/logger.js";

let app = createApp();

async function startServer(){
    await connectDatabase();

    const server = app.listen(env.PORT,() => {
        logger.info({PORT:env.PORT},"server running on port")
    })


const shutdown = async (signal:string):Promise<void>=> {
    logger.info(`Received ${signal}, shutting down server`);
    server.close(async () => {
        try {
            await import('mongoose').then(({default:mongoose}) => mongoose.disconnect());
            logger.info("MongoDB disconnected");
            process.exit(0);
        } catch(error){
            logger.info({Error:error},"Error during shutdown");
            process.exit(1);
        }
    });  
};

process.on("SIGINT",() => {
    void shutdown("SIGINT");
})

process.on("SIGTERM",() => {
    void shutdown("SIGTERM");
})
}

startServer();
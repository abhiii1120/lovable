import { createApp } from "./app/app.js";

let app = createApp();

async function startServer(){

    app.listen(3000,() => {
        console.log("Project server is running on port 3000");
    })
}

startServer();
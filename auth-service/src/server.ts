import { createApp } from "./app/app";

let app = createApp();

async function startServer(){
    app.listen(3000,() => {
        console.log("auth service running on port 3000")
    })
}

startServer()
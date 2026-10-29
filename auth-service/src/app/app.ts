import express from 'express';

/**
 * Create the Express instance.
 * 
 * @returns Configured Express app.
 */
export function createApp(){
    let app = express()

    return app;
}
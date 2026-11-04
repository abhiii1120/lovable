import  express  from 'express';
import morgan from 'morgan';

export function createApp(){
    let app = express()

    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    app.use(morgan("dev"));

    return app
}
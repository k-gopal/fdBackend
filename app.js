import express from 'express';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import cors from 'cors';

//env config express initialization
config();
const app = express();

// importing routes
import authRoute from './routes/authentication.js';

// getting data in JSON format
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//using cookie parser
app.use(cookieParser());

//Setting up cors
var corsOption = {
    origin: "*",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));

// using routes
app.use('/auth', authRoute);


// listening app on port
app.listen(process.env.PORT, () => {
    console.log('Post App listening on port: ', process.env.PORT);
});
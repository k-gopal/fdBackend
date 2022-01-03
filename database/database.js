import mongoose from "mongoose";
import { config } from 'dotenv';

config();

//db connect function where creds are fetched froom env
const connect = async (
    dbString = process.env.DB_STRING,
    dbHost = process.env.DB_USER,
    dbPass = process.env.DB_PASSWORD
) => {
    try {
        dbString = dbString.replace("<host>", dbHost).replace("<password>", dbPass);
        return await mongoose.connect(dbString, { useNewUrlParser: true, useUnifiedTopology: true })
    } catch (error) {
        console.log("error in db connection", error);
        return error
    }
};

export default connect;
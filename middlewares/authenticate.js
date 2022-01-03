import User from '../model/Users.js';
import { sendResponseObject, verifyAuthToken } from '../utils/common.js';
import HTTP_CODE from '../utils/constants.js';
import connect from "../database/database.js";

//db connection
if (typeof client === "undefined") var client = connect();
//function to validate whether the requested API call is from registered and verified user
const authenticate = async (req, res, next) => {
    let token = req.headers["authorization"];

    let email = verifyAuthToken(token);
    if (email?.email) {
        let user = await User.findOne({ email: email.email });
        console.log("user", user)
        if (user._id) {
            req.user = email.email;
            next()
        } else {
            res.status(HTTP_CODE.UNAUTHORISED).send(sendResponseObject("FAILURE", HTTP_CODE.UNAUTHORISED, [], "Invalid Token."))
        }
    } else {
        res.status(HTTP_CODE.UNAUTHORISED).send(sendResponseObject("FAILURE", HTTP_CODE.UNAUTHORISED, [], "Invalid Token."))
    }
}

export {
    authenticate
}
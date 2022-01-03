import HTTP_CODE from "./constants.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//function to send response for eery api call
const sendResponseObject = (
  status = true,
  statusCode = HTTP_CODE.SUCCESS,
  payload = [],
  message = ""
) => {
  let objResponse = {
    status: "SUCCESS",
    statusCode: HTTP_CODE.SUCCESS,
    message: "",
    payload: [],
  };
  if (Array.isArray(payload) && !payload.length && !message) {
    objResponse.message = "Data not found";
  } else if (
    Array.isArray(payload) ||
    (typeof payload === "object" && Object.keys(payload).length)
  ) {
    objResponse.payload = payload;
    objResponse.message = message !== "" ? message : "";
    objResponse.statusCode = statusCode !== "" ? statusCode : 200;
    objResponse.status = status ? status : "SUCCESS";
  } else if (payload === null) {
    objResponse.message = "Internal server error";
    statusCode = HTTP_CODE.BAD_REQUEST;
    objResponse.statusCode = HTTP_CODE.BAD_REQUEST;
  }

  return {
    ...objResponse,
  };
};

//function to generate jwt token for verified users
const generateAccessToken = (email) => {
  return jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: 30 * 60,
  });
};

//function to comapre fetched token to authenticate user
const verifyAuthToken = (token) => {
  try {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    return false;
  }
};

//function to hash passwords
const hashPassword = async (password) => {
  try {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    return hash;
  } catch (error) {
    console.log("error in hasing password", error);
    return false;
  }
};

//function to compare hash passwords
const comparePasswords = (password, hashedPass) => {
  try {
    return bcrypt.compareSync(password, hashedPass);
  } catch (error) {
    console.log("error in comparing password", error);
    return false;
  }
};


export {
  generateAccessToken,
  sendResponseObject,
  verifyAuthToken,
  hashPassword,
  comparePasswords,
};

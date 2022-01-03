import HTTP_CODE from "../utils/constants.js";
import {
  sendResponseObject,
  generateAccessToken,
  hashPassword,
  comparePasswords,
} from "../utils/common.js";
import connect from "../database/database.js";
import signUpSchema from "../schema/SignUpSchema.js";
import { createUser, findUserByEmailAndProfession } from "../services/authServices.js";
import signInSchema from "../schema/SignInSchema.js";

//db connection
if (typeof client === "undefined") var client = connect();

const signUp = async (req, res, next) => {
  try {
    console.log("call to sign up");
    let body = req.body;
    console.log("Body: ", body);
    let validation = signUpSchema.validate(body);

    if (validation.error) {
      return res
        .status(HTTP_CODE.BAD_REQUEST)
        .send(
          sendResponseObject(
            "FAILURE",
            HTTP_CODE.BAD_REQUEST,
            [validation.error],
            "Bad request."
          )
        );
    }
    let hashedPass = hashPassword(body.password);

    console.log("hash", hashedPass);

    if (hashedPass) {
      let result = await createUser({
        name: body.name,
        email: body.email,
        profession: body.profession,
        password: (await hashedPass).toString(),
      });
      console.log("result", result);
      if (result) {
        let token = generateAccessToken(body.email);

        return res
          .status(HTTP_CODE.SUCCESS)
          .send(
            sendResponseObject(
              "SUCCESS",
              HTTP_CODE.SUCCESS,
              { email: body.email, token },
              "User is successfully registered."
            )
          );
      } else {
        return res
          .status(HTTP_CODE.INTERNAL_SERVER_ERROR)
          .send(
            sendResponseObject(
              "FAILURE",
              HTTP_CODE.INTERNAL_SERVER_ERROR,
              [],
              "Not able to sign you up."
            )
          );
      }
    }
  } catch (error) {
    console.log("Error: ", error);
    return res
      .status(HTTP_CODE.INTERNAL_SERVER_ERROR)
      .send(
        sendResponseObject(
          "FAILURE",
          HTTP_CODE.INTERNAL_SERVER_ERROR,
          [error],
          "Not able to sign you up."
        )
      );
  }
};

const signIn = async (req, res, next) => {
  try {
    console.log("call to sign in");
    let body = req.body;
    console.log("Body: ", body);
    let validation = signInSchema.validate(body);

    if (validation.error) {
      return res
        .status(HTTP_CODE.BAD_REQUEST)
        .send(
          sendResponseObject(
            "FAILURE",
            HTTP_CODE.BAD_REQUEST,
            [validation.error],
            "Bad request."
          )
        );
    }

    let result = await findUserByEmailAndProfession(body.email, body.profession);
    if (result.length) {
      console.log("result", result);
      let passResult = comparePasswords(body.password, result[0].password);
      if (passResult) {
          let token = generateAccessToken(body.email);
          return res
          .status(HTTP_CODE.SUCCESS)
          .send(
            sendResponseObject(
              "SUCCESS",
              HTTP_CODE.SUCCESS,
              { email: body.email, token },
              "User is successfully signed in."
            )
          );
      } else {
        return res
          .status(HTTP_CODE.NOT_FOUND)
          .send(
            sendResponseObject(
              "FAILURE",
              HTTP_CODE.NOT_FOUND,
              [],
              "Password is incorrect."
            )
          );
      }
    } else {
      return res
        .status(HTTP_CODE.NOT_FOUND)
        .send(
          sendResponseObject(
            "FAILURE",
            HTTP_CODE.NOT_FOUND,
            [],
            "User is not registered."
          )
        );
    }
  } catch (error) {
    console.log("Error: ", error);
    return res
      .status(HTTP_CODE.INTERNAL_SERVER_ERROR)
      .send(
        sendResponseObject(
          "FAILURE",
          HTTP_CODE.INTERNAL_SERVER_ERROR,
          [error],
          "Not able to sign you in."
        )
      );
  }
};

export { signUp, signIn };

import HTTP_CODE from "../utils/constants.js";
import { sendResponseObject } from "../utils/common.js";
import connect from "../database/database.js";
import {
  createBid,
  findBiddedOn,
  getActiveBidList,
  getBiddersListByBidId,
  getBidDetailsForEmail,
  getBidListByEmailActive,
  getBidListByEmailClosed,
  setBid,
} from "../services/createBidsService.js";
import createBidSchema from "../schema/createBidSchema.js";
import getActiveBidByEmailSchema from "../schema/getActiveBidByEmailSchema.js";
import getBiddersListByBidIdSchema from "../schema/getBiddersListSchema.js";
import listActiveBidSchema from "../schema/listActiveBidsSchema.js";
import getBidDetailsSchema from "../schema/getBiDetailsSchema.js";
import setBiddingSchema from "../schema/setBiddingSchema.js";

//db connection
if (typeof client === "undefined") var client = connect();

const createBidController = async (req, res, next) => {
  try {
    console.log("call to createbid");
    let body = req.body;
    console.log("Body: ", body);
    let validation = createBidSchema.validate(body);

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

    let createBidResult = await createBid({
      city: body.city,
      goodsDescription: body.goodsDescription,
      activeDurationStart: body.activeDurationStart,
      activeDurationEnd: body.activeDurationEnd,
      initialAmount: body.initialAmount,
      revisions: body.revisions,
      contractor: req.user,
    });

    console.log("Result:", createBidResult);
    if (createBidResult) {
      return res
        .status(HTTP_CODE.SUCCESS)
        .send(
          sendResponseObject(
            "SUCCESS",
            HTTP_CODE.SUCCESS,
            {},
            "Bid is created successfully."
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
            "There was an error in creating your Bid."
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
          "There was an error in creating your Bid."
        )
      );
  }
};

const getActiveBidsByEmail = async (req, res, next) => {
  try {
    console.log("call to createbid");
    let body = req.body;
    console.log("Body: ", body);
    let validation = getActiveBidByEmailSchema.validate(body);

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

    let bidListResult = await getBidListByEmailActive(body.email, body.limit);
    if (bidListResult?.length) {
      return res
        .status(HTTP_CODE.SUCCESS)
        .send(
          sendResponseObject(
            "SUCCESS",
            HTTP_CODE.SUCCESS,
            { result: bidListResult },
            "Bid lit is fetched successfully."
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
            "There was an error in fetching your Bid."
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
          "There was an error in fetching bid list."
        )
      );
  }
};

const getClosedBidsByEmail = async (req, res, next) => {
  try {
    console.log("call to createbid");
    let body = req.body;
    console.log("Body: ", body);
    let validation = getActiveBidByEmailSchema.validate(body);

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

    let bidListResult = await getBidListByEmailClosed(body.email, body.limit);
    if (bidListResult?.length) {
      return res
        .status(HTTP_CODE.SUCCESS)
        .send(
          sendResponseObject(
            "SUCCESS",
            HTTP_CODE.SUCCESS,
            { result: bidListResult },
            "Bid lit is fetched successfully."
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
            "There was an error in fetching your Bid."
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
          "There was an error in fetching bid list."
        )
      );
  }
};

const getBiddersListForEachBid = async (req, res, next) => {
  try {
    let body = req.body;
    console.log("Body: ", body);
    let validation = getBiddersListByBidIdSchema.validate(body);

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
    let bidderListResult = await getBiddersListByBidId(body.id);
    if (bidderListResult?.length) {
      return res
        .status(HTTP_CODE.SUCCESS)
        .send(
          sendResponseObject(
            "SUCCESS",
            HTTP_CODE.SUCCESS,
            { result: bidderListResult },
            "Bid lit is fetched successfully."
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
            "There was an error in fetching your Bid."
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
          "There was an error in fetching bidders list."
        )
      );
  }
};

const getActiveBidsList = async (req, res, next) => {
  try {
    let body = req.body;
    let validation = listActiveBidSchema.validate(body);

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

    let activeBidsResult = await getActiveBidList(body.limit);
    if (activeBidsResult?.length) {
      return res
        .status(HTTP_CODE.SUCCESS)
        .send(
          sendResponseObject(
            "SUCCESS",
            HTTP_CODE.SUCCESS,
            { result: activeBidsResult },
            "Bid lit is fetched successfully."
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
            "There was an error in fetching your Bid."
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
          "There was an error in fetching bids list."
        )
      );
  }
};

const getBidDetails = async (req, res, next) => {
  try {
    let body = req.body;
    let validation = getBidDetailsSchema.validate(body);

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
    let getBidDetailsesult = await getBidDetailsForEmail(body.id, body.email);
    if (getBidDetailsesult?.length) {
      return res
        .status(HTTP_CODE.SUCCESS)
        .send(
          sendResponseObject(
            "SUCCESS",
            HTTP_CODE.SUCCESS,
            { result: getBidDetailsesult },
            "Bid lit is fetched successfully."
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
            "There was an error in fetching your Bid."
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
          "There was an error in fetching bid details."
        )
      );
  }
};

const setBidding = async (req, res, next) => {
  try {
    let body = req.body;
    let validation = setBiddingSchema.validate(body);

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
    let setBiddingResult = await setBid(body.id, body.email, body.price, body.revisions);
    if (setBiddingResult.acknowledged) {
      return res
        .status(HTTP_CODE.SUCCESS)
        .send(
          sendResponseObject(
            "SUCCESS",
            HTTP_CODE.SUCCESS,
            { result: setBiddingResult },
            "Bid is added successfully."
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
            "There was an error in adding your Bid."
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
          "There was an error in setting your bid."
        )
      );
  }
};


const fetchBiddenOn = async (req, res, next) => {
    try {
      let body = req.body;
      let validation = getActiveBidByEmailSchema.validate(body);
  
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
      let fetchBiddedOnResult = await findBiddedOn(body.email);
      if (fetchBiddedOnResult) {
        return res
          .status(HTTP_CODE.SUCCESS)
          .send(
            sendResponseObject(
              "SUCCESS",
              HTTP_CODE.SUCCESS,
              { result: fetchBiddedOnResult },
              "Bids ftched successfully."
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
              "There was an error in fetching your Bids."
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
            "There was an error in fetching your Bids."
          )
        );
    }
  };

export {
  createBidController,
  getActiveBidsByEmail,
  getClosedBidsByEmail,
  getBiddersListForEachBid,
  getActiveBidsList,
  setBidding,
  getBidDetails,
  fetchBiddenOn
};

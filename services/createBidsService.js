import CreateBid from "../model/CreateBid.js";
import mongoose from "mongoose";


const createBid = async (data) => {
  try {
    const bid = new CreateBid(data);
    let result = await bid.save();

    if (result) return result;
    return false;
  } catch (error) {
    console.log("error in create bid", error);
    return false;
  }
};

const getBidListByEmailActive = async (email, limit) => {
  try {
    let dateNow = new Date().toISOString();
    console.log("Date:", dateNow);
    let result = await CreateBid.find({
      $and: [
        { email },
        { activeDurationStart: { $lte: dateNow } },
        { activeDurationEnd: { $gte: dateNow } },
      ],
    })
      .sort({ activeDurationEnd: -1 })
      .limit(limit);

    console.log("result:", result);
    if (result) return result;
    return [];
  } catch (error) {
    console.log("error in list bid", error);
    return [];
  }
};

const getBidListByEmailClosed = async (email, limit) => {
  try {
    let dateNow = new Date().toISOString();
    console.log("Date:", dateNow);
    let result = await CreateBid.find({
      $and: [{ email }, { activeDurationEnd: { $lt: dateNow } }],
    })
      .sort({ activeDurationEnd: -1 })
      .limit(limit);

    console.log("result:", result);
    if (result) return result;
    return [];
  } catch (error) {
    console.log("error in list bid", error);
    return [];
  }
};

const getBiddersListByBidId = async (_id) => {
  try {
    let result = await CreateBid.aggregate([
      {
        $match: {
          _id,
        },
      },
      {
        $unwind: "$bidders",
      },
      {
        $sort: {
          "bidders.price": 1,
        },
      },
      {
        $project: {
          _id: 0,
          bidders: 1,
        },
      },
    ]);

    if (result) return result;
    return [];
  } catch (error) {
    console.log("error in get biders list", error);
    return [];
  }
};

const getActiveBidList = async (limit) => {
  try {
    let dateNow = new Date().toISOString();
    console.log("Date:", dateNow);
    let result = await CreateBid.find({
      $and: [
        { activeDurationStart: { $lte: dateNow } },
        { activeDurationEnd: { $gte: dateNow } },
      ],
    })
      .sort({ activeDurationEnd: -1 })
      .limit(limit);

    console.log("result:", result);
    if (result) return result;
    return [];
  } catch (error) {
    console.log("Error in getActiveBidsList:", error);
    return [];
  }
};

const getBidDetailsForEmail = async (_id, email) => {
  try {
    let result = await CreateBid.aggregate([
      {
        $match: {
            _id: mongoose.Types.ObjectId(_id)
        },
      },
      {
        $unwind: "$bidders",
      },
      {
        $match: {
          "bidders.email": email,
        },
      },
      {
        $project: {
          _id: 0,
          price: "$bidders.price",
          email: "$bidders.email",
          revisions: "$bidders.revisions",
        },
      },
    ]);
    console.log("result", result);
    if (result) return result;
    return [];
  } catch (error) {
    console.log("error in get biders list", error);
    return [];
  }
};

const setBid = async (_id, email, price, revisions) => {
  try {
    let result = await CreateBid.aggregate([{
        $match: {
            _id: mongoose.Types.ObjectId(_id)
        }
    },{
        $push: {
            "bidders": {
                email, price, revisions
            }
        }
    }
    ]);
      console.log("resss", result)
    if(result) return result;
    return false;
  } catch (error) {
    console.log("error in get biders list", error);
    return false;
  }
};

const findBiddedOn = async (email) => {
    try {
      let result = await CreateBid.find({"bidders.email": email});
      if(result) return result;
      return false;
    } catch (error) {
      console.log("error in get biders list", error);
      return false;
    }
  };


export {
  createBid,
  getBidListByEmailActive,
  getBidListByEmailClosed,
  getBiddersListByBidId,
  getActiveBidList,
  getBidDetailsForEmail,
  setBid,
  findBiddedOn
};

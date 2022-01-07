import express from 'express';
import { createBidController, fetchBiddenOn, getActiveBidsByEmail, getActiveBidsList, getBiddersListForEachBid, getBidDetails, getClosedBidsByEmail, setBidding } from '../controllers/bidsController.js';
import { authenticate } from '../middlewares/authenticate.js';

const bidsRoute = express.Router();

bidsRoute.post("/createBid",authenticate, createBidController);
bidsRoute.post("/listActiveBidsByEmail",authenticate, getActiveBidsByEmail);
bidsRoute.post("/listClosedBidsByEmail",authenticate, getClosedBidsByEmail);
bidsRoute.post("/getBiddersByBidId",authenticate, getBiddersListForEachBid);
bidsRoute.post("/listActiveBids",authenticate, getActiveBidsList);
bidsRoute.post("/fetchBidDetails",authenticate, getBidDetails);
bidsRoute.post("/setBidding",authenticate, setBidding);
bidsRoute.post("/listBiddedOn",authenticate, fetchBiddenOn);

export default bidsRoute;

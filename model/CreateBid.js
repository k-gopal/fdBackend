import mongoose from "mongoose";

//model to store basic details of users
const schema = new mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    goodsDescription: {
        type: String,
        required: true
    },
    activeDurationStart: {
        type: Date,
        required: true
    },
    activeDurationEnd: {
        type: Date,
        required: true
    },
    initialAmount: {
        type: Number,
        required: true
    },
    revisions:{
        type: Number,
        required: true
    },
    contractor: {
        type: String,
        required: true  
    },
    bidders: {
        type: [{
            email: {
                type: String,
                required: false
            },
            price: {
                type: Number,
                required: false
            },
            revisions: {
                type: Number,
                required: false
            }
        }],
        required: false,
        default: []
    }
},{
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

export default mongoose.model('CreateBids', schema);

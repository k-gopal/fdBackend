import mongoose from "mongoose";

//model to store basic details of users
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profession: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},{
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

export default mongoose.model('Users', schema);

import Users from "../model/Users.js";

const createUser = async(data) => {
    try {
        const user = Users(data);
        let result = user.save();

        if (result) return result;
        return false;
    } catch (error) {
        console.log("error in create user", error);
        return false;
    }
};

const findUserByEmail = async(email) => {
    try {
        let result = Users.find({email});

        if(result) return result;
        return false;
    } catch (error) {
        console.log("error in find user", error);
        return false;
    }
}


export {
    createUser,
    findUserByEmail
}
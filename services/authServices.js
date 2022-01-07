import Users from "../model/Users.js";

const createUser = async(data) => {
    try {
        const user = Users(data);
        let result = await user.save();

        if (result) return result;
        return false;
    } catch (error) {
        console.log("error in create user", error);
        return false;
    }
};

const findUserByEmailAndProfession = async(email, profession) => {
    try {
        let result = Users.find({email, profession});

        if(result) return result;
        return false;
    } catch (error) {
        console.log("error in find user", error);
        return false;
    }
}


export {
    createUser,
    findUserByEmailAndProfession
}
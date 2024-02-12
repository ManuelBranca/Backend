import { usersModel } from "../models/usermodel.js";

class userController {
    async findUserByEmail(email){
        return await usersModel.find({email: email});
    }

    async addUser (user){
        return await usersModel.create(user);
    }

}

const userControllerInst = new userController();

export default userControllerInst;
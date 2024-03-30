import { usersModel } from "../models/usermodel.js";

class userController {
    async findUserByEmail(email){
        const user = await usersModel.find({email: email});
        return user[0]
    }

    async findUserByUserName(name){
        return await usersModel.find({username:name});
    }

    async addUser (user){
        return await usersModel.create(user);
    }

}

const userDao = new userController();

export default userDao;
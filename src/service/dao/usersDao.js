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

    async changeStatus(email, status){
        const user = await this.findUserByEmail(email);
        status == "online" ? user.last_connection = null : user.last_connection = new Date()
        user.save()
        return user.last_connection;
    }

    async getAllUsers(){
        return await usersModel.find();
    }

    async deleteUser(email){
        return await usersModel.deleteOne({email: email})
    }

    async inactiveUsers(){
        try {
            const allUsers =  await this.getAllUsers()
            const now = new Date()
            let deleteUser = 0;
            console.log(allUsers)
            for (let i= 0; i < allUsers.length; i++) {
                if(allUsers[i].last_connection != null){
                    const last_connection = allUsers[i].last_connection;
                    const last_connectionDate = new Date(last_connection);
                    const timeSinceLastConnection = now - last_connectionDate.getTime()
                    const hoursSinceLastConnection = timeSinceLastConnection / (1000*60*60)
                    console.log("Ultima conexion" ,hoursSinceLastConnection)
                    if(hoursSinceLastConnection > 48){
                        console.log("Entre")
                        await this.deleteUser(allUsers[i].email)
                        deleteUser++;
                    }
                    return deleteUser;
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

const userDao = new userController();

export default userDao;
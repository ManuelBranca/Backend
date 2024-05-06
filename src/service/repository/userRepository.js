class userRepository {
    constructor(dao) {
        this.dao = dao;
    }

    findUserByEmail = (email) => {
        return this.dao.findUserByEmail(email)
    }

    findUserByUserName = (name) => {
        return this.dao.findUserByUserName(name)
    }

    addUser = (user) => {
        return this.dao.addUser(user)
    }

    changeStatus = (email, status) =>{
        return this.dao.changeStatus(email, status)
    }

    inactiveUsers = () => {
        return this.dao.inactiveUsers()
    }
}

export default userRepository;
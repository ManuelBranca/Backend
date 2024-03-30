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
}

export default userRepository;
class userDto {
    constructor (user){
        this.newUser = {
            name: user.name,
            lastname: user.lastname,
            age: user.age,
            email: user.email
        }
    }
}
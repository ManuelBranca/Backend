import dotenv from "dotenv"

export let enviroment = "prod"
dotenv.config({
    path: enviroment == "prod" ? "./config/.env" : "./config/.env.dev"
})

let variables = {PORT: process.env.PORT,
    mongoUrl: process.env.mongoUrl,
    privateKey: process.env.privateKey,
    ClaveSecreta: process.env.ClaveSecreta,
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: process.env.callbackURL,
    EmailAccount: process.env.EmailAccount,
    AppPassword: process.env.AppPassword
}

process.env.mongoUrl

export default variables
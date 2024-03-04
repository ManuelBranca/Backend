import passport from "passport"
import passportLocal from "passport-local"
import GitHubStrategy from "passport-github2"
import { usersModel } from "../dao/models/usermodel.js"
import userControllerInst from "../dao/controllerDao/usersController.js"
import { createHash } from "../utils.js"
import { comparePassword } from "../utils.js"
import cartDao from "../dao/controllerDao/cartController.js"
import jwtStrategy from "passport-jwt"
import { cookieExtractor } from "../utils.js"

const localStrategies = passportLocal.Strategy
const carritoDao = new cartDao(); 
const JwtStrategy = jwtStrategy.Strategy 
const ExtractJwt = jwtStrategy.ExtractJwt

const initializePassport = () => {
    passport.use("register", new localStrategies(
        { passReqToCallback: true, usernameField: 'email' },
        async (req, username, password, done) => {
            const { name, lastname, email, age } = req.body;
            const esta = await userControllerInst.findUserByEmail(email);
            console.log(esta)
            console.log(req.body)
            const newCart = await carritoDao.firstCart();
            const user = {
                name,
                lastname,
                username: (name + lastname) + Math.floor(Math.random()),
                email,
                age,
                cartID:newCart,
                password: createHash(password)
                };
            console.log(user)
            if (esta[0] == null) {
                await userControllerInst.addUser(user)
                return done(null, user)
            }
            return done("El usuario ya existe", user.email)
        }
    ))

    passport.use("jwt",  new JwtStrategy(
        {
            jwtFromRequest:ExtractJwt.fromExtractors([cookieExtractor]),
            secretOrKey:"SoyUnSecreto"
        },async (jwt_payload,done) =>{
            try {
                return done(null,jwt_payload.user);
            } catch (error) {
                return done(error)
            }
        }
    ))

    passport.use("github", new GitHubStrategy(
        {
            clientID: "Iv1.a041e6d4f865c570",
            clientSecret: "3d38ff83865451cbc3906116ede3849699e084c4",
            callbackURL: "http://localhost:8080/users/githubcallback"
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log("Entre a la estrategia de github")
            try {
                console.log(profile)
                const user = await userControllerInst.findUserByUserName(profile.username);
                //si el usuario existe
                console.log(user)
                if (user[0] != null) {
                    return done("El usuario ya existe", user.username)
                }
                //si el usuario no existe
                const newUser = {
                    name: profile._json.name,
                    username: profile.username,
                    email: profile._json.email,
                    password: "managedbygithub",
                    loggedBy: "GitHub"
                }
                const usuarioCreado = await usersModel.create(newUser);
                return done(null, usuarioCreado)

            } catch (error) {
                return done(error)
            }
        }
    ))


    passport.serializeUser((user, done) => {
        done(null, user)
    })

    passport.deserializeUser(async (user, done) => {
        try {
            const user2 = await userControllerInst.findUserByEmail(user.email)
            done(null, user2)
        } catch (error) {
            console.log(error, "deserializer error")
        }
    })
}


export default initializePassport
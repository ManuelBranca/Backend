import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import passport from "passport";
import variables from "../config/config.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default __dirname;

export function createHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

export function comparePassword(password, user) {
    return bcrypt.compareSync(password, user.password)
}

export function authUser(req, res, next) {
    if (req.session.user) {
        return next();
    }
    return res.send("No esta autorizado")
}

export function cookieExtractor(req){
    let token = null;
    console.log(req.cookies)
    if(req.cookies && req){
        token = req.cookies["tokenCookie"]
        return token;
    } else {
        console.log("No se encontro la cookie")
        return false
    }
}

export function generateJwtToken(user){
    return jwt.sign({user}, variables.privateKey ,{expiresIn:"9000s"})
}

export function useStrategy(strategy){
    return async(req,res,next) =>{
        passport.authenticate(strategy,function(error,user,info){
            console.log(user)
            if(error){
                next();
            }
            if(!user){
                return res.status(400).send("Permiso denegado!")
            }
            req.user = user
            next();
        })(req,res,next)
    }
}

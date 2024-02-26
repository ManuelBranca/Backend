import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";

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


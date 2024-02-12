import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default __dirname;

export function authUser(req,res,next){
    if(req.session.user){
        return next();
    }
    return res.send("No esta autorizado")
}


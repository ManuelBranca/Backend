export default class customError {
    static createError({name="error",cause,message,code=1}){
        const error = new Error(message);
        (error.name = name),
        (error.code = code),
        (error.cause = cause? new Error(cause): null)
        throw error
    }
}
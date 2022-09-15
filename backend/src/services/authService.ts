import * as authMethods from "../repositories/authRepository";
import { UserData } from "../types/authTypes";
import { verifyError } from "../middlewares/errorHandler";
import { encrypt,verifyPassword,generateToken } from "../utils/authUtils";

export async function signUp(email:string, password:string, confirmPass:string){

    if(password !== confirmPass) throw verifyError(401,"Password and confirm password doesn't match!") 
    
    const user:UserData = {
        email,
        password: encrypt(password)
    }

    const checkUser = await authMethods.findUserByEmail(email);

    if(checkUser) throw verifyError(409,"This email was already registered!");

    await authMethods.signUp(user).catch(
        ()=>
        verifyError(500,"Database error, couldn't insert user data!"))
}

export async function signIn(email:string, password:string, confirmPass:string){

    if(password !== confirmPass) throw verifyError(401,"Password and confirm password doesn't match!") 
    
    const user = await authMethods.findUserByEmail(email);

    if(!user) throw verifyError(401,"There's no user registered with this email!");

    if(await verifyPassword(password, user.password)) throw verifyError(401,"Wrong password!");

    const userInfo = generateToken(user.id);

    return userInfo;
}
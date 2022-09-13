import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function encrypt(password:string){
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

export async function verifyPassword(password:string, hash:string){
    const match = await bcrypt.compare(password, hash);
    return !match;
}

export function generateToken(userId:number){
return jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:1200});
}
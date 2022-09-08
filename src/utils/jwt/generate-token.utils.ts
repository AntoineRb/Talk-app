import { sign, SignOptions } from "jsonwebtoken";
import { type Response } from "express";
import fs from 'fs';

import config from "config";

interface ITokenPayload {
    user_id:string,
    username:string,
    log_email:string
}

const generateToken = async ( userInfo:ITokenPayload, res:Response ) => {
    const rsaPrivateKey:string = await fs.readFileSync( config.rsaPrivateKeyPath ).toString();
    const payload:ITokenPayload = {
        user_id: userInfo.user_id,
        username: userInfo.username,
        log_email: userInfo.log_email
    }
    const signOptions:SignOptions = {
        algorithm: 'RS512',
        expiresIn: 60 * 30
    }
    const token:string = sign( payload, rsaPrivateKey, signOptions );
    const httpCookieOptions = {
        maxAge: 1000 * 60 * 30,
        httpOnly: true,
        signed: false,
    }
    res.cookie('session', token, httpCookieOptions );
}
export default generateToken;
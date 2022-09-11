import { type Request, type Response } from "express";
import { Users } from "@prisma/client";
// Regex
import emailRegex from "@/utils/regex/email.regex";
import passwordRegex from "@/utils/regex/password.regex";
// DB Services
import findLoginWhereEmail from "@/services/login/login.findUnique.email.service";
// Utils
import comparePassword from "@/utils/bcrypt/compare-password.utils";
import generateToken from "@/utils/jwt/generate-token.utils";

interface ILoginData {
    email:string;
    password:string,
}

type IDbResponse = {
    user:Users|null,
    log_email:string|null,
    log_password:string|null
} | null;

const loginPostController = async ( req:Request, res:Response ) => {
    let userObj:IDbResponse;
    let isExpectedPassword:boolean = false;
    const tokenPayload = {
        user_id: '',
        username: '',
        email: ''
    }
    const data:ILoginData = req.body;
    const {
        email,
        password
    } = data;
    if ( typeof email !== "string" && typeof password !== "string" ) {
        return res
        .status( 412 )
        .json({
            message: "Need a valid email"
        });
    }
    if ( !emailRegex.test( email ) ) {
        return res
        .status( 412 )
        .json({
            message: "Need a valid email"
        });
    }
    if ( !passwordRegex.test( password ) ) {
        return res
        .status( 412 )
        .json({
            message: "Unexpected password"
        });
    }
    // Find Login Where Email
    try {
        userObj = await findLoginWhereEmail( email )
    } catch ( err ) {
        return res.status( 500 )
        .json({
            message: "Cannot find user!"
        });
    }

    if ( !userObj || !userObj.user ) {
        return res
        .status( 401 )
        .json({
            message: "Cannot find user!"
        });
    }
    if ( userObj.log_password ) {
        isExpectedPassword = comparePassword( password, userObj.log_password );
    }
    if ( !isExpectedPassword ) {
        return res
        .status( 412 )
        .json({
            message: "incorrect password or email"
        })
    }
    // Check if email get from database is not null
    if ( !userObj.log_email ) {
        return
    }
    tokenPayload.user_id = userObj.user.user_id;
    tokenPayload.username = userObj.user.username;
    tokenPayload.email = userObj.log_email;
    await generateToken( tokenPayload, res );
    return res
    .status( 200 )
    .send({ 
        message:'success', 
        username: userObj.user.username
    });
}
export default loginPostController;
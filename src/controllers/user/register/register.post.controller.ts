import { type Request, type Response } from "express";
// Utils
import passwordRegex from "@/utils/regex/password.regex";
import emailRegex from '@/utils/regex/email.regex';
import usernameRegex from '@/utils/regex/username.regex';
import encryptPassword from "@/utils/bcrypt/encrypt-password.utils";
import generateToken from "@/utils/jwt/generate-token.utils";
// DB services
import createLogin from '@/services/login/login.create.service';
import deleteLogin from '@/services/login/login.delete.service';
import createUser from '@/services/users/users.create.service';
// Model types
import { Login, Users } from "@prisma/client";

interface IRegisterData {
    login: {
        log_email:string,
        log_password:string,
    },
    user: {
        username:string
    }
}

const registerPostController = async ( req:Request, res:Response ) => {
    let newUserLogin:Login|null;
    let newUser:Users|null;
    let pwdHash:string|undefined;
    const data:IRegisterData = req.body;
    const {
        log_email,
        log_password
    } = data.login;
    const username:string = data.user.username;
    // Check Email
    if ( typeof log_email !== "string" && !emailRegex.test( log_email ) ) {
        return res
        .status( 412 )
        .json({
            message: "precondition failed"
        });
    }
    // Check Password
    if ( typeof log_password !== "string" || !passwordRegex.test( log_password ) ) {
        return res
        .status( 412 )
        .json({
            message: "precondition failed"
        });
    }
    // Check username
    if ( typeof username !== "string" || !usernameRegex.test( username ) ) {
        return res
        .status( 412 )
        .json({
            message: "precondition failed"
        });
    }
    pwdHash = encryptPassword( log_password );
    if ( !pwdHash ) {
        return res
        .status( 500 )
        .json({
            message: "Cannot create login"
        })
    }
    try { 
        newUserLogin = await createLogin({
            log_email,
            log_password: pwdHash
        })
    } catch {
        return res
        .status( 500 )
        .json({
            message: "Cannot create login"
        })
    }
    // Try to create New User
    try {
        newUser = await createUser({
            username,
            log_id: newUserLogin.log_id
        })
    } catch {
        // Delete login without user and then we return an error ( 500 )
        if ( newUserLogin ) {
            await deleteLogin( newUserLogin.log_id );
        }
        return res
        .status( 500 )
        .json({
            message: "Cannot create User"
        })
    }
    await generateToken(
        {
            user_id: newUser.user_id,
            username: newUser.username,
            log_email: newUserLogin.log_email
        }, 
        res 
    )
    return res.render( 'auth-views/dashboard', { 
        username:newUser.username 
    });
}
export default registerPostController;
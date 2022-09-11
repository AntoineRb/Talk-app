import validateToken from "@/utils/jwt/validate-token.utils";
import { Router } from "express";
import { type JwtPayload } from "jsonwebtoken";

const router = Router();

router.use( async ( req, res, next ) => {
    const jwt:string|undefined = req.cookies.session;
    let decodedToken:JwtPayload|undefined;
    if ( jwt ) {
        decodedToken = await validateToken( jwt );  
    }
    if ( decodedToken ) {
        return res.redirect(`/dashboard/${decodedToken.username}`);
    }
    next();
});
export default router;
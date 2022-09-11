import validateToken from "@/utils/jwt/validate-token.utils";
import { Router } from "express";

const router = Router();
router.use( async ( req, res, next ) => {
    const jwt:string =  req.cookies.session
    if ( !jwt ) {
        return res
        .status(401)
        .redirect('/');
    }
    const decodedToken = await validateToken( jwt );
    if ( !decodedToken ) {
        return res
        .status(401)
        .redirect('/');
    }
    next();
});
export default router;
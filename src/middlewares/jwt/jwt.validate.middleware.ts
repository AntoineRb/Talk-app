import validateToken from "@/utils/jwt/validate-token.utils";
import { Router } from "express";

const router = Router();
router.use( async ( req, res, next ) => {
    const jwt =  req.cookies.session
    if ( !jwt ) {
        return res
        .status(401)
        .json({
            message: "Unauthenticated"
        });
    }
    const decodedToken = await validateToken( jwt );
    console.log( decodedToken )
    if ( !decodedToken ) {
        return res
        .status(401)
        .json({
            message: "Unauthenticated"
        });
    }
    next();
});
export default router;
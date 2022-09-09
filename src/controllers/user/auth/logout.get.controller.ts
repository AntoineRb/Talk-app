import { type Request, type Response } from "express";

const logoutGetController = ( req:Request, res:Response ) => {
    res
        .clearCookie( 'session' )
        .status( 200 )
        .redirect( '/' );
}
export default logoutGetController;
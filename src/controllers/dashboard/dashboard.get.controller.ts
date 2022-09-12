// type
import { type Request, type Response } from "express";
import { type JwtPayload } from "jsonwebtoken";
import { Rooms } from "@prisma/client";
// Utils
import validateToken from "@/utils/jwt/validate-token.utils";
// Services
import findManyRoomAddedWhereUserId from "@/services/room-added/room-added.findMany.service";

const dashboardGetController = async ( req:Request, res:Response ) => {
    const username:string = req.params.uname;
    const jwt:string = req.cookies.session;
    let decodedToken:JwtPayload|undefined;
    let userId:string|undefined;
    let userRooms:{ room: Rooms; }[]|undefined;
    if ( !jwt ) {
        return res
        .status( 401 )
        .redirect('/');
    }
    decodedToken = validateToken( jwt );
    if ( !decodedToken ) {
        return res
        .status( 401 )
        .redirect('/logout');
    }
    userId = decodedToken.user_id;
    if ( !userId ) {
        return res
        .status( 401 )
        .redirect('/logout');
    }
    try {
        userRooms = await findManyRoomAddedWhereUserId( userId );
    } catch ( err ) {
        if ( err ) {
            return res
            .status( 412 )
            .redirect('/');
        }
    }
    return res.render( 'auth-views/dashboard', { 
        username,
        userRooms,
    });
}
export default dashboardGetController;
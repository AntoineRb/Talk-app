// Types
import { type Request, type Response } from "express";
import { type JwtPayload } from "jsonwebtoken";
import { Rooms, Room_joined } from "@prisma/client";
// DB services
import findRoomWhereId from "@/services/rooms/rooms.findUnique.service";
import findUniqueRoomJoined from "@/services/room-joined/room-joined.findUnique.service";
// third party modules
import { validate as uuidValidate } from "uuid";
// Utils
import validateToken from "@/utils/jwt/validate-token.utils";

const roomGetController = async ( req:Request, res:Response ) => {
    const roomId:string = req.params.roomId;
    const jwt:string|null = req.cookies.session;
    let room:Rooms|null;
    let roomJoined:Room_joined[]|null;
    let decodedPayload:JwtPayload|undefined;
    let userID:string|undefined;
    if ( typeof jwt !== 'string' ) {
        return// error...
    }
    decodedPayload = validateToken( jwt );
    if ( !decodedPayload || !decodedPayload.user_id ) {
        return// error...
    }
    userID = decodedPayload.user_id;
    if ( typeof userID !== "string" || !uuidValidate( userID ) ) {
        return res
        .status( 412 )
        .render('404');
    }
    if ( !uuidValidate( roomId ) ) {
        return res
        .status( 412 )
        .render('404');
    }
    try {
        room = await findRoomWhereId( roomId );
    } catch ( err ) {
        return res
        .status( 500 )
        .json({ message: "This room can't be reached" })
        .render('404');
    }
    if ( !room ) {
        return res
        .status( 412 )
        .json({ message: "Unexistent chat room"})
        .render('404');
    }
    try {
        roomJoined = await findUniqueRoomJoined( userID, room.ro_id );
    } catch ( err ) {
        return res
        .status( 401 )
        .redirect('/');
    }
    if ( !roomJoined ) {
        return res
        .status( 401 )
        .redirect('/');
    }
    try {
        res.render('auth-views/room', { 
            ro_id: room.ro_id,
            ro_name: room.ro_name,
        });
    } catch ( err ) {
        res
        .status( 500 )
        .json({ message: "This room can't be reached" })
        .render('404');
    }
}
export default roomGetController;
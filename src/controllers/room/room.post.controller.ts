// Types
import { type Request, type Response } from "express";
import { type JwtPayload } from "jsonwebtoken";
import { type Rooms, type Room_added } from "@prisma/client";
// DB services
import createRoom from "@/services/rooms/rooms.create.service";
import deleteRoom from "@/services/rooms/rooms.delete.service";
import createRoomAdded from "@/services/room-added/room-added.create.service";
// Utils
import validateToken from "@/utils/jwt/validate-token.utils";

interface ICreateRoom {
    ro_name:string,
}

const roomPostController = async ( req:Request, res:Response ) => {
    const jwt:string = req.cookies.session;
    const data:ICreateRoom = req.body;
    const { ro_name } = data;
    let roomNameChecked:string|undefined;
    let decodedToken:JwtPayload|undefined;
    let newRoom:Rooms|undefined;
    let newRoomAdded:Room_added|undefined;
    if ( !jwt ) {
        return res.status( 401 ).redirect('/');
    }
    decodedToken = validateToken( jwt );
    if ( !decodedToken ) {
        return res
        .status( 401 )
        .clearCookie('session')
        .json({ message: "Unauthorized" });
    }
    if ( typeof ro_name !== "string" || ro_name.length < 3 ) {
        return res
        .status( 412 )
        .json({ message: "Unexpected data" });
    }
    // Remove special chars
    roomNameChecked = ro_name.replace(/[~%&\\;:"',<>?#\s]/g,"");
    // Create New Room
    try {
        newRoom = await createRoom({
            ro_name: roomNameChecked,
        });
    } catch( err ) {
        return res
        .status( 500 )
        .json({ message: "Internal error" });
    }
    // Add relation in room_added table between customer and room
    try {
        newRoomAdded = await createRoomAdded({
            ro_id: newRoom.ro_id,
            user_id: decodedToken.user_id,
        })
    } catch( err ) {
        if ( newRoom ) {
            await deleteRoom( newRoom.ro_id );
        }
        return res
        .status( 500 )
        .json({ message: "Internal error" });
    }
    res
    .status( 200 )
    .json({ message: "success" });
};
export default roomPostController;
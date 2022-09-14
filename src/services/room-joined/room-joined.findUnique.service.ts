import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findUniqueRoomJoined = async ( user_id:string, room_id:string ) => {
    return await prisma.room_joined.findMany({
        where: {
            user_id,
            ro_id: room_id
        }
    });
}
export default findUniqueRoomJoined;
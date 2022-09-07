import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findManyRoomJoinedWhereRoomId = async ( ro_id:string ) => {
    return await prisma.room_joined.findMany({
        where: {
            ro_id 
        }
    })
} 
export default findManyRoomJoinedWhereRoomId;
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findManyRoomJoinedWhereRoomId = async ( ro_id:string ) => {
    return await prisma.room_joined.findMany({
        where: {
            ro_id 
        },
        select: {
            user: true
        }
    })
} 
export default findManyRoomJoinedWhereRoomId;